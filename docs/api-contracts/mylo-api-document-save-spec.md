# Mylo API Contract — Document Save Specification

This document defines the API contract for saving and loading Documents in Mylo.

It establishes the required fields, data structure, and behavior rules for consistent local and (future) cloud saves.

---

# Overview

When a Contributor saves a document, either locally (`.mylo` file) or to a future cloud service, the following data structure must be generated and validated.

The document payload contains metadata, pages, versioning history, and Template reference information.

---

# Save Payload Structure

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

---

# Field Definitions

| Field | Type | Required | Description |
|:---|:---|:---|:---|
| `id` | UUID String | ✅ | Unique identifier for the Document. |
| `title` | String | ✅ | Document title; must not be empty. |
| `createdBy` | UUID String | ✅ | User ID of document creator. |
| `templateId` | UUID String | ✅ | ID of the Template applied to this document. |
| `pages` | Array of Page objects | ✅ | At least one Page object required (even if content is empty). |
| `versions` | Array of Version objects | Optional | Lightweight version history snapshots (can be empty). |
| `createdAt` | ISO 8601 Timestamp | ✅ | Time the document was first created. |
| `updatedAt` | ISO 8601 Timestamp | ✅ | Time of the latest save/update. |

---

# Save Behavior Rules

- **Empty documents allowed**: 
  - A Document can be saved even if its Pages contain no text.
- **Title required**: 
  - A Document must always have a non-empty `title` field at save time.
- **Template reference required**: 
  - Each Document must reference a valid Template by `templateId`.
- **Pages array required**: 
  - Pages array must exist even if all Page `content` fields are empty.
- **Auto-save and Manual Save must generate identical payloads**:
  - No difference in format between auto-save and manual save.
- **Timestamps must be ISO 8601 UTC format**:
  - e.g., `"2025-04-26T17:45:00Z"`

---

# Validation Notes

- Titles longer than 255 characters should be rejected.
- Pages must have unique, sequential `pageNumber` starting from 1.
- If no Template exists matching the `templateId`, Save should fail with error code `400: Invalid Template Reference`.

---

# Version

Mylo API Contract — Document Save Specification v1.0 — April 2025
