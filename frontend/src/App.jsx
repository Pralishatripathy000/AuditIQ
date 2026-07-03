import Hero from "./components/Hero"
import KPICards from "./components/KPICards"
import RiskTrend from "./components/RiskTrend"
import InvestigationSplit from "./components/InvestigationSplit"
import ReviewPortfolio from "./components/ReviewPortfolio"
import RiskDrivers from "./components/RiskDrivers"
import ComplianceHealth from "./components/ComplianceHealth"
import CriticalInvoices from "./components/CriticalInvoices"
import AboutAuditIQ from "./components/AboutAuditIQ"
import Footer from "./components/Footer"
import InvestigationDrawer from "./components/InvestigationDrawer"

import useDashboard from "./hooks/useDashboard"

import {
  riskTrend,
  riskDrivers,
  complianceControls,
} from "./data/dashboardData"

function App() {
  const {
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
  } = useDashboard()

  return (
    <>
      <main className="dashboard">
        <Hero error={error} />

        {error && <div className="error-banner">{error}</div>}

        <KPICards
          loading={loading}
          totalReviews={totalReviews}
          criticalReviews={criticalReviews}
          immediateInvestigations={immediateInvestigations}
        />

        <section className="grid-main">
          <RiskTrend riskTrend={riskTrend} />

          <InvestigationSplit investigationSplit={investigationSplit} />

          <ReviewPortfolio reviewPortfolio={reviewPortfolio} />

          <RiskDrivers riskDrivers={riskDrivers} />

          <ComplianceHealth
            complianceControls={complianceControls}
            immediateInvestigations={immediateInvestigations}
          />

          <CriticalInvoices
            displayedInvoices={displayedInvoices}
            openInvoice={openInvoice}
          />

          <AboutAuditIQ />
        </section>

        <Footer />
      </main>

      <InvestigationDrawer
        drawerOpen={drawerOpen}
        selectedInvoice={selectedInvoice}
        setDrawerOpen={setDrawerOpen}
      />
    </>
  )
}

export default App