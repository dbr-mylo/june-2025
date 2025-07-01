# Mylo API Contract — User Save Specification v2.1

June 2025

---

# Overview

This document defines the API contract for saving and loading user data in Mylo. It includes role-based permissions, creation rules, and validation requirements for user accounts.

---

# MVP Scope

- User accounts include:
  - Unique ID
  - Display name
  - Email address
  - Role
  - Creation timestamp
- Roles define system access:
  - Contributor
  - Template Editor
  - Admin
- Email must be unique.
- Role assignment is mandatory at account creation.

---

# Main Behavior Sections

## Save Behavior Rules

- A valid role must be assigned on user creation.
- Name is editable post-creation.
- Email is immutable once created.
- Only Admins may change a user's role.
- Timestamp must be ISO 8601 UTC.

## UI Behavior

*Not applicable at API level but should enforce role-based field edit restrictions.*

## Stack Behavior

- Users are stored in Supabase Auth and application tables.
- Duplicate emails are rejected before user is persisted.
- Role assignment may optionally sync with auth metadata.

## Data Models

### User Payload

```json
{
  "id": "user-uuid-1234",
  "name": "Jane Smith",
  "email": "jane.smith@example.com",
  "role": "TemplateEditor",
  "createdAt": "2025-04-26T16:00:00Z"
}
```

## Field Definitions

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | UUID | ✅ | Unique user identifier |
| name | String | ✅ | Display name |
| email | String | ✅ | Email (login identifier) |
| role | Enum ("Contributor", "TemplateEditor", "Admin") | ✅ | Role-based access control |
| createdAt | ISO 8601 | ✅ | Timestamp for account creation |

---

# Additional Technical Sections (Optional)

*Auth token integration and role propagation may be addressed in post-MVP.*

---

# Error Handling

| Condition | System Response |
|----------|-----------------|
| Email already exists | Reject with error: “Email already registered” |
| Invalid email format | Reject with error: “Invalid email format” |
| Missing role | Reject with error: “Role required” |
| Unauthorized role change | HTTP 403 if non-admin attempts role update |

---

# Known Gaps / Outstanding Questions

- Should email addresses be case-sensitive? (Effort: Low, Status: TBD)
- Should deleted users be recoverable or purged? (Effort: Medium, Status: Open)
- Should we store login activity timestamps? (Effort: Medium, Status: Post-MVP)

---

# Future Enhancements (Post-MVP)

- Role change audit history
- User profile avatars
- Soft deletion and recovery
- External identity provider (OAuth) integration

---

# Technical Dependencies (Optional)

- Supabase Auth
- Supabase Realtime (user table sync)
- Email validation middleware

---

# API / Data Schema Notes (If Applicable)

- Save endpoint: `POST /api/users/create`
- Role values must match strict enum
- Auth token must map to role metadata

---

# Version

Mylo API Contract — User Save Specification v2.1 — June 2025
