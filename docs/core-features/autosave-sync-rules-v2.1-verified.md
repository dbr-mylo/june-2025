# Mylo Autosave and Sync Timing Rules Specification — v2.1

June 2025

---

# Overview

This document defines the behavior, intervals, triggers, and fallback strategies for autosaving documents and synchronizing the Editor and Preview panels in Mylo. It ensures data safety, system stability, and a seamless user experience during document editing.

Autosave applies to document storage.  
Sync applies to updating the Preview Panel with the latest Editor changes.

---

# MVP Scope

## Autosave

- Triggered every 30 seconds during active editing.
- Triggered after 60 seconds of idle time.
- Triggered immediately after critical events:
  - Template applied
  - Document renamed
  - Export triggered
- Final save attempt on tab/browser close (`beforeunload`).

## Manual Save

- Manual save via top-bar "Save Now" button.
- Takes priority over autosave if both are triggered simultaneously.
- Triggers full document save and status update to “All changes saved.”

## Preview Sync

- Sync occurs 500ms after last keystroke (debounced).
- Immediate sync on formatting changes (bold, italic, list).
- Full refresh on Template application.
- Page break structure triggers batch sync.

---

# Main Behavior Sections

## Save Behavior Rules

- Autosave and manual save produce the same payload.
- Manual saves override in-progress autosaves.
- Autosave is silent; manual save gives explicit UI feedback.
- Save failures do not interrupt editing.
- Save status text updates based on result.

## UI Behavior

- Save Status Indicator Texts:
  - "Saving your work…"
  - "All changes saved"
  - "Offline — saving locally"
  - "Changes couldn't be saved — retrying…"

- Persistent status area located in top navigation bar.

## Stack Behavior

- Backend Save API accepts full document payload.
- Autosave status stored in memory; no need to reload document.
- Preview sync uses internal debounced diff-checker to avoid full re-render.

## Data Models

- See Document Save Specification for document payload structure.

## Field Definitions

- Save Status Indicator states are defined in Save Status Indicator spec.

---

# Additional Technical Sections (Optional)

*None currently.*

---

# Error Handling

| Situation         | Behavior                                                           |
|------------------|---------------------------------------------------------------------|
| Save Failure      | Retry once after 10 seconds.                                        |
| Retry Failure     | Display "Changes couldn't be saved — retrying…" warning.            |
| Continued Failure | Background retry after 30 seconds.                                  |
| Final Failure     | Show persistent warning badge and soft refresh option.              |

- All failures are logged to console.
- Users may continue editing even if saves fail.

---

# Known Gaps / Outstanding Questions

- Should manual saves always generate a version snapshot? (Effort: Medium, Status: Under Review)
- Should autosave interval be configurable per user/session? (Effort: Low, Status: TBD)
- How does Preview sync behave for very large documents? (Effort: Medium, Status: Not Tested)

---

# Future Enhancements (Post-MVP)

- Offline autosave with background re-sync.
- Customizable autosave intervals (per document or globally).
- Optional versioning on manual save.
- Smarter debounce strategy based on document complexity.

---

# Technical Dependencies (Optional)

- Debounce/throttle utility (e.g., lodash.debounce)
- Document Save API
- Tiptap editor change detection
- Save Status Indicator spec
- Browser `beforeunload` event handling

---

# API / Data Schema Notes (If Applicable)

- Save API must support idempotent document save calls.
- All timestamps must follow ISO 8601 UTC.

---

# Version

Mylo Autosave and Sync Timing Rules Specification v2.1 — June 2025
