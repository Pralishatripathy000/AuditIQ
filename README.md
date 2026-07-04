<img width="1983" height="793" alt="9bce7f46-839c-4366-9c9f-6f2a70d56c65" src="https://github.com/user-attachments/assets/1b6ab32a-c859-430c-bcd0-82e6eb09877e" />


# 🛡️ AuditIQ

### AI-Powered Audit & Compliance Intelligence Platform

Transforming procurement transactions into actionable risk intelligence through machine learning, anomaly detection, compliance monitoring, and investigation prioritization.

<br>

![React](https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?style=for-the-badge)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?style=for-the-badge)
![CatBoost](https://img.shields.io/badge/CatBoost-Risk_Engine-FFCC00?style=for-the-badge)
![Scikit-Learn](https://img.shields.io/badge/Isolation_Forest-Anomaly_Detection-F7931E?style=for-the-badge)

</div>

---

## 📌 Overview

Modern organizations process thousands of procurement transactions every day. Among these transactions lie policy violations, control failures, anomalous supplier activity, duplicate invoices, and potential fraud indicators that are often difficult to identify through traditional audit procedures.

AuditIQ is an end-to-end Audit Intelligence Platform designed to assist audit, risk, finance, and compliance teams in proactively identifying high-risk procurement transactions before they evolve into costly control failures.

By combining machine learning, anomaly detection, compliance analytics, and interactive investigation workflows, AuditIQ transforms raw procurement data into explainable and actionable audit intelligence.

The platform enables organizations to:

- Prioritize investigations based on risk
- Detect anomalous procurement behavior
- Monitor compliance health
- Surface high-risk suppliers
- Improve audit efficiency through AI-assisted analysis

---

## 🎯 The Problem

Traditional audit processes often depend on:

- Manual sampling
- Rule-based reviews
- Reactive investigations
- Limited visibility into transaction-level risk
- Time-consuming compliance assessments

As transaction volumes increase, identifying genuinely risky activities becomes increasingly challenging.

This creates a need for an intelligent system capable of continuously monitoring procurement activity and directing auditor attention toward transactions that matter most.

---

## 💡 The Solution

AuditIQ introduces a data-driven audit intelligence framework that combines predictive analytics and anomaly detection to assess procurement risk in real time.

Instead of reviewing transactions uniformly, AuditIQ prioritizes them according to their risk profile, allowing audit teams to focus on the highest-value investigations.

Key capabilities include:

✅ Risk Scoring

✅ Anomaly Detection

✅ Compliance Monitoring

✅ Investigation Prioritization

✅ Audit Intelligence Dashboards

✅ Explainable Risk Signals

---

## 🏗️ System Architecture

```text
                    ┌──────────────────────┐
                    │    React Frontend    │
                    │   Audit Dashboard    │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │    FastAPI Backend   │
                    │      REST APIs       │
                    └──────────┬───────────┘
                               │
                ┌──────────────┴──────────────┐
                ▼                             ▼

      ┌─────────────────┐          ┌─────────────────┐
      │   PostgreSQL    │          │  ML Risk Engine │
      │    Database     │          │                 │
      └─────────────────┘          ├─────────────────┤
                                   │ CatBoost Model  │
                                   │ IsolationForest │
                                   └─────────────────┘
                                             │
                                             ▼

                              Risk Intelligence & Insights
```
## 📂 Repository Structure

```text
AuditIQ/
│
├── 📁 api/                          # FastAPI backend and ML inference services
│   ├── main.py                      # REST API endpoints and business logic
│   ├── database.py                  # PostgreSQL connection configuration
│   ├── seed_render_db.py            # Utility to seed Render PostgreSQL database
│   ├── requirements.txt             # Backend Python dependencies
│   └── .env                         # Environment variables (local only)
│
├── 📁 frontend/                     # React + Vite frontend application
│   ├── 📁 src/
│   │   ├── App.jsx                  # Root application component
│   │   ├── main.jsx                 # React application entry point
│   │   ├── api.js                   # Axios API configuration
│   │   ├── App.css                  # Dashboard styling
│   │   └── index.css                # Global styles
│   │
│   ├── 📁 public/                   # Static assets
│   ├── package.json                 # Frontend dependencies
│   ├── vite.config.js               # Vite configuration
│   ├── tailwind.config.js           # Tailwind configuration
│   └── postcss.config.js            # PostCSS configuration
│
├── 📁 Data/                         # Raw procurement datasets
│
├── 📁 models/                       # Model development and training resources
│
├── 📁 notebooks/                    # Exploratory analysis and experimentation
│
├── 📁 output/                       # Intermediate generated outputs
│
├── 📁 outputs/                      # Final processed datasets and predictions
│
├── 🤖 catboost_risk_engine.pkl      # Trained CatBoost risk prediction model
├── 🤖 isolation_forest_engine.pkl   # Trained Isolation Forest anomaly detector
│
├── 🎥 AUDITIQ DEMO.mp4              # Product demonstration video
│
├── package.json                     # Root project configuration
├── package-lock.json                # Dependency lock file
├── .gitignore                       # Git ignore rules
└── README.md                        # Project documentation
```

### Repository Organization

The project follows a modular full-stack architecture where the **React frontend**, **FastAPI backend**, **machine learning models**, and **PostgreSQL database** are cleanly separated. This structure enables independent development, testing, deployment, and future scalability while maintaining a production-ready codebase.
---

## 🚀 Core Features

### 📊 Risk Intelligence Dashboard

Provides enterprise-wide visibility into procurement risk exposure.

Features:

- Risk Trend Analysis
- Review Portfolio Distribution
- Investigation Tracking
- Compliance Health Monitoring
- Critical Invoice Monitoring
- Risk Driver Analysis

---

### 🤖 Machine Learning Risk Engine

AuditIQ utilizes a dual-model architecture to evaluate procurement transactions.

#### CatBoost Risk Classifier

Generates transaction-level risk scores using supplier, invoice, procurement, and behavioral attributes.

Outputs:

- Risk Probability
- Risk Score
- Audit Review Tier
- Investigation Priority

---

#### Isolation Forest Anomaly Detection

Identifies unusual transaction behavior that deviates from expected procurement patterns.

Detects:

- Anomalous supplier activity
- Unusual transaction values
- Suspicious behavioral patterns
- Emerging risk signals

---

### 🔍 Investigation Workspace

Critical transactions are automatically surfaced for review.

Investigators can:

- Identify high-risk invoices
- Analyze anomaly indicators
- Review supplier risk metrics
- Understand risk drivers
- Prioritize investigation efforts

---

### 🏢 Compliance Monitoring

Provides continuous oversight of procurement controls and governance metrics.

Tracks:

- Policy Exceptions
- Control Failures
- High-Risk Suppliers
- Compliance Review Tiers
- Governance Health Indicators

---

## 📈 Dashboard Modules

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

---

## 🧠 Risk Signals Evaluated

AuditIQ evaluates numerous indicators when generating risk assessments.

Examples include:

- Supplier Risk Score
- Supplier Age
- Invoice Amount Z-Score
- Duplicate Invoice Detection
- Split Invoice Detection
- Late-Night Submission Activity
- Budget Impact Ratio
- Supplier Invoice Patterns
- Procurement Control Exceptions
- Historical Behavioral Trends

These features collectively contribute to risk classification and investigation prioritization.

---

## 🔌 REST API

AuditIQ exposes production-style REST APIs for dashboard analytics and risk scoring.

### Available Endpoints

| Method | Endpoint | Description |
|----------|----------|----------|
| GET | `/risk-summary` | Dashboard risk metrics |
| GET | `/investigation-summary` | Investigation statistics |
| GET | `/critical-invoices` | High-risk invoice queue |
| GET | `/invoice/{invoice_id}` | Detailed invoice information |
| POST | `/score-invoice` | Invoice risk prediction |

---

### Example Prediction Response

```json
{
  "risk_probability": 0.8257,
  "risk_score": 82.57,
  "audit_review_tier": "Enhanced Review",
  "investigation_priority": "Standard Monitoring",
  "audit_observation": "Invoice splitting behaviour detected; Out-of-hours submission detected",
  "audit_recommendation": "Enhanced monitoring and transaction validation recommended."
}
```

---

## ⚙️ Technology Stack

### Frontend

- React.js
- Axios
- Recharts
- CSS3

### Backend

- FastAPI
- SQLAlchemy
- Uvicorn

### Database

- PostgreSQL

### Machine Learning

- CatBoost
- Isolation Forest
- Scikit-Learn
- Pandas
- NumPy

### Development Tools

- Swagger UI
- Git
- GitHub

---

## 📷 Dashboard Preview

### Executive Risk Dashboard

<img width="1892" height="666" alt="Screenshot 2026-07-03 223824" src="https://github.com/user-attachments/assets/008eaba8-627d-440e-90ea-df0fe18d5559" />
<img width="1901" height="577" alt="Screenshot 2026-07-03 224015" src="https://github.com/user-attachments/assets/6dfc6689-b2a4-446d-a5ed-27c42ce0eedc" />
<img width="1857" height="557" alt="Screenshot 2026-07-03 224040" src="https://github.com/user-attachments/assets/51dab27e-1b65-4846-bc20-dbc50e7123ac" />

<img width="1882" height="605" alt="Screenshot 2026-07-03 224120" src="https://github.com/user-attachments/assets/75fdeb67-b36f-4285-8cb1-18aa5357f6d4" />
<img width="1892" height="695" alt="Screenshot 2026-07-03 224101" src="https://github.com/user-attachments/assets/9822aa84-ebdb-4e3a-8738-f0a845f8b102" />
<img width="1892" height="490" alt="Screenshot 2026-07-03 224141" src="https://github.com/user-attachments/assets/d2ab52be-cf79-4052-8184-143b1356d43b" />


Features currently implemented:

- Live KPI Metrics
- Risk Trend Visualization
- Investigation Distribution
- Compliance Monitoring
- Critical Invoice Queue
- Backend Integration
- Real-Time API Connectivity



---

## 🎯 Future Vision

The long-term vision for AuditIQ is to evolve from a risk analytics dashboard into a fully agentic audit intelligence platform capable of:

- Explaining risk assessments
- Generating audit summaries
- Recommending investigation actions
- Answering compliance questions
- Producing audit-ready documentation

---

## 👩‍💻 Built By

### Pralisha Tripathy

AI & ML Engineer focused on building intelligent systems that combine machine learning, data engineering, compliance analytics, audit intelligence, and agentic AI.

Passionate about creating technology that transforms complex data into meaningful decisions.

---

<div align="center">

### 🛡️ AuditIQ

*Turning procurement data into actionable audit intelligence.*

</div>
