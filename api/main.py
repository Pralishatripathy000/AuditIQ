from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import text
import pandas as pd
import joblib
from pathlib import Path
from dotenv import load_dotenv
from google import genai
from google.genai import types
import os
import json
from fastapi.responses import StreamingResponse
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from io import BytesIO
from datetime import datetime
from xml.sax.saxutils import escape

load_dotenv()

from database import engine

app = FastAPI(title="AuditIQ API", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://audit-iq-mu.vercel.app",
    ],
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = Path(__file__).resolve().parent.parent
catboost_model = joblib.load(BASE_DIR / "catboost_risk_engine.pkl")


class InvoiceInput(BaseModel):
    invoice_amount: float
    currency: str
    payment_terms: str
    invoice_type: str
    submission_hour: int
    supplier_country: str
    supplier_age_days: int
    supplier_risk_score: float
    blacklisted_flag: int
    region: str
    annual_budget: float
    supplier_invoice_count_30d: float
    supplier_avg_amount_90d: float
    invoice_amount_zscore: float
    duplicate_invoice_flag: int
    split_invoice_flag: int
    late_night_submission_flag: int
    invoice_supplier_ratio: float
    budget_impact_ratio: float
    control_exception_count: int
    supplier_risk_tier: str
    high_risk_supplier_flag: int


class CopilotRequest(BaseModel):
    invoice: dict


def get_gemini_client():
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        return None
    return genai.Client(api_key=api_key)


@app.get("/")
def home():
    return {"message": "AuditIQ Risk Intelligence Platform"}


@app.get("/risk-summary")
def risk_summary():
    query = """
    SELECT
        audit_review_tier,
        COUNT(*) AS invoice_count
    FROM audit_risk_register
    GROUP BY audit_review_tier
    ORDER BY invoice_count DESC
    """
    result = pd.read_sql(query, engine)
    return result.to_dict(orient="records")


@app.get("/investigation-summary")
def investigation_summary():
    query = """
    SELECT
        investigation_priority,
        COUNT(*) AS invoice_count
    FROM audit_risk_register
    GROUP BY investigation_priority
    """
    result = pd.read_sql(query, engine)
    return result.to_dict(orient="records")


@app.get("/critical-invoices")
def critical_invoices(limit: int = 20):
    query = f"""
    SELECT
        invoice_id,
        risk_score,
        anomaly_score,
        audit_review_tier,
        anomaly_alert,
        investigation_priority
    FROM audit_risk_register
    WHERE investigation_priority = 'Immediate Investigation'
    ORDER BY risk_score DESC
    LIMIT {limit}
    """
    result = pd.read_sql(query, engine)
    return result.to_dict(orient="records")


@app.get("/invoice/{invoice_id}")
def get_invoice(invoice_id: str):
    query = text("""
    SELECT *
    FROM audit_risk_register
    WHERE invoice_id = :invoice_id
    LIMIT 1
    """)

    result = pd.read_sql(query, engine, params={"invoice_id": invoice_id})

    if result.empty:
        return {"message": "Invoice not found"}

    return result.to_dict(orient="records")[0]


@app.post("/score-invoice")
def score_invoice(invoice: InvoiceInput):
    feature_order = [
        "invoice_amount",
        "currency",
        "payment_terms",
        "invoice_type",
        "submission_hour",
        "supplier_country",
        "supplier_age_days",
        "supplier_risk_score",
        "blacklisted_flag",
        "region",
        "annual_budget",
        "supplier_invoice_count_30d",
        "supplier_avg_amount_90d",
        "invoice_amount_zscore",
        "duplicate_invoice_flag",
        "split_invoice_flag",
        "late_night_submission_flag",
        "invoice_supplier_ratio",
        "budget_impact_ratio",
        "control_exception_count",
        "supplier_risk_tier",
        "high_risk_supplier_flag",
    ]

    invoice_df = pd.DataFrame([invoice.model_dump()])
    invoice_df = invoice_df[feature_order]

    risk_probability = catboost_model.predict_proba(invoice_df)[0][1]
    risk_score = round(risk_probability * 100, 2)

    if risk_score >= 97.83:
        audit_review_tier = "Critical Review Required"
    elif risk_score >= 2.26:
        audit_review_tier = "Enhanced Review"
    else:
        audit_review_tier = "Routine Monitoring"

    if risk_score >= 90:
        investigation_priority = "Immediate Investigation"
    else:
        investigation_priority = "Standard Monitoring"

    observations = []

    if invoice.split_invoice_flag == 1:
        observations.append("Invoice splitting behaviour detected")

    if invoice.duplicate_invoice_flag == 1:
        observations.append("Potential duplicate invoice identified")

    if invoice.late_night_submission_flag == 1:
        observations.append("Out-of-hours submission detected")

    if invoice.blacklisted_flag == 1:
        observations.append("Blacklisted supplier involvement identified")

    if invoice.high_risk_supplier_flag == 1:
        observations.append("High-risk third-party engagement identified")

    audit_observation = (
        "No significant audit observations"
        if not observations
        else "; ".join(observations)
    )

    if investigation_priority == "Immediate Investigation":
        audit_recommendation = "Immediate investigation and supporting document review recommended."
    elif audit_review_tier == "Enhanced Review":
        audit_recommendation = "Enhanced monitoring and transaction validation recommended."
    else:
        audit_recommendation = "Routine monitoring."

    return {
        "risk_probability": round(float(risk_probability), 4),
        "risk_score": risk_score,
        "audit_review_tier": audit_review_tier,
        "investigation_priority": investigation_priority,
        "audit_observation": audit_observation,
        "audit_recommendation": audit_recommendation,
    }


@app.post("/copilot/explain")
def copilot_explain(request: CopilotRequest):
    client = get_gemini_client()

    if client is None:
        return {
            "success": False,
            "message": "Gemini API key is missing",
        }

    prompt = f"""
You are AuditIQ Copilot, an AI-powered audit assistant for invoice risk review.

Analyze the invoice below like a senior internal auditor.

Focus on:
- invoice fraud risk
- duplicate payment risk
- supplier risk
- anomaly score
- risk score
- compliance exceptions
- audit review priority
- investigation priority
- recommended next steps

Return ONLY valid JSON in this exact structure:

{{
  "riskLevel": "Low | Medium | High | Critical",
  "confidence": 0,
  "summary": "Short auditor-friendly summary.",
  "keyFindings": [
    "Finding 1",
    "Finding 2",
    "Finding 3"
  ],
  "recommendedActions": [
    "Action 1",
    "Action 2",
    "Action 3"
  ],
  "complianceChecks": [
    "Check 1",
    "Check 2",
    "Check 3"
  ]
}}

Invoice:
{json.dumps(request.invoice, indent=2, default=str)}
"""

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json"
            ),
        )

        parsed_response = json.loads(response.text)

        return {
            "success": True,
            "copilot": parsed_response,
        }

    except Exception as e:
        return {
            "success": False,
            "message": "Audit Copilot failed to generate explanation",
            "error": str(e),
        }


@app.post("/copilot/report")
def generate_audit_report(request: CopilotRequest):
    client = get_gemini_client()

    if client is None:
        return {
            "success": False,
            "message": "Gemini API key is missing",
        }

    prompt = f"""
You are AuditIQ Copilot, a senior internal audit assistant.

Generate a professional executive audit summary for this invoice.

Return ONLY valid JSON:

{{
  "executiveSummary": "Short executive-level audit summary.",
  "riskAssessment": "Clear risk assessment.",
  "keyFindings": ["Finding 1", "Finding 2", "Finding 3"],
  "recommendedActions": ["Action 1", "Action 2", "Action 3"],
  "complianceChecks": ["Check 1", "Check 2", "Check 3"]
}}

Invoice:
{json.dumps(request.invoice, indent=2, default=str)}
"""

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json"
            ),
        )

        report = json.loads(response.text)
        invoice = request.invoice

        def clean(value):
            return escape(str(value if value is not None else "N/A"))

        buffer = BytesIO()

        doc = SimpleDocTemplate(
            buffer,
            pagesize=A4,
            rightMargin=36,
            leftMargin=36,
            topMargin=36,
            bottomMargin=36,
        )

        styles = getSampleStyleSheet()

        title_style = ParagraphStyle(
            "TitleStyle",
            parent=styles["Title"],
            fontSize=26,
            textColor=colors.HexColor("#6d28d9"),
            spaceAfter=8,
        )

        heading_style = ParagraphStyle(
            "HeadingStyle",
            parent=styles["Heading2"],
            fontSize=14,
            textColor=colors.HexColor("#111827"),
            spaceBefore=14,
            spaceAfter=8,
        )

        body_style = ParagraphStyle(
            "BodyStyle",
            parent=styles["BodyText"],
            fontSize=10,
            leading=15,
            textColor=colors.HexColor("#374151"),
        )

        story = [
            Paragraph("AuditIQ", title_style),
            Paragraph("Enterprise AI Audit Report", body_style),
            Spacer(1, 14),
        ]

        overview_data = [
            ["Invoice ID", clean(invoice.get("invoice_id"))],
            ["Supplier", clean(invoice.get("supplier_id"))],
            ["Department", clean(invoice.get("department_id"))],
            ["Country", clean(invoice.get("supplier_country"))],
            ["Invoice Amount", clean(invoice.get("invoice_amount"))],
            ["Risk Score", clean(invoice.get("risk_score"))],
            ["Review Tier", clean(invoice.get("audit_review_tier"))],
            ["Investigation Priority", clean(invoice.get("investigation_priority"))],
            ["Generated At", datetime.now().strftime("%d %b %Y, %I:%M %p")],
        ]

        table = Table(overview_data, colWidths=[160, 330])
        table.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (0, -1), colors.HexColor("#f3f0ff")),
            ("TEXTCOLOR", (0, 0), (-1, -1), colors.HexColor("#111827")),
            ("GRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#e5e7eb")),
            ("FONTNAME", (0, 0), (0, -1), "Helvetica-Bold"),
            ("PADDING", (0, 0), (-1, -1), 8),
        ]))

        story.append(Paragraph("Invoice Overview", heading_style))
        story.append(table)

        story.append(Paragraph("Executive Summary", heading_style))
        story.append(Paragraph(clean(report.get("executiveSummary")), body_style))

        story.append(Paragraph("Risk Assessment", heading_style))
        story.append(Paragraph(clean(report.get("riskAssessment")), body_style))

        story.append(Paragraph("Key Findings", heading_style))
        for item in report.get("keyFindings", []):
            story.append(Paragraph(f"- {clean(item)}", body_style))

        story.append(Paragraph("Recommended Auditor Actions", heading_style))
        for item in report.get("recommendedActions", []):
            story.append(Paragraph(f"- {clean(item)}", body_style))

        story.append(Paragraph("Compliance Checks", heading_style))
        for item in report.get("complianceChecks", []):
            story.append(Paragraph(f"- {clean(item)}", body_style))

        story.append(Spacer(1, 18))
        story.append(Paragraph("Generated by AuditIQ AI Copilot", body_style))

        doc.build(story)
        buffer.seek(0)

        filename = f"AuditIQ_Report_{invoice.get('invoice_id', 'invoice')}.pdf"

        return StreamingResponse(
            buffer,
            media_type="application/pdf",
            headers={
                "Content-Disposition": f"attachment; filename={filename}"
            },
        )

    except Exception as e:
        return {
            "success": False,
            "message": "Failed to generate audit report",
            "error": str(e),
        }