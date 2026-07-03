import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

function ComplianceHealth({
  complianceControls,
  immediateInvestigations,
}) {
  return (
    <>
      <div className="panel compliance-panel">
        <div className="panel-head">
          <div>
            <h3>Compliance Control View</h3>
            <p>Control monitoring across procurement workflows</p>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={280}>
          <BarChart
            data={complianceControls}
            margin={{ top: 10, right: 10, left: 20, bottom: 10 }}
          >
            <CartesianGrid stroke="#EEF0FB" vertical={false} />
            <XAxis dataKey="control" axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip />
            <Bar
              dataKey="score"
              radius={[16, 16, 16, 16]}
              fill="#F58BC6"
              barSize={60}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="panel compliance-health">
        <div className="panel-head">
          <div>
            <h3>Compliance Health</h3>
            <p>Open control and governance signals</p>
          </div>
        </div>

        <div className="health-list">
          <div>
            <span>Policy Exceptions</span>
            <b>107.1K</b>
          </div>

          <div>
            <span>Control Exceptions</span>
            <b>36.2K</b>
          </div>

          <div>
            <span>High-Risk Suppliers</span>
            <b>4.3K</b>
          </div>

          <div>
            <span>Immediate Reviews</span>
            <b>{Number(immediateInvestigations).toLocaleString()}</b>
          </div>
        </div>
      </div>
    </>
  )
}

export default ComplianceHealth