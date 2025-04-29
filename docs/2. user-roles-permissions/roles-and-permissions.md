# Mylo User Roles and Permissions

This document defines the core user roles within Mylo and outlines their capabilities.

Each role is designed to keep content creation, design enforcement, and administrative control **separate but coordinated**.

---

# 🔐 Roles Overview

| Role | Description |
|:---|:---|
| **Contributor** | Focuses purely on writing and basic formatting. Cannot control templates, styles, or document structure. |
| **Template Editor** | Creates and manages Templates that control the visual design applied to documents. Includes all Contributor permissions. |
| **Admin** | Manages users, teams, and account-wide settings. Includes all Template Editor and Contributor permissions. |
| **Guest** | View-only access. Primarily used for demos, testing, or showcasing features without edit capabilities. |

---

# 🔢 Permissions Matrix (MVP Scope)

| Capability | Contributor | Template Editor | Admin | Guest |
|:---|:---|:---|:---|:---|
| Create Documents | ✅ | ✅ | ✅ | ❌ |
| Edit Documents | ✅ | ✅ | ✅ | ❌ |
| Apply Templates to Documents | ✅ (from available list) | ✅ | ✅ | ❌ |
| Create/Edit Templates | ❌ | ✅ | ✅ | ❌ |
| Publish/Unpublish Templates | ❌ | ✅ | ✅ | ❌ |
| Manage Users (Invite, Remove) | ❌ | ❌ | ✅ | ❌ |
| Access Admin Settings | ❌ | ❌ | ✅ | ❌ |
| Save/Load `.mylo` Files | ✅ | ✅ | ✅ | ❌ |
| Export to PDF | ✅ (via Preview) | ✅ | ✅ | ❌ |
| View-Only Access | ❌ | ❌ | ✅ (view only) | ✅ |

---

# 🔄 Future Permissions (Post-MVP)

Future enhancements to user permissions may include:

- **Flexible Formatting Ranges:** Allow Contributors limited control over style adjustments (e.g., font size within set bounds).
- **Template Versioning:** Allow Admins and Template Editors to manage multiple versions of templates.
- **Document Approvals:** Admins or Template Editors can approve/reject documents before final export.
- **Role Customization:** Ability to create custom roles with tailored permissions.

_(These features are not required for MVP and are noted for future planning.)_

---

# 📊 Role Hierarchy Summary

Mylo roles are **cumulative**, meaning each higher-level role inherits all capabilities of lower-level roles:

- **Admin** > **Template Editor** > **Contributor** > **Guest**

Each level builds on the last, reducing redundancy and simplifying permission logic.

---

# 📅 Version
Mylo Roles and Permissions v1.0 — April 2025
