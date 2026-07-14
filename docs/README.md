# 🏥 MOSM Backend

**Medical Store Management System (MOSM)**

A production-ready REST API backend for managing medicine purchase workflows for medical stores.

---

# 📌 Overview

MOSM (Medical Store Management System) is designed to replace traditional pen-and-paper medicine ordering with a fast, reliable, and swipe-based digital workflow.

The backend is built using **Node.js**, **Express.js**, **MongoDB**, and **Firebase Authentication**, following a clean layered architecture.

---

# 🎯 Project Goal

Provide medical store owners with a simple workflow for:

- Managing medicines
- Managing suppliers (Parties)
- Creating medicine orders
- Tracking pending and received orders
- Maintaining secure user-specific data

---

# 🚀 Features

## Authentication

- Firebase Google Authentication
- Bearer Token Authentication
- Secure Firebase Token Verification

---

## Profile

- Store profile setup
- Profile update
- Profile retrieval

---

## Medicines

- Create medicine
- Update medicine
- Search medicines
- Soft delete
- Duplicate prevention

---

## Parties

- Create supplier
- Update supplier
- Search suppliers
- Soft delete
- Duplicate prevention

---

## Orders

- Create order
- Receive order
- Return order
- Filter by status
- Filter by party
- Pagination

---

# 🛠 Technology Stack

| Layer | Technology |
|--------|------------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB Atlas |
| ODM | Mongoose |
| Authentication | Firebase Admin SDK |
| Validation | Express Validator |
| Logging | Winston |
| Environment | dotenv |

---

# 📂 Project Structure

```text
mosm-backend/
│
├── docs/
│
├── src/
│   ├── modules/
│   │   ├── auth/
│   │   ├── profile/
│   │   ├── medicines/
│   │   ├── parties/
│   │   └── orders/
│   │
│   ├── routes/
│   ├── server/
│   └── shared/
│
├── .env
├── package.json
└── server.js
```

---

# 🏗 Architecture

The project follows a **Layered Architecture**.

```text
Client
    │
    ▼
Routes
    │
    ▼
Controllers
    │
    ▼
Services
    │
    ▼
Repositories
    │
    ▼
MongoDB
```

Each layer has a single responsibility.

| Layer | Responsibility |
|--------|----------------|
| Routes | API Endpoints |
| Controllers | Request / Response |
| Services | Business Logic |
| Repositories | Database Operations |
| Models | MongoDB Schema |

---

# 🔒 Authentication

Authentication is handled using Firebase.

Every protected request requires:

```http
Authorization: Bearer <Firebase ID Token>
```

The backend verifies the Firebase token before processing the request.

---

# 📦 Installation

Clone the repository

```bash
git clone <repository-url>
```

Move inside project

```bash
cd mosm-backend
```

Install dependencies

```bash
npm install
```

---

# ⚙ Environment Variables

Create a `.env` file.

```env
PORT=5000

MONGODB_URI=

FIREBASE_PROJECT_ID=
```

Place your Firebase service account file in:

```text
src/shared/config/credentials/
```

---

# ▶ Running the Project

Development

```bash
npm run dev
```

Production

```bash
npm start
```

---

# 📡 Base URL

```text
http://localhost:5000/api/v1
```

---

# 📋 API Modules

| Module | Status |
|----------|--------|
| Authentication | ✅ |
| Profile | ✅ |
| Medicines | ✅ |
| Parties | ✅ |
| Orders | ✅ |

---

# 📊 Response Format

## Success

```json
{
    "success": true,
    "message": "Success message",
    "data": {}
}
```

---

## Error

```json
{
    "success": false,
    "message": "Error message",
    "errors": []
}
```

---

# 🔐 Security

- Firebase Authentication
- User Data Isolation
- Protected APIs
- Input Validation
- Soft Delete
- Layered Architecture

---

# 📈 Scalability

Current design supports:

- 5,000+ Medicines
- 500+ Parties
- 20,000+ Orders

without changing the architecture.

---

# 📚 Documentation

Detailed documentation is available in the `docs/` folder.

- ARCHITECTURE.md
- DATABASE.md
- API.md
- DEPLOYMENT.md
- CHANGELOG.md

---

# 🚀 Development Workflow

```text
Project Setup

↓

Authentication

↓

Profile

↓

Medicines

↓

Parties

↓

Orders

↓

Testing

↓

Deployment
```

---

# 📌 Coding Standards

- camelCase naming
- Feature-based modules
- Layered Architecture
- Global Error Handling
- Shared Response Format
- Business Logic only in Service Layer

---

# 📄 License

This project is developed for the **MOSM (Medical Store Management System)**.

All rights reserved.