# Editor-Preview Split & Zoom Integration Specification — v1.2

June 2025

---

# Overview

This specification defines the behavior of the draggable split handle, zoom controls, and ruler system within the Mylo Editor + Preview workspace. These features improve layout control, precision formatting, and accessibility during document editing.

---

# MVP Scope

- Resizable split view between Editor and Preview
- Zoom controls for scaling Preview panel content
- Editor rulers (top and left) with unit toggle (px/pt)
- Minimum width enforcement per panel
- Fit-to-width and preset zoom levels
- Session persistence for layout and zoom settings
- Fully accessible controls for all roles (excluding Guest)

---

# Main Behavior Sections

## Save Behavior Rules

- Zoom state and split ratio are stored per session; not saved with document
- No save or export actions triggered by layout changes

## UI Behavior

### Split Handle

- Vertical bar with drag icon
- Drag left/right to resize panels
- Cursor: `↔` on hover
- Double-click resets to 50/50
- Width clamp: 30% minimum per panel
- Focus returns to last active panel after resize

### Zoom Controls

- Toolbar includes:
  - Continuous slider
  - Presets: 25%, 50%, 100%, 200%
  - Keyboard shortcuts:
    - `Ctrl`/`Cmd +` to zoom in
    - `Ctrl`/`Cmd -` to zoom out
    - `Ctrl`/`Cmd 0` to reset
- “Fit to width” matches preview width to available panel width
- Optional “Sync Zoom” toggle for mirrored scaling across panels

### Rulers (Editor Only)

- Top and left edges of the Editor panel
- Default units: pixels (`px`)
- Toggle available to switch to points (`pt`)
- Major ticks every 50 units, minor every 10
- Updates on zoom and panel resize
- Does not appear in Preview

## Responsive Behavior

- On tablets (<1024px):
  - Editor and Preview stack vertically or tabbed
  - Handle, rulers, and zoom controls are hidden

---

# Stack Behavior

- Zoom is stored in local/session storage
- Panel layout responds to changes in pane width but does not affect document formatting
- Keyboard and pointer events update internal layout state

## Data Models

*None required — all state is UI/transient.*

## Field Definitions

| Field | Type | Notes |
|-------|------|-------|
| zoomLevel | Float (0.25–2.0) | Stored per pane |
| splitRatio | Float (0.3–0.7) | Left/right ratio |
| rulerUnit | Enum ("px", "pt") | Display unit toggle |

---

# Additional Technical Sections (Optional)

### ARIA & Accessibility

- Split handle: `role="separator"` with `aria-orientation`
- Ruler unit toggle: focusable button with label
- Zoom slider: `aria-valuemin`, `aria-valuemax`, and `aria-valuenow` support

---

# Error Handling

| Condition | Behavior |
|----------|----------|
| Drag outside bounds | Clamp to min/max widths |
| Invalid zoom level | Reset to last valid value |
| Ruler toggle fails | Log error, revert to previous unit |
| Zoom storage fails | Fall back to default (100%) |

---

# Known Gaps / Outstanding Questions

- Should ruler guides be clickable in MVP? (Effort: High, Status: Deferred)
- Should zoom persist across sessions per user or per doc? (Effort: Medium, Status: Open)
- Do we need separate zoom per panel in multi-monitor setups? (Effort: Low, Status: Future)

---

# Future Enhancements (Post-MVP)

- Animated transitions for ruler ticks
- Guide-dragging from ruler
- Per-user zoom and layout preferences
- External Preview window
- Zoom-aware mini-map

---

# Technical Dependencies (Optional)

- Resize observer for split tracking
- Session storage interface
- Ruler rendering engine (canvas or SVG)
- Scroll/zoom listener hooks

---

# API / Data Schema Notes (If Applicable)

- None — all features are client-only and transient

---

# Version

Editor-Preview Split & Zoom Integration Specification v1.2 — June 2025
