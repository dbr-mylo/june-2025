# Mylo Editor Specification (Tiptap) v1.0 — June 2025

---

# Overview

This document defines the structure, required extensions, node types, and integration behaviors for the Tiptap-powered text editor used across Mylo. The editor enables Contributors and Template Editors to write and format documents, with separation from template-driven styling enforced in the Preview.

---

# MVP Scope

- Use **Tiptap 2.x**
- Implement custom editor configurations per user role (Contributor vs Template Editor)
- Include semantic node tagging for heading detection and Smart Style Inference
- Ensure real-time text editing with optional AI prompt triggers
- Preview panel reflects only template styles — not editor-applied formatting

---

# Required Node Types (MVP)

- Document (`@tiptap/extension-document`)
- Paragraph (`@tiptap/extension-paragraph`)
- Heading (`@tiptap/extension-heading`)
- Text (`@tiptap/core`)
- Hard Break (`@tiptap/extension-hard-break`)
- Bullet List (`@tiptap/extension-bullet-list`)
- Ordered List (`@tiptap/extension-ordered-list`)
- List Item (`@tiptap/extension-list-item`)
- Blockquote (`@tiptap/extension-blockquote`)
- Horizontal Rule (`@tiptap/extension-horizontal-rule`)
- Link (`@tiptap/extension-link`)

---

# Required Extensions for MVP

## Core Editing

- `@tiptap/extension-text-style` — enables inline style customization
- `@tiptap/extension-font-family` — applies font changes (used in Contributor and Template Editor toolbar)
- `@tiptap/extension-font-size` — custom extension (1–99pt with increment buttons)
- `@tiptap/extension-text-align` — alignment toolbar buttons
- `@tiptap/extension-character-count` — word count display (footer bar)
- `@tiptap/extension-history` — undo/redo system
- `@tiptap/extension-highlight` — inline text highlight (Template Editor only)

## Layout & Inference

- `@tiptap/extension-heading` — required for heading level detection
- `@tiptap/extension-document` — template preview integration
- `@tiptap/extension-hard-break` — for manual breaks and layout testing

## List Behavior

- `@tiptap/extension-list-item`
- `@tiptap/extension-task-list`
- `@tiptap/extension-task-item`

---

# Custom Extensions

- **Role-based Toolbar Extension** — loads different toolbars depending on user role
- **Font Size Increment Extension** — for ▲▼ controls on font sizes
- **Smart Style Inference Extension** — detects style intent based on heuristic rules
- **Scroll Sync Extension** — links scroll position between editor and preview
- **Template Style Extension** — renders preview styles separately from raw editor formatting
- **Page Break Extension** — inline visual page breaks

---

# Future Extensions (Post-MVP)

- `@tiptap/extension-image` — static images (Template Editor only)
- `@tiptap/extension-table` — structured content
- `@tiptap/extension-collaboration` — multiplayer support
- `@tiptap/extension-mention` — comments/mentions
- Template Layout Grid — full document layout beyond inline text

---

# Role-Based Editor Differences

| Feature                     | Contributor | Template Editor |
|----------------------------|-------------|-----------------|
| Font Family Selector       | ✅          | ✅              |
| Font Size Adjustments      | ✅          | ✅              |
| Highlight                  | ❌          | ✅              |
| AI Panel Integration       | ✅          | ❌              |
| Layout Tools               | ❌          | ✅              |
| Save Toolbar Style Sets    | ❌          | ✅              |
| Bubble Menu (Future)       | ✅          | ✅              |

---

# Known Gaps / Outstanding Questions

- Are extension configs shared globally or stored per user?
- Should contributors be able to toggle `Heading` tags directly or let inference detect them?
- Are unsupported extensions (e.g. tables, images) shown as disabled in the Insert menu?
- How do undo/redo behaviors interact across editor/preview panels?

---

# Error Handling

- Unsupported formatting is silently ignored in Preview
- Unknown or corrupted Tiptap content should trigger fallback rendering
- Invalid extension configs log errors in console and disable only the affected tool

---

# Version

Mylo Editor Specification (Tiptap) v1.0 — June 2025
