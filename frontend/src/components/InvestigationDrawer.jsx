import AuditCopilot from "./AuditCopilot";

function InvestigationDrawer({ drawerOpen, selectedInvoice, setDrawerOpen }) {
  if (!drawerOpen || !selectedInvoice) return null;

  const riskScore = Number(selectedInvoice.risk_score || 0);
  const invoiceAmount = Number(selectedInvoice.invoice_amount || 0);

  return (
    <div className="drawer-overlay" onClick={() => setDrawerOpen(false)}>
      <div
        className="investigation-drawer"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="drawer-header">
          <h2>Investigation Details</h2>

          <button
            className="drawer-close"
            onClick={() => setDrawerOpen(false)}
          >
            ✕
          </button>
        </div>

        <div className="drawer-section">
          <div className="drawer-item">
            <span>Invoice ID</span>
            <strong>{selectedInvoice.invoice_id || "N/A"}</strong>
          </div>

          <div className="drawer-item">
            <span>Risk Score</span>
            <strong>{riskScore.toFixed(1)}</strong>
          </div>

          <div className="drawer-item">
            <span>Invoice Amount</span>
            <strong>${invoiceAmount.toLocaleString()}</strong>
          </div>

          <div className="drawer-item">
            <span>Supplier</span>
            <strong>{selectedInvoice.supplier_id || "N/A"}</strong>
          </div>

          <div className="drawer-item">
            <span>Department</span>
            <strong>{selectedInvoice.department_id || "N/A"}</strong>
          </div>

          <div className="drawer-item">
            <span>Country</span>
            <strong>{selectedInvoice.supplier_country || "N/A"}</strong>
          </div>

          <div className="drawer-item">
            <span>Fraud Type</span>
            <strong>{selectedInvoice.fraud_type || "N/A"}</strong>
          </div>
        </div>

        <div className="recommendation-box">
          <h4>Recommendation</h4>
          <p>
            Immediate manual investigation recommended. Hold payment until the
            invoice has been verified by the audit team. Validate supporting
            documentation, supplier history and approval workflow before
            releasing payment.
          </p>
        </div>

        <AuditCopilot invoice={selectedInvoice} />
      </div>
    </div>
  );
}

export default InvestigationDrawer;