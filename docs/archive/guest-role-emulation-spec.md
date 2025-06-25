> **Archived Spec**  
> This document is no longer in use as of June 2025. Replaced by: guest-demo-mode-spec.md


# Mylo Guest Role Emulation Specification

This document defines how Guest users can experience different roles within Mylo during demo or trial sessions.

The goal is to allow prospective users to explore Mylo’s full capabilities safely without risking real production data.

---

# Overview

Upon starting a Guest session, users must select which role to emulate:

| Option | Description |
|:---|:---|
| **Contributor** | Create and edit documents as a contributor. |
| **Template Editor** | Create and manage Templates as a template editor. |
| **Team Admin** | Manage users and system settings (demo-only simulation). |

Guests operate in **Demo Mode** using temporary demo data and session tokens.  
They do not persist real data unless they register formally.

---

# Guest Role Selection Flow

1. Guest visits demo link or selects "Try Mylo."
2. System presents a "Choose Your Role" screen:
   - Contributor
   - Template Editor
   - Team Admin
3. User selects a role.
4. System assigns a Guest session token with an `emulatedRole` property.
5. Guest is directed to the appropriate Dashboard and UI for the selected role.
6. Guest remains in that role until logout, session expiration, or tab closure.

---

# Guest Session Behavior

| Aspect | Behavior |
|:---|:---|
| Save/Export | Demo Saves only. Files may download locally but are not saved permanently in backend storage. |
| Template Management (Template Editor) | Templates created are local to the demo session only. |
| User Management (Team Admin) | User lists and settings are simulated; no real users are affected. |
| Data Persistence | All Guest data is ephemeral and is cleared when the session ends. |
| Session Expiration | Guest sessions expire automatically after 2 hours of inactivity or when the tab/window is closed. |
| UI Demo Mode Indicator | Thin yellow bar at the very top of the screen shows: `"Demo Mode - [Role]"`. Always visible. |

---

# Demo Save Rules

| Action | Demo Behavior |
|:---|:---|
| Save Document | Download a `.mylo` file locally; not stored server-side. |
| Export to PDF | Generate real PDF locally from Preview Panel. |
| Create Template | Simulated template creation stored in browser memory only. |
| Manage Users (Admin Emulation) | Simulated. Actions have no effect on real system users. |

---

# Failure and Recovery

- If a Guest session expires (after 2 hours), the user is logged out and redirected back to the "Choose Your Role" screen.
- If the tab/browser is closed, the Guest session is immediately destroyed.
- Error conditions in Demo Mode (e.g., save failures) should behave identically to regular users for realism, but without backend risk.

---

# Security Notes

- Guest sessions must have restricted backend permissions.
- No real database writes or updates occur during Guest sessions.
- Demo Saves and simulated actions should be safely isolated from real production data environments.

---

# Future Enhancements (Post-MVP)

- Allow optional "Register Now" flow after Demo usage (convert Guest to real account).
- Allow Admins to configure which roles are available for Guest checkout dynamically.

---

# Version

Mylo Guest Role Emulation Specification v1.0 — April 2025
