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


## Template Toggle
- In document header: `Template: None` or `Template: [Name]`
- Export uses Preview if template is applied; editor if not
