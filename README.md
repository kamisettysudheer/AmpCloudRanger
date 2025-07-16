# 🌩️ AmpCloudRanger

AmpCloudRanger is a powerful open-source cloud telemetry, billing analytics, and alerting platform designed to help developers and organizations monitor and optimize their cloud usage (starting with AWS).

It combines cost tracking, resource-level insights, customizable dashboards, and alerting — all under a beautiful and blazing-fast interface.

---

## 🚀 Features

### 📊 Dashboard

* Total cloud spend, forecast, and alerts
* CPU, memory, network usage charts
* Cost breakdown by service, region, tag, etc.

### 💰 Billing Cost Explorer

* Analyze AWS costs over time
* Group by Service, Region, Tag, Linked Account
* Visualize historical trends & forecasted spending

### 🛠️ Telemetry & Metrics

* Pull metrics from AWS CloudWatch
* Visualize EC2, RDS, Lambda resource usage
* Aggregate across services with flexible filters

### 🚨 Alerts Engine

* Define alert rules (e.g. CPU > 80% for 10 mins)
* View active/resolved alerts
* Mute, acknowledge, or export notifications

### 📥 Report & Receipt Generator

* Upload your invoice template (Excel or PDF)
* Auto-generate receipts based on collected data
* Supports default and custom templates

### 📈 Telemetry Visualizer

* Advanced data visualizations like Datadog/Grafana
* Live telemetry dashboards using Recharts/React

---

## 🧱 Architecture Overview

* 🧠 Backend: Go + Gin + AWS SDK + PostgreSQL/TimescaleDB
* 💻 Frontend: React + Vite + Tailwind + Recharts
* ☁️ AWS: Cost Explorer API + CloudWatch + S3 (optional CUR)
* ⚙️ DevOps: Docker + GitHub Actions + Terraform + Kubernetes (optional)

---

## 🔧 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/ampcloudranger.git
cd ampcloudranger
```

### 2. Set Up Backend

```bash
cd backend
go mod tidy
go run main.go
```

Set your AWS credentials in environment variables or \~/.aws/credentials.

### 3. Set Up Frontend

```bash
cd frontend
npm install
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173)

---

## 🔐 Required AWS IAM Permissions

```json
"ce:GetCostAndUsage",
"ce:GetDimensionValues",
"ce:GetTags",
"cloudwatch:GetMetricData",
"cloudwatch:ListMetrics"
```

---

## 🧪 Sample Queries

### Get cost by service (Cost Explorer API):

```json
GroupBy: [ { Type: "DIMENSION", Key: "SERVICE" } ]
```

### Get CPU usage from CloudWatch (Go SDK):

```go
MetricName: "CPUUtilization"
Namespace: "AWS/EC2"
```

---

## 📦 Optional Integrations

* AWS CUR + Athena (for detailed billing via SQL)
* Alert webhook notifications (Slack, Email)
* Excel/PDF export using uploaded user templates

---

## 🤝 Team

Built with ❤️ by:

* Sudheer (Infra, Backend, Cost Analytics)
* Akash (Frontend, UX, Visualization)

---

## 📄 License

MIT License. Feel free to fork, extend, and customize.

---

## ⭐️ Star this repo if you like it!

Let's build the next-generation cloud insight platform together. 🌩️
