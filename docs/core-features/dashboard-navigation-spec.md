# Dashboard and Navigation Specification

This document defines the Dashboard layout and Navigation system for Mylo.

The Dashboard acts as the user’s entry point for documents and templates.

---

# Overview

- Users land on the Dashboard after login.
- Dashboard contains recent documents, template management (if applicable), and basic file/folder organization.

---

# MVP Scope

## Dashboard Sections

1. **Recent Documents**
   - List of documents by title and last modified date.
   - Click to open in Editor + Preview view.

2. **New Document Button**
   - Starts a new blank document with default formatting.
   - Default formatting is system-defined unless a template is selected.
   - If templates exist, the user may optionally apply one before writing or during editing.
   - Templates are not required — Contributors can work without one or choose one later.

3. **Templates Section (Template Editors Only)**
   - Manage Templates (Create, Edit, Publish, Unpublish).

4. **Basic Folders**
   - Flat folder structure.
   - Default "Documents" if no folder selected.
   - Available to all roles except Guests.

5. **Search Bar**
   - Search documents by title.
   - Filter by file type (document/template).


---

## Contributor Template Visibility (MVP)

Contributors can view and apply templates from within the Editor + Preview screen. Templates are:

- **Optional** – Contributors may choose to write without a template or apply one before or after writing.
- **Discoverable** – A dropdown labeled **“Select a Template”** appears in the Preview Panel if templates have been made available by a Template Editor.
- **Contextual** – The dropdown only appears once a document is open and is not shown from the dashboard itself.
- **Empty State Handling** – If no templates are assigned, the dropdown appears disabled with the message: *“No templates available.”*

### Mockup States Required
- **Empty** (dropdown disabled with message)
- **With Templates** (active dropdown showing options like Letterhead, Report, Newsletter)

  
---

## Folder Creation Behavior

When a user clicks “New Folder” from the folder dropdown or documents section, a modal appears to name the folder. This modal must support the following behaviors:

- **Autofocus** on input field when modal opens.
- **Enter to Save**: Pressing Enter saves the folder name and closes the modal.
- **Escape to Cancel**: Pressing Esc closes the modal without saving.
- **Validation**:
  - Folder name must not be empty.
  - Folder name must not duplicate an existing folder.
  - Leading/trailing whitespace is automatically trimmed.
- **Error messaging** shown inline beneath the input if validation fails.
- On success, the new folder is added to the list and selected.

### Mockup States Required
- **Add New** (default input view)
- **Validation** (e.g., empty name, duplicate)

---

## Navigation System

- Persistent top navigation bar with:
  - Dashboard (Home)
  - Documents
  - Templates (Template Editors and Admins only)
  - Logout

- Breadcrumbs appear only in folder views. See: breadcrumbs-behavior-spec.md
- Logo click returns to Dashboard.

---

# Future Enhancements (Post-MVP)

- **Team Projects/Folders:** Shared collaborative document spaces.
- **Favorite/Starred Files:** Quick access to important documents.
- **Recent Activity Feed:** Audit log of changes across files.
- **Customizable Dashboard Widgets:** Rearrange dashboard sections.

---

# Behavior Rules

- Contributors see their own documents and any available Templates.
- Template Editors see their documents and Template management.
- Admins can view all documents and templates.
- Guests have view-only access; no file creation or editing.

---

# Version

Dashboard and Navigation Specification v1.1 — May 2025
