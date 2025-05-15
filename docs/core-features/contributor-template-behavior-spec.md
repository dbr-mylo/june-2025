# Contributor Behavior With and Without Templates

## Overview
Contributors write freely using a toolbar with formatting tools. They can choose whether or not to use a Template. Templates enable auto-formatting in the Preview panel, while freeform mode allows their own formatting to persist.

## Toolbar Features (MVP)
- Bold / Italic / Underline
- Bullet / Numbered Lists
- Blockquote
- Links
- Font Size
- Text Alignment

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
