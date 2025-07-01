# Role-Based Routing and Permissions — Template Editor — v1.0

June 2025

---

# Overview

This document defines routing access, permission boundaries, and behavior limitations for the **Template Editor** role. Template Editors inherit all Contributor capabilities and have full access to style editing, template creation, and layout tooling.

---

# Routing Access

| Route | Access | Notes |
|-------|--------|-------|
| `/dashboard` | ✅ | Full access to documents and templates |
| `/docs/:id` | ✅ | Can write and edit like a Contributor |
| `/templates` | ✅ | View and manage assigned templates |
| `/templates/new` | ✅ | Create templates from scratch |
| `/templates/:id` | ✅ | Edit template styles, layout, artwork |
| `/style-settings` | ✅ | Full style override and management |
| `/preview/:id` | ✅ | Can inspect enforced styles in context |
| `/sample-content` | ✅ | Access dropdown or modal with reusable sample blocks |
| `/trash` | ✅ | Can view and restore deleted templates and documents |

---

# Permissions

| Feature | Access |
|---------|--------|
| Write content | ✅ |
| Apply manual formatting | ✅ (Preview reflects template rules) |
| Edit styles | ✅ |
| Create/edit Templates | ✅ |
| Manage artwork & thumbnails | ✅ |
| Upload custom fonts | ✅ |
| Use sample content | ✅ |
| View all Contributor-only documents | ✅ |
| Access template sets | ✅ |
| Archive or duplicate templates | ✅ |
| Switch templates in document view | ✅ |

---

# Denied Feature Behavior

| Feature | Behavior |
|---------|----------|
| Admin-only routes (e.g. `/users`) | Redirected with toast: “Admin access required” |
| Role fallback via localStorage | ❌ No longer supported — all roles are Supabase-authenticated |
| Team-wide template publishing | 🚫 Admin only |
| Audit log access | 🚫 Admin only (Post-MVP) |

---

# Known Gaps

- No cross-template layout reuse support (Planned)
- Cannot preview template with simulated content types (Post-MVP)
- No analytics dashboard for usage (Planned)

---

# Future Enhancements (Post-MVP)

- Layout variants per template
- Conditional formatting rules (if/then logic)
- Template branching and rollback
- Visual template diff viewer

---

# Version

Role Routing Specification — Template Editor — v1.0 — June 2025
