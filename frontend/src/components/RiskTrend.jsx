import {
  AreaChart,
  Area,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

function RiskTrend({ riskTrend }) {
  return (
    <div className="panel wide">
      <div className="panel-head">
        <div>
          <h3>Risk Trend</h3>
          <p>Monthly movement across enhanced and critical review populations</p>
        </div>
        <span>Monthly</span>
      </div>

      <ResponsiveContainer width="100%" height={290}>
        <AreaChart data={riskTrend}>
          <defs>
            <linearGradient id="criticalPink" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F58BC6" stopOpacity={0.55} />
              <stop offset="95%" stopColor="#F58BC6" stopOpacity={0.04} />
            </linearGradient>

            <linearGradient id="enhancedPurple" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6C63FF" stopOpacity={0.45} />
              <stop offset="95%" stopColor="#6C63FF" stopOpacity={0.04} />
            </linearGradient>
          </defs>

          <CartesianGrid stroke="#EEF0FB" vertical={false} />
          <XAxis dataKey="month" axisLine={false} tickLine={false} />
          <YAxis hide />
          <Tooltip />

          <Area
            type="monotone"
            dataKey="enhanced"
            stroke="#6C63FF"
            strokeWidth={3}
            fill="url(#enhancedPurple)"
          />

          <Area
            type="monotone"
            dataKey="critical"
            stroke="#F58BC6"
            strokeWidth={3}
            fill="url(#criticalPink)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default RiskTrend