# Template System Specification — v2.1

June 2025

---

# Overview

This specification defines the structure, behavior, and enforcement rules for Mylo’s Template System. Templates control all design logic and document styling. They are editable only by Template Editors and dictate the final visual appearance of Contributor documents via the Preview panel.

---

# MVP Scope

## Key Behaviors

- One Template per document
- Templates include:
  - Styles
  - Template Settings (page size, hyphenation, spacing rules)
  - Locked/replaceable artwork
  - Sample content (Template Editor only)
- Templates cannot be altered by Contributors
- Contributors can choose which Template to apply (if >1 is available)

## Role Capabilities

| Action | Contributor | Template Editor |
|--------|-------------|-----------------|
| Create Template | ❌ | ✅ |
| Edit Template | ❌ | ✅ |
| Switch Templates | ✅ | ✅ |
| View Template Rules | ✅ (Preview) | ✅ |
| Override Styles | ❌ (Preview enforced) | ✅ |

---

# Main Behavior Sections

## Save Behavior Rules

- Templates are saved independently of documents
- Changing a template updates how it is applied to all documents using it
- Templates have versions for tracking historical changes (Post-MVP)
- Switching templates does not overwrite Contributor content — it only re-renders appearance

## UI Behavior

| Context | Behavior |
|---------|----------|
| Contributor switches template | Preview updates; warning shown if style loss likely |
| Template Editor updates template | Changes apply to all linked documents |
| Template Panel | Shows name, last updated, assigned sets |
| Preview Panel | Shows applied template (read-only) |
| Sample Content | Visible in Template Editor only |

---

## Template Application Logic

- On document load:
  - Editor loads raw Contributor content
  - Preview fetches Template by ID and renders accordingly
- Template rules override any manual styling (unless Freeform mode is active)
- If Template has custom style mapping (Post-MVP), applies fuzzy match or fallback

---

## Stack Behavior

- Template lives in its own object in Supabase
- Linked by `templateId` field in document
- All formatting in Preview is governed by the Template only
- Contributors cannot access or modify the Template JSON directly

---

## Data Models

### Document with Template Reference

```json
{
  "id": "doc_123",
  "title": "Quarterly Report",
  "templateId": "tmpl_789",
  "content": { ... },
  "meta": {
    "createdBy": "user_001",
    "lastModified": "2025-06-10T12:00:00Z"
  }
}
```

## Field Definitions

| Field | Type | Notes |
|-------|------|-------|
| templateId | UUID | Links document to Template |
| content | JSON | Contributor-authored Tiptap JSON |
| styles | JSON | Derived from Template, not stored in doc |
| templatePreview | Rendered | Based on Template Settings + Styles |

---

# Additional Technical Sections (Optional)

### Template Switching Behavior

- Switching templates triggers:
  - Re-evaluation of headings, spacing, font sizes
  - Style re-application based on template mapping
- User warned if visual changes are substantial

---

# Error Handling

| Condition | Behavior |
|----------|----------|
| Template missing | Fallback to default template; show warning |
| Template corrupt | Log error, hide Preview, display fallback |
| Switching templates fails | Prevent change, keep current applied |
| Mismatch in style mapping | Use fallback styles; show notice (Post-MVP) |

---

# Known Gaps / Outstanding Questions

- Should Contributors see diffs before confirming a template switch? (Status: Open)
- Should Templates allow conditional formatting logic? (Effort: High, Status: Post-MVP)
- Can Contributors revert to original appearance after a switch? (Status: Deferred)

---

# Future Enhancements (Post-MVP)

- Template versioning with rollback
- Style inheritance trees per template
- Marketplace templates with auto-preview
- Conditional rules: if/else logic per block or zone
- Custom transitions between templates

---

# Technical Dependencies

- Template storage model (Supabase)
- Template enforcement engine (Preview panel)
- Template selector dropdown for Contributors
- Style resolver for Template mapping

---

# API / Data Schema Notes

- `GET /api/templates/:id`
- `PATCH /api/templates/:id`
- `POST /api/templates` (Template Editor only)
- No Contributor write access to template objects

---

# Version

Template System Specification v2.1 — June 2025
