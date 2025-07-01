# Editor and Preview Panel Specification — v3.1

June 2025

---

# Overview

This document defines the functionality, behavior, and layout of the Mylo Editor and Preview panels. These panels work together to separate content creation (Editor) from final presentation (Preview), ensuring Contributors can write freely while the Template enforces structure and styling.

---

# MVP Scope

## Editor Panel

- Contributors can:
  - Write and edit rich text
  - Apply formatting (bold, italic, underline, lists, alignments, headings)
  - Insert manual breaks (Page, Section)
- Pagination lines can be toggled via the View menu
- Real-time typing behavior
- No template styles enforced while writing (freeform environment)

## Preview Panel

- Applies Template rules to the Editor content:
  - Fonts, margins, line spacing, colors
- Ignores Contributor formatting not supported by the Template
- Preview updates live on each keystroke or formatting action
- Pagination reflects printed output with spacing and page breaks
- Layout is vertically stacked for multi-page documents
- Scrolls vertically

## Panel Layout

- Side-by-side Editor and Preview with draggable handle
- Resizable horizontally
- Default 50/50 layout
- Minimum width thresholds for each panel

## Scroll Together

- Enabled by default via top-bar toggle
- Scroll behavior is cursor-based:
  - Active panel drives scroll sync
- Manual scroll disables sync until focus is returned

---

# Main Behavior Sections

## Save Behavior Rules

- Save behavior is handled by autosave/manual save systems
- Save status always reflects current document state

## UI Behavior

| Component | Behavior |
|----------|----------|
| Preview Panel | Non-editable, dynamic visual rendering |
| Editor Panel | Full editing control |
| Divider Handle | Resizable, draggable, persists per session |
| Scroll Together | Toggleable, cursor-aware sync scrolling |
| Pagination Toggle | Off by default; shows page lines if enabled |
| Save Status Indicator | Always visible in top nav |

## Stack Behavior

- Tiptap powers the Editor Panel
- Template Engine renders the Preview
- Shared JSON document model between panels
- Preview is derived from Editor content + active Template

## Data Models

- `editorContent`: User-authored Tiptap JSON
- `templateId`: UUID
- `previewState`: Derived layout based on Template + heuristics

---

# Additional Technical Sections (Optional)

## Save Status Indicator (Persistent in UI)

| Save State             | Display Text                           |
|------------------------|----------------------------------------|
| Saving                | "Saving your work…"                    |
| Saved                 | "All changes saved"                    |
| Offline               | "Offline — saving locally"             |
| Failure               | "Changes couldn't be saved — retrying…"|

---

# Error Handling

### Editor Panel

| Issue | Behavior |
|-------|----------|
| Editor crashes | Show banner: “An issue occurred with the editor.” |
| JSON invalid | Prevent saving and disable UI |
| Console logs | Errors must be visible in browser dev tools |

### Preview Panel

| Issue | Behavior |
|-------|----------|
| Template parsing fails | Show message: "Preview unavailable due to rendering error." |
| Fallback | Editor remains usable, export still allowed |

### Save Failures

| Condition | Behavior |
|----------|----------|
| Autosave fails | Retry 3 times in background |
| Manual save fails | Show persistent banner with retry/export |

---

# Known Gaps / Outstanding Questions

- Should Preview show hints about inferred structure? (Effort: Medium, Status: Deferred)
- Should Scroll Together include jump-to-page sync? (Effort: Medium, Status: TBD)
- Should templates define Preview zoom presets? (Effort: Low, Status: Open)

---

# Future Enhancements (Post-MVP)

- Zoom controls
- Detached floating Preview
- Responsive Preview scaling
- Preview toggle for distraction-free mode
- Snap resizing presets

---

# Technical Dependencies (Optional)

- Tiptap Editor
- Preview Rendering Engine
- Scroll/zoom controller
- Save Status messaging service

---

# API / Data Schema Notes (If Applicable)

- Shared document model syncs both panels
- Save triggers updates to both editor content and preview layout

---

# Version

Editor and Preview Panel Specification v3.1 — June 2025
