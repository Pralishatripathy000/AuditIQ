from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import text
import pandas as pd
import joblib
from pathlib import Path

from database import engine

app = FastAPI(
    title="AuditIQ API",
    version="1.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
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


@app.get("/")
def home():
    return {
        "message": "AuditIQ Risk Intelligence Platform"
    }


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

    result = pd.read_sql(
        query,
        engine,
        params={"invoice_id": invoice_id}
    )

    if result.empty:
        return {
            "message": "Invoice not found"
        }

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
        "high_risk_supplier_flag"
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

    if not observations:
        audit_observation = "No significant audit observations"
    else:
        audit_observation = "; ".join(observations)

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
        "audit_recommendation": audit_recommendation
    }