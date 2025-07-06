# Mylo Spec — Header/Footer Zones UI Behavior (MVP)

---

# Overview

This specification defines the UI elements and behaviors required to support header and footer zones in the Mylo Template Editor interface. These zones are editable only by Template Editors and rendered in the Preview panel for both Template Editors and Contributors. Contributors cannot interact with or modify header/footer content.

---

# MVP Scope

**Included:**
- UI for adding and editing header/footer zones
- Mini-editor interface for each zone
- Token insertion UI
- Live rendering of header/footer content in Preview

**Excluded:**
- Per-page headers/footers
- Inline editing inside the main editor
- Contributor interface for headers/footers

---

# 1. Template Editor Sidebar

## Section: "Header & Footer Zones"

| Element | Behavior |
|--------|----------|
| `[ + Add Header ]` | Adds a new header zone and opens the header mini-editor |
| `[ + Add Footer ]` | Adds a new footer zone and opens the footer mini-editor |
| `[ ✏️ Edit Header ]` | Opens the header mini-editor for editing |
| `[ ✏️ Edit Footer ]` | Opens the footer mini-editor for editing |
| `[ ✖ Remove ]` | Optional: Removes the zone (reverts state to "add" option) |

---

# 2. Mini-Editor UI (Modal or Inline Panel)

| Element | Behavior |
|--------|----------|
| Rich text input | Allows Template Editor to type and format content |
| Token dropdown | Button labeled `+ Insert Token` with a list of supported tokens |
| Formatting controls | Bold, Italic, Alignment (Left, Center, Right) |
| Save button | Saves content and closes the mini-editor |
| Cancel button | Discards changes and closes the mini-editor |

---

# 3. Token Insertion Dropdown

| Label | Token |
|-------|-------|
| Document Title | `{{document_title}}` |
| Date | `{{date}}` |
| Author Name | `{{author_name}}` |
| Page Number | `{{page_number}}` |
| Total Pages | `{{total_pages}}` |

Tokens are inserted at the cursor location in the mini-editor.

---

# 4. Preview Rendering Behavior

| Role | Behavior |
|------|----------|
| Template Editor | Header and footer content appears in the live Preview panel |
| Contributor | Header and footer appear in the Preview panel, but are not editable or visible in the editor |

Tokens are replaced with live values:
- `{{document_title}}` → Contributor document title
- `{{page_number}}` → Current page number
- etc.

---

# Error Handling

- If a token cannot be resolved, a fallback value is used
- Invalid tokens are ignored silently
- If a zone is empty, it is not rendered in Preview

---

# Future Enhancements (Out of Scope)

- Per-page logic (e.g., "different first page")
- Conditional tokens
- Token previews or hover explanations
