<div align="center">



\# 🛡️ AuditIQ



\### AI-Powered Audit \& Compliance Intelligence Platform



Transforming procurement transactions into actionable risk intelligence through machine learning, anomaly detection, compliance monitoring, and investigation prioritization.



<br>



!\[React](https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge)

!\[FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?style=for-the-badge)

!\[PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?style=for-the-badge)

!\[CatBoost](https://img.shields.io/badge/CatBoost-Risk\_Engine-FFCC00?style=for-the-badge)

!\[Scikit-Learn](https://img.shields.io/badge/Isolation\_Forest-Anomaly\_Detection-F7931E?style=for-the-badge)



</div>



\---



\## 📌 Overview



Modern organizations process thousands of procurement transactions every day. Among these transactions lie policy violations, control failures, anomalous supplier activity, duplicate invoices, and potential fraud indicators that are often difficult to identify through traditional audit procedures.



AuditIQ is an end-to-end Audit Intelligence Platform designed to assist audit, risk, finance, and compliance teams in proactively identifying high-risk procurement transactions before they evolve into costly control failures.



By combining machine learning, anomaly detection, compliance analytics, and interactive investigation workflows, AuditIQ transforms raw procurement data into explainable and actionable audit intelligence.



The platform enables organizations to:



\- Prioritize investigations based on risk

\- Detect anomalous procurement behavior

\- Monitor compliance health

\- Surface high-risk suppliers

\- Improve audit efficiency through AI-assisted analysis



\---



\## 🎯 The Problem



Traditional audit processes often depend on:



\- Manual sampling

\- Rule-based reviews

\- Reactive investigations

\- Limited visibility into transaction-level risk

\- Time-consuming compliance assessments



As transaction volumes increase, identifying genuinely risky activities becomes increasingly challenging.



This creates a need for an intelligent system capable of continuously monitoring procurement activity and directing auditor attention toward transactions that matter most.



\---



\## 💡 The Solution



AuditIQ introduces a data-driven audit intelligence framework that combines predictive analytics and anomaly detection to assess procurement risk in real time.



Instead of reviewing transactions uniformly, AuditIQ prioritizes them according to their risk profile, allowing audit teams to focus on the highest-value investigations.



Key capabilities include:



✅ Risk Scoring



✅ Anomaly Detection



✅ Compliance Monitoring



✅ Investigation Prioritization



✅ Audit Intelligence Dashboards



✅ Explainable Risk Signals



\---



\## 🏗️ System Architecture



```text

&#x20;                   ┌──────────────────────┐

&#x20;                   │    React Frontend    │

&#x20;                   │   Audit Dashboard    │

&#x20;                   └──────────┬───────────┘

&#x20;                              │

&#x20;                              ▼

&#x20;                   ┌──────────────────────┐

&#x20;                   │    FastAPI Backend   │

&#x20;                   │      REST APIs       │

&#x20;                   └──────────┬───────────┘

&#x20;                              │

&#x20;               ┌──────────────┴──────────────┐

&#x20;               ▼                             ▼



&#x20;     ┌─────────────────┐          ┌─────────────────┐

&#x20;     │   PostgreSQL    │          │  ML Risk Engine │

&#x20;     │    Database     │          │                 │

&#x20;     └─────────────────┘          ├─────────────────┤

&#x20;                                  │ CatBoost Model  │

&#x20;                                  │ IsolationForest │

&#x20;                                  └─────────────────┘

&#x20;                                            │

&#x20;                                            ▼



&#x20;                             Risk Intelligence \& Insights

```



\---



\## 🚀 Core Features



\### 📊 Risk Intelligence Dashboard



Provides enterprise-wide visibility into procurement risk exposure.



Features:



\- Risk Trend Analysis

\- Review Portfolio Distribution

\- Investigation Tracking

\- Compliance Health Monitoring

\- Critical Invoice Monitoring

\- Risk Driver Analysis



\---



\### 🤖 Machine Learning Risk Engine



AuditIQ utilizes a dual-model architecture to evaluate procurement transactions.



\#### CatBoost Risk Classifier



Generates transaction-level risk scores using supplier, invoice, procurement, and behavioral attributes.



Outputs:



\- Risk Probability

\- Risk Score

\- Audit Review Tier

\- Investigation Priority



\---



\#### Isolation Forest Anomaly Detection



Identifies unusual transaction behavior that deviates from expected procurement patterns.



Detects:



\- Anomalous supplier activity

\- Unusual transaction values

\- Suspicious behavioral patterns

\- Emerging risk signals



\---



\### 🔍 Investigation Workspace



Critical transactions are automatically surfaced for review.



Investigators can:



\- Identify high-risk invoices

\- Analyze anomaly indicators

\- Review supplier risk metrics

\- Understand risk drivers

\- Prioritize investigation efforts



\---



\### 🏢 Compliance Monitoring



Provides continuous oversight of procurement controls and governance metrics.



Tracks:



\- Policy Exceptions

\- Control Failures

\- High-Risk Suppliers

\- Compliance Review Tiers

\- Governance Health Indicators



\---



\## 📈 Dashboard Modules



| Module | Purpose |

|----------|----------|

| Risk Trend | Monitor movement across audit review tiers |

| Investigation Split | Immediate vs Standard investigations |

| Review Portfolio | Risk distribution analysis |

| Risk Drivers | Top predictive indicators |

| Critical Invoice Monitor | Highest-risk transactions |

| Compliance Health | Governance monitoring |

| Compliance Control View | Control effectiveness assessment |

| Audit Intelligence Summary | Executive risk overview |



\---



\## 🧠 Risk Signals Evaluated



AuditIQ evaluates numerous indicators when generating risk assessments.



Examples include:



\- Supplier Risk Score

\- Supplier Age

\- Invoice Amount Z-Score

\- Duplicate Invoice Detection

\- Split Invoice Detection

\- Late-Night Submission Activity

\- Budget Impact Ratio

\- Supplier Invoice Patterns

\- Procurement Control Exceptions

\- Historical Behavioral Trends



These features collectively contribute to risk classification and investigation prioritization.



\---



\## 🔌 REST API



AuditIQ exposes production-style REST APIs for dashboard analytics and risk scoring.



\### Available Endpoints



| Method | Endpoint | Description |

|----------|----------|----------|

| GET | `/risk-summary` | Dashboard risk metrics |

| GET | `/investigation-summary` | Investigation statistics |

| GET | `/critical-invoices` | High-risk invoice queue |

| GET | `/invoice/{invoice\_id}` | Detailed invoice information |

| POST | `/score-invoice` | Invoice risk prediction |



\---



\### Example Prediction Response



```json

{

&#x20; "risk\_probability": 0.8257,

&#x20; "risk\_score": 82.57,

&#x20; "audit\_review\_tier": "Enhanced Review",

&#x20; "investigation\_priority": "Standard Monitoring",

&#x20; "audit\_observation": "Invoice splitting behaviour detected; Out-of-hours submission detected",

&#x20; "audit\_recommendation": "Enhanced monitoring and transaction validation recommended."

}

```



\---



\## ⚙️ Technology Stack



\### Frontend



\- React.js

\- Axios

\- Recharts

\- CSS3



\### Backend



\- FastAPI

\- SQLAlchemy

\- Uvicorn



\### Database



\- PostgreSQL



\### Machine Learning



\- CatBoost

\- Isolation Forest

\- Scikit-Learn

\- Pandas

\- NumPy



\### Development Tools



\- Swagger UI

\- Git

\- GitHub



\---



\## 📷 Dashboard Preview



\### Executive Risk Dashboard



> Dashboard screenshots and workflow demonstrations will be added soon.



Features currently implemented:



\- Live KPI Metrics

\- Risk Trend Visualization

\- Investigation Distribution

\- Compliance Monitoring

\- Critical Invoice Queue

\- Backend Integration

\- Real-Time API Connectivity



\---



\## 🗺️ Project Roadmap



\### Completed



\- \[x] Risk Intelligence Dashboard

\- \[x] FastAPI Backend

\- \[x] PostgreSQL Integration

\- \[x] CatBoost Risk Scoring Engine

\- \[x] Isolation Forest Anomaly Detection

\- \[x] Compliance Monitoring Dashboard

\- \[x] Critical Invoice Monitoring

\- \[x] Invoice Investigation API

\- \[x] Real-Time Frontend Integration

\- \[x] Swagger Documentation



\### In Progress



\- \[ ] Invoice Investigation Drawer

\- \[ ] Interactive Invoice Search

\- \[ ] Loading \& Error States

\- \[ ] Export Audit Reports



\### Planned



\- \[ ] Audit Workflow Automation

\- \[ ] AuditIQ Copilot

\- \[ ] Agentic Investigation Assistant

\- \[ ] Cloud Deployment

\- \[ ] Role-Based Access Controls



\---



\## 🎯 Future Vision



The long-term vision for AuditIQ is to evolve from a risk analytics dashboard into a fully agentic audit intelligence platform capable of:



\- Explaining risk assessments

\- Generating audit summaries

\- Recommending investigation actions

\- Answering compliance questions

\- Producing audit-ready documentation



\---



\## 👩‍💻 Built By



\### Pralisha Tripathy



AI \& ML Engineer focused on building intelligent systems that combine machine learning, data engineering, compliance analytics, audit intelligence, and agentic AI.



Passionate about creating technology that transforms complex data into meaningful decisions.



\---



<div align="center">



\### 🛡️ AuditIQ



\*Turning procurement data into actionable audit intelligence.\*



</div>

