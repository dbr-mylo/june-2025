# User Flows — v1.1

June 2025

---

# Overview

This document maps the high-level flows for each user role in Mylo. It outlines the sequence of actions users take across the application, from dashboard entry to document export.

This version includes clarifications around Preview enforcement, template switching, and role inheritance logic.

---

# Contributor Flow

1. Login
2. Dashboard: “New Document”
3. Select template (if assigned more than one)
4. Enters Editor/Preview split view
5. Writes content freely in Editor
6. **Preview reflects template styling only**
7. Saves automatically or with Cmd+S
8. Optional: switches template → sees warning modal
9. Exports: uses Preview formatting
10. Closes or continues editing

---

# Template Editor Flow

1. Login
2. Dashboard → Templates tab
3. Creates or edits a template
4. Configures:
   - Layout, Template Settings, Styles
   - Sample content for testing
5. Saves (autosave or Cmd+S)
6. Publishes template → available to Contributors
7. May create/edit documents like a Contributor
8. Full Preview/Editor access

> 🔁 Template Editors inherit all Contributor flows.

---

# Admin Flow

1. Login
2. Dashboard shows:
   - Team documents
   - Users and roles
   - Trash
   - Templates and Sets
3. Manages users, assigns roles
4. Assigns templates to teams
5. Can create/edit templates and documents

> 🔁 Admins inherit all Template Editor and Contributor flows.

---

# Guest Flow

1. Loads `/demo` (no login)
2. Chooses “Try Document” or “Try Template”
3. Enters Editor/Preview view
4. Writes locally, edits template (if applicable)
5. **All work stored in-memory**
6. Warned before refresh: “Download or lose work”
7. Can export `.mylo` or PDF

---

# Template Switching Flow (Contributor)

1. Opens document with template applied
2. Clicks template name → dropdown
3. Chooses new template
4. Modal appears: “Switching templates will override the Preview”
5. Confirms switch
6. **Editor formatting stays**
7. **Preview re-renders using new template**

---

# Known Gaps

- No role simulation mode for Admin testing
- No visual diff when templates change
- No “Preview-only” toggle for template-less drafts

---

# Version

User Flows v1.1 — June 2025
