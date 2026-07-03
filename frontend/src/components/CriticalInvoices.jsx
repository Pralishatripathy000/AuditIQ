function CriticalInvoices({ displayedInvoices, openInvoice }) {
  return (
    <div className="panel table-panel">
      <div className="panel-head">
        <div>
          <h3>Critical Invoice Monitor</h3>
          <p>Highest-priority transactions requiring audit review</p>
        </div>

        <span>Live API ready</span>
      </div>

      <div className="invoice-list">
        {displayedInvoices.map((invoice) => (
          <div
            className="invoice-row"
            key={invoice.invoice_id}
            onClick={() => openInvoice(invoice.invoice_id)}
          >
            <div>
              <h4>{invoice.invoice_id}</h4>
              <p>
                {invoice.investigation_priority ||
                  "Immediate Investigation"}
              </p>
            </div>

            <strong>
              {Number(invoice.risk_score || 0).toFixed(1)}
            </strong>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CriticalInvoices