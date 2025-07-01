# Font Size Controls Specification — v1.1

June 2025

---

# Overview

This specification defines how font sizes are selected, applied, displayed, and validated across the Editor and Preview panels in Mylo. The system supports both preset sizes and manual input within a defined range.

Font size applies only to the Editor. Final size presentation in the Preview is defined by the active Template.

---

# MVP Scope

## Contributor Role

- Can:
  - Select from preset font sizes in the dropdown
  - Manually enter a value (1–99pt)
  - Use increment (`+`) or decrement (`–`) buttons
- Size formatting is visible only in the Editor
- Preview ignores manual font sizes unless in Freeform mode

## Template Editor Role

- Can:
  - Apply font sizes to set up styles
  - Save font sizes as part of styles
- Font size is stored in the Template metadata and rendered in Preview

## Default Presets

| Preset | Size |
|--------|------|
| Small | 8pt |
| Normal | 11pt |
| Medium | 14pt |
| Large | 18pt |
| XL | 24pt |
| XXL | 32pt |

- All presets are editable by Template Editors via style definitions

---

# Main Behavior Sections

## Save Behavior Rules

- Font size is stored inline in the Tiptap JSON
- Editor state always includes `fontSize` if applied
- Template styles override font sizes in Preview except in Freeform

## UI Behavior

| Element | Behavior |
|--------|----------|
| Font Size Dropdown | Displays presets and allows manual entry |
| Input Validation | Clamped to 1–99pt |
| Increment/Decrement | Steps of 1pt |
| Tooltip | Shows active size value when hovering preset |
| Style Mismatch Indicator | (Future) Flags when Editor size differs from Template preview |

## Freeform Mode Behavior

- Font sizes in Editor = font sizes in Preview
- All formatting is respected
- Export reflects Editor appearance directly

---

# Stack Behavior

- Font size is applied via:
  - `@tiptap/extension-text-style`
  - `@tiptap/extension-font-size` (customized for Mylo)
- JSON output uses inline `font-size` declarations

## Data Models

### Tiptap Node Mark Example

```json
{
  "type": "text",
  "text": "Sample",
  "marks": [
    {
      "type": "textStyle",
      "attrs": {
        "fontSize": "18pt"
      }
    }
  ]
}
```

## Field Definitions

| Field | Type | Notes |
|-------|------|-------|
| fontSize | String | Must include `pt` unit |
| allowedRange | Integer (1–99) | Validated in UI |
| presets | Array | Used to populate dropdown |

---

# Additional Technical Sections (Optional)

- Font size input uses `type="number"` with clamping logic
- Presets mapped to internal style tokens for consistency

---

# Error Handling

| Condition | Behavior |
|----------|----------|
| Value < 1 or > 99 | Rejected; input reset to last valid |
| Invalid type (e.g. text) | Rejected; error toast shown |
| Font size ignored in Preview | Normal behavior unless in Freeform |

---

# Known Gaps / Outstanding Questions

- Should sizes <6pt trigger a UI warning? (Effort: Low, Status: TBD)
- Should Template Editors be able to lock size presets? (Effort: Medium, Status: Deferred)
- Should font size syncing between Editor and Preview be toggleable? (Effort: Medium, Status: Post-MVP)

---

# Future Enhancements (Post-MVP)

- Relative font sizing (%, em, rem)
- Style audit to normalize inconsistent sizes
- Visual preview inside dropdown
- Style conflict indicators between Editor and Template

---

# Technical Dependencies

- `@tiptap/extension-font-size` (customized)
- `@tiptap/extension-text-style`
- Tiptap JSON parser
- Preview engine override handler

---

# API / Data Schema Notes

*None — font size is stored in Tiptap content only, not saved separately.*

---

# Version

Font Size Controls Specification v1.1 — June 2025
