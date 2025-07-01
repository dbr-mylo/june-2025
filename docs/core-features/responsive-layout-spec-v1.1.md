# Responsive Layout Specification — v1.1

June 2025

---

# Overview

This specification defines how Mylo adapts its interface across screen sizes, including desktop, tablet, and mobile breakpoints. While the MVP is optimized for desktop use, specific layout changes ensure usability on constrained viewports.

---

# MVP Scope

## Supported Breakpoints

| Device | Min Width | Layout Mode |
|--------|-----------|-------------|
| Desktop | ≥ 1280px | Full layout with Editor + Preview |
| Tablet | 768–1279px | Stacked layout or tabbed panels |
| Mobile | < 768px | Not supported in MVP |

## Behavior Summary

- **Desktop (≥1280px)**:
  - Editor and Preview shown side by side
  - All UI elements visible
- **Tablet (768–1279px)**:
  - Editor and Preview stack vertically or toggle via tabs
  - Some toolbar elements collapse into dropdowns
  - Drag-to-resize panel disabled
- **Mobile (<768px)**:
  - Not supported; user sees warning or redirect

---

# Main Behavior Sections

## Save Behavior Rules

- Layout changes do not affect save behavior
- No autosave or content changes triggered by screen size adjustments

## UI Behavior

| Element | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| Editor + Preview | Side-by-side | Stacked or toggled | Not available |
| Toolbar | Full | Condensed | Hidden |
| Panels | Resizable | Fixed height | Not shown |
| Zoom & Ruler | Enabled | Hidden | N/A |
| Navigation | Horizontal menu | Drawer or condensed | N/A |

- Tabbed interface appears when panels cannot be shown side-by-side
- Font dropdown and Insert menu collapse into icons

---

## Stack Behavior

- Layout detection handled via CSS media queries + JS width check
- Minimum panel widths enforced at runtime (e.g., 30% per panel)
- `window.innerWidth` used to set layout mode state
- Preview rendering remains identical across breakpoints

---

## Data Models

*No persistent models required — layout is responsive-only.*

## Field Definitions

| Field | Type | Notes |
|-------|------|-------|
| layoutMode | Enum | “desktop”, “tablet”, “mobile” |
| screenWidth | Number | Used to calculate mode and resize rules |
| panelCollapsed | Boolean | True if one panel hidden or toggled |

---

# Additional Technical Sections (Optional)

### Tablet Tab Switch Logic

- Editor tab active by default
- Preview tab shown with toggle
- Tab buttons placed at top of stacked interface

---

# Error Handling

| Condition | Behavior |
|----------|----------|
| Mobile screen detected | Show: “Mylo is not yet supported on mobile devices.” |
| Resize < 768px mid-session | Modal with warning + return option |
| Zoom/ruler used on tablet | Feature hidden gracefully |

---

# Known Gaps / Outstanding Questions

- Should Preview-only mode exist for mobile? (Effort: Medium, Status: TBD)
- Can Template Editors preview layout breakpoints inside desktop mode? (Effort: Medium, Status: Post-MVP)
- Should tablet mode allow persistent 2-panel split for larger devices (e.g., iPad Pro)? (Effort: Low, Status: Open)

---

# Future Enhancements (Post-MVP)

- Mobile Preview-only mode
- Breakpoint preview toggle for Template Editors
- Fluid resizing for floating panels
- Responsive grid layout for Template mode

---

# Technical Dependencies

- CSS media queries for layout shift
- JS layout state manager
- Role-aware UI feature toggling
- Resize observer (optional)

---

# API / Data Schema Notes

- None — responsive layout is handled client-side

---

# Version

Responsive Layout Specification v1.1 — June 2025
