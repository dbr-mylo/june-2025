# Mylo Editor-Preview Split & Zoom Integration Specification

This specification defines the behavior of the draggable handle between the Editor and Preview panes, how zoom controls work, and the placement of rulers on the Editor panel.

---

# Overview

Users can resize the Editor and Preview panels with a draggable handle while keeping zoom (content scale) independent. Top and left rulers on the Editor panel show measurements in px or pt.

---

# MVP Scope

- **Draggable split handle** between Editor and Preview.  
- **Minimum pane width** of 30% each.  
- **Persistent split ratio** for the session.  
- **Zoom controls** (slider, presets, shortcuts) remain in toolbar.  
- **“Fit to width”** option adjusts zoom based on current pane width.  
- **Rulers** on the Editor panel (top + left) with unit switch px⇄pt.  
- Both features apply to **Contributor** and **Template Editor** roles (Admins inherit).

---

# Handle Behavior Rules

- Display a vertical bar with drag icon; cursor = `↔` on hover.  
- Drag left/right to adjust pane widths.  
- Enforce min width 30% for each pane.  
- Double-click handle resets to 50/50 split.  
- Persist split ratio in session storage per document.

---

# Zoom Behavior Rules

- **Independent**: Dragging handle changes pane widths only; does not affect zoom.  
- **Zoom controls**:  
  - Slider for continuous zoom (between role-based min/max).  
  - Dropdown for presets (25%, 50%, 100%, 200%).  
  - `Ctrl`/`Cmd +` and `-` to adjust, `0` to reset.  
- **Fit to width**: Calculates zoom so content width matches current pane width.  
- Optional **“Sync Zoom”** toggle to mirror zoom levels across panes.

---

# Editor Panel Rulers

- **Top and Left Rulers** appear around the Editor pane.  
- Rulers default to **px**, with a **unit toggle** (px / pt) in the toolbar.  
- Marks every 50px (or 50pt) with smaller tick marks at 10px increments.  
- Rulers update on pane resize and zoom changes.  
- **ARIA**: `role="separator"`, `aria-orientation="horizontal"` / `vertical`, and `aria-valuemin/max` for assistive technologies.

---

# Responsive & Accessibility

- **Tablet View (<1024px)**: switch to tabbed Editor/Preview; hide split handle and rulers.  
- **ARIA & Focus**:  
  - Handle uses `role="separator"`.  
  - Unit toggle and zoom controls keyboard-navigable.  
  - After zoom or drag, keep focus on the Editor content for screen readers.

---

# Error Handling

| Scenario                             | Response                                     | Message                                 |
|--------------------------------------|----------------------------------------------|-----------------------------------------|
| Drag beyond limits                   | Clamp split to min/max widths                | (no message)                            |
| Zoom value out of range              | Clamp to role-based min/max                  | (no message)                            |
| Ruler unit toggle fails              | Retain previous unit and log error           | “Could not change ruler units.”         |

---

# Future Enhancements (Post-MVP)

- **Animated transitions** for ruler ticks on zoom.  
- **Per-user persistence** of split ratio, zoom, and unit preference.  
- **Additional units** (e.g., em, rem).  
- **Measurement guides**: click drag on ruler to draw guides.  
- **Mini-map** integration synced with zoom.

---

# Version

Mylo Editor-Preview Split & Zoom Integration Specification v1.2 — April 2025
