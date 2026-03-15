# 💰 Personal Finance Dashboard

A full-stack expense tracking application built with **React + TypeScript** frontend and **Flask REST API** backed by **PostgreSQL**, featuring dynamic querying, interactive Recharts visualizations, and sub-200ms response times.

![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?style=flat&logo=flask&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-232F3E?style=flat&logo=amazonaws&logoColor=white)

## Features

- **Dashboard view** — summary cards (income, expenses, balance, count) + Recharts pie and bar charts
- **Transaction management** — add, filter, and delete transactions with sub-200ms response times
- **Dynamic querying** — filter by category, type, and date range across 1,000+ records
- **REST API** — Flask backend with full CRUD, summary aggregation, and category endpoints
- **Responsive UI** — clean, minimal design works on desktop and mobile

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, Recharts, Axios |
| Backend | Flask, SQLAlchemy, Flask-CORS |
| Database | PostgreSQL (SQLite for local dev) |
| Deployment | AWS (frontend), Gunicorn (backend) |

## Getting Started

### Backend
```bash
cd backend
pip install -r requirements.txt
python app.py
# API running at http://localhost:5000
```

### Frontend
```bash
cd frontend
npm install
npm start
# App running at http://localhost:3000
```

### Load Demo Data
```bash
curl -X POST http://localhost:5000/api/seed
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/transactions` | List transactions (supports filters) |
| POST | `/api/transactions` | Add a transaction |
| DELETE | `/api/transactions/:id` | Delete a transaction |
| GET | `/api/summary` | Aggregated income/expense summary |
| GET | `/api/categories` | List all categories |
| POST | `/api/seed` | Load demo data |

## Project Structure

```
finance-dashboard/
├── backend/
│   ├── app.py           # Flask app, models, routes
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── components/  # SummaryCards, Charts, TransactionForm, TransactionTable
    │   ├── types/       # TypeScript interfaces
    │   ├── utils/       # API client (axios)
    │   └── App.tsx
    └── package.json
```

## Author

**Rakshith Sriraman Krishnaraj** · [LinkedIn](https://www.linkedin.com/in/rakshith-s-k-95b550151/) · [Google Scholar](https://scholar.google.com/citations?user=ErVb3bEAAAAJ&hl=en)