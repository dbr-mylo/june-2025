# User Management Specification — v2.0

June 2025

---

# Overview

This document defines how Admins can create and manage users in the Mylo platform. It covers input validation, invitation logic, UI behavior, and outlines future plans for more advanced user management workflows.

---

# MVP Scope

- Admins can create new users via a modal interface on the **User Admin** screen
- Fields include: Name (optional), Email (required), Role (required)
- Email must be valid and unique
- Role is selected from: Contributor, Template Editor, Admin
- Users appear in the list as **Invited** after creation
- Save button is disabled until all required fields are valid

---

# Main Behavior Sections

## Save Behavior Rules

- The "Save" button remains disabled until all required fields are valid.
- Upon save:
  - A POST request is sent to the backend to create the user record and send an invitation.
  - UI updates the user list to include the new user in `Invited` status.

## Stack Behavior

- This feature relies on a Supabase backend for user authentication and invitation handling.
- Modal behavior is managed via client-side JavaScript/React logic with standard form validation.

## Data Models

```json
{
  "id": "uuid",
  "email": "string",
  "name": "string (optional)",
  "role": "enum: ['Contributor', 'Template Editor', 'Admin']",
  "status": "enum: ['Invited', 'Active', 'Revoked']",
  "invited_at": "timestamp"
}
```

## Field Definitions

- **Name**: Optional string input (max 100 characters)
- **Email**: Required, must be valid RFC-compliant format
- **Role**: Dropdown selection of predefined roles
- **Status**: Auto-assigned after save ("Invited")

---

# UI Behavior

- “Add New User” opens a modal
- Modal contains: Name input, Email input, Role dropdown, Save/Cancel buttons
- “Add Another” allows batch entry (new row or clear+reset)
- Cancel closes modal with no changes
- Save creates user and closes modal
- On save success: user added to list with status: Invited

---

# Additional Technical Sections (Optional)

*None currently documented.*

---

# Error Handling

| Condition                | System Response                          |
|--------------------------|------------------------------------------|
| Invalid email format     | Field-level validation error             |
| Duplicate email          | “This email has already been invited.”   |
| Missing required fields  | Save disabled, field marked as invalid   |
| Server save error        | Toast alert with retry option            |

---

# Known Gaps / Outstanding Questions

- Should we allow Admins to revoke invitations or resend them? (Effort: Medium, Status: To Do)
- Should status update to “Active” only after first login or immediately after invite? (Effort: Low, Status: Unresolved)
- Should Admins be able to filter or search the user list? (Effort: Medium, Status: Not specified)

---

# Future Enhancements (Post-MVP)

- Resend invitation button
- Invite via CSV upload
- Role change after invitation
- Bulk user actions (delete, reassign role)

---

# Technical Dependencies (Optional)

- Supabase Auth API
- Supabase Realtime for user list refresh
- Toast/alert library for frontend errors
- Modal/portal UI component library

---

# API / Data Schema Notes (If Applicable)

*Not yet documented. Recommend adding Supabase invite endpoint contract and DB schema reference once available.*

---

# Version

Mylo User Management Specification v2.0 — June 2025
