# Mylo Zoom Functionality Specification

Zoom enables users to adjust the canvas scale for readability and design precision. This spec covers the behavior for Contributors and Template Editors, with Admins inheriting both.

---

# Overview

Users need to zoom in and out of their documents or templates for better legibility and precise layout adjustments. Contributors focus on readability when writing, while Template Editors require fine-grained control similar to design tools.

---

# MVP Scope

- Basic zoom controls integrated into the toolbar/dashboard:
  - Zoom slider or dropdown for continuous zoom levels.
  - Preset levels (e.g., 25%, 50%, 100%, 200%).
- Keyboard shortcuts:
  - `Ctrl`/`Cmd` `+` and `-` to zoom in/out.
  - `0` (zero) to reset to 100%.
- Role-based zoom ranges & features:
  - **Contributors**: 50%–200% (focus on readability).
  - **Template Editors**: 10%–800% (focus on design precision).
    - **Zoom-to-fit** and **Zoom-to-selection** only for Template Editors.
    - **Pinch-to-zoom** on trackpads (Template Editors first; later for Contributors).
- Zoom state persists for the session only.

---

# Zoom Behavior Rules

- **Role-Based Configuration**  
  Use a shared `useZoom()` hook that returns `{ min, max, steps }` according to role:
  ```ts
  function getZoomConfig(role) {
    return role === 'Template Editor'
      ? { min: 0.1, max: 8, steps: [0.25, 0.5, 1, 2, 4, 8] }
      : { min: 0.5, max: 2, steps: [0.5, 1, 1.5, 2] };
  }

### Continuous and Preset Controls

- Slider for any value between `min` and `max`.  
- Dropdown for preset steps.

### Keyboard Shortcuts

- `Ctrl`/`Cmd` `+` increases zoom by one step.  
- `Ctrl`/`Cmd` `-` decreases zoom by one step.  
- `Ctrl`/`Cmd` `0` resets zoom to 1.

### Advanced Zoom Features

- **Fit to width** (Template Editors only): Calculates zoom so content width matches current pane width.  
- **Zoom-to-selection** (Template Editors only): Zooms to the bounds of the current text or element selection.  
- **Pinch-to-zoom support**:  
  - Template Editors can pinch on trackpads to adjust zoom continuously.  
  - Contributors may gain pinch support in a later release.  
- **Sync Zoom** toggle (optional) to mirror zoom levels across panes.

### Error Handling

| Scenario                            | System Response                                 | User Message                                 |
|-------------------------------------|-------------------------------------------------|----------------------------------------------|
| Invalid zoom value (out of range)   | Clamp to nearest valid value (`min` or `max`)   | (No user message)                            |
| Zoom operation fails                | Revert to previous zoom level                   | "Unable to adjust zoom. Please try again."   |
| Reset shortcut unrecognized         | No action                                       | (Silent failure)                             |

### Future Enhancements (Post-MVP)

- Persist zoom level per document per user.  
- Mini-map for navigation (Template Editors).  
- Animated zoom transitions and easing curves.  
- Accessibility presets (e.g., “Page Width”, “Actual Size”).

### Version

Mylo Zoom Functionality Specification v1.1 — April 2025

