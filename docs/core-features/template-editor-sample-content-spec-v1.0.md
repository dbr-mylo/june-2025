# Template Editor — Sample Content System Specification — v1.0

June 2025

---

# Overview

This specification defines how Template Editors can generate and use sample content while designing templates in Mylo. Sample content allows the Editor to preview typography, spacing, layout behavior, and style application without needing finalized content from a Contributor.

---

# MVP Scope

## Key Features

- Sample content can be inserted via dropdown menu
- Content types include: Paragraphs, Headlines, Lists, Quotes, Tables (Post-MVP)
- Sample content is not visible to Contributors
- Sample content is stored only within the Template and not embedded in documents

## Purpose

- Let Template Editors:
  - Test how styles render
  - Validate layout constraints (e.g., spacing, wrapping, widows)
  - Ensure placeholder text flows correctly

---

# Main Behavior Sections

## Save Behavior Rules

- Sample content is stored inside the Template object
- It does **not** transfer to documents created from the Template
- Does not affect version control of the document itself

## UI Behavior

| Action | Behavior |
|--------|----------|
| Select sample content | Populates canvas with default text blocks |
| Customize sample text | Editable directly in layout view |
| Delete sample | Removed only from Template context |
| Role switch to Contributor | Sample content is hidden automatically |

---

## Stack Behavior

- Stored as part of Template JSON
- Treated as a special layer within the layout board
- Preview engine recognizes and ignores this content for Contributor sessions

---

## Data Models

### Sample Content Object

```json
{
  "type": "sampleContent",
  "contentType": "paragraph",
  "text": "Lorem ipsum dolor sit amet...",
  "editable": true,
  "visibleTo": ["TemplateEditor"]
}
```

## Field Definitions

| Field | Type | Notes |
|-------|------|-------|
| type | String | Always “sampleContent” |
| contentType | Enum | “paragraph”, “heading”, “list”, “quote” |
| text | String | Displayed placeholder text |
| editable | Boolean | True if user can modify |
| visibleTo | Array | Controls visibility per role |

---

# Additional Technical Sections (Optional)

### Sample Types

- **Paragraphs**: 2–3 lines of lorem ipsum
- **Headlines**: Short uppercase or title case examples
- **Lists**: 3–5 bulleted or numbered items
- **Quotes**: 1–2 sentence blockquote

---

# Error Handling

| Condition | Behavior |
|----------|----------|
| Invalid content type | Show warning and prevent insertion |
| Missing visibility flags | Default to TemplateEditor-only |
| Contributor sees sample | Hide and log warning (dev mode only) |

---

# Known Gaps / Outstanding Questions

- Should sample content be stored in version history? (Effort: Medium, Status: Open)
- Can users create custom sample blocks and reuse them? (Effort: Medium)
- Should sample content ever appear in `.mylo` exports? (Effort: Low, Status: Rejected)

---

# Future Enhancements (Post-MVP)

- Custom reusable sample content blocks
- Toggle to show/hide sample layer
- Sample-to-real conversion mode
- AI-generated content examples

---

# Technical Dependencies

- Sample content dropdown component
- Sample content type renderer
- Layout engine support for non-exportable blocks

---

# API / Data Schema Notes

- None — sample content is local-only and not persisted outside Templates

---

# Version

Template Editor — Sample Content System Specification v1.0 — June 2025
