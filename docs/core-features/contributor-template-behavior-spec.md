# Contributor Behavior With and Without Templates

## Overview
Contributors write freely using a toolbar with formatting tools. They can choose whether or not to use a Template. Templates enable auto-formatting in the Preview panel, while freeform mode allows their own formatting to persist.

## Toolbar Features (MVP)
- **Bold / Italic / Underline / Strikethrough**
- **Bullet / Numbered Lists**
- **Links**
- **Font Size** (1–99pt) and presets: 8, 9, 10, 11, 12, 16, 20, 24, 32
- **Text Alignment**: left, center, right, justify
- **Superscript / Subscript**
- **Indent / Outdent**
- **Font Color Picker**
- **Clear Formatting**
- **Page Break** and **Section Break**


## Future Insert Menu Items (Post-MVP)
The following Insert options are visible in mockups but not included in the MVP:
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

These items should appear in the Insert menu with "Coming Soon" tags or be visually disabled, with tooltips such as: “Planned for future update.”


## Modes of Work

### Mode 1: No Template (Freeform)
- Editor formatting = Final output
- Preview hidden or mirrors editor
- Good for internal, informal, or draft documents

### Mode 2: With Template (Styled Preview)
- Editor formatting is ignored in Preview
- Smart Style Inference determines structure
- Preview shows the final styled output
- In the MVP, Smart Style Inference is limited to heuristics only (e.g., font size, line breaks, emphasis). AI-based content classification is planned for a future phase.


## Template Selection

Contributors can select or change the active template from within the Editor + Preview interface.

- A **dropdown labeled “Select a Template”** appears in the Preview Panel.
- Contributors may choose:
  - **Template: None** (freeform mode)
  - Or one of the available templates assigned by a Template Editor (e.g., Letterhead, Report)
- Template can be changed at any time during editing.
- If no templates are available, the dropdown is disabled with the message: *“No templates available.”*
- When exporting:
  - If a template is applied, export reflects the styled Preview.
  - If no template is selected, export reflects the Editor formatting.
