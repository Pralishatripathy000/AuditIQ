function Hero({ error }) {
  return (
    <section className="hero">
      <div>
        <span className="eyebrow">Enterprise Risk & Compliance Intelligence</span>
        <h1>AuditIQ</h1>
        <p>
          AI-powered procurement risk intelligence platform for control monitoring,
          compliance review, anomaly detection and audit investigation prioritization.
        </p>
      </div>

      <div className="hero-status">
        <span>System Status</span>
        <b>{error ? "Disconnected" : "Operational"}</b>
      </div>
    </section>
  )
}

export default Hero