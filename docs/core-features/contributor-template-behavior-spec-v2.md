# Contributor Behavior With and Without Templates — v2.0

## Overview

Contributors write freely using a toolbar with formatting tools. They can choose whether or not to use a Template. Templates enable auto-formatting in the Preview panel, while freeform mode allows their own formatting to persist.

## Toolbar Features (MVP)

* **Bold / Italic / Underline / Strikethrough**
* **Bullet / Numbered Lists**
* **Links**
* **Font Size** (1–99pt) and presets: 8, 9, 10, 11, 12, 16, 20, 24, 32
* **Text Alignment**: left, center, right, justify
* **Superscript / Subscript**
* **Indent / Outdent**
* **Font Color Picker**
* **Clear Formatting**
* **Page Break** and **Section Break**

## Future Insert Menu Items (Post-MVP)

These should appear visually disabled or tagged "Coming Soon" with tooltips such as: “Planned for future update.”

* Table
* Special Characters
* Numbered List Options
* Horizontal Line
* Chart
* Emoji
* Table of Contents
* Headers & Footers
* Page Numbers
* Footnote
* Equation

## Modes of Work

### Mode 1: No Template (Freeform)

* Editor formatting = Final output
* Preview hidden or mirrors editor
* Good for internal, informal, or draft documents

### Mode 2: With Template (Styled Preview)

* Editor formatting is ignored in Preview
* Smart Style Inference determines structure based on heuristics only
* Preview shows the final styled output using Template-defined styles
* Ambiguous formatting (e.g., bold single-line blocks that could be headings or emphasis) defaults to **Body** unless heuristics strongly indicate otherwise
* No AI classification is used in MVP

## Template Selection

Contributors can select or change the active template from within the Editor + Preview interface.

* A **dropdown labeled “Select a Template”** appears in the Preview Panel.
* Contributors may choose:

  * **Template: None** (freeform mode)
  * Or one of the available templates assigned by a Template Editor (e.g., Letterhead, Report)
* Template can be changed at any time during editing.
* If no templates are available, the dropdown is disabled with the message: *“No templates available.”*
* When exporting:

  * If a template is applied, export reflects the styled Preview.
  * If no template is selected, export reflects the Editor formatting.

---

# Version

Contributor Template Behavior Specification v2.0 — June 2025
