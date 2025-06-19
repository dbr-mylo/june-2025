# Mylo Role-Based Routing & Permissions (Contributor Role) Specification

This specification defines role-based access and routing logic for the **Contributor** role, ensuring that Contributors only have access to content editing tools while being restricted from template management features.

---

# Overview

Contributors should only have access to **writing-related pages** and tools, and should be restricted from accessing **template-related pages** or features intended for **Template Editors**. This helps ensure clear and streamlined workflows for both roles.

---

# MVP Scope

- **React Router** will be used to handle **role-based page access**.
- Contributors will have access to the following pages:
  - `/contributor-dashboard` (Dashboard)
  - `/write` (Main writing interface)
  - `/documents` (Document list and management)
- Template Editors will have access to `/templates` and `/template-creation`.
- Unauthorized attempts to access restricted pages will redirect Contributors to `/contributor-dashboard` with an appropriate alert.

---

# Functional Requirements

**Contributor**
- As a Contributor, I can only access writing-related pages—`/contributor-dashboard`, `/write`, and `/documents`—as outlined in **[Contributor User Stories](file-contributor-user-stories.md)**.
- As a Contributor, I should be **redirected** if I try to access template-related features (e.g., `/templates`), which are described in the **[Template Editor User Stories](file-template-editor-user-stories.md)**.
- As a Contributor, I should receive an alert or message explaining that I do not have permission to access a restricted page, as per the **[Contributor User Stories](file-contributor-user-stories.md)**.

**Developer**
- As a Developer, I will implement routing logic using **React Router** to conditionally render pages based on the user role.
- As a Developer, I will use **`<Navigate>`** for redirecting unauthorized users.
- As a Developer, I will use **localStorage** to store the user role and ensure persistence across sessions.

---

# Error Handling

| Failure                        | System Response                                | User-facing Message                            |
|:---                            |:---                                            |:---                                            |
| Contributor tries to access a template-related page | Redirect to `/contributor-dashboard`          | "You do not have access to this page."         |
| No role found in localStorage  | Default role to Contributor, redirect to `/contributor-dashboard` | "Role not found. Defaulting to Contributor." |

---

# Future Enhancements (Post-MVP)

- Fine-grained permission controls for admins to override role-based access restrictions.
- Ability to customize access levels for different roles (e.g., partial access for Contributor).
- Enhanced role management for dynamic role-based UI updates.

---

# Version

Mylo Role-Based Routing & Permissions (Contributor Role) Specification v1.0 — April 2025
