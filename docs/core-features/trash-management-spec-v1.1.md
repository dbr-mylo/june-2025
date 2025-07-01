# Trash Management Specification — v1.1

June 2025

---

# Overview

This specification defines how deleted documents, templates, and other entities are handled within Mylo. Trash functionality ensures that users can recover deleted items within a retention period and helps prevent accidental data loss. The system supports both global and per-section trash depending on context.

---

# MVP Scope

## Key Behaviors

- Each user role has access to a trash area for their editable content
- Deleted documents, templates, and folders are moved to Trash (not permanently deleted)
- Items remain in Trash for 30 days before automatic purge
- Users can restore or permanently delete items
- Trash is scoped by section (Documents, Templates, Teams, etc.)

---

# Main Behavior Sections

## Save Behavior Rules

- Deletion triggers a soft delete: sets `isDeleted: true` flag
- Trash entries remain in Supabase with timestamp
- Restore operation reverts `isDeleted: false`
- Hard delete removes record and associated assets (Post-MVP)

## UI Behavior

| Context | Behavior |
|---------|----------|
| Trash button | Appears in sidebar below each section |
| View trash | Shows list of deleted items for that section |
| Restore item | Brings it back to original location |
| Permanently delete | Confirmation required |
| Empty Trash | Deletes all expired entries |
| Deleted state | Document cannot be opened; shows “In Trash” banner if accessed |

---

## Stack Behavior

- All deletions are soft by default
- Trash entries are queryable by:
  - `deletedAt`
  - `deletedBy`
  - `isDeleted`
- Cleanup task purges entries >30 days old
- Trash UI is role-specific:
  - Contributors see only their deleted docs
  - Template Editors see only their own templates
  - Admins may see all

---

## Data Models

### Trashable Entity

```json
{
  "id": "doc_123",
  "type": "document",
  "name": "Client Brief",
  "isDeleted": true,
  "deletedAt": "2025-06-15T14:00:00Z",
  "deletedBy": "user_789"
}
```

## Field Definitions

| Field | Type | Notes |
|-------|------|-------|
| isDeleted | Boolean | Marks entity as trashed |
| deletedAt | ISO 8601 | Timestamp of deletion |
| deletedBy | UUID | User who deleted the item |
| type | String | "document", "template", etc. |

---

# Additional Technical Sections (Optional)

### Sidebar Placement

- Trash is listed under each section:
  - Documents
  - Templates
  - (Future) Teams, Users
- Trash is a distinct route (e.g., `/documents/trash`)

---

# Error Handling

| Condition | Behavior |
|----------|----------|
| Restore fails | Toast: “Could not restore item” |
| Delete fails | Toast: “Item could not be deleted” |
| Item already permanently deleted | Show fallback message |
| Trash not available | Hide link; log error in console |

---

# Known Gaps / Outstanding Questions

- Should Admins have a master trash view? (Effort: Medium, Status: Open)
- Should users be warned before auto-deletion? (Effort: Low, Status: TBD)
- Can documents be scheduled for deletion after inactivity? (Status: Post-MVP)

---

# Future Enhancements (Post-MVP)

- Bulk restore and bulk delete
- Scheduled deletion warnings (notifications)
- Role-based visibility controls
- Permanent delete audit logging

---

# Technical Dependencies

- Supabase flags (`isDeleted`, `deletedAt`, `deletedBy`)
- Trash UI component per section
- Scheduled backend cleanup task

---

# API / Data Schema Notes

- `PATCH /api/docs/:id` → `{ isDeleted: true }`
- `POST /api/docs/restore/:id`
- `DELETE /api/docs/:id/permanent`

---

# Version

Trash Management Specification v1.1 — June 2025
