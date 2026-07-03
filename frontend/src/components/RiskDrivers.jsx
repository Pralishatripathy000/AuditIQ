function RiskDrivers({ riskDrivers }) {
  return (
    <div className="panel">
      <div className="panel-head">
        <div>
          <h3>Risk Drivers</h3>
          <p>Top model-based audit indicators</p>
        </div>
      </div>

      <div className="driver-list">
        {riskDrivers.map((item) => (
          <div className="driver-row" key={item.driver}>
            <div>
              <span>{item.driver}</span>
              <b>{item.score}%</b>
            </div>

            <div className="track">
              <div style={{ width: `${item.score}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RiskDrivers