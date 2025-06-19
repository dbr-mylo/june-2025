# Navigation and Default Views Specification

This document defines the role-based navigation system and default landing views for each role in Mylo. It replaces the previous generalized concept of a “Dashboard.”

---

## Overview

Users land in different parts of the application based on their assigned role. Navigation is role-sensitive, and the UI presents role-appropriate functionality and content upon login.

---

## Default Views by Role

### Contributor
- Lands in **Documents**
- Sees:
  - New Document button
  - Folder list (including default “My Documents”)
  - Search bar with filters
  - Optionally sorted or filtered view of recent activity

### Template Editor
- Lands in **Templates**
- Sees:
  - List of Templates
  - Actions to Create, Edit, Publish, Unpublish Templates
  - Folder list (if using template folders)
  - Template search and filter bar

### Admin
- Lands in **Teams** (future)
- Sees:
  - List of teams they manage
  - Team-level access to Documents and Templates (1 folder level deep)
  - Admin tools such as user management, trash, and permission settings

---

## Navigation System

- Persistent top navigation bar includes:
  - **Documents** (default for Contributors)
  - **Templates** (for Template Editors and Admins)
  - **Logout**
- “Dashboard” is an internal term and does not appear in the UI.
- Clicking the Mylo logo returns users to their default landing view:
  - Contributors → Documents
  - Template Editors → Templates
  - Admins → Teams (in the future)
- Breadcrumbs appear only in folder views.
  > 📎 See: `breadcrumbs-behavior-spec.md`

---

## Future Enhancements (Post-MVP)

- **Team Navigation:** Deep linking into Teams > Template Sets or Teams > Documents
- **Favorite/Starred Files:** Quick access to important or frequently accessed files
- **Recent Activity Feed:** Timeline of recent edits and access
- **Custom Views or Pins:** Bookmarked filters or saved search presets
- **Quick Jump Menu:** Command palette or keyboard-accessible navigation shortcuts

---

## Behavior Rules

- Contributors see their own documents and any available Templates.
- Template Editors see their documents and Template management.
- Admins can view all documents, templates, and users.
- Guests have view-only access; no file creation or editing.

---

## Version

Navigation and Default Views Specification v2.0 — May 2025