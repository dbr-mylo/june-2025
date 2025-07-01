# Template Switching Journey — v1.1

June 2025

---

# Overview

This document defines the Contributor experience when switching templates within a document in Mylo. Contributors can choose from available templates, and switching one updates the Preview to reflect new formatting. Manual formatting in the Editor is preserved but not displayed in Preview.

---

# Flow

## 1. Starting Point

- Contributor opens an existing document with a template applied
- Views Editor on the left, Preview on the right (split panel)
- Editor may contain manual formatting (bold, lists, etc.)

## 2. Opening the Template Menu

- Clicks the template name in the document header
- A dropdown appears with all templates assigned to that user/team

## 3. Switching Templates

- Contributor selects a new template
- A modal appears:

> “Switching templates will override the document's appearance in the Preview. Your writing will not be lost.”

- Options: `Cancel` or `Switch Template`

## 4. What Changes

| Area | Behavior |
|------|----------|
| Preview | Re-renders with the new template's styles, layout, and Template Settings |
| Editor | Formatting remains unchanged (user formatting is retained) |
| Export | Reflects **Preview**, not Editor formatting |
| Undo | Reverts Preview template (not Editor content)

## 5. Known Behaviors

- Preview will look different if new template uses different styles
- Lists, headings, font, spacing may shift immediately
- Editor formatting still displays but does not affect Preview

---

# Limitations

- No side-by-side diff between old and new template styling
- No save of template-switch history
- No pre-switch Preview (what it will look like)

---

# Future Enhancements

- Diff viewer: compare Preview before and after switching
- Template lock: warn if document content is incompatible
- Style inference tuning post-switch

---

# Version

Template Switching Journey v1.1 — June 2025
