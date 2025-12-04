# 🚀 SLA Monitor Platform

https://api.postman.com/collections/36536353-4770161a-2e14-46b8-ac5d-5c168403dd89?access_key=PMAT-01KBN9YP9F2BTWEPTATHK55AQW

> **Enterprise-grade distributed microservice system for real-time API monitoring, SLA compliance tracking, and intelligent alerting.**

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-316192.svg)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [System Requirements](#-system-requirements)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Configuration](#-configuration)
- [API Documentation](#-api-documentation)
- [Monitoring & Alerts](#-monitoring--alerts)
- [Security](#-security)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

**SLA Monitor Platform** is a production-ready microservices-based monitoring system that continuously tracks external API health, measures performance metrics, detects SLA violations, and delivers intelligent alerts through multiple channels.

Built with modern cloud-native patterns, this platform provides real-time visibility into API uptime, latency, and reliability metrics while offering AI-powered predictive insights for proactive incident management.

### **Why This Platform?**

- ✅ **Real-time Monitoring**: Continuous health checks with configurable intervals
- ✅ **SLA Compliance**: Automatic violation detection and reporting
- ✅ **AI-Powered Insights**: Predictive anomaly detection and risk scoring
- ✅ **Multi-Channel Alerts**: Email, Slack, and webhook notifications
- ✅ **Role-Based Access**: Granular permissions (Admin, Developer, Viewer)
- ✅ **Scalable Architecture**: Built for horizontal scaling and high availability

---

## ✨ Features

### **Core Capabilities**

| Feature | Description |
|---------|-------------|
| **API Health Monitoring** | Continuous pinging with latency and uptime tracking |
| **SLA Management** | Define, track, and enforce custom SLA thresholds |
| **Smart Alerting** | Email + Slack notifications with alert deduplication |
| **AI Risk Analysis** | ML-based anomaly detection and trend prediction |
| **Interactive Dashboards** | Real-time charts, graphs, and performance metrics |
| **Audit Logging** | Complete history of all metrics and incidents |
| **Multi-Tenancy** | Isolated workspaces with role-based access control |
| **Config Management** | Centralized configuration with Git-backed versioning |

### **Advanced Features**

- 📊 Historical trend analysis with time-series data
- 🔔 Alert escalation policies
- 📈 Custom metric aggregations (P50, P95, P99)
- 🎯 Incident timeline reconstruction
- 🔄 Auto-healing suggestions
- 📱 Mobile-responsive admin panel

---

## 🏗 Architecture

```
┌─────────────────────────────┐
│      CONFIG SERVER          │
│  (Git-backed configuration) │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│    EUREKA DISCOVERY         │
│  (Service Registry + LB)    │
└──────────────┬──────────────┘
               │
       ┌───────┼───────┐
       ▼       ▼       ▼
┌──────────┐ ┌──────────┐ ┌──────────┐
│   API    │ │   AUTH   │ │ MONITOR  │
│ GATEWAY  │ │ SERVICE  │ │ SERVICE  │
└────┬─────┘ └────┬─────┘ └────┬─────┘
     │            │            │
     └────────────┼────────────┘
                  ▼
          ┌──────────────┐
          │   METRICS    │
          │   SERVICE    │
          │  (SLA + AI)  │
          └──────┬───────┘
                 │
                 ▼
          ┌──────────────┐
          │ NOTIFICATION │
          │   SERVICE    │
          └──────┬───────┘
                 │
                 ▼
          ┌──────────────┐
          │  PostgreSQL  │
          │  (Supabase)  │
          └──────────────┘
                 ▲
                 │
          ┌──────────────┐
          │    React     │
          │   Frontend   │
          └──────────────┘
```

### **System Flow**

1. **Authentication**: User logs in → JWT issued by Auth Service
2. **Monitoring**: Monitor Service pings APIs → collects metrics
3. **Analysis**: Metrics Service evaluates SLA compliance + runs AI analysis
4. **Alerting**: Notification Service sends alerts via Email/Slack
5. **Visualization**: Frontend displays real-time dashboards

---

## 🛠 Tech Stack

### **Backend**
- **Framework**: Spring Boot 3.2, Spring Cloud 2023
- **API Gateway**: Spring Cloud Gateway
- **Service Discovery**: Netflix Eureka
- **Config Management**: Spring Cloud Config Server
- **Security**: Spring Security + JWT
- **Database**: PostgreSQL 15 (Supabase)
- **ORM**: Spring Data JPA + Hibernate
- **Scheduling**: Spring Scheduler
- **HTTP Client**: RestTemplate / WebClient

### **Frontend**
- **Framework**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Charts**: Recharts
- **State Management**: React Query + Context API
- **Routing**: React Router v6
- **HTTP Client**: Axios

### **Infrastructure**
- **Container**: Docker + Docker Compose
- **CI/CD**: GitHub Actions
- **Cloud**: AWS / Azure / GCP ready
- **Monitoring**: Spring Actuator + Prometheus

---

## 💻 System Requirements

### **Development**
- Java 17 or higher
- Node.js 18+ and npm/yarn
- PostgreSQL 15+
- Git
- Docker (optional)

### **Production**
- 4 GB RAM minimum (8 GB recommended)
- 2 CPU cores minimum
- 20 GB disk space
- Linux/Windows/macOS

---

## 🚀 Getting Started

### **1. Clone Repository**

```bash
git clone https://github.com/yourusername/sla-monitor-platform.git
cd sla-monitor-platform
```

### **2. Setup Database**

**Option A: Local PostgreSQL**
```bash
psql -U postgres
CREATE DATABASE sla_monitor;
```

**Option B: Supabase**
1. Sign up at [supabase.com](https://supabase.com)
2. Create new project
3. Copy connection string

### **3. Configure Environment**

**Backend** (`application.yml`):
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/sla_monitor
    username: postgres
    password: your_password
  
jwt:
  secret: your-secret-key-min-256-bits
  expiration: 86400000

notification:
  email:
    enabled: true
    from: alerts@yourcompany.com
  slack:
    enabled: true
    webhook-url: https://hooks.slack.com/services/YOUR/WEBHOOK/URL
```

**Frontend** (`.env`):
```bash
REACT_APP_API_URL=http://localhost:8080
REACT_APP_ENV=development
```

### **4. Start Services**

**Backend Services** (run in separate terminals):

```bash
# Config Server
cd config-server
./mvnw spring-boot:run

# Eureka Discovery
cd eureka-server
./mvnw spring-boot:run

# API Gateway
cd api-gateway
./mvnw spring-boot:run

# Auth Service
cd auth-service
./mvnw spring-boot:run

# Monitor Service
cd monitor-service
./mvnw spring-boot:run

# Metrics Service
cd metrics-service
./mvnw spring-boot:run

# Notification Service
cd notification-service
./mvnw spring-boot:run
```

**Frontend**:
```bash
cd frontend
npm install
npm start
```

### **5. Access Application**

- **Frontend**: http://localhost:3000
- **API Gateway**: http://localhost:8080
- **Eureka Dashboard**: http://localhost:8761

**Default Credentials**:
- Username: `admin@sla.com`
- Password: `admin123`

---

## 📁 Project Structure

```
sla-monitor-platform/
├── config-server/              # Centralized config management
├── eureka-server/              # Service discovery
├── api-gateway/                # API gateway + routing
├── auth-service/               # Authentication + authorization
├── monitor-service/            # API health monitoring
├── metrics-service/            # SLA evaluation + AI analysis
├── notification-service/       # Email + Slack alerts
├── frontend/                   # React dashboard
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/             # Dashboard pages
│   │   ├── services/          # API integration
│   │   └── utils/             # Helper functions
├── config-repo/                # Git-backed configs
├── docker-compose.yml          # Container orchestration
└── README.md
```

---

## ⚙ Configuration

### **Monitor Service Settings**

```yaml
monitor:
  interval: 60000              # Check interval (ms)
  timeout: 5000                # Request timeout (ms)
  retry:
    enabled: true
    max-attempts: 3
```

### **SLA Thresholds**

```yaml
sla:
  uptime:
    critical: 99.9             # % uptime
    warning: 99.5
  latency:
    critical: 2000             # milliseconds
    warning: 1000
```

### **AI Analysis**

```yaml
ai:
  enabled: true
  window-size: 100             # Number of metrics to analyze
  risk-threshold: 0.75         # Confidence threshold
```

---

## 📡 API Documentation

### **Authentication**

**Login**
```http
POST /auth/login
Content-Type: application/json

{
  "username": "admin@sla.com",
  "password": "admin123"
}
```

**Response**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "username": "admin@sla.com",
    "role": "ADMIN"
  }
}
```

### **API Management**

**Add API**
```http
POST /api/monitors
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Payment Gateway",
  "url": "https://api.payment.com/health",
  "method": "GET",
  "interval": 60000,
  "sla": {
    "uptime": 99.9,
    "latency": 1000
  }
}
```

**Get Metrics**
```http
GET /api/metrics/{apiId}?from=2025-01-01&to=2025-01-31
Authorization: Bearer {token}
```

---

## 🔔 Monitoring & Alerts

### **Alert Types**

| Type | Trigger | Channel |
|------|---------|---------|
| **SLA Violation** | Uptime < threshold | Email + Slack |
| **High Latency** | Response time > threshold | Email |
| **API Down** | Status code ≥ 500 | Email + Slack (urgent) |
| **AI Risk Alert** | Predicted failure | Slack |

### **Alert Example**

```
🚨 SLA VIOLATION DETECTED

API: Payment Gateway
Status: DOWN (503 Service Unavailable)
Uptime: 98.2% (threshold: 99.9%)
Last Check: 2025-01-20 10:30:00 UTC

Action Required: Investigate immediately
Dashboard: https://sla.yourcompany.com/api/123
```

---

## 🔒 Security

- ✅ JWT-based authentication with secure token signing
- ✅ Role-based access control (ADMIN, DEV, VIEWER)
- ✅ Password hashing with BCrypt
- ✅ CORS configuration for frontend
- ✅ Rate limiting on API Gateway
- ✅ SQL injection prevention via JPA
- ✅ XSS protection headers

---

## 🚢 Deployment

### **Docker Deployment**

```bash
docker-compose up -d
```

### **Kubernetes Deployment**

```bash
kubectl apply -f k8s/
```

### **Cloud Deployment**

**AWS EC2 / ECS**:
1. Build Docker images
2. Push to ECR
3. Deploy via ECS Fargate

**Azure App Service**:
1. Package as JAR
2. Deploy via Azure CLI

**Google Cloud Run**:
1. Build containers
2. Deploy via gcloud CLI

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 📄 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

---

## 📞 Support

- 📧 Email: support@yourcompany.com
- 💬 Slack: [Join our community](https://slack.yourcompany.com)
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/sla-monitor-platform/issues)

---

## 🙏 Acknowledgments

- Spring Cloud team for excellent microservice tools
- Supabase for managed PostgreSQL
- React and Tailwind CSS communities

---

**Made with ❤️ by [Your Name/Team]**

⭐ **Star this repo if you find it useful!**
