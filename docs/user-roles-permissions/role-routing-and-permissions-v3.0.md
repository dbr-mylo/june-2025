# Role-Based Routing & Permissions — Canonical Spec

**Version:** v3.0  
**Status:** Canonical Source of Truth  
**Last Updated:** July 2025

---

## 🔍 Purpose
This document defines the **final, unified behavior** for role-based routing, visibility, and permissions across all user roles in Mylo. It resolves contradictions from previous v1.0 and v2.0 specs.

---

## 🎭 Roles & Inheritance

| Role             | Inherits From      | Notes |
|------------------|--------------------|-------|
| **Contributor**   | —                  | Content writing only |
| **Template Editor** | Contributor        | Gains access to styling and template management |
| **Admin**         | Template Editor     | Gains access to user + team management |

---

## 🗺️ Route Access by Role

| Route                | Contributor | Template Editor | Admin | Notes |
|----------------------|-------------|------------------|-------|-------|
| `/dashboard`         | ✅          | ✅               | ✅    | Role-aware UI shown |
| `/write`             | ✅          | ✅               | ✅    | Editor + Preview view |
| `/preview/:id`       | ✅          | ✅               | ✅    | Template-enforced preview |
| `/documents`         | ✅          | ✅               | ✅    | Document list |
| `/trash`             | ✅          | ✅               | ✅    | Self-owned trash only for Contributors |
| `/templates`         | 🚫          | ✅               | ✅    | Template library + creation |
| `/templates/:id`     | 🚫          | ✅               | ✅    | Template editing panel |
| `/style-settings`    | 🚫          | ✅               | ✅    | Full styling access |
| `/admin`             | 🚫          | 🚫               | ✅    | User + team management |
| `/visitor`           | 🚫          | 🚫               | ✅    | Demo/debug tools (Admin-only) |

---

## ✅ Contributor Permissions

| Capability                          | Access  |
|------------------------------------|---------|
| Edit content                        | ✅       |
| Apply manual formatting             | ✅       |
| View enforced template in Preview   | ✅       |
| Switch between assigned templates   | ✅       |
| Edit layout or artwork              | 🚫       |
| Upload or manage fonts              | 🚫       |
| Modify styles or template settings  | 🚫       |
| Access styling interface            | 🚫       |
| Access export or layout tools       | 🚫       |

> UI Feedback: Buttons shown but disabled with tooltips like “Only available to Template Editors.”

---

## ✅ Template Editor Permissions

- Gains **full style and template controls**
- Sees unified UI: no role switching
- Can view and edit templates, artwork, layout, and typography
- Cannot access Admin-only tools (e.g. team management)

---

## ✅ Admin Permissions

- Full access to all routes
- Can manage users, teams, and sharing permissions
- Inherits everything from Template Editor

---

## 🚨 Access Violations

| Scenario                                | System Behavior                               | User Message |
|----------------------------------------|------------------------------------------------|--------------|
| Contributor accesses `/templates`      | Redirect to `/dashboard`                      | “You do not have access to this page.” |
| Contributor accesses `/style-settings` | Redirect or tooltip block                     | “Only available to Template Editors.” |
| No role in storage/session             | Default to Contributor, force redirect        | “Role not found. Defaulting to Contributor.” |

---

## 🧠 Routing Implementation Notes

- Role should be fetched from **Supabase user metadata**, not just `localStorage`
- Routes gated using `React Router` and `<Navigate />`
- UI components conditionally rendered based on role context

---

## 🔮 Future Enhancements (Post-MVP)

- Granular per-feature access overrides (e.g. hybrid roles)
- Dynamic role switching for testing/QA
- Role-based feature flags and gradual rollout controls

---

## 🔗 Related Files To Remove or Consolidate
- `role-routing-contributor-v1.0.md` → Archive
- `role-based-routing-permissions-contributor-spec-v2.0.md` → Archive

This document replaces both and should be the *only* routing spec used going forward.
