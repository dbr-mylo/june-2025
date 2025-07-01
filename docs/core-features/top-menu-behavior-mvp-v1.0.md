# Top Menu Behavior (MVP) Specification — v1.0

June 2025

---

# Overview

This specification defines the behavior and structure of Mylo’s top application menu for the MVP. The top menu provides access to file operations, template controls, user options, and export actions. Menu items are always visible but may be disabled depending on context.

---

# MVP Scope

## Menu Categories

- File
- Edit
- View
- Insert
- Template
- Help
- User (avatar or initials)

## Menu Rules

- Menu items are **always visible**
- Items may be **disabled** when not applicable
- Items are never hidden
- Menu appears for all roles (Contributor, Template Editor, Admin)

---

# Main Behavior Sections

## Save Behavior Rules

- File > Save triggers manual save (same as autosave endpoint)
- Export options are available via File > Export submenu
- Save is disabled if no changes present

## UI Behavior

| Menu | Action | Behavior |
|------|--------|----------|
| File > Save | Manual save | Triggers save endpoint |
| File > Export (.mylo / PDF) | Export action | Triggers download dialog |
| Edit > Undo / Redo | Editor history | Uses Tiptap history stack |
| View > Zoom In/Out | Editor zoom | Zooms only Editor panel |
| Insert > Image | File picker | Adds image to Editor |
| Template > Switch | Opens template selector | Contributor view only |
| Help > Docs | Link | Opens docs in new tab |
| User > Logout | Logout | Ends session, returns to login |

- Disabled items show tooltip: “Not available in this context”
- Menu does not collapse or hide — pinned at top of viewport

---

## Stack Behavior

- Menu actions are routed through local command dispatcher
- Each item dispatches Tiptap or internal command
- Role-based visibility handled at render time

---

## Data Models

*No persistent model — menu is stateless UI.*

## Field Definitions

| Field | Type | Notes |
|-------|------|-------|
| isEnabled | Boolean | True if menu item active |
| command | Function | Handler for menu action |
| label | String | Display text |
| shortcut | String | Optional keyboard shortcut |

---

# Additional Technical Sections (Optional)

### Keyboard Shortcuts

- Cmd+S → Save
- Cmd+Z / Shift+Cmd+Z → Undo/Redo
- Cmd+P → Export as PDF
- Shortcuts shown in menu next to label

---

# Error Handling

| Condition | Behavior |
|----------|----------|
| Save fails | Toast: “Could not save changes” |
| Export fails | Toast with retry |
| Disabled action | No-op + tooltip |
| Logout error | Retry and show fallback login link |

---

# Known Gaps / Outstanding Questions

- Should menu item groups be customizable? (Post-MVP)
- Should recently used templates appear under File? (Rejected for MVP)
- Should top menu collapse on scroll? (No — pinned in MVP)

---

# Future Enhancements (Post-MVP)

- Dynamic menu based on role
- Contextual right-click options
- AI integration (Help > “Rewrite this section”)
- Custom command palette (Ctrl+K)

---

# Technical Dependencies

- Menu component system
- Tiptap command dispatcher
- Save/export engine
- User session manager

---

# API / Data Schema Notes

- No dedicated API — all commands are UI-triggered

---

# Version

Top Menu Behavior (MVP) Specification v1.0 — June 2025
