function KPICards({
  loading,
  totalReviews,
  criticalReviews,
  immediateInvestigations,
}) {
  return (
    <section className="kpi-grid">
      <div className="kpi-card pink">
        <span>Total Reviews</span>
        <h2>{loading ? "..." : totalReviews.toLocaleString()}</h2>
        <p>Procurement records analyzed</p>
      </div>

      <div className="kpi-card purple">
        <span>Critical Reviews</span>
        <h2>
          {loading ? "..." : Number(criticalReviews).toLocaleString()}
        </h2>
        <p>High-risk audit cases</p>
      </div>

      <div className="kpi-card violet">
        <span>Investigations</span>
        <h2>
          {loading ? "..." : Number(immediateInvestigations).toLocaleString()}
        </h2>
        <p>Immediate review population</p>
      </div>

      <div className="kpi-card blue">
        <span>Model AUC</span>
        <h2>96.29%</h2>
        <p>CatBoost validation score</p>
      </div>
    </section>
  )
}

export default KPICards