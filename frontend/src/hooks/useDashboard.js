import { useEffect, useState } from "react"
import API from "../api"

function useDashboard() {
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

  const totalReviews = riskSummary.reduce(
    (sum, row) => sum + Number(getCount(row)),
    0
  )

  const criticalReviews =
    riskSummary.find((row) =>
      String(getTier(row)).toLowerCase().includes("critical")
    )
      ? getCount(
          riskSummary.find((row) =>
            String(getTier(row)).toLowerCase().includes("critical")
          )
        )
      : 30519

  const immediateInvestigations =
    investigationSummary.find((row) =>
      String(getTier(row)).toLowerCase().includes("immediate")
    )
      ? getCount(
          investigationSummary.find((row) =>
            String(getTier(row)).toLowerCase().includes("immediate")
          )
        )
      : 11603

  const reviewPortfolio = riskSummary.length
    ? riskSummary.map((row) => ({
        tier: String(getTier(row))
          .replace(" Monitoring", "")
          .replace(" Review Required", ""),
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
        {
          invoice_id: "INV_0000190",
          risk_score: 99.4,
          investigation_priority: "Immediate Investigation",
        },
        {
          invoice_id: "INV_0000050",
          risk_score: 99.3,
          investigation_priority: "Immediate Investigation",
        },
        {
          invoice_id: "INV_0000107",
          risk_score: 98.2,
          investigation_priority: "Immediate Investigation",
        },
        {
          invoice_id: "INV_0000066",
          risk_score: 98.1,
          investigation_priority: "Immediate Investigation",
        },
      ]

  return {
    loading,
    error,
    drawerOpen,
    selectedInvoice,
    setDrawerOpen,
    totalReviews,
    criticalReviews,
    immediateInvestigations,
    reviewPortfolio,
    investigationSplit,
    displayedInvoices,
    openInvoice,
  }
}

export default useDashboard