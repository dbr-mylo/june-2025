# Contributor and Template Behavior Specification — v2.1

June 2025

---

# Overview

This document defines how Contributors interact with documents when using or not using a Template. It explains toolbar functionality, template selection, formatting modes, and Preview behavior. Contributors can freely write and format, but Templates override formatting in the Preview Panel when applied.

---

# MVP Scope

- Contributors can write with or without a Template.
- A dropdown allows switching between assigned Templates or Freeform mode.
- Preview Panel shows final styled output when a Template is active.
- In Freeform mode, Editor formatting = Preview = Export.
- In Template mode, Preview applies Smart Style Inference to match Template styles.
- Export uses the Preview appearance, not Editor formatting.

---

# Main Behavior Sections

## Save Behavior Rules

- Template switching does not auto-save but flags the document as dirty.
- Contributor formatting is saved regardless of whether it’s used in Preview.
- Both `editorContent` and `templateId` must be saved.

## UI Behavior

### Toolbar Features (MVP)

- Bold / Italic / Underline / Strikethrough
- Bullet / Numbered Lists
- Font Size (1–99pt) and presets: 8, 9, 10, 11, 12, 16, 20, 24, 32
- Text Alignment: left, center, right, justify
- Superscript / Subscript
- Indent / Outdent
- Font Color Picker
- Clear Formatting
- Page Break / Section Break

### Insert Menu (Post-MVP)

These appear visually disabled or tagged “Coming Soon” with tooltips:

- Table
- Special Characters
- Numbered List Options
- Horizontal Line
- Chart
- Emoji
- Table of Contents
- Headers & Footers
- Page Numbers
- Footnote
- Equation

### Preview Panel

- Shows final output only when Template is active.
- Automatically refreshes after typing, formatting, or switching Templates.

## Stack Behavior

- Uses Tiptap for editable content.
- Smart Style Inference uses heuristics only in MVP (e.g., font size, line breaks).
- Editor content and applied Template reference are both saved to document.

## Data Models

- `editorContent`: Rich text formatting used in the Editor.
- `templateId`: Optional UUID. If present, Preview uses template.
- `previewOutput`: Calculated by applying template styles to inferred structure.

## Field Definitions

| Field | Type | Notes |
|-------|------|-------|
| `templateId` | UUID or null | Optional |
| `editorContent` | String (JSON/Tiptap) | Required |
| `previewOutput` | Rendered | Derived from `editorContent` + Template |

---

# Additional Technical Sections (Optional)

*None currently.*

---

# Error Handling

| Situation | Behavior |
|-----------|----------|
| Template not found | Revert to Freeform and show message |
| No templates available | Disable dropdown with tooltip: “No templates available.” |
| Preview out of sync | Retry silently. If repeated, show warning banner. |

---

# Known Gaps / Outstanding Questions

- Should Contributors be notified if template styles change during editing? (Effort: High, Status: TBD)
- What’s the fallback if a Template is deleted while editing? (Effort: Medium, Status: Open)
- Can user formatting be promoted to a saved Style? (Effort: Low, Status: Post-MVP)

---

# Future Enhancements (Post-MVP)

- Smart Style Inference powered by AI
- Style suggestions based on document content
- Contributor-to-Template feedback tools
- Role-based overrides and conflict resolution

---

# Technical Dependencies (Optional)

- Tiptap extensions
- Style inference engine
- Preview rendering logic
- Template engine and override handler

---

# API / Data Schema Notes (If Applicable)

- Saved document must persist both raw formatting and template reference
- Save endpoint must support optional `templateId`

---

# Version

Contributor and Template Behavior Specification v2.1 — June 2025
