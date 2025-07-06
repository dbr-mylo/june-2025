# Undo/Redo System Specification — v1.0

June 2025

---

# Overview

This specification defines how Mylo implements undo and redo functionality within the Editor. The system is built on Tiptap’s command stack and supports both keyboard shortcuts and menu-triggered actions. Undo/redo is available for all Contributor and Template Editor interactions that modify the document content.

---

# MVP Scope

## Supported Actions

- Text input and deletion
- Formatting changes (bold, italic, etc.)
- List and indentation changes
- Insertion or removal of images
- Style application (for Template Editors only)

## Excluded from Undo

- Template switches
- Preview-only actions
- System-driven changes (e.g. style inference)

---

# Main Behavior Sections

## Save Behavior Rules

- Undo/redo operates independently of save
- Autosave snapshots occur regardless of history position
- Undo does **not** trigger a save
- Undo stack is reset on document close or template switch

## UI Behavior

| Action | Behavior |
|--------|----------|
| Cmd+Z | Undo previous command |
| Shift+Cmd+Z | Redo command |
| Menu: Edit > Undo | Mirrors Cmd+Z |
| Menu: Edit > Redo | Mirrors Shift+Cmd+Z |
| Undo unavailable | Menu item disabled |
| Redo unavailable | Menu item disabled |

- Tooltip shows keyboard shortcut on hover
- Undo stack is local per session

---

## Stack Behavior

- Tiptap’s history extension used for stack management
- Limit: 100 undoable actions per session
- Undo stack is cleared when:
  - Document is switched
  - Role changes (e.g., Contributor → Template Editor)
  - Reload or logout occurs

---

## Data Models

*Undo/redo is transient — no persistent model.*

## Field Definitions

| Field | Type | Notes |
|-------|------|-------|
| undoStack | Array | Last 100 operations |
| redoStack | Array | Operations undone, available for re-apply |
| isUndoAvailable | Boolean | Used to disable/enable menu items |

---

# Additional Technical Sections (Optional)

### Custom Undo Integration

- Non-Tiptap actions (e.g., style override) may push custom entries to undo stack
- Custom command format:
  ```ts
  {
    type: "custom",
    undo: () => { ... },
    redo: () => { ... }
  }
  ```

---

# Error Handling

| Condition | Behavior |
|----------|----------|
| Undo stack corrupt | Lock history + show error toast |
| Action fails | Toast: “Undo failed” |
| Redo fails | Toast: “Redo failed” |
| Too many actions | Oldest actions dropped silently |

---

# Known Gaps / Outstanding Questions

- Should undo/redo span saved sessions? (Effort: High, Status: Rejected)
- Should custom layout actions be undoable? (Status: Post-MVP)
- Can users view undo history? (Effort: Medium, Status: Future)

---

# Future Enhancements (Post-MVP)

- Viewable undo stack history
- Undo support for layout changes
- Collaborative undo across multiple users (Real-time editing)
- Time-based undo: jump back to timestamp

---

# Technical Dependencies

- Tiptap history extension
- Editor context manager
- Menu component integration

---

# API / Data Schema Notes

- No API used — all behavior is client-local

---

# Version

Undo/Redo System Specification v1.0 — June 2025
