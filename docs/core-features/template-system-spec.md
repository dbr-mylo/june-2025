# Template System Specification

This document defines how the **Template System** works in Mylo, including both **Template Settings** and **Template Styles**, and explains their interactions.

Templates control the visual consistency of documents while allowing flexible content creation.

---

# Overview

Each Template in Mylo now consists of two distinct components:

| Component | Description |
|:---|:---|
| **Template Settings** | Global defaults for Typography, Hyphenation, and List behavior. |
| **Template Styles** | Specific font, color, spacing, and alignment rules applied to document elements (headings, body, etc.). |

**Template Settings** act as **defaults** for new Styles created within the Template.  
Existing Styles maintain independence and do not retroactively update when Template Settings change.

---

# MVP Scope

## Template Creation (Template Editor Role)

- **Create Template Settings:**
  - Typography Defaults (font, size, line height, letter-spacing)
  - Hyphenation Rules (enabled/disabled, language, exceptions)
  - List Styles (unordered marker, ordered list format, indent)

- **Create Template Styles:**
  - Fonts, font sizes, colors, alignment, spacing
  - Styles for document elements like Heading 1, Heading 2, Body text

- **Save Template:**
  - Save must include both Template Settings and Template Styles sections.
  - Default status on creation: `"Draft"`.

## Template Publishing (Template Editor Role)

- Publish a Template once ready.
- Published Templates are available to Contributors for document creation.

---

# Template Settings Behavior

| Scenario | Behavior |
|:---|:---|
| Create new Style after Settings exist | Style automatically inherits current Template Settings. |
| Change Settings after Styles already exist | Existing Styles **retain** their original properties (do not auto-update). |
| Create new Style after Settings are changed | New Style inherits the latest Template Settings. |
| Manual Style overrides | Always take precedence over Template Settings. |

- **Settings act as defaults at the moment of Style creation only.**
- **Settings do not forcibly reapply to previously created Styles unless manually edited.**

---

# Template Save Behavior Rules

- Template Save must serialize both `templateSettings` and `styles`.
- No partial saves (must validate complete Settings and Styles blocks).
- On Template Save:
  - New Settings values overwrite previous Settings.
  - Existing Styles remain untouched unless explicitly edited.

- Timestamps (`createdAt`, `updatedAt`) must use ISO 8601 UTC format.

---

# Template Application to Documents

- Contributors select from Published Templates when creating a document.
- The selected Template’s Styles are applied to the document Preview and Export.
- Contributors cannot modify Template Settings or Styles.
- Template settings influence new document structure but not per-instance edits.

---

# Future Enhancements (Post-MVP)

- Allow multiple Layout Variants inside a Template.
- Allow flexible style ranges (e.g., heading font size 18–24pt allowed).
- Optical kerning setting per Typography rule.
- Language-specific hyphenation fine-tuning.

---

# Version

Template System Specification v2.0 — April 2025
