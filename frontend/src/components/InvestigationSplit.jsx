import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts"

function InvestigationSplit({ investigationSplit }) {
  return (
    <div className="panel">
      <div className="panel-head">
        <div>
          <h3>Investigation Split</h3>
          <p>Immediate investigation vs standard monitoring</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={290}>
        <PieChart>
          <Pie
            data={investigationSplit}
            dataKey="value"
            nameKey="name"
            innerRadius={75}
            outerRadius={105}
            paddingAngle={4}
          >
            <Cell fill="#F58BC6" />
            <Cell fill="#6C63FF" />
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default InvestigationSplit