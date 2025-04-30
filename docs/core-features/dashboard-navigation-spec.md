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
   - Start new document workflow (Template selection required if multiple available).

3. **Templates Section (Template Editors Only)**
   - Manage Templates (Create, Edit, Publish, Unpublish).

4. **Basic Folders**
   - Flat folder structure.
   - Default "My Documents" if no folder selected.

5. **Search Bar**
   - Search documents by title.
   - Filter by file type (document/template).

## Navigation System

- Persistent top navigation bar with:
  - Dashboard (Home)
  - Documents
  - Templates (Template Editors and Admins only)
  - Logout

- Breadcrumbs inside document and template editing views.
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

Dashboard and Navigation Specification v1.0 — April 2025
