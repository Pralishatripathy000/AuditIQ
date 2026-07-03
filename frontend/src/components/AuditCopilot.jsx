import { useState } from "react";
import API from "../api";

function AuditCopilot({ invoice }) {
  const [loading, setLoading] = useState(false);
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
        throw new Error(response.data.message || "Copilot failed");
      }

      setCopilot(response.data.copilot);
    } catch (err) {
      setError("Audit Copilot could not generate explanation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="copilot-box">
      <div className="copilot-head">
        <div>
          <h4>Audit Copilot</h4>
          <p>AI-powered invoice risk explanation</p>
        </div>

        <button
          type="button"
          className="copilot-button"
          onClick={explainRisk}
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Explain Risk"}
        </button>
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
            <span>Summary</span>
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