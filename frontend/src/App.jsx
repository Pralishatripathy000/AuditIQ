import { useEffect, useState } from "react"
import API from "./api"
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts"

const riskTrend = [
  { month: "Jan", critical: 34, enhanced: 54 },
  { month: "Feb", critical: 42, enhanced: 58 },
  { month: "Mar", critical: 37, enhanced: 64 },
  { month: "Apr", critical: 55, enhanced: 68 },
  { month: "May", critical: 49, enhanced: 61 },
  { month: "Jun", critical: 70, enhanced: 74 },
]

const riskDrivers = [
  { driver: "Split invoice", score: 95 },
  { driver: "Blacklisted supplier", score: 71 },
  { driver: "Invoice z-score", score: 42 },
  { driver: "Supplier risk score", score: 33 },
]

const complianceControls = [
  { control: "Policy", score: 82 },
  { control: "Supplier", score: 74 },
  { control: "Invoice", score: 68 },
  { control: "Approval", score: 59 },
]

function App() {
  const [riskSummary, setRiskSummary] = useState([])
  const [investigationSummary, setInvestigationSummary] = useState([])
  const [criticalInvoices, setCriticalInvoices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedInvoice, setSelectedInvoice] = useState(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true)

        const [riskRes, investigationRes, criticalRes] = await Promise.all([
          API.get("/risk-summary"),
          API.get("/investigation-summary"),
          API.get("/critical-invoices"),
        ])

        setRiskSummary(riskRes.data || [])
        setInvestigationSummary(investigationRes.data || [])
        setCriticalInvoices(criticalRes.data || [])
        setError("")
      } catch (err) {
        console.error(err)
        setError("Backend connection failed. Check FastAPI server.")
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])
  async function openInvoice(invoiceId) {
    try {
      const response = await API.get(`/invoice/${invoiceId}`)
      setSelectedInvoice(response.data)
      setDrawerOpen(true)
   } catch (err) {
     console.error(err)
   }
 }

  const getCount = (row) =>
    row.invoice_count ||
    row.count ||
    row.total ||
    row.total_records ||
    row.investigation_count ||
    0

  const getTier = (row) =>
    row.audit_review_tier ||
    row.investigation_priority ||
    row.priority ||
    row.tier ||
    "Unknown"

  const totalReviews = riskSummary.reduce((sum, row) => sum + Number(getCount(row)), 0)

  const criticalReviews =
    riskSummary.find((row) => String(getTier(row)).toLowerCase().includes("critical"))
      ? getCount(riskSummary.find((row) => String(getTier(row)).toLowerCase().includes("critical")))
      : 30519

  const immediateInvestigations =
    investigationSummary.find((row) => String(getTier(row)).toLowerCase().includes("immediate"))
      ? getCount(investigationSummary.find((row) => String(getTier(row)).toLowerCase().includes("immediate")))
      : 11603

  const reviewPortfolio = riskSummary.length
    ? riskSummary.map((row) => ({
        tier: String(getTier(row)).replace(" Monitoring", "").replace(" Review Required", ""),
        count: Number(getCount(row)),
      }))
    : [
        { tier: "Routine", count: 208904 },
        { tier: "Enhanced", count: 60577 },
        { tier: "Critical", count: 30519 },
      ]

  const investigationSplit = investigationSummary.length
    ? investigationSummary.map((row) => ({
        name: getTier(row),
        value: Number(getCount(row)),
      }))
    : [
        { name: "Immediate", value: 11603 },
        { name: "Standard", value: 288397 },
      ]

  const displayedInvoices = criticalInvoices.length
    ? criticalInvoices.slice(0, 4)
    : [
        { invoice_id: "INV_0000190", risk_score: 99.4, investigation_priority: "Immediate Investigation" },
        { invoice_id: "INV_0000050", risk_score: 99.3, investigation_priority: "Immediate Investigation" },
        { invoice_id: "INV_0000107", risk_score: 98.2, investigation_priority: "Immediate Investigation" },
        { invoice_id: "INV_0000066", risk_score: 98.1, investigation_priority: "Immediate Investigation" },
      ]

  return (
    <>
    <main className="dashboard">
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

      {error && <div className="error-banner">{error}</div>}

      <section className="kpi-grid">
        <div className="kpi-card pink">
          <span>Total Reviews</span>
          <h2>{loading ? "..." : totalReviews.toLocaleString()}</h2>
          <p>Procurement records analyzed</p>
        </div>

        <div className="kpi-card purple">
          <span>Critical Reviews</span>
          <h2>{loading ? "..." : Number(criticalReviews).toLocaleString()}</h2>
          <p>High-risk audit cases</p>
        </div>

        <div className="kpi-card violet">
          <span>Investigations</span>
          <h2>{loading ? "..." : Number(immediateInvestigations).toLocaleString()}</h2>
          <p>Immediate review population</p>
        </div>

        <div className="kpi-card blue">
          <span>Model AUC</span>
          <h2>96.29%</h2>
          <p>CatBoost validation score</p>
        </div>
      </section>

      <section className="grid-main">
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
              <Area type="monotone" dataKey="enhanced" stroke="#6C63FF" strokeWidth={3} fill="url(#enhancedPurple)" />
              <Area type="monotone" dataKey="critical" stroke="#F58BC6" strokeWidth={3} fill="url(#criticalPink)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="panel">
          <div className="panel-head">
            <div>
              <h3>Investigation Split</h3>
              <p>Immediate investigation vs standard monitoring</p>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={290}>
            <PieChart>
              <Pie data={investigationSplit} dataKey="value" nameKey="name" innerRadius={75} outerRadius={105} paddingAngle={4}>
                <Cell fill="#F58BC6" />
                <Cell fill="#6C63FF" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

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
              <Bar dataKey="count" radius={[16, 16, 16, 16]} fill="#6C63FF" />
            </BarChart>
          </ResponsiveContainer>
        </div>

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

        <div className="panel compliance-panel">
          <div className="panel-head">
            <div>
              <h3>Compliance Control View</h3>
              <p>Control monitoring across procurement workflows</p>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={complianceControls} margin={{ top: 10, right: 10, left: 20, bottom: 10 }}>
              <CartesianGrid stroke="#EEF0FB" vertical={false} />
              <XAxis dataKey="control" axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip />
              <Bar dataKey="score" radius={[16, 16, 16, 16]} fill="#F58BC6" barSize={60} />
            </BarChart>
          </ResponsiveContainer>
        </div>

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
                  <p>{invoice.investigation_priority || "Immediate Investigation"}</p>
                </div>
                <strong>{Number(invoice.risk_score || 0).toFixed(1)}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="panel compliance-health">
          <div className="panel-head">
            <div>
              <h3>Compliance Health</h3>
              <p>Open control and governance signals</p>
            </div>
          </div>

          <div className="health-list">
            <div><span>Policy Exceptions</span><b>107.1K</b></div>
            <div><span>Control Exceptions</span><b>36.2K</b></div>
            <div><span>High-Risk Suppliers</span><b>4.3K</b></div>
            <div><span>Immediate Reviews</span><b>{Number(immediateInvestigations).toLocaleString()}</b></div>
          </div>
        </div>

        <div className="panel about-panel full">
          <h3>About AuditIQ</h3>
          <p>
            AuditIQ helps audit, finance and compliance teams identify high-risk
            procurement activity, monitor control exceptions and prioritize investigation
            workflows using machine learning, anomaly detection and backend APIs.
          </p>

          <div className="about-highlights">
            <div>
              <strong>Risk Classification</strong>
              <span>CatBoost-based scoring for procurement fraud and audit review prioritization.</span>
            </div>

            <div>
              <strong>Anomaly Detection</strong>
              <span>Isolation Forest layer to surface unusual supplier and invoice behaviour.</span>
            </div>

            <div>
              <strong>Compliance Monitoring</strong>
              <span>Tracks policy exceptions, control failures and audit review tiers.</span>
            </div>
          </div>
        </div>
      </section>

            <footer className="creator-footer">
        <p>Built by <span>Pralisha Tripathy</span></p>
      </footer>

    </main>

    {drawerOpen && selectedInvoice && (
      <div
        className="drawer-overlay"
        onClick={() => setDrawerOpen(false)}
      >
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
              <strong>{selectedInvoice.invoice_id}</strong>
            </div>

            <div className="drawer-item">
              <span>Risk Score</span>
              <strong>
                {selectedInvoice.risk_score?.toFixed(1) ?? "99.9"}
              </strong>
            </div>

            <div className="drawer-item">
              <span>Invoice Amount</span>
              <strong>
                ${Number(selectedInvoice.invoice_amount).toLocaleString()}
              </strong>
            </div>

            <div className="drawer-item">
              <span>Supplier</span>
              <strong>{selectedInvoice.supplier_id}</strong>
            </div>

            <div className="drawer-item">
              <span>Department</span>
              <strong>{selectedInvoice.department_id}</strong>
            </div>

            <div className="drawer-item">
              <span>Country</span>
              <strong>{selectedInvoice.supplier_country}</strong>
            </div>

            <div className="drawer-item">
              <span>Fraud Type</span>
              <strong>{selectedInvoice.fraud_type}</strong>
            </div>

          </div>

          <div className="recommendation-box">
            <h4>Recommendation</h4>

            <p>
              Immediate manual investigation recommended.
              Hold payment until the invoice has been verified
              by the audit team.
            </p>
          </div>

        </div>
      </div>
    )}

  </>
)
}

export default App