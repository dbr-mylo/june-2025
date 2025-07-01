# Mylo Roles and Permissions Specification v2.1 — July 2025

---

## Overview

This specification defines the role-based permissions structure in Mylo, clarifying access rules, UI behavior, and inheritance logic for Contributors, Template Editors, Admins, and Guests.

---

## MVP Scope

- **Contributors** can:
  - Create and edit documents
  - Use system fonts and basic formatting tools
  - Apply templates in Preview but not edit them

- **Template Editors** can:
  - Do everything a Contributor can do
  - Create, edit, and manage templates
  - Upload fonts, define styles, and assign templates to documents

- **Admins** can:
  - Do everything a Template Editor can do
  - Manage users, roles, and team-level settings
  - Publish/unpublish templates and assign access

- **Guests (Demo Mode)** can:
  - Explore Mylo without authentication
  - Interact with a mock Contributor environment
  - Cannot save/export or change roles
  - Triggered via `localStorage.demoMode = true`

---

## Role Hierarchy Table

| Role             | Inherits From     | Additional Capabilities                             |
|------------------|-------------------|------------------------------------------------------|
| Guest (Demo)     | —                 | Mock UI, no persistence                             |
| Contributor      | —                 | Document writing, style toolbar                     |
| Template Editor  | Contributor       | Template creation, font uploads, preview styles     |
| Admin            | Template Editor   | User management, team settings, publishing tools    |

---

## Role-Based Navigation & Routing

| Page / View             | Contributor | Template Editor | Admin | Guest |
|-------------------------|-------------|------------------|-------|--------|
| Document Dashboard      | ✅          | ✅               | ✅    | ✅ (mock) |
| Template Editor         | 🚫          | ✅               | ✅    | 🚫     |
| Admin Settings          | 🚫          | 🚫               | ✅    | 🚫     |
| Template Preview        | ✅          | ✅               | ✅    | ✅ (mock) |
| Role Switcher UI        | 🚫          | 🚫               | 🚫    | 🚫     |

- Each role sees only the views relevant to them.
- Unauthorized deep links redirect to the user’s default dashboard.

---

## Access Conflict Handling

- Unauthorized users attempting to access a restricted route:
  - Are redirected to their appropriate dashboard
  - A toast displays: “You don’t have permission to view that page.”
- Guest users cannot trigger role-switching, save, or export actions

---

## Role Change Implications

If a user is **upgraded or downgraded**:

- Their documents remain accessible unless explicitly reassigned
- Templates authored by downgraded users become read-only
- UI dynamically updates to reflect new capabilities after next login

---

## Known Gaps / Outstanding Questions

- [ ] Do we persist role-specific recent activity and navigation context?
- [ ] Should Admins be able to emulate other roles for testing?
- [ ] Should Guests see a banner or modal encouraging signup after 5+ interactions?
- [ ] All routing-specific behavior (deep linking, redirects, fallback) is now defined in routing-spec.md. This file only covers role permissions and interface access logic.

---

## Future Enhancements (Post-MVP)

- Role emulation tools for Admins
- Shared dashboards with real-time permission scopes
- Role-based onboarding and guided tours

---

## Version

Mylo Roles and Permissions Specification v2.1 — July 2025