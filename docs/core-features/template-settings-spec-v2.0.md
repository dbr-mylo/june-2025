
# Mylo Template Settings Specification v2.0 — June 2025

---

# Overview

Template Settings define the global layout, formatting rules, and design constraints applied at the Preview and Export levels. They do **not** affect or override Contributor formatting in the Editor Panel.

These settings serve as the design foundation for all documents using a specific template and are configured only by Template Editors or Admins. Template Settings are stored together with Styles in the template JSON schema.

---

# MVP Scope

## Page Layout

- Set page size (e.g., A4, Letter) from predefined dropdown
- Set individual margins (top, right, bottom, left) via numeric input
- Define document orientation (Portrait / Landscape)

## Global Formatting

- Enable/disable hyphenation with basic rules:
  - Min prefix/suffix character limits
- Paragraph spacing rules:
  - Treat double spaces as single space
  - Trim trailing space after hard returns
- Text direction: LTR / RTL (optional toggle)

## Spacing & Flow

- Line height multiplier
- Paragraph spacing before/after
- Widow/orphan control (basic on/off toggle for MVP)

---

# UI Behavior

- Template Editors adjust Template Settings via a dedicated panel
- Settings persist to the template object and update the Preview Panel in real time
- Contributors **never** see or edit Template Settings
- Any changes reflect only in Preview — Editor formatting is unaffected

---

# Error Handling

| Scenario                                   | Behavior                                                   |
|--------------------------------------------|-------------------------------------------------------------|
| Invalid page size setting                  | Default to A4 with warning banner                           |
| Margin values exceed page dimensions       | Auto-correct with visual warning                           |
| Corrupted settings JSON                    | Fallback to safe defaults and show error in Preview Panel  |

---

# Known Gaps / Outstanding Questions

- Should Template Settings offer optical margin alignment for display text? (Effort: Medium)
- Should line height/spacing be constrained by font size ranges? (Effort: Low)
- How should widow control be tested in Preview before document is finalized? (Effort: High)
- Should spacing rules apply to template sample content in the editor preview? (Effort: Medium)

---

# Future Enhancements (Post-MVP)

- Advanced spacing rules: keep with next, paragraph grouping
- Conditional page breaks based on content block type
- Baseline grid definition and snapping
- Automatic adjustment of layout on font or style change

---

# Technical Dependencies

- Template schema storage in Supabase (JSON)
- Layout engine for Preview Panel rendering
- Style system integration for applying spacing, hyphenation, and flow controls

---

# API / Data Schema Notes

## Template Settings JSON (Simplified)

```json
{
  "page_size": "Letter",
  "orientation": "portrait",
  "margins": {
    "top": 40,
    "bottom": 40,
    "left": 36,
    "right": 36
  },
  "hyphenation": {
    "enabled": true,
    "min_prefix": 3,
    "min_suffix": 2
  },
  "line_height": 1.5,
  "paragraph_spacing": {
    "before": 12,
    "after": 12
  },
  "spacing_rules": {
    "trim_double_spaces": true,
    "trim_after_returns": true
  },
  "widow_control": true
}
```

---

# Version

Mylo Template Settings Specification v2.0 — June 2025
