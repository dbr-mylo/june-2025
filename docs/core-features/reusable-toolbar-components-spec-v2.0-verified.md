# Reusable Toolbar Components Specification — v2.0

June 2025

---

# Overview

This specification defines the structure, behavior, and rendering rules of the reusable toolbar system shared between Contributor and Template Editor roles in Mylo. Toolbar components are context-aware, role-restricted, and designed to support both rich text formatting and template construction tools.

---

# MVP Scope

## Shared Features

- Both roles access the toolbar, but available tools differ
- Formatting actions:
  - Bold, Italic, Underline
  - Lists (bullet, numbered)
  - Text alignment
  - Headings (H1–H3)
- Toolbar uses shared component library for:
  - Button groups
  - Dropdowns
  - Toggle states

## Role-Specific Features

| Tool | Contributor | Template Editor |
|------|-------------|-----------------|
| Font family | ✅ | ✅ |
| Font size | ✅ | ✅ |
| Highlight | ❌ | ✅ |
| Save as Style | ❌ | ✅ |
| Layout tools | ❌ | ✅ |
| Insert image | ✅ | ✅ |
| Apply styles | (Preview only) | ✅ |
| AI actions | ✅ | ❌ |

## Coming Soon (Disabled in UI)

- Tables
- Code blocks
- Mentions
- Style mismatch indicators
- Bubble menu

These appear grayed out in the MVP interface and cannot be selected.

---

# Main Behavior Sections

## Save Behavior Rules

- Toolbar actions modify the Tiptap document model
- No explicit save triggered — changes are persisted via autosave
- Template Editor changes affect both content and style definitions

## UI Behavior

| Component | Behavior |
|----------|----------|
| Button groups | Highlight when active, show tooltip on hover |
| Dropdowns | Show current value, allow search if long list |
| Disabled tools | Grayed out with tooltip: “Coming soon” |
| Role-restricted tools | Hidden entirely or replaced with locked message |
| Style indicators | (Post-MVP) Show badge if active style is overridden |

---

## Stack Behavior

- Tiptap commands triggered via component dispatch
- Button state reflects current selection via editor state observer
- Disabled items rendered statically with tooltip
- Tool visibility resolved via user role on render

---

## Data Models

*None persistently stored — toolbar reflects Tiptap state only.*

## Field Definitions

| Field | Type | Notes |
|-------|------|-------|
| role | Enum | Contributor, TemplateEditor |
| isActive | Boolean | True if formatting is active |
| isDisabled | Boolean | True if feature is not yet available |

---

# Additional Technical Sections (Optional)

### Accessibility

- All buttons keyboard-navigable
- `aria-label` set for all icons
- Focus outlines and toggle states match system conventions

---

# Error Handling

| Condition | Behavior |
|----------|----------|
| Invalid action | No-op; log warning in dev mode |
| Role mismatch | Prevent render; show fallback if necessary |
| Tiptap state error | Lock toolbar and show “Toolbar unavailable” banner |

---

# Known Gaps / Outstanding Questions

- Should toolbar remember last-used tools between sessions? (Effort: Medium, Status: Open)
- Should Contributor see unavailable features as tooltips? (Effort: Low, Status: Decided “No” for MVP)
- Should layout tools eventually move to floating panel? (Effort: High, Status: Post-MVP)

---

# Future Enhancements (Post-MVP)

- Drag-to-reorder toolbar sections
- Full role-based customization
- Context-sensitive layout tools
- Bubble menu + inline controls
- Conflict indicator for Template override mismatches

---

# Technical Dependencies

- Tiptap command bindings
- Toolbar component registry
- Role-aware permissions logic

---

# API / Data Schema Notes

- None — all toolbar logic is client-rendered

---

# Version

Reusable Toolbar Components Specification v2.0 — June 2025
