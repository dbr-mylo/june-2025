# Guest Demo Mode Specification — v2.0

June 2025

---

# Overview

This document defines the behavior of Guest (Demo) Mode in Mylo. Guest Mode allows users to explore Mylo without registration. All data is stored locally and discarded at session end. Role emulation is supported for testing Contributor, Template Editor, and Admin workflows.

---

# MVP Scope

- No account or registration required
- Guest may select a role on entry
- Guest session allows:
  - Document creation and editing
  - Template switching and preview
  - Style formatting in Editor
- No access to:
  - Team collaboration
  - Saved file history
  - Server storage
- All data is stored in memory and lost on tab/browser close

---

# Main Behavior Sections

## Save Behavior Rules

- Guest saves do **not** write to cloud storage
- All files are kept in browser memory
- Export to `.mylo` file is supported
- Autosave writes to in-memory state only
- Refresh or close = data loss warning shown

## UI Behavior

| Area | Behavior |
|------|----------|
| Login Page | “Try as Guest” button launches demo session |
| Role Selection | Prompted after Guest button is clicked |
| Yellow Banner | Persistent: “Demo Mode — [Role]” |
| Dashboard | Fully functional, simulates Contributor/Template Editor/Admin |
| Export | Local `.mylo` file save only |
| Import | Upload allowed, but stored locally only |

## Demo Banner

- Color: Yellow (#FFF4CC)
- Message: `"Demo Mode — Contributor"` (or selected role)
- Appears on all screens
- No ability to hide or dismiss

---

# Stack Behavior

- Guest session uses temporary token with role scope
- No Supabase auth involved
- Files are stored in `sessionStorage`
- File IDs prefixed with `guest-` to prevent collision
- Role-specific routes are unlocked based on demo selection

## Data Models

- Demo user: `{ id: 'guest-uuid', role: 'Contributor' | 'TemplateEditor' | 'Admin' }`
- Files: `{ id: 'guest-doc-123', content: {...}, createdAt: ... }`

## Field Definitions

| Field | Type | Notes |
|-------|------|-------|
| id | String | Guest-prefixed UUID |
| role | Enum | Guest-selected role |
| content | JSON | Tiptap + Template ID |
| storageType | Enum | Always "local" in demo |

---

# Additional Technical Sections (Optional)

### Browser Storage Notes

- `sessionStorage` is cleared automatically on:
  - Browser close
  - Tab close
  - Manual refresh
- No offline persistence unless `.mylo` export used

---

# Error Handling

| Condition | Behavior |
|----------|----------|
| Data loss | “Closing tab will delete demo files” alert |
| Save failure | Should not occur — memory only |
| Role mismatch | Re-initiate role selection screen |

---

# Known Gaps / Outstanding Questions

- Should Guest be able to test all features (including Admin)? (Status: Allowed in MVP)
- Should guest mode throttle features (e.g. # of templates)? (Effort: Low, Status: Open)
- Should imports validate `.mylo` format? (Effort: Medium, Status: Future)

---

# Future Enhancements (Post-MVP)

- Guest session export/import bundle
- “Copy to account” flow for registered users
- Usage analytics for demo sessions
- Pre-filled templates/examples for testing
- Persistent sandbox linked to IP/device

---

# Technical Dependencies

- Role assignment screen
- Session-state manager
- In-memory document handler
- Export/import logic for `.mylo` files

---

# API / Data Schema Notes

- No API calls made from Guest Mode (except optional font fetching)
- Export = triggers download only, no server sync

---

# Version

Guest Demo Mode Specification v2.0 — June 2025
