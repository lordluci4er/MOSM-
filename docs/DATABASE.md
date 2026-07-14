# 🗄 MOSM Database Design

**Project:** Medical Store Management System (MOSM)

**Database:** MongoDB Atlas

**ODM:** Mongoose

**Version:** 1.0

**Status:** Frozen

---

# Overview

MOSM stores data inside MongoDB using four business collections.

```text
profiles

medicines

parties

orders
```

Each collection belongs to exactly one feature module.

The architecture follows:

- User Data Isolation
- Soft Delete
- Indexed Queries
- Simple Relationships

---

# Collection Overview

| Collection | Purpose |
|------------|---------|
| profiles | Store Owner Information |
| medicines | Master Medicine List |
| parties | Supplier Information |
| orders | Medicine Workflow |

---

# Entity Relationship

```text
Profile
    │
    ├──────────────┐
    │              │
    ▼              ▼

Medicines      Parties
      │            │
      └──────┬─────┘
             │
             ▼
           Orders
```

---

# 1. Profiles Collection

Collection Name

```text
profiles
```

Purpose

Stores medical store owner information.

Fields

| Field | Type | Required |
|---------|------|----------|
| firebaseUid | String | Yes |
| email | String | Yes |
| medicalName | String | Yes |
| phoneNumber | String | Yes |
| address | String | Yes |
| profileCompleted | Boolean | Yes |
| createdAt | Date | Auto |
| updatedAt | Date | Auto |

Indexes

```javascript
firebaseUid
```

Business Rules

- One profile per Firebase user
- Profile created after first login
- Profile cannot belong to another user

---

# 2. Medicines Collection

Collection Name

```text
medicines
```

Purpose

Stores the master list of medicines.

Orders determine workflow status.

Fields

| Field | Type |
|---------|------|
| firebaseUid | String |
| name | String |
| isDeleted | Boolean |
| createdAt | Date |
| updatedAt | Date |

Indexes

```javascript
{
    firebaseUid:1,
    name:1
}
```

Business Rules

- Medicine names stored in uppercase
- Unique per user
- Soft delete only
- Orders own workflow state

---

# 3. Parties Collection

Collection Name

```text
parties
```

Purpose

Stores medicine suppliers.

Fields

| Field | Type |
|---------|------|
| firebaseUid | String |
| name | String |
| phoneNumber | String |
| address | String |
| isDeleted | Boolean |
| createdAt | Date |
| updatedAt | Date |

Indexes

```javascript
{
    firebaseUid:1,
    name:1
}
```

Business Rules

- Uppercase names
- Unique per user
- Soft delete
- Cannot delete while active orders exist

---

# 4. Orders Collection

Collection Name

```text
orders
```

Purpose

Stores the medicine ordering workflow.

This collection is the Single Source of Truth.

Fields

| Field | Type |
|---------|------|
| firebaseUid | String |
| medicineId | ObjectId |
| partyId | ObjectId |
| quantity | Number |
| status | String |
| receivedAt | Date |
| receivedBy | String |
| notes | String |
| isDeleted | Boolean |
| createdAt | Date |
| updatedAt | Date |

Status Values

```text
PENDING

RECEIVED
```

Indexes

Pending Order Rule

```javascript
{
    firebaseUid:1,
    medicineId:1,
    status:1
}
```

Party Screen

```javascript
{
    firebaseUid:1,
    partyId:1,
    status:1
}
```

General Query

```javascript
{
    firebaseUid:1,
    isDeleted:1
}
```

Business Rules

- One pending order per medicine
- Received order is final
- Soft delete only
- Workflow managed by Orders

---

# Relationships

Profile

```text
1

↓

Many Medicines
```

Profile

```text
1

↓

Many Parties
```

Profile

```text
1

↓

Many Orders
```

Medicine

```text
1

↓

Many Orders
```

Party

```text
1

↓

Many Orders
```

---

# Workflow

```text
Medicine

↓

Inbox

↓

Assign Party

↓

Create Order

↓

Pending

↓

Received
```

---

# User Data Isolation

Every collection stores

```text
firebaseUid
```

Every query filters using

```javascript
{
    firebaseUid
}
```

Users cannot access each other's data.

---

# Soft Delete Strategy

Collections supporting soft delete

- Medicines
- Parties
- Orders

Deleted documents remain in MongoDB.

Example

```javascript
{
    isDeleted:true
}
```

Queries always include

```javascript
{
    isDeleted:false
}
```

---

# Query Strategy

Most common queries

Medicines

```javascript
find({
    firebaseUid,
    isDeleted:false
})
```

Parties

```javascript
find({
    firebaseUid,
    isDeleted:false
})
```

Pending Orders

```javascript
find({
    firebaseUid,
    status:"PENDING"
})
```

Received Orders

```javascript
find({
    firebaseUid,
    status:"RECEIVED"
})
```

Party Orders

```javascript
find({
    firebaseUid,
    partyId
})
```

---

# Pagination

Large collections always support

```text
page

limit
```

Example

```text
GET /orders?page=1&limit=20
```

---

# Search

Supported Collections

- Medicines
- Parties

Search Field

```text
name
```

Future

Order search will use aggregation.

---

# Performance Optimizations

Current

✅ Compound Indexes

✅ Pagination

✅ Search

✅ User Isolation

Future

- Text Search

- Aggregation Pipelines

- Read Optimization

---

# Backup

MongoDB Atlas

Automatic Backup

Point-in-Time Recovery

---

# Future Database Changes

Version 1.1

- Recently Used Medicines

Version 1.2

- Offline Sync Metadata

Version 2

- Inventory Collection

- Purchase History

- Barcode

- Notifications

Version 3

- Billing

- GST

- Reports

- Analytics

---

# Design Principles

The database is designed around:

- Simplicity

- Performance

- Security

- Scalability

- Maintainability

---

# Summary

The MOSM database follows a clean document-based structure with clear ownership of business data.

Orders are the workflow engine.

Medicines remain master data.

Parties represent suppliers.

Profiles isolate every user's data securely.