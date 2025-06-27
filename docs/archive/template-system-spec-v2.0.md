
# Mylo Template System Specification v2.0 — June 2025

---

# Overview

The Mylo Template System provides layout, typography, and formatting enforcement across documents. It separates design intent from content creation by applying template-defined styles in the Preview Panel, regardless of the writer’s input formatting.

This spec outlines template storage, role access, inheritance, and integration behaviors for Contributor, Template Editor, and Admin roles.

---

# MVP Scope

- Contributors:
  - Can apply a template from dropdown (on dashboard or within document)
  - See enforced styles in Preview Panel only
  - Cannot modify templates or style rules
- Template Editors:
  - Create/edit templates including page size, layout, styles, and fonts
  - Save templates to their workspace or shared team space
  - Preview content using sample text blocks
- Admins:
  - Can publish/unpublish templates
  - Assign templates to teams or roles

Templates:
- Contain style rules, layout definitions, font assignments, and global settings
- Are applied per-document
- Can be switched mid-document (with style reapplication logic)

---

# Template Application Behavior

## Template Assignment

- Each document has 0 or 1 assigned templates
- If no template is applied, editor formatting governs output
- On template switch:
  - All existing preview styles update immediately
  - Writer formatting is ignored (unless in freeform mode)

## Smart Style Inference (MVP)

- Heuristic-only detection of:
  - Headings (based on size/spacing)
  - Lists
  - Body paragraphs
- AI classification deferred post-MVP

## Template Switching

- On switch, preview is recalculated using new template styles
- Contributor editor formatting remains unchanged
- If prior template had uncommon styles (e.g. custom H4), fallback mapping is used
- No visual diff is shown in MVP
- Advanced conflict detection deferred

---

# Template Creation Behavior

- Created via Template Editor dashboard
- Stored in Supabase (metadata + design schema)
- Each template contains:
  - Layout (page size, margins)
  - Font config
  - Style palette (Heading, Body, Display, etc.)
  - Optional locked artwork
- Templates can include preview content blocks for layout verification
- Styles inherit from base types (e.g. Heading inherits from Body with overrides)

---

# Error Handling

| Scenario                                 | Behavior                                                |
|------------------------------------------|----------------------------------------------------------|
| Invalid template JSON on load            | Show “Template failed to load” banner, fallback to None |
| Template deleted mid-session             | Notify user, revert to freeform mode                    |
| Contributor opens doc with missing template | Fallback to unstyled preview, show missing template warning |
| Style field missing or unrecognized      | Fallback to base style (Body) with warning              |

---

# Known Gaps / Outstanding Questions

- Should Contributors be alerted when template changes dramatically affect appearance? (Effort: High)
- Do we show a visual diff or banner on template switch? (Effort: Medium)
- What happens if a template is reassigned by Admin during active editing? (Effort: High)
- Do we allow nested template inheritance? (Effort: High)
- Should Template Editors be able to "lock" styles against user override in Preview? (Effort: Medium)

---

# Future Enhancements (Post-MVP)

- AI-based style detection for Preview Panel
- Partial template application (e.g. sections)
- Template versioning and rollback
- In-template comments or usage notes
- Auto-suggest templates based on content structure

---

# Technical Dependencies

- Supabase DB for template metadata and ownership
- Supabase Storage for template assets
- JSON-based template schema
- Role-based access layer for template visibility and application
- Heuristic inference engine (client-side)

---

# API / Data Schema Notes

## Template JSON Structure (Simplified)

```json
{
  "id": "tmpl_xyz123",
  "name": "Modern Resume",
  "creator_id": "user_abc456",
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

Mylo Template System Specification v2.0 — June 2025
