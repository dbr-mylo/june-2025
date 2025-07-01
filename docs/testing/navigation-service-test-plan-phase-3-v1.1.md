# Navigation Service Test Plan — Phase 3 — v1.1

June 2025

---

# Overview

This document defines Phase 3 testing for the Mylo navigation service. It includes manual and automated test cases validating route protection, role-based redirection, default views, and error handling under all user roles.

This plan builds on Phases 1–2, with a focus on Contributor, Template Editor, Admin, and Guest routing flows.

---

# Test Suites

## 1. Route Redirection (Default View)

| Scenario | Expected Behavior |
|----------|--------------------|
| User with no documents logs in | Redirect to `/dashboard` with "New Document" CTA visible |
| Template Editor with no templates | Redirect to `/templates` with empty state shown |
| Admin with no team or users configured | Redirect to `/users` with invite form |
| Guest in preview mode | Redirect to `/demo` mode entry screen |

## 2. Invalid Route Access

| Scenario | Expected Behavior |
|----------|-------------------|
| Contributor manually types `/templates/abc` | Redirect to `/dashboard` + toast: “Access denied” |
| Guest types `/docs/xyz` | Redirect to `/demo` or show “Read-only preview” screen |
| Template Editor accesses `/users` | Redirect to `/dashboard` (Admin-only route) |

## 3. Role-Based Routing Enforcement

| Role | Route | Access |
|------|-------|--------|
| Contributor | `/dashboard`, `/docs/:id`, `/preview/:id` | ✅ |
| Template Editor | All Contributor routes + `/templates`, `/style-settings` | ✅ |
| Admin | All Template Editor routes + `/users`, `/teams`, `/trash`, `/audit` (future) | ✅ |
| Guest | `/demo`, `/preview`, limited `/docs/:id` | ✅ (local only) |

## 4. Breadcrumb Reset + Integrity

| Scenario | Expected Behavior |
|----------|-------------------|
| Navigate into subfolder and then back | Breadcrumb updates accordingly |
| Open doc from dashboard | Shows: `Documents > [Folder] > [Doc Name]` |
| Invalid nested route | Breadcrumb resets to top-level dashboard |
| Switch templates during edit | Breadcrumb remains stable (no routing event) |

## 5. Save and Routing Sync

| Trigger | Expected Result |
|--------|------------------|
| Role switch while unsaved | Autosave triggers, route continues |
| Cmd+S then route change | Snapshot saved, route change proceeds |
| Offline + route change | Local save banner shown, route still allowed |

## 6. Mobile Navigation (Prep Only)

| Target | Future Phase |
|--------|--------------|
| Mobile drawer collapse | Phase 4 |
| Tap vs swipe interactions | Phase 4 |
| Back stack on mobile | Phase 4 |

---

# Test Assertion Samples

| Category | Assertion |
|----------|-----------|
| Route redirection | Page URL = expected route + visible CTA |
| Role block | Toast appears = “Access denied”; redirected |
| Breadcrumb integrity | Breadcrumb reflects last valid route |
| Guest routing | Guest never sees team-based routes |
| Save-on-route-change | Save API is triggered before route resolves |

---

# Known Gaps

- No automated mobile gesture tests
- No snapshot diff of route-related saves
- No visual breadcrumbs test automation

---

# Future Enhancements

- Add mobile nav suite in Phase 4
- Add reroute tracking analytics
- Add breadcrumb fallback coverage
- Snapshot logging tied to route change events

---

# Version

Navigation Service Test Plan — Phase 3 — v1.1 — June 2025
