# 📡 MOSM REST API Documentation

**Project:** Medical Store Management System (MOSM)

**Version:** 1.0

**API Version:** v1

**Status:** Stable

---

# Base URL

```
http://localhost:5000/api/v1
```

Production

```
https://your-domain.com/api/v1
```

---

# Authentication

All protected APIs require a Firebase ID Token.

Header

```http
Authorization: Bearer <Firebase ID Token>
```

Example

```http
Authorization: Bearer eyJhbGciOiJSUzI1NiIs...
```

---

# Response Format

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

# HTTP Status Codes

| Code | Meaning |
|------|---------|
|200|OK|
|201|Created|
|400|Bad Request|
|401|Unauthorized|
|404|Not Found|
|409|Conflict|
|500|Internal Server Error|

---

# Authentication APIs

---

## Login

Creates the user profile if the user logs in for the first time.

### Endpoint

```http
POST /auth/login
```

### Authentication

Required

```
Bearer Token
```

### Request Body

No body required.

### Success Response

```json
{
    "success": true,
    "message": "Login successful",
    "data": {
        "_id": "...",
        "firebaseUid": "...",
        "email": "user@gmail.com",
        "profileCompleted": false
    }
}
```

### Error Responses

401 Unauthorized

500 Internal Server Error

---

## Get Current User

Returns authenticated Firebase user.

### Endpoint

```http
GET /auth/me
```

### Authentication

Required

### Success Response

```json
{
    "success": true,
    "message": "Authenticated user",
    "data": {
        "uid": "...",
        "email": "user@gmail.com"
    }
}
```

---

# Profile APIs

---

## Get Profile

Returns current user's profile.

### Endpoint

```http
GET /profile
```

### Authentication

Required

### Success Response

```json
{
    "success": true,
    "message": "Profile fetched successfully",
    "data": {
        "_id": "...",
        "medicalName": "ABC MEDICAL",
        "phoneNumber": "9876543210",
        "address": "Delhi",
        "profileCompleted": true
    }
}
```

### Error

401

404

---

## Update Profile

Creates or updates profile information.

### Endpoint

```http
PUT /profile
```

### Authentication

Required

### Request Body

```json
{
    "medicalName": "ABC MEDICAL",
    "phoneNumber": "9876543210",
    "address": "Delhi"
}
```

### Validation

| Field | Required |
|--------|----------|
|medicalName|Yes|
|phoneNumber|Yes|
|address|Yes|

### Success Response

```json
{
    "success": true,
    "message": "Profile updated successfully",
    "data": {
        "_id": "...",
        "medicalName": "ABC MEDICAL",
        "phoneNumber": "9876543210",
        "address": "Delhi"
    }
}
```

### Error Responses

400 Validation Failed

401 Unauthorized

500 Internal Server Error

---

# Common Error Responses

## Validation Failed

```json
{
    "success": false,
    "message": "Validation failed",
    "errors": [
        {
            "field": "medicalName",
            "message": "Medical name is required"
        }
    ]
}
```

---

## Unauthorized

```json
{
    "success": false,
    "message": "Unauthorized",
    "errors": []
}
```

---

## Resource Not Found

```json
{
    "success": false,
    "message": "Resource not found",
    "errors": []
}
```

---

## Internal Server Error

```json
{
    "success": false,
    "message": "Internal server error",
    "errors": []
}
```




# Medicines APIs

---

## Create Medicine

Creates a new medicine.

### Endpoint

```http
POST /medicines
```

### Authentication

Required

### Request Body

```json
{
    "name": "DOLO 650"
}
```

### Validation

| Field | Required | Rules |
|---------|----------|------|
| name | Yes | 2–100 Characters |

### Success Response

```json
{
    "success": true,
    "message": "Medicine created successfully",
    "data": {
        "_id": "...",
        "name": "DOLO 650"
    }
}
```

### Error Responses

400 Validation Failed

401 Unauthorized

409 Medicine Already Exists

---

## Get Medicines

Returns paginated medicines.

### Endpoint

```http
GET /medicines
```

### Authentication

Required

### Query Parameters

| Parameter | Required | Example |
|------------|----------|---------|
| page | No | 1 |
| limit | No | 20 |
| search | No | DOLO |

Example

```http
GET /medicines?page=1&limit=20
```

Search

```http
GET /medicines?search=PARA
```

### Success Response

```json
{
    "success": true,
    "message": "Medicines fetched successfully",
    "data": {
        "items": [],
        "pagination": {
            "page": 1,
            "limit": 20,
            "total": 40,
            "totalPages": 2
        }
    }
}
```

---

## Get Medicine

Returns a single medicine.

### Endpoint

```http
GET /medicines/:id
```

Example

```http
GET /medicines/68765b...
```

---

## Update Medicine

Updates medicine name.

### Endpoint

```http
PUT /medicines/:id
```

Request

```json
{
    "name": "AZITHROMYCIN"
}
```

---

## Delete Medicine

Soft deletes medicine.

### Endpoint

```http
DELETE /medicines/:id
```

### Business Rule

Medicine cannot be deleted when an active pending order exists.

---

# Parties APIs

---

## Create Party

Creates supplier.

### Endpoint

```http
POST /parties
```

### Request

```json
{
    "name": "CIPLA",
    "phoneNumber": "9876543210",
    "address": "Delhi"
}
```

### Validation

| Field | Required |
|---------|----------|
| name | Yes |
| phoneNumber | No |
| address | No |

### Success Response

```json
{
    "success": true,
    "message": "Party created successfully",
    "data": {
        "_id": "...",
        "name": "CIPLA"
    }
}
```

---

## Get Parties

Returns all suppliers.

### Endpoint

```http
GET /parties
```

Query

```http
GET /parties?page=1&limit=20
```

Search

```http
GET /parties?search=CIP
```

### Success Response

```json
{
    "success": true,
    "message": "Parties fetched successfully",
    "data": {
        "items": [],
        "pagination": {
            "page": 1,
            "limit": 20,
            "total": 10,
            "totalPages": 1
        }
    }
}
```

---

## Get Party

### Endpoint

```http
GET /parties/:id
```

---

## Update Party

### Endpoint

```http
PUT /parties/:id
```

Request

```json
{
    "name": "SUN PHARMA",
    "phoneNumber": "9999999999",
    "address": "Mumbai"
}
```

---

## Delete Party

### Endpoint

```http
DELETE /parties/:id
```

### Business Rule

Party cannot be deleted while active pending orders exist.

---

# Common Query Parameters

Medicines and Parties support:

| Query | Description |
|--------|-------------|
| page | Pagination |
| limit | Page Size |
| search | Search by Name |

Example

```http
GET /medicines?page=1&limit=50&search=DOLO
```

```http
GET /parties?page=1&limit=20&search=CIP
```

---

# Common Validation Rules

Medicine Name

- Required
- Uppercase
- 2–100 Characters

Party Name

- Required
- Uppercase
- Unique Per User

Phone Number

- Optional

Address

- Optional


# Orders APIs

---

## Overview

Orders represent the complete medicine ordering workflow.

Orders are the **Single Source of Truth** for workflow state.

Workflow

```text
Medicine

↓

Create Order

↓

PENDING

↓

RECEIVED
```

---

## Create Order

Creates a new medicine order.

### Endpoint

```http
POST /orders
```

### Authentication

Required

### Request

```json
{
    "medicineId": "68765b...",
    "partyId": "68765c...",
    "quantity": 2,
    "notes": ""
}
```

### Validation

| Field | Required |
|---------|----------|
| medicineId | Yes |
| partyId | Yes |
| quantity | No |
| notes | No |

### Success Response

```json
{
    "success": true,
    "message": "Order created successfully",
    "data": {
        "_id": "...",
        "status": "PENDING"
    }
}
```

---

## Business Rules

Before creating an order

The backend validates:

- Medicine exists
- Party exists
- Party is active
- Medicine has no active pending order
- User owns both medicine and party

---

## Get Orders

Returns paginated orders.

### Endpoint

```http
GET /orders
```

### Query Parameters

| Parameter | Required | Description |
|------------|----------|-------------|
| page | No | Pagination |
| limit | No | Page Size |
| partyId | No | Filter by Party |
| status | No | Filter by Status |

Examples

```http
GET /orders?page=1&limit=20
```

```http
GET /orders?status=PENDING
```

```http
GET /orders?status=RECEIVED
```

```http
GET /orders?partyId=68765...
```

---

## Success Response

```json
{
    "success": true,
    "message": "Orders fetched successfully",
    "data": {
        "items": [],
        "pagination": {
            "page": 1,
            "limit": 20,
            "total": 15,
            "totalPages": 1
        }
    }
}
```

---

## Get Order

Returns a single order.

### Endpoint

```http
GET /orders/:id
```

---

## Receive Order

Marks a pending order as received.

### Endpoint

```http
PATCH /orders/:id/receive
```

### Success Response

```json
{
    "success": true,
    "message": "Order marked as received",
    "data": {
        "status": "RECEIVED",
        "receivedAt": "2026-07-12T10:20:30Z"
    }
}
```

### Business Rule

Only pending orders can be received.

Received orders are considered final.

---

## Return Order

Returns a pending order to Inbox.

### Endpoint

```http
PATCH /orders/:id/return
```

### Business Rule

The order is soft deleted.

Medicine becomes available in Inbox again.

---

# Order Status

| Status | Meaning |
|----------|---------|
| PENDING | Waiting for medicine |
| RECEIVED | Medicine received |

---

# Workflow

```text
Medicine

↓

Create Order

↓

PENDING

↓

RECEIVED
```

Return Workflow

```text
PENDING

↓

Return

↓

Soft Delete Order

↓

Medicine visible in Inbox
```

---

# Error Catalog

## Validation Failed

```http
400
```

```json
{
    "success": false,
    "message": "Validation failed",
    "errors": []
}
```

---

## Unauthorized

```http
401
```

```json
{
    "success": false,
    "message": "Unauthorized",
    "errors": []
}
```

---

## Not Found

```http
404
```

Examples

- Medicine not found
- Party not found
- Order not found

---

## Conflict

```http
409
```

Examples

```text
Medicine already exists

Party already exists

Medicine already has a pending order
```

---

## Internal Server Error

```http
500
```

```json
{
    "success": false,
    "message": "Internal server error",
    "errors": []
}
```

---

# API Summary

## Authentication

| Method | Endpoint |
|----------|----------|
| POST | /auth/login |
| GET | /auth/me |

---

## Profile

| Method | Endpoint |
|----------|----------|
| GET | /profile |
| PUT | /profile |

---

## Medicines

| Method | Endpoint |
|----------|----------|
| POST | /medicines |
| GET | /medicines |
| GET | /medicines/:id |
| PUT | /medicines/:id |
| DELETE | /medicines/:id |

---

## Parties

| Method | Endpoint |
|----------|----------|
| POST | /parties |
| GET | /parties |
| GET | /parties/:id |
| PUT | /parties/:id |
| DELETE | /parties/:id |

---

## Orders

| Method | Endpoint |
|----------|----------|
| POST | /orders |
| GET | /orders |
| GET | /orders/:id |
| PATCH | /orders/:id/receive |
| PATCH | /orders/:id/return |

---

# Version

Current API Version

```text
v1
```

Future versions will remain backward compatible whenever possible.

