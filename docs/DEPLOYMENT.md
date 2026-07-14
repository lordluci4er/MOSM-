# 🚀 MOSM Backend Deployment Guide

**Project:** Medical Store Management System (MOSM)

**Version:** 1.0

**Status:** Production Ready

---

# Overview

This guide explains how to deploy the MOSM Backend in both development and production environments.

Supported platforms:

- Local Machine
- Windows
- Linux
- VPS
- Cloud VM

---

# Prerequisites

Before deployment ensure the following are installed.

| Software | Version |
|-----------|----------|
| Node.js | 20+ |
| MongoDB Atlas | Latest |
| Git | Latest |
| npm | Latest |

---

# Clone Repository

```bash
git clone <repository-url>

cd mosm-backend
```

---

# Install Dependencies

```bash
npm install
```

---

# Environment Variables

Create

```
.env
```

Example

```env
PORT=5000

MONGODB_URI=mongodb+srv://...

FIREBASE_PROJECT_ID=your-project-id
```

---

# Firebase Admin SDK

Download

```
serviceAccountKey.json
```

Move file

```text
src/shared/config/credentials/
```

Final structure

```text
src/

shared/

config/

credentials/

serviceAccountKey.json
```

---

# Install Dependencies

Development

```bash
npm install
```

---

# Start Development Server

```bash
npm run dev
```

Expected

```text
🔥 Firebase Admin Initialized

✅ MongoDB Connected

🚀 Server running on port 5000
```

---

# Production

Start server

```bash
npm start
```

---

# Verify API

Open

```
GET

http://localhost:5000/api/v1/auth/me
```

Expected

```
401 Unauthorized
```

This confirms the API is running.

---

# MongoDB

Recommended

MongoDB Atlas

Connection String

```env
MONGODB_URI=mongodb+srv://...
```

---

# Required Collections

MongoDB automatically creates

```
profiles

medicines

parties

orders
```

---

# Security Checklist

Before production

✅ Firebase Authentication

✅ MongoDB Atlas IP Whitelist

✅ Environment Variables

✅ HTTPS

✅ Strong MongoDB Password

✅ Never Commit .env

✅ Never Commit serviceAccountKey.json

---

# .gitignore

Must contain

```text
node_modules/

.env

src/shared/config/credentials/serviceAccountKey.json
```

---

# Production Checklist

Authentication

- Firebase configured

Database

- MongoDB Atlas connected

Environment

- .env created

Security

- Secrets excluded from Git

API

- All endpoints tested

Logging

- Winston enabled

---

# Health Check

Server

```http
GET /
```

Example Response

```json
{
    "success": true,
    "message": "MOSM Backend Running"
}
```

---

# Common Issues

## MongoDB Connection Error

Check

- Internet connection
- MongoDB URI
- Atlas whitelist

---

## Firebase Error

Check

- Project ID
- serviceAccountKey.json
- Credentials path

---

## Port Already In Use

Windows

```bash
netstat -ano
```

Kill process

```bash
taskkill /PID <PID> /F
```

---

# Deployment Commands

Development

```bash
npm run dev
```

Production

```bash
npm start
```

---

# Future Deployment

Planned

- Docker
- PM2
- Nginx Reverse Proxy
- CI/CD
- GitHub Actions
- Render
- Railway
- AWS EC2

---

# Backup Strategy

MongoDB Atlas

- Automated Backups
- Point-in-Time Recovery

Firebase

- Authentication Recovery

---

# Monitoring

Recommended

- Winston Logs
- MongoDB Atlas Monitoring
- Server Resource Monitoring

---

# Release Checklist

Before every release

- All APIs tested
- Environment verified
- Documentation updated
- MongoDB indexes verified
- Security audit completed
- Version updated
- Changelog updated

---

# Deployment Complete

If all steps above are completed successfully, the MOSM Backend is ready for production use.