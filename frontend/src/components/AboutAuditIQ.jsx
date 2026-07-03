function AboutAuditIQ() {
  return (
    <div className="panel about-panel full">
      <h3>About AuditIQ</h3>

      <p>
        AuditIQ helps audit, finance and compliance teams identify high-risk
        procurement activity, monitor control exceptions and prioritize
        investigation workflows using machine learning, anomaly detection and
        backend APIs.
      </p>

      <div className="about-highlights">
        <div>
          <strong>Risk Classification</strong>
          <span>
            CatBoost-based scoring for procurement fraud and audit review
            prioritization.
          </span>
        </div>

        <div>
          <strong>Anomaly Detection</strong>
          <span>
            Isolation Forest layer to surface unusual supplier and invoice
            behaviour.
          </span>
        </div>

        <div>
          <strong>Compliance Monitoring</strong>
          <span>
            Tracks policy exceptions, control failures and audit review tiers.
          </span>
        </div>
      </div>
    </div>
  )
}

export default AboutAuditIQ