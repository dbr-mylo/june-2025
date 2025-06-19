# Trash Management Specification

This document defines the structure and behavior of the Trash system in Mylo. It outlines how deleted items are surfaced, filtered, and managed across roles and item types.

---

# Overview

The Trash system provides a centralized location for managing deleted items, including documents, templates, and users. Users can filter, sort, and restore items depending on their permissions. This feature supports organization-wide clarity and recoverability while allowing for scalable system management.

---

# MVP Scope

* Trash view accessible from the main navigation sidebar.
* Shows a unified list of deleted items from all categories: **Documents**, **Templates**, and **Users**.
* Trash items are listed with:

  * **Created date**
  * **Name**
  * **Type** (Document, Template, User)
  * **Last Edited**
* Action dropdown allows bulk operations: **Restore**, **Delete Forever**.
* Individual item actions available via contextual menu (three dots).
* Sort and filter options:

  * Filter by type (Documents, Templates, Users)
  * Sort by date or title (A–Z, Z–A)
* Search bar for keyword filtering.

---

# Trash UI Behavior

* "Trash" appears as a sidebar menu item.
* Sidebar menu includes an overflow menu:

  * **Manage Trash** (navigates to full view)
  * **Empty Trash** (clears all items permanently)
* Trash list defaults to show **All** items.
* Type-based filters apply instantly on selection from the sort/filter dropdown.
* Restored items are returned to their original section and removed from Trash.
* "Delete Forever" removes items permanently with confirmation.

---

# Error Handling

| Failure Condition     | System Response           | User Message                              |
| --------------------- | ------------------------- | ----------------------------------------- |
| Item fails to restore | Item remains in Trash     | "Could not restore item. Try again."      |
| Item fails to delete  | Item remains in Trash     | "Delete failed. Please retry."            |
| Trash fails to load   | Show fallback empty state | "Trash is currently unavailable."         |
| Empty Trash fails     | No items removed          | "Unable to empty Trash. Try again later." |

---

# Future Enhancements (Post-MVP)

* **Permission-based restore rules** (e.g., only Admins can restore deleted Users)
* **Trash retention timer** (auto-delete after X days)
* **Undo delete notification** (snackbar with undo option)
* **Bulk filter by date range**
* **Pagination for long lists**

---

# Version

Mylo Trash Management Specification v1.0 — May 2025
