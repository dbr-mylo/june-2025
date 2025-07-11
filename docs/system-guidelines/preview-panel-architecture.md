# Preview Panel Architecture Specification

**Version:** v1.0  
**Status:** Draft for MVP Implementation  
**Last Updated:** July 2025

---

## Overview
This document defines the architecture for how the **Preview Panel** synchronizes with the Editor in Mylo. The goal is to ensure that Contributors see an accurate live rendering of how their content will appear under an assigned template — while separating writing from layout/styling.

---

## Purpose of the Preview Panel
- Enforces styles from the assigned template
- Ignores manual formatting applied in the editor (unless in freeform mode)
- Reflects real-time changes from the editor
- Visually distinguishes enforced styles from author formatting

---

## Core Components

### 1. `EditorContext`
- Stores current document content (Tiptap JSON)
- Tracks live editing state
- Shared between the Editor and Preview components

### 2. `TemplateEngine`
- Applies template styles to raw content
- Resolves style inference based on heading levels, font sizes, structure
- Converts Tiptap JSON to styled HTML/CSS render tree

### 3. `PreviewRenderer`
- React component that receives styled content from `TemplateEngine`
- Re-renders on document update, template switch, or role change

---

## High-Level Flow

```plaintext
Contributor Types in Editor
→ EditorContext Updates Tiptap Content
→ PreviewRenderer Listens to Context Changes
→ TemplateEngine Applies Styles
→ Preview Panel Displays Styled Output
```

---

## Synchronization Rules

| Event                         | Preview Response                                |
|------------------------------|--------------------------------------------------|
| User types or edits content  | Immediate rerender via `EditorContext` listener |
| Contributor changes template | Recompute all styles and rerender preview       |
| Autosave in progress         | Do not block Preview updates                    |
| Freeform mode toggled        | Preview renders raw editor formatting instead   |

---

## Template Enforcement Logic

- Each block node (e.g., paragraph, heading, list item) is passed through a style-matching function:
  ```ts
  function applyTemplateStyle(node: TiptapNode, template: Template): RenderBlock {
    // Infer style based on node type and content
    // Match to closest Template.styleSettings
    // Return styled render object
  }
  ```
- Templates may include fallback rules for unstyled or unrecognized content
- Manual formatting from the editor is stripped unless in freeform mode

---

## Visual Diff Awareness (Planned Post-MVP)
- Highlight overridden manual formatting
- Provide hover tooltips: “Styled by template: Heading 2”
- Option to show before/after toggle for advanced users

---

## Future Enhancements
- Debounced rendering to improve performance on long documents
- Incremental DOM diffing to minimize full rerenders
- Async style application via web workers for large templates

---

## Next Steps
- Implement `EditorContext` as shared state
- Draft basic `TemplateEngine` logic for MVP
- Wire `PreviewRenderer` to rerender on `EditorContext` + template changes
