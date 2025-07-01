# Template Settings Specification — v2.0

June 2025

---

# Overview

Template Settings define the global design defaults every document starts with. These settings apply automatically to all new documents created from the template. They include page layout, spacing behavior, and advanced formatting rules that are not style-specific.

Template Settings are configured by Template Editors and are stored as part of the full template object.

---

# MVP Scope

## Template Settings Include

- Page layout (size, margins)
- Global hyphenation rules
- Default spacing normalization (space after hard return, multiple spaces)
- Widow control options
- Language + locale

## Role Access

| Role | Access |
|------|--------|
| Contributor | Read-only (via Preview only) |
| Template Editor | Full access |
| Admin | Full access |

---

# Main Behavior Sections

## Save Behavior Rules

- Template Settings are saved together with Styles as part of the Template
- Changes take effect immediately in Preview when editing
- Saved settings are applied to all new documents created from the template
- Editing Template Settings does not retroactively affect existing documents

## UI Behavior

| Setting | Control Type | Notes |
|---------|--------------|-------|
| Page Size | Dropdown + custom dimensions | Supports presets (A4, Letter) |
| Margins | Numeric inputs (Top, Right, Bottom, Left) | Measured in points |
| Hyphenation | Toggle + min prefix/suffix inputs | Language-sensitive |
| Remove extra spaces | Toggle | Normalizes >1 space into 1 |
| Collapse hard return spacing | Toggle | Removes space after newline |
| Widow control | Toggle | Alert shown if widows detected |
| Language/Locale | Dropdown | Defaults to English-US |

---

## Stack Behavior

- Stored within the Template JSON object
- Settings cascade into Preview engine and PDF export
- Contributor Editor ignores these settings — Preview enforces them

---

## Data Models

### Template Settings Block

```json
{
  "page": {
    "size": "Letter",
    "customWidth": null,
    "customHeight": null,
    "margins": {
      "top": 72,
      "right": 72,
      "bottom": 72,
      "left": 72
    }
  },
  "hyphenation": {
    "enabled": true,
    "minPrefix": 3,
    "minSuffix": 3
  },
  "spacing": {
    "removeMultipleSpaces": true,
    "removeHardReturnSpace": true
  },
  "widowControl": true,
  "language": "en-US"
}
```

## Field Definitions

| Field | Type | Notes |
|-------|------|-------|
| page.size | Enum | “Letter”, “A4”, or custom |
| page.customWidth/Height | Number | Optional, in points |
| margins | Object | Top, right, bottom, left (points) |
| hyphenation.enabled | Boolean | Global toggle |
| minPrefix/Suffix | Number | Min characters before/after hyphenation |
| removeMultipleSpaces | Boolean | Collapses spacing to one |
| removeHardReturnSpace | Boolean | Strips spacing after newline |
| widowControl | Boolean | Suggests fix to user |
| language | String | Locale code (e.g., “en-US”) |

---

# Additional Technical Sections (Optional)

### Margin Input Validation

- Range: 0–200pt
- Default: 72pt each side
- Errors shown if invalid or negative

---

# Error Handling

| Condition | Behavior |
|----------|----------|
| Invalid margin input | Field highlights red + tooltip |
| Unsupported page size | Defaults to “Letter” |
| Language code missing | Fallback to “en-US” |
| Hyphenation misconfigured | Disabled automatically |

---

# Known Gaps / Outstanding Questions

- Should users preview settings changes in document view before saving? (Status: TBD)
- Can Template Settings be versioned separately from styles? (Post-MVP)

---

# Future Enhancements (Post-MVP)

- Auto-detect document language
- Template setting variants per document type
- Dynamic margin adjustments based on layout zones
- Export presets for different regions (A4, Legal, etc.)

---

# Technical Dependencies

- Template object schema
- Settings modal/component for Template Editor
- Preview engine style resolver

---

# API / Data Schema Notes

- All Template Settings stored in JSON alongside Styles

---

# Version

Template Settings Specification v2.0 — June 2025
