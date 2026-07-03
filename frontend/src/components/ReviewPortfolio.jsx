import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

function ReviewPortfolio({ reviewPortfolio }) {
  return (
    <div className="panel">
      <div className="panel-head">
        <div>
          <h3>Review Portfolio</h3>
          <p>Audit review tier distribution</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={reviewPortfolio}>
          <CartesianGrid stroke="#EEF0FB" vertical={false} />
          <XAxis dataKey="tier" axisLine={false} tickLine={false} />
          <YAxis hide />
          <Tooltip />
          <Bar
            dataKey="count"
            radius={[16, 16, 16, 16]}
            fill="#6C63FF"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ReviewPortfolio