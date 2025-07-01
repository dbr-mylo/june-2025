# Zoom Functionality Specification — v1.2

June 2025

---

# Overview

This specification defines how zooming works in Mylo’s Editor and Preview panels. Zoom allows users to focus on content by adjusting the visible scale of the interface. Each panel’s zoom is handled independently and does not affect document layout or formatting.

---

# MVP Scope

## Supported Zoom Behavior

- Zoom applies to the Editor and Preview independently
- Zoom affects only visual scale — does not change layout or text size in export
- Zoom levels are remembered per session

## Zoom Ranges

| Panel | Min | Max | Increment |
|-------|-----|-----|-----------|
| Editor | 50% | 200% | 25% |
| Preview | 25% | 200% | 25% |

## Roles

- All roles can zoom
- Guest zoom is persistent for session only

---

# Main Behavior Sections

## Save Behavior Rules

- Zoom level is not saved to the document
- It is session-specific and resets on refresh
- Does not affect autosave behavior

## UI Behavior

| Action | Behavior |
|--------|----------|
| Cmd + / - | Zoom in/out (Editor or Preview depending on focus) |
| Ctrl-scroll | Zoom (if enabled) |
| Zoom dropdown | Lists available levels (e.g., 100%, 125%, 150%) |
| Reset zoom | Button to return to 100% |
| Document export | Not affected by zoom level |
| Guest user | Zoom setting lost on refresh |

---

## Stack Behavior

- Zoom managed via CSS transform or scale on content container
- Setting stored in memory per panel
- Zoom dropdown updates based on active panel
- Role-aware zoom limits enforced

---

## Data Models

*No persistent model for zoom level.*

## Field Definitions

| Field | Type | Notes |
|-------|------|-------|
| zoomLevel | Number | 0.25 to 2.0 (multiplicative scale) |
| panel | Enum | “editor”, “preview” |
| isZoomed | Boolean | True if not at 1.0 (100%) |

---

# Additional Technical Sections (Optional)

### Panel Isolation

- Each panel has separate zoom memory
- Switching roles or templates resets zoom
- Zoom buttons may disable when panel too narrow

---

# Error Handling

| Condition | Behavior |
|----------|----------|
| Zoom outside limits | Input blocked |
| Zoom fails | Toast: “Zoom error — try again” |
| Invalid dropdown selection | Reverts to last valid setting |

---

# Known Gaps / Outstanding Questions

- Should zoom settings persist across sessions? (Status: Post-MVP)
- Should Contributors be able to zoom both panels simultaneously? (Open)
- Should zoom affect scroll behavior on mobile/tablet? (Deferred)

---

# Future Enhancements (Post-MVP)

- Persistent zoom across documents
- Fit-to-page and Fit-to-width modes
- Trackpad pinch zoom
- Zoom shortcuts in top menu

---

# Technical Dependencies

- Zoom state manager (per panel)
- CSS transform implementation
- Keyboard shortcut listener

---

# API / Data Schema Notes

- No API or server storage — client-only behavior

---

# Version

Zoom Functionality Specification v1.2 — June 2025
