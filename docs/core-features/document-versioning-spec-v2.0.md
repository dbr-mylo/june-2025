# Document Versioning Specification — v2.0

June 2025

---

# Overview

This document defines how Document Versioning works in Mylo. Versioning ensures silent state preservation for recovery and rollback purposes. Version history is not user-visible at MVP, but all snapshots are stored within the `.mylo` file format.

---

# MVP Scope

## Version Capture Triggers

- Manual save
- Auto-save after major edits
- Template application or change
- Document export (PDF or file save)

## Contents of Each Version

- Full document content snapshot at time of capture
- Title and template metadata
- Version timestamp and creator ID

## Storage Behavior

- Versions are embedded in the `.mylo` file structure
- Only the **5 most recent** versions are retained per document (configurable in future)
- Versions are lightweight to avoid excessive file size

## User Interaction

- No visible version browsing in the UI
- No named saves or restore actions
- Versioning is entirely silent and automatic

---

# Main Behavior Sections

## Save Behavior Rules

- All versions are created automatically and silently
- Older versions are purged when limit (5) is reached
- New version is stored immediately after the triggering event
- Document content must be serialized before version is recorded

## UI Behavior

- No UI component shows or allows version access
- Save Status Indicator shows normal save messages, not version events

## Stack Behavior

- Versions stored in the `versions[]` array inside `.mylo` document object
- Snapshot reducer creates minimal metadata structure for each version
- Version creation is decoupled from actual file save

## Data Models

### Version Object

```json
{
  "versionId": "uuid-abc",
  "documentId": "uuid-def",
  "timestamp": "2025-06-01T10:00:00Z",
  "snapshotSummary": {
    "pageCount": 3,
    "title": "Marketing Memo",
    "templateId": "template-uuid-xyz"
  }
}
```

## Field Definitions

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| versionId | UUID | ✅ | Unique per version |
| documentId | UUID | ✅ | Parent document |
| timestamp | ISO 8601 | ✅ | Time of capture |
| snapshotSummary | JSON | ✅ | Title, page count, templateId |

---

# Additional Technical Sections (Optional)

*See Document Save and Editor/Preview specs for where versions are triggered.*

---

# Error Handling

| Condition | Behavior |
|----------|----------|
| Invalid version snapshot | Skip creation and log warning |
| Failure to serialize content | Cancel version creation, retry on next save |
| More than 5 versions | Remove oldest before appending new |

---

# Known Gaps / Outstanding Questions

- Should document export trigger versioning always? (Effort: Medium, Status: TBD)
- Should named or tagged versions exist for manual reference? (Effort: High, Status: Future)
- How do we preserve version history on cloud sync? (Effort: Medium, Status: Deferred)

---

# Future Enhancements (Post-MVP)

- UI version history with restore
- Named version creation and tagging
- Merge resolution for collaborative editing
- Role-based access to version management

---

# Technical Dependencies (Optional)

- UUID generator
- Timestamp generator (ISO 8601 UTC)
- Document serialization logic

---

# API / Data Schema Notes (If Applicable)

- No public API for versioning yet
- Embedded in document JSON: `versions[]`

---

# Version

Document Versioning Specification v2.0 — June 2025
