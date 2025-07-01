# Mylo API Contract — Template Save Specification v2.1

June 2025

---

# Overview

This document defines the API contract for saving and loading Templates in Mylo. A Template includes both global settings and reusable styles, and is central to enforcing document consistency across Contributors.

---

# MVP Scope

- Templates include:
  - Template Settings (global defaults)
  - Template Styles (specific formatting)
- Template save requires full payload — partial updates are not allowed.
- Templates must be assigned to at least one document for usage.
- Each Template includes authoring and status metadata.

---

# Main Behavior Sections

## Save Behavior Rules

- Templates must always include both `templateSettings` and `styles`.
- `templateSettings` initialize default values but do not overwrite existing styles.
- Styles created after a settings update inherit new defaults.
- Drafts can be saved with partial configuration (not MVP).
- Timestamps must follow ISO 8601 UTC format.

## UI Behavior

*Not directly applicable to API but should display Save and Status messages after update.*

## Stack Behavior

- Template save calls write to a single Supabase template record.
- Templates are uniquely identified by UUID.
- Changes are atomic — no partial persistence.

## Data Models

### Template Payload

```json
{
  "id": "template-uuid-5678",
  "name": "Corporate Report Style",
  "createdBy": "user-uuid-1234",
  "status": "Published",
  "templateSettings": {
    "typography": {
      "defaultFont": "Open Sans",
      "defaultFontSize": 12,
      "kerning": "standard",
      "lineHeight": 1.5
    },
    "hyphenation": {
      "enabled": true,
      "language": "en-US",
      "exceptions": ["Mylo", "Supabase"]
    },
    "listStyles": {
      "unorderedListMarker": "•",
      "orderedListFormat": "number",
      "listIndent": 24
    }
  },
  "styles": {
    "fonts": {
      "headingFont": "Roboto",
      "bodyFont": "Open Sans"
    },
    "fontSizes": {
      "heading1": 24,
      "heading2": 18,
      "body": 12
    },
    "colors": {
      "primaryText": "#000000",
      "secondaryText": "#555555",
      "background": "#FFFFFF",
      "linkColor": "#1A0DAB"
    },
    "spacing": {
      "lineHeight": 1.5,
      "paragraphSpacing": 12
    },
    "alignment": {
      "headingAlignment": "center",
      "bodyAlignment": "left"
    }
  },
  "createdAt": "2025-04-26T17:30:00Z",
  "updatedAt": "2025-04-27T12:00:00Z"
}
```

## Field Definitions

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | UUID | ✅ | Unique template identifier |
| name | String | ✅ | Display name of the Template |
| createdBy | UUID | ✅ | Author’s user ID |
| status | Enum | ✅ | `"Draft"`, `"Published"`, `"Unpublished"` |
| templateSettings | Object | ✅ | Global defaults (see below) |
| styles | Object | ✅ | Reusable styles for formatting |
| createdAt | ISO 8601 | ✅ | Creation timestamp |
| updatedAt | ISO 8601 | ✅ | Last updated timestamp |

---

# Template Settings Field Breakdown

| Section | Field | Type | Validation | Notes |
|--------|-------|------|------------|-------|
| Typography | `defaultFont` | String | Required | |
| Typography | `defaultFontSize` | Integer (6–72) | Required | |
| Typography | `kerning` | Enum ("standard", "optical") | Optional | Reserved |
| Typography | `lineHeight` | Float (1.0–3.0) | Required | |
| Hyphenation | `enabled` | Boolean | Required | |
| Hyphenation | `language` | String (ISO code) | Optional | |
| Hyphenation | `exceptions` | Array of Strings | Optional | |
| Lists | `unorderedListMarker` | Symbol | Optional | |
| Lists | `orderedListFormat` | Enum ("number", "letter") | Optional | |
| Lists | `listIndent` | Integer (0–100) | Optional | |

---

# Additional Technical Sections (Optional)

*None currently.*

---

# Error Handling

| Condition | Behavior |
|----------|----------|
| Missing name or styles | Reject with error |
| Font size outside bounds | Reject with message: “Font size must be between 6 and 72” |
| Invalid hex colors | Reject with message: “Invalid color code” |
| Partial payload | Reject save; must include settings and styles |

---

# Known Gaps / Outstanding Questions

- Should templates validate embedded fonts before save? (Effort: Medium, Status: Open)
- Should `createdBy` be system-generated or overrideable? (Effort: Low, Status: Clarify)
- Should styles reference design tokens or raw values? (Effort: Medium, Status: Future refactor)

---

# Future Enhancements (Post-MVP)

- Support for named style groups
- Style inheritance support across templates
- Optical kerning + fallback font stacks
- Template preview rendering for verification

---

# Technical Dependencies (Optional)

- Supabase storage bucket for templates
- Save validator for typography and spacing
- Font metadata store

---

# API / Data Schema Notes (If Applicable)

- Template object is saved as JSON blob in Supabase.
- Save endpoint: `POST /api/templates/save`

---

# Version

Mylo API Contract — Template Save Specification v2.1 — June 2025
