# Template Settings Behavior Specification

This document defines the inheritance rules and interaction behavior between **Template Settings** and **Template Styles** in Mylo.

It ensures consistent creation and modification behavior for Templates while allowing manual overrides.

---

# Overview

Templates in Mylo consist of two linked components:

| Component | Description |
|:---|:---|
| **Template Settings** | Global defaults for Typography, Hyphenation, and List behavior. |
| **Template Styles** | Specific visual definitions applied to text elements. |

Template Settings act as default values that are **applied at the moment a new Style is created**.  
After creation, Styles maintain independent control.

---

# Inheritance Behavior

| Situation | Behavior |
|:---|:---|
| Template Settings created **before** a Style | New Styles automatically inherit current Template Settings. |
| Template Settings updated **after** Styles already exist | Existing Styles **retain** their original values (no forced update). |
| New Style created after Settings are changed | New Style inherits the latest Template Settings. |
| Manual override inside a Style | Manual values always override inherited Settings. |

---

# Visual Model (Text Diagram)

```
Template Settings
      ↓ (when creating new Style)
Template Style ← Manual Override (optional)
```

- Settings **seed** default values.
- After creation, Styles **own** their values independently.

---

# Example Scenario

1. Template Editor sets Template Settings:
   - Default font: Open Sans
   - Default font size: 12pt
   - Hyphenation: enabled
2. Template Editor creates Heading 1 Style.
   - Heading 1 defaults to Open Sans, 12pt, hyphenation enabled.
3. Later, Template Editor changes Template Settings:
   - Default font: Roboto
   - Default font size: 14pt
4. Result:
   - Heading 1 keeps Open Sans 12pt unless manually edited.
   - New styles created after this point default to Roboto 14pt.

---

# Save Behavior Rules

- When saving a Template:
  - `templateSettings` and `styles` must be serialized separately.
  - Settings updates **do not mutate existing Styles** automatically.
- When creating a new Style:
  - Pull the latest available Template Settings as the starting point.
- When editing an existing Style:
  - Respect Style's stored values unless manually reset to defaults.

---

# Error Handling

| Issue | Behavior |
|:---|:---|
| Settings are invalid or missing required fields | Block Template Save until corrected. |
| Style references missing Setting field | Fall back to safe system defaults (e.g., system font). |

---

# Future Enhancements (Post-MVP)

- Allow Style reset button ("Reset to Template Settings") per style.
- Show "Modified" indicators when a Style deviates from Template Settings.
- Support Template Settings versioning (track changes separately).

---

# Version

Template Settings Behavior Specification v1.0 — April 2025
