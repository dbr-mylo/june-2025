# Mylo API Contract — User Save Specification

This document defines the API contract for saving and loading User data in Mylo.

It establishes the required fields for user creation, role assignment, and access control.

---

# Overview

Users represent individuals who can create documents, manage templates, or administer system settings.  
Roles define access permissions and system behavior for each user.

At MVP, user data is minimal and role-based.

---

# Save Payload Structure

```json
{
  "id": "user-uuid-1234",
  "name": "Jane Smith",
  "email": "jane.smith@example.com",
  "role": "TemplateEditor",
  "createdAt": "2025-04-26T16:00:00Z"
}
```

---

# Field Definitions

| Field | Type | Required | Description |
|:---|:---|:---|:---|
| `id` | UUID String | ✅ | Unique identifier for the user. |
| `name` | String | ✅ | User's display name. |
| `email` | String (valid email) | ✅ | User’s login email address. |
| `role` | Enum ("Contributor", "TemplateEditor", "Admin") | ✅ | Assigned role controlling permissions. |
| `createdAt` | ISO 8601 Timestamp | ✅ | User account creation time. |

---

# Save Behavior Rules

- **Email Must Be Unique**:  
  No two users can share the same email address.

- **Role Required at Creation**:  
  A User must be assigned a valid role at creation time.

- **Editable Fields**:
  - `name` can be updated by the user.
  - `role` can be changed by Admins only.
  - `email` is fixed at account creation (cannot be changed).

- **Timestamps Must Use UTC ISO 8601 Format**:
  (e.g., `"2025-04-26T16:00:00Z"`)

---

# Validation Notes

- Name maximum length: 100 characters.
- Email format must comply with RFC 5322 standards (standard email validation).
- Role must match one of three allowed values exactly.

---

# Version

Mylo API Contract — User Save Specification v1.0 — April 2025
