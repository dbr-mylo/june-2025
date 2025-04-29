# Mylo Autosave and Sync Timing Rules Specification

This document defines the behavior, intervals, triggers, and fallback strategies for autosaving documents and synchronizing the Editor and Preview panels in Mylo.

It ensures data safety, system stability, and a seamless user experience during document editing.

---

# Overview

Autosave and sync behavior in Mylo must balance:

- **Data Protection**: Minimize risk of user data loss.
- **Performance Efficiency**: Prevent excessive resource usage.
- **User Experience**: Maintain a fast, unobtrusive, reassuring save process.

Autosave applies to document storage.  
Sync applies to updating the Preview Panel with latest Editor changes.

---

# Autosave Behavior (MVP)

## Triggers for Autosave

| Trigger | Description |
|:---|:---|
| Interval Timer | Every 30 seconds during active editing. |
| Idle Detection | If no typing/activity occurs for 60 seconds. |
| Major Event Save | Immediately after critical events (e.g., Template applied, document renamed, Export triggered). |
| BeforeUnload Event | Browser/tab close triggers a final save attempt. |

---

## Save Scope

- **Full Document Save**: Save captures the entire current document state.
- **Incremental Saves (Future)**: Not required for MVP; planned for scalability.

---

# Manual Save Behavior

- A **"Save Now"** button is available in the top navigation bar.
- Manual Save triggers:
  - Full document save immediately.
  - Update of Save Status Indicator to "All changes saved" upon success.
- Manual Save is allowed even if the document is currently autosaving (manual takes priority).

---

# Save Status Indicator (Reference)

- Save state is displayed persistently in the top navigation bar.
- Text states include:
  - "Saving your work…"
  - "All changes saved"
  - "Offline — saving locally"
  - "Changes couldn't be saved — retrying…"
- See full [Save Status Indicator Specification](save-status-indicator-spec.md) for detailed behavior.

---

# Error Handling (Autosave and Manual Save)

| Situation | Behavior |
|:---|:---|
| Save Failure | Retry automatically one time after 10 seconds. |
| Retry Failure | Display "Changes couldn't be saved — retrying…" warning. |
| Recovery | Retry saving again after 30 seconds (background attempt). |
| Final Failure | After repeated failures (>3 attempts), show persistent warning badge and optional soft refresh button. |

- Users must be able to continue working even if saves are failing in the background (resilient editing).

---

# Sync Timing Rules (Editor → Preview)

| Trigger | Behavior |
|:---|:---|
| Typing | Debounced 500ms after last keystroke before updating Preview. |
| Formatting Change (bold, italic, lists) | Immediate Preview update. |
| Template Application | Immediate full refresh of Preview Panel. |
| Page Breaks | Refreshed on document structure sync, not per keystroke. |

---

# Performance Protections

- **Debounced Typing Sync**: 500ms after last input before updating Preview (reduces UI churn).
- **Batched Minor Changes**: Paragraph returns, list edits are batched into single updates.
- **Failed Saves Do Not Block Editing**: Editing remains responsive even if saving is temporarily interrupted.

---

# Future Enhancements (Post-MVP)

- **Offline Mode Autosaves**: Store saves locally and re-sync when back online.
- **Customizable Autosave Intervals**: Allow users to modify autosave timing preferences.
- **Versioning on Manual Saves**: Optionally create a version snapshot when users manually save.

---

# Version

Mylo Autosave and Sync Timing Rules Specification v2.0 — April 2025
