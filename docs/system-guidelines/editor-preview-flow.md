# Editor → Preview Flow

This document describes how the dual-pane view in Mylo will function at runtime, including data flow from the editor to the preview and planned implementation details.

---

## Overview

Mylo uses a dual-pane layout:
- **Left:** `MyloEditor` (Tiptap-powered)
- **Right:** `PreviewPane` (template-enforced styling)

These are not yet connected through a shared state system. Syncing logic must be introduced to support real-time preview rendering and eventual export.

---

## Planned Architecture

### Shared State Provider

A `DocumentContext` or `PreviewProvider` is proposed to manage:
- `rawContent`: JSON or HTML output from `MyloEditor`
- `styledOutput`: Rendered output processed through an applied template
- `activeTemplate`: The current template applied to the preview

This shared state will ensure changes in the Editor reflect live in the Preview.

---

## Component Responsibilities

| Component     | Role                                     |
|---------------|------------------------------------------|
| `MyloEditor`  | Text input + formatting UI (Tiptap)      |
| `PreviewPane` | Output display with enforced styles      |
| `DocumentContext` | Shared state and sync between both   |

---

## Sync Mechanism

1. `MyloEditor` updates internal state on input.
2. `useEffect` or callback pushes content to `DocumentContext`.
3. `PreviewPane` listens to that context and re-renders.
4. Export logic will use `styledOutput` from context.

---

## To Do

- [ ] Create `DocumentContext` or `PreviewProvider`
- [ ] Wire `MyloEditor` to push updates
- [ ] Create `PreviewPane` skeleton component
- [ ] Test live sync
- [ ] Update export logic to use Preview content

---

## Future Enhancements

- Support diff view when switching templates
- Version comparison (Editor content vs. styled preview)
- Intelligent preview warnings (e.g., widows, overflow)



---

## Placement of Tiptap Editor in App

The `MyloEditor` component (built with Tiptap) should live inside a **role-aware layout view** dedicated to document editing and previewing.

### Recommended Structure

| File | Purpose |
|------|---------|
| `src/components/MyloEditor.tsx` | Contains Tiptap setup and formatting logic |
| `src/pages/document/DocumentEditorView.tsx` | Layout view with role-based logic, includes editor and preview |
| `src/context/DocumentContext.tsx` | Shared state between editor and preview |
| `src/pages/document/index.tsx` | Route entry point |

This ensures consistent layout, encapsulated sync logic, and role-restricted access.

### To Do

- [ ] Create `DocumentEditorView.tsx` to wrap editor + preview
- [ ] Add route under `src/pages/document/`
- [ ] Wire in role detection and layout toggles

