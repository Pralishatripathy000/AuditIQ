import { useState } from "react";
import API from "../api";

function AuditCopilot({ invoice }) {
  const [loading, setLoading] = useState(false);
  const [reportLoading, setReportLoading] = useState(false);
  const [copilot, setCopilot] = useState(null);
  const [error, setError] = useState("");

  const explainRisk = async () => {
    try {
      setLoading(true);
      setError("");
      setCopilot(null);

      const response = await API.post("/copilot/explain", {
        invoice,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      setCopilot(response.data.copilot);
    } catch {
      setError("Audit Copilot could not generate explanation.");
    } finally {
      setLoading(false);
    }
  };

  const generateReport = async () => {
    try {
      setReportLoading(true);

      const response = await API.post("/copilot/report", {
        invoice,
      });

      const blob = new Blob([response.data], {
        type: "application/pdf",
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `AuditIQ_Report_${invoice.invoice_id}.pdf`;
      link.click();

      window.URL.revokeObjectURL(url);
    } catch {
      alert("Failed to generate report.");
    } finally {
      setReportLoading(false);
    }
  };

  return (
    <div className="copilot-box">
      <div className="copilot-head">
        <div>
          <h4>Audit Copilot</h4>
          <p>AI-powered invoice risk explanation</p>
        </div>

        <div className="copilot-actions">
          <button
            className="copilot-button"
            onClick={explainRisk}
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Explain Risk"}
          </button>

          {copilot && (
            <button
              className="report-button"
              onClick={generateReport}
              disabled={reportLoading}
            >
              {reportLoading
                ? "Generating..."
                : "📄 Executive Report"}
            </button>
          )}
        </div>
      </div>

      {error && <div className="copilot-error">{error}</div>}

      {copilot && (
        <div className="copilot-result">
          <div className="copilot-risk-row">
            <div>
              <span>Risk Level</span>
              <strong>{copilot.riskLevel}</strong>
            </div>

            <div>
              <span>Confidence</span>
              <strong>{copilot.confidence}%</strong>
            </div>
          </div>

          <div className="copilot-section">
            <span>Executive Summary</span>
            <p>{copilot.summary}</p>
          </div>

          <div className="copilot-section">
            <span>Key Findings</span>
            {copilot.keyFindings?.map((item, index) => (
              <p key={index}>• {item}</p>
            ))}
          </div>

          <div className="copilot-section">
            <span>Recommended Actions</span>
            {copilot.recommendedActions?.map((item, index) => (
              <p key={index}>✓ {item}</p>
            ))}
          </div>

          <div className="copilot-section">
            <span>Compliance Checks</span>
            {copilot.complianceChecks?.map((item, index) => (
              <p key={index}>• {item}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AuditCopilot;