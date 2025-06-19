# Mylo API Contract — Template Save Specification

This document defines the API contract for saving and loading Templates in Mylo.

It establishes the required fields for both **Template Settings** and **Template Styles**, and clarifies how they interact.

---

# Overview

Templates now consist of two main sections:

| Section | Description |
|:---|:---|
| **Template Settings** | Global defaults for Typography, Hyphenation, and Lists. |
| **Template Styles** | Specific font, color, and spacing definitions applied to document elements. |

Template Settings act as defaults for newly created Styles, but existing Styles maintain their own properties independently after creation.

---

# Save Payload Structure

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
      "kerning": "standard", // Reserved for future optical kerning support
      "lineHeight": 1.5
    },
    "hyphenation": {
      "enabled": true,
      "language": "en-US",
      "exceptions": ["Mylo", "Supabase"]
    },
    "listStyles": {
      "unorderedListMarker": "•",
      "orderedListFormat": "number", // "number" or "letter"
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

---

# Field Definitions

| Field | Type | Required | Description |
|:---|:---|:---|:---|
| `id` | UUID String | ✅ | Unique identifier for the Template. |
| `name` | String | ✅ | Display name; must be unique per organization. |
| `createdBy` | UUID String | ✅ | ID of the user who created the Template. |
| `status` | Enum: `"Draft"`, `"Published"`, `"Unpublished"` | ✅ | Publication status. |
| `templateSettings` | JSON Object | ✅ | Global defaults for typography, hyphenation, and lists. |
| `styles` | JSON Object | ✅ | Specific styling rules for document formatting. |
| `createdAt` | ISO 8601 Timestamp | ✅ | Template creation timestamp. |
| `updatedAt` | ISO 8601 Timestamp | ✅ | Last modification timestamp. |

---

# Template Settings Field Breakdown

| Subsection | Field | Type | Validation | Notes |
|:---|:---|:---|:---|:---|
| Typography | `defaultFont` | String | Required | Default font family. |
| Typography | `defaultFontSize` | Integer (6–72) | Required | Default base font size (pt). |
| Typography | `kerning` | Enum: `"standard"`, `"optical"` | Optional | Reserved for future advanced typography. |
| Typography | `lineHeight` | Float (1.0–3.0) | Required | Default line spacing. |
| Hyphenation | `enabled` | Boolean | Required | Hyphenation on/off. |
| Hyphenation | `language` | String (ISO language code) | Optional | Language for hyphenation rules. |
| Hyphenation | `exceptions` | Array of Strings | Optional | Words to exempt from hyphenation. |
| Lists | `unorderedListMarker` | String (symbol) | Optional | Bullet character. |
| Lists | `orderedListFormat` | Enum: `"number"`, `"letter"` | Optional | Ordered list style format. |
| Lists | `listIndent` | Integer (pixels) | Optional | Indentation for lists. |

---

# Save Behavior Rules

- **Template Settings Act as Defaults:**  
  Settings apply automatically when a new Style is created.

- **Existing Styles Preserve Overrides:**  
  Changing Template Settings does not forcibly update existing Styles.

- **New Styles Always Pull Latest Settings:**  
  Styles created after Template Settings are updated inherit the latest settings.

- **Template Save Must Include Both Settings and Styles:**  
  Partial saves are not allowed; both sections must be included for a valid Template.

- **Timestamps Must Use ISO 8601 UTC Format.**

---

# Validation Rules

- `name` must be non-empty, max 150 characters.
- Font sizes between 6 and 72 pt.
- Line height between 1.0 and 3.0.
- Colors must be valid hex codes (`#RRGGBB`).
- Kerning must match allowed enum values if present.
- List indent between 0 and 100 pixels.

---

# Future Expansion (Post-MVP)

- Flexible style ranges (e.g., font size ranges for headings).
- Language-specific hyphenation rules and overrides.
- Optical kerning advanced settings for typography.

---

# Version

Mylo API Contract — Template Save Specification v2.0 — April 2025
