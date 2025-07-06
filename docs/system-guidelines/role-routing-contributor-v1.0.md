# Role-Based Routing and Permissions — Contributor — v1.0

June 2025

---

# Overview

This document defines routing access, feature visibility, and behavioral limitations for the **Contributor** role. Contributors are content creators and cannot edit styles, templates, or layout logic. All Contributor behavior is scoped to writing and reviewing via the Preview panel.

---

# Routing Access

| Route | Access | Notes |
|-------|--------|-------|
| `/dashboard` | ✅ | Shows user’s own documents only |
| `/docs/:id` | ✅ | Can edit and autosave own documents |
| `/preview/:id` | ✅ | Live Preview of applied template (read-only) |
| `/templates` | 🚫 | Not accessible — no template editing |
| `/templates/:id` | 🚫 | Not accessible — redirected to dashboard |
| `/style-settings` | ✅ | Can override styles (within limits) |
| `/trash` | ✅ | Only sees their own trashed documents |
| `/visitor` | 🚫 | No access to Guest mode or demo tools |

---

# Contributor Permissions

| Feature | Access |
|---------|--------|
| Edit content | ✅ |
| Apply manual formatting | ✅ (Preview will override) |
| Switch template (if multiple available) | ✅ |
| See full template styles | 🚫 |
| Edit layout or artwork | 🚫 |
| Upload fonts | 🚫 |
| Use style inference tools | 🚫 |
| Override page size or spacing rules | 🚫 |

---

# Denied Feature Behavior

- Buttons shown but disabled for:
  - Styles panel
  - Template editor tools
- Tooltips: “Only available to Template Editors”
- Top menu hides all layout, artwork, or export settings not applicable
- No visual layout drawing tools

---

# Template Switching Rules

- Contributors may switch between assigned templates
- When switching:
  - A warning modal appears: “Switching templates will change formatting”
  - Writer’s manual formatting may be ignored
- Post-switch:
  - Preview panel reflects new styles immediately
  - Editor content is preserved

---

# Fallback + Routing Errors

| Condition | Behavior |
|----------|----------|
| Tries to access `/templates/:id` | Redirect to `/dashboard` |
| Manually types restricted route | Toast: “You do not have permission to access this page.” |
| Tries to edit layout region | Action blocked silently |

---

# Known Gaps

- No “template diff viewer” available yet
- Contributors cannot preview multiple layout variants (Post-MVP)
- No inline marker showing overridden styles

---

# Future Enhancements (Post-MVP)

- “Why did this change?” tooltip in Preview panel
- Bubble UI for explaining enforced styles
- Optional freeform mode toggle (admin-controlled)
- Real-time formatting feedback in Editor

---

# Version

Role Routing Specification — Contributor — v1.0 — June 2025
