# Top Menu Behavior Specification

This document defines the structure and functionality of the Top Menu Bar in Mylo. It outlines which menu items are active during the MVP and which are deferred for future implementation.

---

# Overview

The Top Menu Bar is a persistent, global interface element that provides access to document-level actions, editor functions, and view controls. It appears at the top of all document screens and is available to all user roles (Contributor, Template Editor, Admin).

---

# MVP Scope

The top menu bar contains several drop-down menus (e.g., File, Edit, View, Insert). During the MVP, only a limited subset of these menus will be functional. All other options will be visible but disabled (grayed out) for clarity and future planning.

---

# Menu Behavior

## MVP Menu Items

### File
- **New Document** – Starts a new blank document.
- **Open…** – Opens an existing `.mylo` file.
- **Save** – Saves the current document.
- **Export to PDF** – Enabled only when a template is applied.

### Edit
- **Undo / Redo** – Available at all times.
- **Cut / Copy / Paste** – Supported via browser/native OS.
- **Select All**

### View
- **Scroll Together** – Toggle enabled.
- **Page Boundaries** – Toggle to show/hide page breaks in Editor.
- **Zoom** – Disabled for MVP.

### Insert
- **Page Break**
- **Section Break**
- All other Insert items are marked “(Future)” and appear disabled.

---

# Behavior Rules

- Disabled items are grayed out and unclickable.
- Hovering over disabled menu items shows a tooltip: “Coming soon.”
- Menu layout is fixed; position of future features will not shift.

---

# Error Handling

| Failure Condition         | System Response                         | User Message              |
|---------------------------|------------------------------------------|---------------------------|
| Click on disabled menu    | No action                                | Tooltip: “Coming soon.”   |
| Menu load failure         | Show fallback menu structure             | “Menu failed to load.”    |

---

# Future Enhancements (Post-MVP)

- Enable Zoom levels (50%, 100%, 200%)
- Add Table, Chart, Equation, and Footnote to Insert menu
- Drag-to-reorder top-lev
