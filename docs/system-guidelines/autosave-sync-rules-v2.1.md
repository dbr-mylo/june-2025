# Autosave Sync Rules Specification — v2.1

**Version:** 2.1  
**Status:** Draft for MVP Clarity  
**Last Updated:** July 2025

---

## Overview
This document defines how the **autosave mechanism** in Mylo operates, how the UI reflects save status, and how synchronization is handled between the Editor and Preview panels. It replaces placeholder logic with implementation-ready rules.

---

## Autosave Lifecycle States

| State    | Description                                  | UI Indicator         |
|----------|----------------------------------------------|----------------------|
| `clean`  | No changes pending; document is saved        | No badge or neutral  |
| `dirty`  | Unsaved edits present                        | Dot or “Unsaved” tag |
| `saving` | Actively writing to Supabase/local storage   | Spinner or subtle text change |
| `error`  | Save failed due to network or logic issue    | Red icon + tooltip   |

---

## Save Triggers

| Trigger                | Behavior                         |
|------------------------|----------------------------------|
| Typing pause (debounce)| Starts save after 1.5s idle      |
| Manual Save (Ctrl+S)   | Forces immediate save            |
| Route change or close  | Saves immediately if dirty       |
| Periodic backup        | Every 30s if dirty (redundancy)  |

---

## Save Targets

| Storage Method   | Used When                       |
|------------------|---------------------------------|
| Supabase backend | Default for logged-in users     |
| localStorage     | Guest mode or offline fallback  |

---

## Versioning Behavior
- A snapshot is saved **every successful autosave**
- Only the latest 5 autosave versions are kept
- Version data includes:
  - `timestamp`
  - `userId`
  - `docId`
  - `contentHash`

---

## Preview Panel Sync

| Event                  | Preview Action                       |
|------------------------|--------------------------------------|
| Editor content updated | Immediately reflects dirty content   |
| Save completes         | No visual difference unless version is surfaced |
| Save error             | Preview remains live, but banner warns user |

---

## Error Handling

| Error Type            | Behavior                                     |
|------------------------|----------------------------------------------|
| Supabase write failure| Retry 3x with exponential backoff; notify user |
| Offline / no network  | Store to localStorage until restored         |
| Document lock error   | Prevent save, show conflict modal (future)   |

---

## UI Components Required
- Save badge: `Clean`, `Unsaved`, `Saving...`, `Error`
- Optional tooltip for last saved timestamp
- Inline undo/redo tracker (basic)

---

## Future Enhancements
- Full version history viewer (timeline)
- Real-time multi-user conflict resolution
- “Save as snapshot” for manual versioning
- Offline autosave queue with reconnect sync

---

## Next Steps
- Implement state machine inside `EditorContext`
- Create autosave status hook with UI integration
- Connect to Supabase write endpoint and retry logic
- Mirror local saves in dev mode for testing fallback
