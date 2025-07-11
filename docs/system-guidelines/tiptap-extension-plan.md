# Tiptap Extension Implementation Plan (MVP)

**Version:** v1.2  
**Last Updated:** July 2025  
**Status:** Implementation Blueprint for MVP

---

## Overview
This plan outlines the required Tiptap extensions for the Mylo MVP and defines how each extension will be used across Contributor and Template Editor roles. It also addresses toolbar integration and enforcement logic in the Preview panel.

---

## Extension Categories & MVP Scope

### 🔤 Text Formatting
- `@tiptap/extension-bold`
- `@tiptap/extension-italic`
- `@tiptap/extension-underline`
- `@tiptap/extension-strike`
- `@tiptap/extension-color`
- `@tiptap/extension-typography`
- `@tiptap/extension-subscript`
- `@tiptap/extension-superscript`
- `@tiptap/extension-highlight`

### 🧱 Structure & Blocks
- `@tiptap/extension-paragraph`
- `@tiptap/extension-heading`
- `@tiptap/extension-hard-break`
- `@tiptap/extension-blockquote`
- `@tiptap/extension-horizontal-rule`

### 📝 Lists & Indentation
- `@tiptap/extension-bullet-list`
- `@tiptap/extension-ordered-list`
- `@tiptap/extension-list-item`
- `@tiptap/extension-indent`

### 🎨 Typography
- `@tiptap/extension-font-family`
- `@tiptap/extension-text-style`
- `@tiptap/extension-font-size` *(custom implementation)*

### 📐 Alignment & Layout
- `@tiptap/extension-text-align`
- `@tiptap/extension-gapcursor`

### 🔗 Other
- `@tiptap/extension-link`
- `@tiptap/extension-placeholder`
- `@tiptap/extension-history`
- `@tiptap/starter-kit` *(alternative to manual extension list)*

---

## Role-Based Usage

| Extension                  | Contributor | Template Editor | Notes |
|----------------------------|-------------|------------------|-------|
| Bold / Italic / Underline | ✅          | ✅               | Toolbar buttons |
| Font Family / Font Size   | ✅ (Editor only) | ✅ (Full access) | Preview enforces template |
| Color / Typography        | ✅          | ✅               | Enforced in preview |
| Subscript / Superscript   | ✅          | ✅               | Available in toolbar |
| Highlight                 | ✅          | ✅               | Template Editor may use for design tokens/flags |
| Horizontal Rule           | ✅          | ✅               | Contributor uses basic HR; Template Editor can define custom styled rules *(Post-MVP)* |
| Blockquote                | ✅          | ✅               | Visible to both |
| Heading / Paragraph       | ✅          | ✅               | Used for structure detection |
| Bullet / Numbered Lists   | ✅          | ✅               | With indentation support |
| Text Alignment            | ✅          | ✅               | Limited to paragraph-level |
| Link                      | ✅          | ✅               | Standard insertion |

---

## Toolbar Integration Plan
- Toolbar buttons mapped directly to extension commands
- Disable formatting options if template restricts them
- Font selectors and heading dropdowns integrated with `EditorContext`

---

## Preview Enforcement
- Preview ignores manual inline styles if a template is applied
- Style inference logic uses:
  - Heading level
  - Font size range
  - Font weight / bold usage
- Manual styles preserved in freeform mode only

---

## Custom Extensions (Required for MVP)

### `font-size`
Custom extension supporting numeric control (e.g. 8–96pt) with up/down toggles.

```ts
FontSize.configure({ types: ['textStyle'], min: 8, max: 96 })
```

---

## Future Enhancements (Post-MVP)
- Table support (`@tiptap/extension-table`)
- Commenting/annotation tools
- Code blocks and syntax highlighting
- Real-time template diff annotations
- Custom Horizontal Rules (Template Editor only)

---

## Next Steps
- Add all required extensions to Tiptap config
- Build toolbar actions and input components
- Integrate with EditorContext for command binding
- Validate role restrictions and preview overrides
