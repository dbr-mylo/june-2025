# Mylo Editor Specification (Tiptap) — v1.1

June 2025

---

# Overview

This document defines the core structure, required extensions, and behavior of the Tiptap-powered text editor used throughout Mylo. The Editor is optimized for Contributors and Template Editors, enabling live formatting while deferring layout enforcement to the Preview panel.

---

# MVP Scope

- Built on **Tiptap 2.x**
- Separate configurations for Contributor vs Template Editor roles
- Smart Style Inference enabled via semantic node tagging
- Real-time collaborative editing is not included in MVP
- All formatting applies only to the Editor panel — Preview enforces template styles

---

# Main Behavior Sections

## Save Behavior Rules

- Editor content is saved using autosave and manual save triggers
- Role-based formatting is persisted but overridden in Preview when Templates are active
- Invalid formatting is stripped or ignored during Preview rendering

## UI Behavior

| Feature | Contributor | Template Editor |
|--------|-------------|-----------------|
| Font Selector | ✅ | ✅ |
| Font Size Control | ✅ | ✅ |
| Highlight Tool | ❌ | ✅ |
| AI Panel | ✅ | ❌ |
| Layout Tools | ❌ | ✅ |
| Save Styles | ❌ | ✅ |
| Bubble Menu | ✅ (Future) | ✅ (Future) |

- Formatting Toolbar appears at top
- AI prompts may trigger inline (Contributor only)
- Insert menu includes Tiptap-supported node types
- Preview updates on every keystroke, layout change, or formatting action

## Stack Behavior

- Tiptap schema defines available node types and extensions
- Extension config is loaded per role
- Preview panel listens for Editor changes via shared JSON model
- Custom extensions power Smart Style Inference and Scroll Sync

## Data Models

- `editorContent`: Rich text content in Tiptap JSON format
- `templateId`: Optional UUID (used in Preview)
- `inferredStructure`: Derived using Smart Style heuristics

## Field Definitions

| Field | Type | Notes |
|-------|------|-------|
| headingLevel | Integer | Used for structure inference |
| fontSize | Integer (1–99) | Inline style extension |
| highlight | Boolean | Enabled for Template Editors only |

---

# Required Node Types

- `@tiptap/extension-document`
- `@tiptap/extension-paragraph`
- `@tiptap/extension-heading`
- `@tiptap/core` (Text)
- `@tiptap/extension-hard-break`
- `@tiptap/extension-bullet-list`
- `@tiptap/extension-ordered-list`
- `@tiptap/extension-list-item`
- `@tiptap/extension-blockquote`
- `@tiptap/extension-horizontal-rule`
- `@tiptap/extension-link`

---

# Required Extensions (MVP)

### Core Editing

- `@tiptap/extension-text-style`
- `@tiptap/extension-font-family`
- `@tiptap/extension-font-size`
- `@tiptap/extension-text-align`
- `@tiptap/extension-character-count`
- `@tiptap/extension-history`
- `@tiptap/extension-highlight` (Template Editor only)

### Layout & Inference

- `@tiptap/extension-heading`
- `@tiptap/extension-document`
- `@tiptap/extension-hard-break`

### Lists

- `@tiptap/extension-list-item`
- `@tiptap/extension-task-list`
- `@tiptap/extension-task-item`

---

# Custom Extensions

- Role-Based Toolbar Config
- Font Size Increment Control
- Smart Style Inference Engine
- Scroll Sync Handler
- Template Style Preview Mapping
- Page Break Renderer

---

# Error Handling

| Error | Behavior |
|-------|----------|
| Unsupported formatting | Ignored in Preview |
| Invalid JSON | Fallback rendering or reset prompt |
| Extension crash | Log to console, disable faulty tool |

---

# Known Gaps / Outstanding Questions

- Should Contributor toggle `Heading` levels directly?
- Are unsupported extensions greyed out in Insert menu?
- Is toolbar configuration persistent per session?
- Can undo/redo logic include preview layout events?

---

# Future Enhancements (Post-MVP)

- Image extension for Template Editors
- Table support
- Collaborative editing
- Mentions/comments
- Layout grid tools for Template editing

---

# Technical Dependencies (Optional)

- Tiptap 2.x
- Role-based config loader
- Preview inference system
- AI prompt integration (Contributor role only)

---

# API / Data Schema Notes (If Applicable)

- Editor content saved as JSON
- Template styling applied at render-time only

---

# Version

Mylo Editor Specification (Tiptap) v1.1 — June 2025
