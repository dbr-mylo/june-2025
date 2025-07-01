# Mylo Routing Specification v1.0 — July 2025

---

# Overview

This specification defines the routing and navigation architecture of Mylo across all user roles (Guest, Contributor, Template Editor, Admin). It includes route structure, role-based access restrictions, fallback behaviors, and expected interactions with Supabase authentication.

---

# MVP Scope

- Each role has access to a shared route structure but sees only the views permitted by their role.
- Core routes are:
  - `/` — Redirects to `/dashboard` if authenticated, `/guest` if in demo mode
  - `/dashboard` — Role-specific dashboard (Contributor, Template Editor, Admin)
  - `/document/:id` — Opens a document in the dual-panel editor/preview mode
  - `/template/:id` — Opens a template in Template Editor mode
  - `/settings`, `/account`, `/help`, `/404` — General system routes
- Routing respects Supabase auth state; unauthenticated users are redirected to login or demo

---

# Route Access Rules

| Route             | Guest | Contributor | Template Editor | Admin |
|------------------|:-----:|:-----------:|:----------------:|:-----:|
| `/dashboard`     | ❌    | ✅          | ✅               | ✅    |
| `/document/:id`  | ❌    | ✅          | ✅               | ✅    |
| `/template/:id`  | ❌    | ❌          | ✅               | ✅    |
| `/settings`      | ❌    | ✅          | ✅               | ✅    |
| `/account`       | ❌    | ✅          | ✅               | ✅    |
| `/guest`         | ✅    | ❌          | ❌               | ❌    |
| `/help`          | ✅    | ✅          | ✅               | ✅    |
| `/404`           | ✅    | ✅          | ✅               | ✅    |

---

# Fallback & Error Routing

- Invalid document/template IDs: Redirect to `/404`
- Unauthenticated access: Redirect to `/login`
- Role-based restrictions:
  - If a Contributor tries to access a Template route → redirect to `/dashboard`
  - If a Template Editor or Admin accesses a Guest route → redirect to `/dashboard`
- Unknown paths route to `/404`

---

# Deep Linking Behavior

- Valid deep links load document/template content if authorized
- Unauthorized deep links redirect to login or dashboard
- Deep links support refreshing and direct open behavior (e.g., from external URL)

---

# Loading & Transition States

- Show full-screen loader when verifying auth or role on initial load
- In-document and in-template loading uses skeleton components or spinner overlays

---

# Known Gaps

- Role switching within a session is not supported in MVP
- Cross-tab sync or impersonation (e.g., Admin viewing as Contributor) is not handled yet
- URLs for shared templates/documents in Guest mode not defined

---

# Version

Mylo Routing Specification v1.0 — July 2025