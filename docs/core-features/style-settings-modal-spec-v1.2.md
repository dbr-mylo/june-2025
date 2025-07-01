# Style Settings Modal Specification — v1.2

June 2025

---

# Overview

This specification defines the behavior and structure of the Style Settings modal in Mylo. This modal allows users to preview and override individual styles applied by the current Template. Changes made here affect only the current document and are not saved back to the template.

---

# MVP Scope

## Scope

- Document-specific overrides of Template-defined styles
- Supports:
  - Font family
  - Font size
  - Line height
  - Alignment
  - Spacing (before/after)
- Available to all roles except Guests

## Access

- Accessible from:
  - Document top bar → “Style Settings”
  - Right-click context menu on styled text
- Modal updates immediately reflect in Preview

---

# Main Behavior Sections

## Save Behavior Rules

- Overrides are stored in document metadata (not in the Template)
- Changes persist only within the active document
- Closing the modal does **not** discard changes unless reverted manually

## UI Behavior

| Element | Behavior |
|--------|----------|
| Style dropdown | Lists all active styles in Template |
| Property inputs | Show current Template values; editable per field |
| Reset button | Reverts style to Template default |
| Live preview | Updates instantly in Preview panel |
| Modal footer | “Save” and “Cancel” buttons apply or discard changes |

## Modal Tabs (if segmented)

- **Typography** — font, size, line height
- **Spacing** — margins, paragraph gaps
- **Alignment** — text alignment override

---

## Stack Behavior

- Overrides stored in document JSON as delta against styleId
- Template remains untouched
- In Preview, overrides are resolved after Template style is applied

---

## Data Models

### Style Override Entry

```json
{
  "styleId": "heading-1",
  "overrides": {
    "fontFamily": "Georgia",
    "lineHeight": 1.4,
    "spacingBefore": 12
  }
}
```

## Field Definitions

| Field | Type | Notes |
|-------|------|-------|
| styleId | String | Refers to Template style |
| overrides | Object | Key-value pairs for overridden fields |
| docId | UUID | Document-scoped only |
| updatedAt | ISO 8601 | Timestamp of last modification |

---

# Additional Technical Sections (Optional)

### Preview Update Logic

- Modal changes update live Preview via local patch
- No API call or full render required
- Tiptap content remains unmodified — only Preview style is affected

---

# Error Handling

| Condition | Behavior |
|----------|----------|
| Invalid value | Show input error message (e.g., "Line height must be > 0") |
| Unrecognized styleId | Skip override and log warning |
| Preview fails to update | Show alert: “Preview could not apply style override.” |

---

# Known Gaps / Outstanding Questions

- Should overrides be shown inline in the Editor as indicators? (Effort: High)
- Can users save overrides as new styles? (Effort: Medium, Post-MVP)
- Should overrides apply on export? (Yes, for MVP)

---

# Future Enhancements (Post-MVP)

- Override presets (“Small Print”, “Open Layout”, etc.)
- Show “inherited from template” vs. “customized”
- Save as style option
- Role-based override permissions

---

# Technical Dependencies

- Document override serializer
- Preview override resolver
- Modal component library
- Field validators

---

# API / Data Schema Notes

- No API involved — all logic is local

---

# Version

Style Settings Modal Specification v1.2 — June 2025
