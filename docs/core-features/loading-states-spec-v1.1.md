# Loading and Status Indicators Specification — v1.1

June 2025

---

# Overview

This specification defines all loading states, progress indicators, save feedback, and user-facing status messaging throughout the Mylo application. The goal is to create a consistent, non-disruptive experience while communicating system activity clearly.

---

# MVP Scope

## Applies To:

- Document loading
- Template loading
- Font loading
- Save operations (autosave + manual)
- Export (PDF and `.mylo`)
- Font preview and fallback behavior

## Excludes:

- Real-time collaboration
- Cloud sync status across devices

---

# Main Behavior Sections

## Save Behavior Rules

- Save status indicator appears in top navigation
- Save operations are silent unless failure occurs
- Autosave and manual save both trigger status messaging
- Export operations show separate progress messages and toasts

---

## UI Behavior

### Document Load (Editor)

- **Loading Message**: Spinner + “Loading your document…”
- **Delay Threshold**: 300ms before showing
- **Max Timeout**: 15s — if exceeded, show error message

### Template Load

- **Message**: Spinner in Preview panel + “Applying template…”
- **Behavior**: Spinner remains until Preview fully re-renders
- **Timeout Fallback**: “Template failed to load. Using default view.”

### Font Load

- **Spinner**: Inline next to font name
- **Tooltip on Failure**: “Font failed to load. Using fallback.”

### Save Status Indicator (Top Nav)

| State | Message |
|-------|---------|
| Idle | “All changes saved” |
| In Progress | “Saving your work…” |
| Offline | “Offline — saving locally” |
| Failed | “Changes couldn't be saved — retrying…” |

### Export Status (PDF or `.mylo`)

- **Spinner**: Appears next to Export button
- **Success**: Toast “Export complete”
- **Failure**: Toast “Export failed. Try again.”

---

## Stack Behavior

- Save status pulled from document state manager
- Template and font loading handled via async Promises
- Export system returns status to UI after server/download action
- Retry logic for save: silent on autosave, visible on manual save

---

## Data Models

*No persistent data structures defined — status values are UI-only.*

---

## Field Definitions

| Field | Type | Notes |
|-------|------|-------|
| status | Enum | "idle", "saving", "offline", "failed" |
| exportStatus | Enum | "idle", "in_progress", "failed", "complete" |
| fontLoad | Boolean | Triggers visual spinner per dropdown item |

---

# Additional Technical Sections (Optional)

### Fallback Timeouts

- Font load timeout: 3 seconds
- Template load timeout: 5 seconds
- Document load timeout: 15 seconds
- All fallback states trigger recovery messaging

---

# Error Handling

| Condition | Behavior |
|----------|----------|
| Save fails (autosave) | Silent retry up to 3x |
| Save fails (manual) | Banner + “Retry” option |
| Export fails | Toast with error message |
| Font fails | Tooltip and fallback display |
| Template fails | Banner in Preview: “Preview unavailable” |

---

# Known Gaps / Outstanding Questions

- Should save failures be logged persistently? (Effort: Medium, Status: Open)
- Should loading screens be branded? (Effort: Low, Status: TBD)
- Should exports include metadata about success/failure? (Effort: Low)

---

# Future Enhancements (Post-MVP)

- Central loading spinner component
- Activity panel (queued background tasks)
- Export queue manager
- Font load retries or fallback logic improvements

---

# Technical Dependencies

- Document state manager (save + sync)
- Template renderer
- Font loading via FontFace API
- Toast + status banner component

---

# API / Data Schema Notes

- None — all behaviors handled in client UI

---

# Version

Loading and Status Indicators Specification v1.1 — June 2025
