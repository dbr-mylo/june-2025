
# Mylo Roles and Permissions Specification v2.0 — June 2025

---

# Overview

This document defines the user role structure and associated permissions across the Mylo platform. Mylo enforces a strict separation between content creation, design enforcement, and administrative oversight through cumulative role tiers.

---

# MVP Scope

## Defined Roles

- **Guest** (Visitor Mode)
  - No login required
  - View only demo documents/templates
  - No save/export capability
- **Contributor**
  - Create and edit personal documents
  - Apply formatting within editor
  - View styled preview with assigned template
  - Cannot create/edit templates
- **Template Editor**
  - Inherits all Contributor permissions
  - Create/edit templates
  - Assign fonts, styles, and layout logic
  - Cannot manage users
- **Admin**
  - Inherits all Template Editor permissions
  - Invite and manage users
  - Assign template access to groups or roles
  - Manage shared organization-level assets

## Role Hierarchy

Each role inherits all permissions from the role beneath it:

```
Admin → Template Editor → Contributor → Guest
```

## Role Enforcement

- Role is determined at login via Supabase Auth metadata
- Role-specific dashboards are rendered conditionally
- Role-based feature access is enforced both at UI and API layers

---

# Role Permissions Matrix

| Feature                          | Guest | Contributor | Template Editor | Admin |
|----------------------------------|:-----:|:-----------:|:----------------:|:-----:|
| View Demo Documents/Templates    |  ✅   |      –      |        –         |   –   |
| Create/Edit Personal Documents   |   –   |     ✅      |       ✅         |  ✅   |
| Apply Custom Formatting          |   –   |     ✅      |       ✅         |  ✅   |
| View Template Preview            |   –   |     ✅      |       ✅         |  ✅   |
| Create/Edit Templates            |   –   |      –      |       ✅         |  ✅   |
| Manage Fonts/Styles/Templates    |   –   |      –      |       ✅         |  ✅   |
| Manage Users                     |   –   |      –      |        –         |  ✅   |
| Assign Template Access           |   –   |      –      |        –         |  ✅   |

---

# Error Handling

| Scenario                                           | Behavior                                              |
|----------------------------------------------------|-------------------------------------------------------|
| No role defined at login                           | Default to Contributor (configurable fallback)        |
| Role token mismatch                                | Show generic error and log event                      |
| User attempts unauthorized action (e.g. save as Guest) | Block with tooltip: “Sign in to access this feature” |
| Template Editor tries to access Admin tools        | UI hides restricted controls                          |

---

# Known Gaps / Outstanding Questions

- Should users be able to switch roles in a live session? (Effort: Medium)
- What is the behavior if a user has multiple roles? (Effort: High)
- Do Contributors ever see Template Editor UIs in read-only mode? (Effort: Medium)
- Do we persist role-specific recent activity and navigation context? (Effort: High)
- Guest: Is 20-minute session duration appropriate for all use cases? (Effort: Low)
- Guest: Should we allow export/save mock buttons with conversion prompts? (Effort: Medium)

---

# Future Enhancements (Post-MVP)

- Role emulation mode (e.g., Admin viewing as Contributor)
- Custom role creation (Enterprise)
- Per-document permission sharing
- Group-based access control (Teams)
- Multi-role accounts with scoped switching

---

# Technical Dependencies

- Supabase Auth (role metadata, session tokens)
- Supabase DB (user metadata, org access)
- Conditional UI rendering system (React Context or equivalent)
- Role-based routing (Nav guard or protected layout wrappers)

---

# API / Data Schema Notes

## User Object

```json
{
  "id": "user_abc123",
  "email": "user@example.com",
  "role": "template_editor",
  "created_at": "2025-06-01T12:00:00Z"
}
```

## Auth Handling

- Role is stored in Supabase JWT or associated metadata table
- Role passed to frontend on login
- Session context determines layout and accessible endpoints

---

# Version

Mylo Roles and Permissions Specification v2.0 — June 2025
