# Dashboard and Navigation Specification — v1.2

June 2025

---

# Overview

This document defines the Dashboard layout and global Navigation system for Mylo. The Dashboard is the primary entry point for accessing documents, managing templates, and initiating new content. Navigation behavior supports role-based access and file management across Contributor, Template Editor, and Admin roles.

---

# MVP Scope

## Dashboard Sections

1. **Recent Documents**
   - Lists documents by title and last modified date.
   - Clicking a file opens it in the Editor + Preview interface.

2. **New Document Button**
   - Starts a new blank document with default formatting.
   - User may apply a Template before or during editing.
   - Contributors can write without a template if desired.

3. **Templates Section (Template Editors Only)**
   - Access to create, edit, publish, and unpublish Templates.

4. **Folders**
   - Flat folder structure (no nesting).
   - "Documents" is the default folder if none selected.
   - Folder organization is available to all roles except Guests.

5. **Search Bar**
   - Search by document title.
   - Filter by file type: document or template.

---

## Contributor Template Visibility

- **Optional**: Contributors may use a Template or proceed without one.
- **Discoverable**: “Select a Template” dropdown appears in Preview Panel (not in Dashboard).
- **Contextual**: Template dropdown appears only once a document is open.
- **Empty State Handling**:
  - If no templates exist, dropdown is disabled with message: *“No templates available.”*

### Mockup States Required

- Empty dropdown (disabled + message)
- Active dropdown (with options like Letterhead, Report)

---

## Folder Creation Behavior

When creating a new folder:

- A modal appears prompting for a folder name.
- **Autofocus** input field on open.
- **Enter** confirms and creates the folder.
- **Escape** cancels without saving.
- Validation includes:
  - Non-empty name.
  - Name must not duplicate an existing folder.
  - Trims leading/trailing whitespace.
- Errors are displayed inline.
- Successful folder creation updates and selects the new folder.

### Mockup States Required

- Add New (blank input)
- Validation error (duplicate or empty)

---

# Main Behavior Sections

## Save Behavior Rules

*Not applicable. Dashboard state changes are reactive only.*

## UI Behavior

- Persistent top navigation bar includes:
  - Dashboard (Home)
  - Documents
  - Templates (Template Editors and Admins only)
  - Logout
- Clicking logo returns user to Dashboard.
- Breadcrumbs appear only when browsing folders (see breadcrumbs spec).
- Navigation bar is fixed and consistent across views.

## Stack Behavior

- Routes:
  - `/dashboard`, `/documents`, `/templates`
- Access controlled by role
- Templates section is not visible to Contributors
- Guests cannot create or modify content

## Data Models

- `Document`: includes folderId and modifiedAt
- `Template`: includes publish status and assigned folder
- `Folder`: name, id, and optional sorting/filter flags

## Field Definitions

| Field | Type | Notes |
|-------|------|-------|
| folderName | String | Required, unique |
| folderId | UUID | Links to documents |
| fileType | Enum | "document", "template" |

---

# Additional Technical Sections (Optional)

*See `contributor-template-behavior-spec.md` and `template-management-spec.md` for cross-reference.*

---

# Error Handling

| Condition | Behavior |
|----------|----------|
| Duplicate folder name | Inline error message |
| Invalid folder name | Reject with warning |
| Guest attempts action | UI blocks with tooltip: "Guests cannot create files." |

---

# Known Gaps / Outstanding Questions

- Should folders support shared access in the future? (Effort: High, Status: Post-MVP)
- Will starred/favorite files persist across sessions? (Effort: Medium, Status: TBD)
- Should dashboard layout be customizable by user? (Effort: Medium, Status: Deferred)

---

# Future Enhancements (Post-MVP)

- Team-based shared folders and projects
- Custom dashboard layouts per role
- Activity feed showing recent file changes
- Starred/favorite files
- Quick actions (duplicate, move, rename) from list view

---

# Technical Dependencies (Optional)

- Supabase folder + file metadata schema
- Dashboard layout engine
- User role + routing middleware

---

# API / Data Schema Notes (If Applicable)

- Folder creation: `POST /api/folders/create`
- File listing: `GET /api/files?folder=xyz&type=document`
- Search: `GET /api/search?q=title&type=document`

---

# Version

Dashboard and Navigation Specification v1.2 — June 2025
