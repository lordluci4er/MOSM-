# 🏗 MOSM Backend Architecture

**Project:** Medical Store Management System (MOSM)

**Architecture Version:** 1.0

**Status:** Frozen

---

# Overview

MOSM Backend follows a **Feature-Based Layered Architecture**.

The primary goal is:

- Simple
- Scalable
- Maintainable
- Production Ready

Business logic is completely separated from HTTP handling and database operations.

---

# High Level Architecture

```text
Flutter App
      │
      │ HTTP REST API
      ▼
Express Routes
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

Every request follows the same path.

---

# Request Flow

```text
Client Request

↓

Express Router

↓

Authentication Middleware

↓

Validation Middleware

↓

Controller

↓

Service

↓

Repository

↓

MongoDB

↓

Repository

↓

Service

↓

Controller

↓

JSON Response
```

---

# Layer Responsibilities

## Routes

Responsible for:

- API endpoint registration
- Applying middleware
- Connecting controller methods

Routes never contain business logic.

Example

```text
POST /medicines

↓

medicine.controller.createMedicine()
```

---

## Controllers

Controllers are responsible for:

- Reading request data
- Calling services
- Returning API responses

Controllers never access MongoDB directly.

Example

```text
Request

↓

Service

↓

Response
```

---

## Services

The Service Layer contains all business logic.

Examples

- Duplicate medicine check
- Duplicate party check
- One pending order rule
- Profile completion
- Receive order workflow

Services never return HTTP responses.

---

## Repositories

Repositories communicate with MongoDB.

Responsibilities

- Queries
- Create
- Update
- Pagination
- Search

Repositories never contain business rules.

---

## Models

Models define MongoDB collections.

Each module owns its own model.

Example

```text
Medicine

Party

Order

Profile
```

---

# Folder Structure

```text
src/

├── modules/

│   ├── auth/

│   ├── profile/

│   ├── medicines/

│   ├── parties/

│   └── orders/

│

├── routes/

├── shared/

└── server/
```

---

# Feature Module Structure

Every feature follows the same layout.

```text
module/

controllers/

models/

repositories/

routes/

services/

validations/
```

Benefits

- Easy navigation

- Consistent architecture

- Independent modules

---

# Shared Folder

The shared folder contains reusable components.

```text
shared/

config/

constants/

errors/

middleware/

responses/

utils/

logger/
```

---

## Config

Contains

- MongoDB
- Firebase
- Environment

---

## Middleware

Contains

Authentication Middleware

Validation Middleware

Global Error Middleware

---

## Responses

Standard API response helper.

Every API returns the same structure.

---

## Errors

Custom ApiError implementation.

Used throughout the project.

---

## Constants

Application-wide constants.

Examples

HTTP Status

Messages

Future

Order Status

Medicine Status

---

## Utils

Shared helper functions.

Example

Async Handler

---

# Authentication Flow

```text
Client Login

↓

Firebase Authentication

↓

Firebase Token

↓

Authorization Header

↓

Backend

↓

Firebase Admin Verify

↓

Decoded User

↓

Database Profile

↓

req.user

↓

Protected Controller
```

---

# User Data Isolation

Every business collection stores

```text
firebaseUid
```

Every database query filters by

```text
firebaseUid
```

Example

```javascript
{
    firebaseUid,
    isDeleted: false
}
```

This prevents users from accessing each other's data.

---

# Database Collections

Current collections

```text
profiles

medicines

parties

orders
```

Each module owns exactly one collection.

---

# Business Rules

## Medicine

Unique per user

Uppercase

Soft Delete

---

## Party

Unique per user

Soft Delete

Cannot delete when active orders exist

---

## Orders

One medicine

↓

One Pending Order

Received order is final

Workflow

```text
Medicine

↓

Order Created

↓

Pending

↓

Received
```

---

# Error Handling

All errors follow a common structure.

```json
{
    "success": false,
    "message": "Error message",
    "errors": []
}
```

Global Error Middleware handles all exceptions.

---

# Response Format

Every successful response

```json
{
    "success": true,
    "message": "...",
    "data": {}
}
```

---

# Validation Flow

```text
Request

↓

express-validator

↓

Validation Middleware

↓

Controller
```

Invalid requests never reach the Service Layer.

---

# Soft Delete Strategy

Business data is never permanently removed.

Instead

```text
isDeleted = true
```

Benefits

- Data recovery

- History

- Safe operations

---

# Security

Implemented

✅ Firebase Authentication

✅ Bearer Token

✅ User Data Isolation

✅ Input Validation

✅ Soft Delete

Future

Role Based Access

Audit Logs

---

# Performance

Optimizations

MongoDB Indexes

Pagination

Search

Minimal Database Queries

Lean Controllers

---

# Scalability

Architecture supports

- Additional Modules
- Offline Sync
- Notifications
- Inventory
- Billing
- Reports
- Multi-user

without major redesign.

---

# Design Principles

The backend follows these principles.

- Separation of Concerns

- Single Responsibility Principle

- Feature-Based Organization

- Layered Architecture

- Shared Utilities

- Reusable Components

- Business Logic inside Services

- Thin Controllers

- Secure Database Access

---

# Future Improvements

Planned after V1

- Shared Pagination Helper

- Status Constants

- Centralized Query Builder

- Audit Logging

- API Documentation Generator

- Unit Testing

---

# Conclusion

MOSM Backend Architecture is designed to remain simple during V1 while providing a solid foundation for future versions.

The architecture prioritizes:

- Maintainability
- Security
- Performance
- Scalability
- Consistency