# Mylo API Contract — Document Version Save Specification v2.1

June 2025

---

# Overview

This document defines the structure and behavior of Document Versions in Mylo. Versions capture lightweight snapshots during key events such as saves and exports, preserving historical context without duplicating full content.

---

# MVP Scope

- Version records include:
  - `versionId`, `documentId`, `timestamp`, `snapshotSummary`
- Snapshot summary includes:
  - Page count
  - Title
  - Template ID
- Versions are embedded in `.mylo` file
- Versions are invisible to end users at MVP
- Retain only the most recent 5 versions

---

# Main Behavior Sections

## Save Behavior Rules

- Versions are created automatically:
  - Manual saves
  - Auto-saves after major edits
  - Template change
  - Export to PDF
- No user action required
- Older versions are discarded when over 5
- No full content duplication — summary only

## UI Behavior

- No UI for version history at MVP
- No UI feedback that a version was created

## Stack Behavior

- Versions stored as part of document JSON
- Circular buffer structure enforces 5-version cap
- Version creation runs asynchronously post-save

## Data Models

### Version Payload

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

## Field Definitions

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| versionId | UUID | ✅ | Unique version ID |
| documentId | UUID | ✅ | Owning document ID |
| timestamp | ISO 8601 | ✅ | Version creation time |
| snapshotSummary | JSON Object | ✅ | Metadata summary of the document |

---

# Additional Technical Sections (Optional)

- `.mylo` schema parser must handle `versions[]` array cleanly

---

# Error Handling

| Condition | System Response |
|----------|-----------------|
| Invalid `documentId` | Reject save with error |
| Snapshot missing required fields | Reject version creation |
| More than 5 versions | Discard oldest version automatically |

---

# Known Gaps / Outstanding Questions

- Should exports store a version checkpoint? (Effort: Medium, Status: Open)
- Should named versions be supported? (Effort: High, Status: Future)
- Should version history be exposed via Admin tooling? (Effort: Medium, Status: Deferred)

---

# Future Enhancements (Post-MVP)

- Named saves (e.g., “Pre-Final Draft”)
- Visible version timeline and restore feature
- Collaborative merge history and conflict tools

---

# Technical Dependencies (Optional)

- UUID generator
- ISO 8601 timestamp utility
- Snapshot reducer (for page/title/template)

---

# API / Data Schema Notes (If Applicable)

- No standalone API for version save — handled internally in Document Save
- Stored as embedded array `document.versions[]`

---

# Version

Mylo API Contract — Document Version Save Specification v2.1 — June 2025
