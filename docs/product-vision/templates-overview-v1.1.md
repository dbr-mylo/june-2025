# Templates Overview — v1.1

June 2025

---

# Overview

Templates in Mylo are central to maintaining design consistency while preserving contributor flexibility. Unlike static files or downloadable formats, Mylo Templates are interactive, structured, and enforceable—driven by role-based controls and live preview rendering.

This document explains what Templates are, how they function, and the design philosophy behind their role in the system.

---

# Purpose of Templates

| Purpose | Description |
|---------|-------------|
| Enforce consistency | Templates ensure documents follow consistent design rules |
| Separate layout from writing | Contributors write freely; layout is managed by the Template |
| Simplify styling | Contributors don’t manually apply styles — templates apply them automatically |
| Allow brand control | Designers can control typography, layout, and rules without editing content |
| Enable reusable formats | Templates make it easy to create repeated document types (e.g., reports, proposals) |

---

# What a Template Includes

| Feature | Notes |
|---------|-------|
| **Template Settings** | Page size, margins, hyphenation, spacing rules |
| **Styles** | Saved font, size, line height, and spacing definitions |
| **Artwork** | Logos, graphics, non-editable elements or placeholders |
| **Thumbnail** | Visual snapshot of the template (optional) |
| **Sample Content** | Preview-only example text for design testing |
| **Assigned Set** | (Optional) Template can be grouped in a Template Set |

---

# How Templates Are Used

| Role | Behavior |
|------|----------|
| Contributor | Chooses a template (if >1 is available) and writes. Styles are enforced in Preview. |
| Template Editor | Creates, edits, and assigns templates. Can see sample content and full structure. |
| Admin | Manages global access to templates and sets. May publish or archive templates. |

---

# Template Lifecycle

| Phase | Action |
|-------|--------|
| Create | Template Editor designs a new template from scratch |
| Assign | Template is added to a Template Set or made globally available |
| Use | Contributor creates a document and selects a template |
| Apply | Styles and layout rules are enforced in Preview |
| Update | Changes to the template affect all future renders of linked documents |
| Archive | Template is removed from use but retained for history or rollback |

---

# MVP Considerations

✅ Included:
- One template per document
- Enforced style preview
- Non-editable artwork regions
- Template sets (1 set per user)

🚫 Not included (Post-MVP):
- Template variants
- Conditional logic (if/else layout rules)
- Partial template application
- Real-time collaboration on templates

---

# Philosophy: Templates as Contracts

Templates are not suggestions — they’re design contracts. Writers work in freedom, but the final output must respect the rules set by the Template Editor. This removes ambiguity and ensures production-ready output by default.

---

# Version

Templates Overview v1.1 — June 2025
