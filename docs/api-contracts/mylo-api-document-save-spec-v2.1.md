# Mylo API Contract — Document Save Specification v2.1

June 2025

---

# Overview

This document defines the API contract for saving and loading Documents in Mylo. It ensures consistent structure across local saves (`.mylo` file) and cloud persistence, including metadata, pages, versions, and template references.

---

# MVP Scope

- Documents must include metadata, page content, and a valid template reference.
- Documents can be saved with empty content but must include structural data.
- Versioning metadata is included in the document payload.
- Save behavior is unified for autosave and manual save.

---

# Main Behavior Sections

## Save Behavior Rules

- Empty documents are valid but must include at least one Page object.
- `title` is required and must be non-empty.
- `templateId` must refer to a valid Template; otherwise, save fails.
- Page numbers must be unique and sequential starting from 1.
- No format difference between autosave and manual save.
- Timestamps use ISO 8601 UTC format (e.g., `"2025-04-26T17:45:00Z"`).

## UI Behavior

*Not directly applicable to API-level behavior. UI should show Save Status separately (see Save Status spec).*

## Stack Behavior

- All save calls hit the same backend API endpoint.
- Document save operations are idempotent and overwrite the current state.
- Autosave retries occur silently up to 3 times using exponential backoff.

## Data Models

### Document Payload Structure

```json
{
  "id": "doc-uuid-1234",
  "title": "Marketing Strategy Q3",
  "createdBy": "user-uuid-5678",
  "templateId": "template-uuid-9876",
  "pages": [
    {
      "pageNumber": 1,
      "content": "Here is the opening paragraph of the document..."
    },
    {
      "pageNumber": 2,
      "content": "Continuation on the second page..."
    }
  ],
  "versions": [
    {
      "versionId": "version-uuid-1111",
      "timestamp": "2025-04-27T13:00:00Z"
    }
  ],
  "createdAt": "2025-04-26T17:45:00Z",
  "updatedAt": "2025-04-27T13:01:00Z"
}
```

## Field Definitions

| Field | Type | Required | Description |
|:------|:-----|:---------|:------------|
| `id` | UUID | ✅ | Unique document identifier |
| `title` | String | ✅ | Document title |
| `createdBy` | UUID | ✅ | ID of document creator |
| `templateId` | UUID | ✅ | Linked Template ID |
| `pages` | Array | ✅ | Ordered list of page objects |
| `versions` | Array | Optional | History snapshots |
| `createdAt` | ISO 8601 | ✅ | Creation timestamp |
| `updatedAt` | ISO 8601 | ✅ | Last updated timestamp |

---

# Additional Technical Sections (Optional)

## Save Failure & Retry Logic

- Return standardized error JSON:
```json
{
  "error": {
    "code": "SAVE_FAILURE",
    "message": "Could not save document. Please retry.",
    "retryAfter": 10
  }
}
```
- Retry autosaves up to 3 times using exponential backoff.
- After max retries, show: `"Your changes couldn’t be saved. Please copy your work and reload."`
- Log all failures to browser console and optionally to diagnostics endpoint.

---

# Error Handling

| Condition | System Response |
|-----------|-----------------|
| Missing title | Reject save with validation error |
| Empty pages array | Reject save with error |
| Duplicate or missing page numbers | Reject save with error |
| Invalid templateId | HTTP 400 with message: "Invalid Template Reference" |

---

# Known Gaps / Outstanding Questions

- Should we validate `templateId` existence on the client before save? (Effort: Low, Status: Open)
- Is a save log (save count or hash) needed for future conflict resolution? (Effort: Medium, Status: TBD)
- Do we need compression support for multi-page documents? (Effort: Medium, Status: Deferred)

---

# Future Enhancements (Post-MVP)

- Differential saves (send only changed fields).
- Document-level change logs.
- Recovery of deleted documents from last valid version.
- Live collaborative save model.

---

# Technical Dependencies (Optional)

- Supabase Document Table schema
- `.mylo` file spec and parser
- Save endpoint with diagnostics logging

---

# API / Data Schema Notes (If Applicable)

- All payloads must match the above structure exactly for both cloud and local save.
- Versions are embedded but optional.
- Save endpoint path: `POST /api/documents/save`

---

# Version

Mylo API Contract — Document Save Specification v2.1 — June 2025
