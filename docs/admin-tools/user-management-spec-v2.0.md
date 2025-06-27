
# User Management Specification — v2.0

This document defines how Admins can create and manage users in the Mylo platform, including input validation, invitation logic, and UI behavior.


---

# MVP Scope

- Admins can create new users via a modal interface on the **User Admin** screen
- Fields include: Name (optional), Email (required), Role (required)
- Email must be valid and unique
- Role is selected from: Contributor, Template Editor, Admin
- Users appear in the list as **Invited** after creation
- Save button is disabled until all required fields are valid

---

# UI Behavior

- “Add New User” opens a modal
- Modal contains: Name input, Email input, Role dropdown, Save/Cancel buttons
- “Add Another” allows batch entry (new row or clear+reset)
- Cancel closes modal with no changes
- Save creates user and closes modal
- On save success: user added to list with status: Invited

---

# Error Handling

| Condition                | System Response                          |
|--------------------------|------------------------------------------|
| Invalid email format     | Field-level validation error             |
| Duplicate email          | “This email has already been invited.”   |
| Missing required fields  | Save disabled, field marked as invalid   |
| Server save error        | Toast alert with retry option            |

---

# Future Enhancements (Post-MVP)

- Resend invitation button
- Invite via CSV upload
- Role change after invitation
- Bulk user actions (delete, reassign role)

---

# Version

User Management Specification v2.0 — June 2025
