# Mylo Data Models Specification — v2.0

June 2025

---

# Overview

This specification defines the core data models that power Mylo’s document, template, user, and system behavior. These models are stored in Supabase and accessed via REST API endpoints and internal logic. Each model is defined by its schema and usage across Mylo roles.

---

# MVP Scope

## 1. Document Object

```json
{
  "id": "doc_001",
  "title": "Sample Document",
  "templateId": "tmpl_001",
  "content": { ... },  // Tiptap JSON
  "ownerId": "user_123",
  "createdAt": "2025-06-01T12:00:00Z",
  "updatedAt": "2025-06-02T09:30:00Z",
  "isDeleted": false,
  "trashedAt": null
}
```

| Field | Type | Notes |
|-------|------|-------|
| id | UUID | Document identifier |
| title | String | User-defined |
| templateId | UUID | Foreign key to Template |
| content | JSON | Tiptap editor content |
| ownerId | UUID | Creator of document |
| isDeleted | Boolean | Soft deletion flag |
| trashedAt | ISO 8601 | Null unless in trash |

---

## 2. Template Object

```json
{
  "id": "tmpl_001",
  "name": "Marketing Template",
  "settings": { ... },
  "styles": [ ... ],
  "thumbnailUrl": "https://cdn.mylo.app/thumbnails/tmpl_001.png",
  "createdBy": "user_456",
  "assignedTo": ["user_789", "team_002"],
  "createdAt": "2025-06-01T12:00:00Z"
}
```

| Field | Type | Notes |
|-------|------|-------|
| id | UUID | Unique ID |
| name | String | Display name |
| settings | JSON | Template Settings block |
| styles | Array | Style definitions |
| thumbnailUrl | String | Public URL |
| createdBy | UUID | User ID |
| assignedTo | Array | User/team assignments |
| createdAt | ISO 8601 | Creation timestamp |

---

## 3. Template Set Object

```json
{
  "id": "tmplset_001",
  "name": "Brand Set A",
  "templateIds": ["tmpl_001", "tmpl_002"],
  "assignedTo": ["user_001", "user_002"]
}
```

| Field | Type | Notes |
|-------|------|-------|
| id | UUID | Template Set ID |
| name | String | Display name |
| templateIds | Array | Templates in set |
| assignedTo | Array | Users or teams |

---

## 4. User Object

```json
{
  "id": "user_001",
  "email": "name@example.com",
  "role": "Contributor",
  "teamIds": ["team_001"],
  "isActive": true,
  "createdAt": "2025-05-30T10:00:00Z"
}
```

| Field | Type | Notes |
|-------|------|-------|
| id | UUID | Unique user ID |
| email | String | Primary contact |
| role | Enum | Contributor, TemplateEditor, Admin |
| teamIds | Array | Team memberships |
| isActive | Boolean | Account active status |
| createdAt | ISO 8601 | User creation time |

---

## 5. Version Object (Document History)

```json
{
  "id": "ver_001",
  "documentId": "doc_001",
  "versionNumber": 3,
  "content": { ... },
  "createdAt": "2025-06-02T09:00:00Z",
  "createdBy": "user_123"
}
```

| Field | Type | Notes |
|-------|------|-------|
| id | UUID | Version ID |
| documentId | UUID | Parent document |
| versionNumber | Integer | Incremental count |
| content | JSON | Snapshot of Tiptap data |
| createdAt | ISO 8601 | Version timestamp |
| createdBy | UUID | Who saved version |

---

# Stack Behavior

- Supabase tables hold all models with access limited by row-level security (RLS)
- Foreign keys used for relational access (e.g., documents linked to templates)
- Indexes defined for `id`, `createdAt`, and `ownerId` per table
- Trash and versioning systems use logical pointers and timestamps

---

# Failure Recovery and Data Validation

- Each model uses:
  - UUIDs for strict key enforcement
  - Timestamps for backup and audit purposes
  - Soft deletion to protect from data loss
- Validation handled client-side and enforced on Supabase insert/update

---

# Error Handling

| Condition | Behavior |
|----------|----------|
| Missing foreign key (e.g. templateId) | Reject insert with 400 |
| Invalid enum (e.g. role) | API rejection |
| Attempt to delete non-owned item | Forbidden (403) |
| Data model desync | Logs warning + attempts soft fallback |

---

# Known Gaps / Outstanding Questions

- Should we introduce template versioning as a separate object? (Status: Open)
- Do template sets need their own audit trail? (Post-MVP)
- Should soft-deleted items retain versions? (Medium risk)

---

# Future Enhancements (Post-MVP)

- Template version tracking
- More granular role permissions on per-model basis
- Last accessed timestamps
- Object-level access audit logs

---

# Technical Dependencies

- Supabase schema definitions
- Supabase row-level security policies
- Validation middleware on write operations

---

# API / Data Schema Notes

- All models served via RESTful endpoints
- Versioning and trash handled with separate services

---

# Version

Mylo Data Models Specification v2.0 — June 2025
