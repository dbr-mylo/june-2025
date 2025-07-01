# Role-Based Routing and Permissions — Admin — v1.0

June 2025

---

# Overview

This document defines the routing access, feature permissions, and behavior constraints for the **Admin** role in Mylo. Admins have full system access and inherit all Template Editor and Contributor permissions.

---

# Routing Access

| Route | Access | Notes |
|-------|--------|-------|
| `/dashboard` | ✅ | Shows all user documents, templates, and sets |
| `/templates/new` | ✅ | Can create and assign templates |
| `/settings` | ✅ | Full configuration access |
| `/users` | ✅ | View, edit, or deactivate any user |
| `/teams` | ✅ | Assign templates to groups |
| `/trash` | ✅ | Access to all deleted content across roles |
| `/docs/:id` | ✅ | Can access all documents regardless of owner |
| `/preview/:id` | ✅ | Can preview any document in read-only mode |
| `/visitor` | ✅ | Can impersonate or observe Guest view |
| `/version-history/:id` | ✅ | View all saved versions |

---

# Admin-Only Permissions

- Create, archive, and assign template sets
- Promote or demote users (e.g., Contributor → Template Editor)
- Publish/unpublish templates to entire organization
- Restore deleted documents or templates from Trash
- Manage all role-based routing rules
- View audit logs (Post-MVP)

---

# Fallback + Error States

| Condition | Behavior |
|----------|----------|
| Invalid document ID | Redirect to dashboard |
| Accessing Contributor-only route | Allowed (inherits access) |
| Editing restricted template | Allowed with warning: “Locked by Template Editor” |
| Visiting `/guest` | View-only, cannot take actions |

---

# Guest + Visitor Auditing (Post-MVP)

- Admins can review:
  - Documents created in Guest mode
  - Templates generated via demo mode
  - Errors encountered by visitors
- Actions are only visible via Admin audit panel (not MVP)

---

# Known Gaps

- No routing override logs available in MVP
- Cannot “impersonate” a role yet (Planned)
- Team-based routing filters not yet implemented

---

# Future Enhancements (Post-MVP)

- Admin dashboard filtering by role
- Template usage analytics
- Audit trail for routing actions
- Advanced permission editor (drag-drop UI for roles)

---

# Version

Role Routing Specification — Admin — v1.0 — June 2025
