import { useState } from "react"
import API from "../api"

const initialForm = {
  invoice_amount: 25000,
  currency: "ZAR",
  payment_terms: "NET30",
  invoice_type: "GOODS",
  submission_hour: 23,
  supplier_country: "CA",
  supplier_age_days: 120,
  supplier_risk_score: 0.82,
  blacklisted_flag: 1,
  region: "North Carolina",
  annual_budget: 20000000,
  supplier_invoice_count_30d: 15,
  supplier_avg_amount_90d: 5000,
  invoice_amount_zscore: 3.5,
  duplicate_invoice_flag: 0,
  split_invoice_flag: 1,
  late_night_submission_flag: 1,
  invoice_supplier_ratio: 5.0,
  budget_impact_ratio: 0.00125,
  control_exception_count: 2,
  supplier_risk_tier: "High Risk",
  high_risk_supplier_flag: 1,
}

function ScoreInvoice() {
  const [form, setForm] = useState(initialForm)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  function handleChange(e) {
    const { name, value } = e.target

    setForm((prev) => ({
      ...prev,
      [name]: isNaN(value) || value === "" ? value : Number(value),
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setLoading(true)
      setError("")
      const response = await API.post("/score-invoice", form)
      setResult(response.data)
    } catch (err) {
      console.error(err)
      setError("Unable to score invoice. Check backend server.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="panel full score-panel">
      <div className="panel-head">
        <div>
          <h3>Score New Invoice</h3>
          <p>Run live procurement risk scoring using the AuditIQ model API</p>
        </div>
        <span>Live ML API</span>
      </div>

      <form className="score-form" onSubmit={handleSubmit}>
        <div className="score-grid">
          <input name="invoice_amount" value={form.invoice_amount} onChange={handleChange} placeholder="Invoice Amount" />
          <input name="currency" value={form.currency} onChange={handleChange} placeholder="Currency" />
          <input name="payment_terms" value={form.payment_terms} onChange={handleChange} placeholder="Payment Terms" />
          <input name="invoice_type" value={form.invoice_type} onChange={handleChange} placeholder="Invoice Type" />
          <input name="submission_hour" value={form.submission_hour} onChange={handleChange} placeholder="Submission Hour" />
          <input name="supplier_country" value={form.supplier_country} onChange={handleChange} placeholder="Supplier Country" />
          <input name="supplier_risk_score" value={form.supplier_risk_score} onChange={handleChange} placeholder="Supplier Risk Score" />
          <input name="invoice_amount_zscore" value={form.invoice_amount_zscore} onChange={handleChange} placeholder="Amount Z-Score" />
          <input name="duplicate_invoice_flag" value={form.duplicate_invoice_flag} onChange={handleChange} placeholder="Duplicate Flag" />
          <input name="split_invoice_flag" value={form.split_invoice_flag} onChange={handleChange} placeholder="Split Flag" />
          <input name="late_night_submission_flag" value={form.late_night_submission_flag} onChange={handleChange} placeholder="Late Night Flag" />
          <input name="supplier_risk_tier" value={form.supplier_risk_tier} onChange={handleChange} placeholder="Supplier Risk Tier" />
        </div>

        <button className="score-button" type="submit">
          {loading ? "Scoring..." : "Analyze Invoice Risk"}
        </button>
      </form>

      {error && <div className="error-banner">{error}</div>}

      {result && (
        <div className="score-result">
          <div>
            <span>Risk Score</span>
            <strong>{result.risk_score}</strong>
          </div>

          <div>
            <span>Risk Probability</span>
            <strong>{result.risk_probability}</strong>
          </div>

          <div>
            <span>Review Tier</span>
            <strong>{result.audit_review_tier}</strong>
          </div>

          <div>
            <span>Priority</span>
            <strong>{result.investigation_priority}</strong>
          </div>

          <div className="score-note">
            <span>Observation</span>
            <p>{result.audit_observation}</p>
          </div>

          <div className="score-note">
            <span>Recommendation</span>
            <p>{result.audit_recommendation}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default ScoreInvoice