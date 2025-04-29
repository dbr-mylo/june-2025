# Mylo System State Flows Specification

This document defines the core system states and lifecycle transitions for documents in Mylo.

It ensures consistent handling of save operations, preview rendering, export readiness, and error recovery.

---

# Overview

Documents move through a predictable set of states during their lifecycle:

| State | Description |
|:---|:---|
| **New** | Document just created, not yet saved. |
| **Draft** | Document saved locally but still editable. |
| **Saved** | Document manually saved, no unsaved changes pending. |
| **Edited** | User has modified the document after last save. |
| **Exported** | Document exported to PDF. |
| **Error** | Save or export failure occurred. |
| **Recovered** | System recovered unsaved edits after failure or reload. |

---

# State Flow Diagram (Text)

```
(New) → (Draft) → (Saved) ↔ (Edited)
    ↘                           ↘
  (Error)                      (Exported)
    ↘
 (Recovered) → (Draft)
```

---

# Detailed Transitions

| From | To | Trigger/Event |
|:---|:---|:---|
| New → Draft | User saves for the first time. |
| Draft → Saved | User manually saves. |
| Saved → Edited | User types or formats new content. |
| Edited → Saved | Auto-save or manual save. |
| Saved → Exported | User exports to PDF. |
| Any → Error | Save or export failure. |
| Error → Recovered | System attempts recovery (e.g., restore from local memory/cache). |
| Recovered → Draft | Recovered content manually saved by user. |

---

# Behavior Rules

- **Auto-Save Only When in Edited State**:  
  The system auto-saves documents only when in the Edited state.

- **Export Always From Saved State**:  
  Users can only export from a Saved state (not during active unsaved edits).

- **Error Handling**:  
  On Save/Export failure, show user an error and attempt automatic recovery if possible.

- **Recovery Logic**:  
  After a crash or tab reload, if unsaved content is found, prompt user to restore and save.

---

# Failure and Recovery Flows

| Failure | System Response |
|:---|:---|
| Save failure | Stay in Edited state, show error message, allow Retry. |
| Export failure | Stay in Saved state, show error message, allow Retry. |
| App crash/reload | Try to recover last auto-saved or browser-stored content. |

---

# Future Considerations (Post-MVP)

- State snapshots for undo/redo stack.
- Document archival state ("Archived" after final publishing/export).
- Collaborative editing states (e.g., "Locked", "Conflict", "Synced").

---

# Version

Mylo System State Flows Specification v1.0 — April 2025
