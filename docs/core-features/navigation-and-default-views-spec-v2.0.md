# Navigation and Default Views Specification — v2.0

June 2025

---

# Overview

This specification defines the routing, navigation, and default view behaviors across Mylo for all user roles. It ensures clarity in how users enter the product, switch roles, navigate between document types, and return to the Dashboard.

---

# MVP Scope

## Role-Based Entry Behavior

- **Contributors** land on “Documents” by default
- **Template Editors** land on “Templates”
- **Admins** land on “Teams” or “Users” depending on permissions
- **Guests** land on the role selection screen before being routed

## Default Routing Per Role

| Role | Default Route | View Title |
|------|---------------|------------|
| Guest | `/demo` | Role Picker |
| Contributor | `/documents` | “Documents” |
| Template Editor | `/templates` | “Templates” |
| Admin | `/teams` or `/users` | “Teams” or “User Management” |

## Global Navigation Bar (All Roles)

- Always present at top of screen
- Contains:
  - Logo (click = go to default view)
  - Primary sections (Documents, Templates, Teams, Users)
  - Logout button (if logged in)
  - Role switcher (if permissions allow)

## No Active Highlight

- The current navigation section is visually indicated
- There is **no route called `/dashboard`**
- "Dashboard" is not a clickable label or route; it refers to role-based default view

---

# Main Behavior Sections

## Save Behavior Rules

- Navigation and routing do not affect autosave
- Unsaved changes are retained across navigation unless file is closed
- Manual warning appears if user attempts to leave with unsaved edits and export not complete

## UI Behavior

| Action | Behavior |
|--------|----------|
| Click logo | Navigates to role’s default view |
| Switch route | Pushes to browser history stack |
| Breadcrumbs | Shown only in folders (see Breadcrumbs spec) |
| Logout | Clears session and returns to login screen |
| Role switch | Reloads app with appropriate permissions and default route |

## URL Routing

| Path | View |
|------|------|
| `/documents` | Contributor view |
| `/templates` | Template Editor view |
| `/teams` | Admin-only |
| `/users` | Admin-only |
| `/demo` | Guest role selection |
| `/editor/:docId` | Editor + Preview |
| `/templates/:templateId/edit` | Template Editor panel |

---

# Stack Behavior

- Routing handled via SPA router (React Router or equivalent)
- Default views are stateless — UI loads based on route and role
- Persistent role context stored in local/session storage
- Navigation events are push-based — no full-page reloads

---

# Data Models

*None required — behavior is determined by role and routing context.*

---

# Field Definitions

| Field | Type | Notes |
|-------|------|-------|
| role | Enum | Contributor, TemplateEditor, Admin, Guest |
| defaultRoute | String | Used to set landing page on login |
| currentRoute | String | Active UI view path |

---

# Additional Technical Sections (Optional)

- Role detection occurs after login or demo mode selection
- Route changes emit analytics events (Post-MVP)

---

# Error Handling

| Condition | Behavior |
|----------|----------|
| Invalid route | Redirect to default view with toast |
| Missing permissions | Show “Access denied” message |
| Guest attempts restricted route | Redirect to demo landing page |

---

# Known Gaps / Outstanding Questions

- Should last-viewed section be persisted per role? (Effort: Medium, Status: Open)
- Do Guests need breadcrumb indicators? (Effort: Low, Status: Rejected for MVP)

---

# Future Enhancements (Post-MVP)

- User preferences for landing view
- Deep linking to document sections or team views
- In-app navigation history and back button handling

---

# Technical Dependencies

- SPA Router (React Router or equivalent)
- Role context manager
- Session/local storage handler

---

# API / Data Schema Notes

- None — all navigation is client-side

---

# Version

Navigation and Default Views Specification v2.0 — June 2025
