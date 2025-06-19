# Undo and Redo System Specification

This document defines the behavior, scope, stack management, UI interaction, and error handling for Undo and Redo operations in Mylo.

Undo and Redo ensure users can safely revise their actions during document editing and template design.

---

# Overview

Undo/Redo provides users with the ability to:

- Revert recent changes (Undo).
- Reapply previously undone actions (Redo).

Both Contributors and Template Editors must have access to Undo/Redo functionality while working inside the Editor Panel.

Undo/Redo operations must be **local to the active session** and **non-destructive** to the underlying saved document until explicitly saved.

---

# MVP Scope

Undo/Redo must support the following action types:

| Action | Included in Undo/Redo? |
|:---|:---|
| Text typing/deletion | ✅ Yes |
| Text formatting (bold, italic, underline, lists, alignments) | ✅ Yes |
| Structural actions (page insertions, deletions, splits, merges) | ✅ Yes |
| Style changes inside editable text areas | ✅ Yes |
| Image insertion or removal (if applicable) | ✅ Yes |
| Template application | ❌ No (template application is a separate action outside undo scope at MVP) |

---

# Stack Behavior

| Item | Behavior |
|:---|:---|
| Stack Storage | Local in-memory Undo Stack per document session. |
| Max Undo Steps | Minimum 50 actions retained (configurable). |
| Grouped Actions | Typing bursts (within 1–2 seconds) grouped as a single undoable action. |
| Auto-Save Integration | Auto-saving clears no undo/redo states; saving and undo/redo are independent. |
| Manual Save Integration | Same as above — manual saves do not flush or affect undo stack. |
| Session Reset | Closing the document clears the undo/redo history for that document. |

---

# UI Behavior

## Toolbar Controls
- **Undo Button** (⤺)
- **Redo Button** (⤻)
- Enabled only if actions are available on each stack.
- Disabled (grayed out) when no undo or redo is possible.

## Keyboard Shortcuts
- **Undo:** `Cmd + Z` (Mac) / `Ctrl + Z` (Windows)
- **Redo:** `Cmd + Shift + Z` (Mac) / `Ctrl + Shift + Z` (Windows)

Shortcuts must always work even if the toolbar buttons are hidden.

---

# Special Cases

| Event | Undo/Redo Behavior |
|:---|:---|
| Template applied | Not undoable via Undo stack (out of MVP scope). |
| Document Save (auto/manual) | Does not affect Undo/Redo availability. |
| Export to PDF | No interaction with Undo/Redo. |
| Page creation/deletion | Undo restores the previous document structure properly. |
| Image addition/removal | Undo restores or removes image as appropriate. |

---

# Error Handling

- If Undo/Redo operation fails:
  - Show minimal toast or alert: "Unable to undo action. Please try again."
  - Maintain editable state without crashing or freezing.
- Undo/Redo failure must not destroy active unsaved content.

---

# Performance and Memory Protections

- Limit memory footprint by capping stored actions (minimum 50 steps, higher if system memory allows).
- Group small text edits into batch undo actions (e.g., typing a word vs. each individual keystroke).
- Evict oldest undo steps when stack limit is reached.

---

# Future Enhancements (Post-MVP)

- Collaborative Undo/Redo stacks (per user branch history during multi-user editing).
- Persistent Undo/Redo across sessions (local storage recovery).
- Undo of Template application.
- Snapshot-based structural undos for complex layouts.

---

# Version

Mylo Undo and Redo System Specification v1.0 — April 2025
