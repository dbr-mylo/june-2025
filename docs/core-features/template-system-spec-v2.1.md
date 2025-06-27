
# Mylo Template System Specification v2.1 — June 2025

---

# Overview

The Mylo Template System enforces design and brand consistency by applying layout, style, and font rules within the Preview Panel and export outputs — never within the Contributor’s writing environment. Templates serve as visual styling layers only. They do not alter or override the formatting authored by the Contributor in the Editor Panel.

---

# MVP Scope

- Contributors:
  - Use full formatting tools in the Editor Panel
  - Apply a template to view styled output in the Preview Panel
  - See their original formatting unchanged in the Editor
- Template Editors:
  - Create/edit templates including page size, layout, styles, and fonts
  - Test templates with mock content in real time
  - Share templates with specific users or groups
- Admins:
  - Publish/unpublish templates
  - Assign templates to specific roles or teams

Templates:
- Are stored as structured JSON with layout, styles, and font references
- Apply only to the Preview Panel and PDF export
- Never modify or erase contributor input or editor formatting

---

# Template Application Behavior

## Assignment Rules

- Each document can have zero or one assigned templates
- Template applies only in Preview Panel
- Editor formatting authored by the Contributor remains visually and structurally unchanged
- Export uses template-styled Preview, not raw Contributor formatting

## Switching Templates

- Changing the template updates only the Preview Panel
- Contributor's formatting in the Editor is unaffected
- There is no diff or warning in MVP when switching templates
- Any missing styles are gracefully handled using fallback rules

---

# Template Creation Behavior

- Templates are built by Template Editors using a dedicated layout and style editor
- Templates include:
  - Page layout settings
  - Style palette (Heading, Body, etc.)
  - Font selection and fallback chains
  - Optional locked artwork or placeholders
- Templates store their own test content, never visible to Contributors

---

# Error Handling

| Scenario                                 | Behavior                                                |
|------------------------------------------|----------------------------------------------------------|
| Template fails to load                   | Show “Template failed to load” banner, fallback to unstyled preview |
| Template deleted mid-session             | Preview panel reverts to unstyled; Editor is untouched   |
| Missing styles or invalid template JSON  | Fallback to base Preview styling with warning            |
| Contributor opens a doc with broken template | Show banner and allow editing to continue safely         |

---

# Known Gaps / Outstanding Questions

- Should contributors be alerted when a template dramatically alters the Preview output? (Effort: Medium)
- How are template changes communicated to Admins when multiple roles access the same document? (Effort: Medium)
- Can Template Editors set fallback Preview styles for unstyled content blocks? (Effort: Medium)
- Should Preview have a “Compare with Contributor Formatting” toggle? (Effort: High)

---

# Future Enhancements (Post-MVP)

- Partial template applications (sections or modular styles)
- AI-based style detection and mapping
- Template versioning with rollback
- Template usage analytics
- Marketplace-distributed templates

---

# Technical Dependencies

- Supabase DB for template metadata
- Supabase Storage for fonts and artwork
- JSON schema for template structure
- Role-based permissions (Contributor vs Template Editor)
- Live Preview rendering engine (template → visual display)

---

# API / Data Schema Notes

## Template JSON Structure (Simplified)

```json
{
  "id": "tmpl_xyz123",
  "name": "Professional Letterhead",
  "layout": {
    "page_size": "A4",
    "margins": { "top": 40, "bottom": 40, "left": 36, "right": 36 }
  },
  "styles": {
    "heading": {
      "font": "Roboto",
      "size": 18,
      "weight": "bold"
    },
    "body": {
      "font": "Lato",
      "size": 12
    }
  },
  "fonts": ["Roboto", "Lato"],
  "created_at": "2025-06-10T12:00:00Z"
}
```

---

# Version

Mylo Template System Specification v2.1 — June 2025
