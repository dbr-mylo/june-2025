# User Management Specification

This document defines how Admins can create and manage users within the Mylo system. It focuses on the behavior of the New User modal and associated logic for the MVP.

---

# Overview

Admins can invite new users through a structured modal in the User Admin screen. The modal collects basic information and assigns a role. Once saved, the new user appears in the user list with the status **Invited**.

---

# MVP Scope

- Accessed via the **User Admin** panel.
- Modal includes fields for **Name**, **Email**, and **Role**.
- Supports batch entry using the **Add Another** button.
- Role options: **Contributor**, **Template Editor**, **Admin**.
- Invitation triggers user status = **Invited**.

---

# New User Modal Behavior

## Fields
- **Name** — Optional input
- **Email** — Required input; must be unique and valid
- **Role** — Dropdown with predefined roles

## Modal Logic
- **Save** is disabled until all fields are valid
- **Cancel** closes modal without saving
- **Add Another** appends a new blank row without closing the modal
- On save:
  - Modal closes (unless batch entry used)
  - User is added to the list with **Invited** status

---

# Error Handling

| Condition              | System Response                  | Message                                |
|------------------------|----------------------------------|----------------------------------------|
| Email is duplicate     | Block save                       | “This email has already been invited.” |
| Missing required fields| Disable Save button              | Field-level validation shown           |
| Invalid email format   | Prevent save                     | “Enter a valid email address.”         |

---

# Future Enhancements (Post-MVP)

- Resend invitation link
- Expired invites with reactivation
- Auto-role assignment based on email domain
- Add profile image at creation

---

# Version

Mylo User Management Specification v1.0 — May 2025
