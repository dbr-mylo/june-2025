# Mylo API Contract — Document Version Save Specification

This document defines the API contract for saving and loading internal Document Versions in Mylo.

Versions are silent snapshots of document states captured during major events like saves, template changes, and exports.

They are critical for future undo, rollback, and recovery features.

---

# Overview

Versions are embedded inside the `.mylo` file format.  
They are not exposed to end users during MVP, but must be preserved for future functionality.

Each Version captures a full snapshot reference without duplicating the full document payload separately.

---

# Save Payload Structure

```json
{
  "versionId": "version-uuid-4567",
  "documentId": "doc-uuid-1234",
  "timestamp": "2025-04-27T14:00:00Z",
  "snapshotSummary": {
    "pageCount": 3,
    "title": "Marketing Strategy Q3",
    "templateId": "template-uuid-9876"
  }
}
```

---

# Field Definitions

| Field | Type | Required | Description |
|:---|:---|:---|:---|
| `versionId` | UUID String | ✅ | Unique identifier for this version snapshot. |
| `documentId` | UUID String | ✅ | ID of the Document this version belongs to. |
| `timestamp` | ISO 8601 Timestamp | ✅ | Time the snapshot was created. |
| `snapshotSummary` | JSON Object | ✅ | Lightweight summary of document state (no full duplication). |

---

# Save Behavior Rules

- **Automatic Creation**:  
  Versions are created automatically at:
  - Manual saves
  - Auto-saves after major edits
  - Template application or change
  - Export to PDF

- **Summary-Only Storage**:  
  - Versions store **summaries**, not full text.
  - Avoid duplicating page content inside each version.
  
- **Retention Policy**:
  - By default, **retain the last 5 versions** per Document (configurable).
  - Older versions are purged automatically to control file size.

- **Timestamps Must Use UTC ISO 8601 Format**:
  (e.g., `"2025-04-27T14:00:00Z"`)

---

# Validation Notes

- `versionId` must be unique per Document.
- `documentId` must match the owning Document’s `id`.
- `snapshotSummary` must include:
  - `pageCount` (integer > 0)
  - `title` (non-empty string)
  - `templateId` (UUID of applied Template)

---

# Future Expansion (Post-MVP)

- Full snapshot of content (optional for future undo/rollback functionality).
- Named versions ("Draft 1", "Final Draft", etc.).
- Branch/merge versioning for collaborative editing.

---

# Version

Mylo API Contract — Document Version Save Specification v1.0 — April 2025
