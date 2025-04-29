# Mylo Authentication System Specification (MVP)

This document defines the authentication and user session management system for Mylo MVP.

The goal is to provide simple, secure login and role-based access control without unnecessary complexity.

---

# Overview

At MVP, Mylo must support:

- Email + password authentication for registered users.
- Guest access without formal registration.
- Persistent sessions during active browser use.
- Role-based access immediately after login.

No public registration, OAuth, or SSO integration is required at MVP.

---

# User Types

| User Type | Authentication Method | Access Scope |
|:---|:---|:---|
| Contributor | Email + Password | Create and edit documents. |
| Template Editor | Email + Password | Create and manage templates; edit documents. |
| Admin | Email + Password | Manage users, templates, and system settings. |
| Guest | Auto-login (session token) | View-only or role-emulated access (Contributor, Template Editor, Admin). |

---

# Authentication Flow

## 1. Registered User Login
- User enters email and password on login screen.
- Server validates credentials.
- On success, server issues an authentication token (e.g., JWT).
- Client stores token securely (preferably in an httpOnly cookie).
- Role is decoded and stored client-side to configure the UI immediately.

## 2. Guest Access
- User selects "Continue as Guest."
- System generates a temporary Guest session token.
- User selects a role to emulate (Contributor, Template Editor, Admin).
- Guest session expires after 2 hours or on tab/browser close.

---

# Session Management

| Rule | Behavior |
|:---|:---|
| Registered User Session | Persists across tabs and page reloads using token storage. |
| Guest Session | Persists until browser tab or window is closed, or until 2 hours of inactivity. |
| Token Expiration | Tokens expire after 24 hours for regular users (configurable). |
| Session Restoration | If token is valid, user auto-restores session on page reload without login. |

---

# Password Handling (MVP)

- Passwords must be stored hashed and salted server-side (bcrypt or similar standard).
- No password recovery ("Forgot Password?") feature required at MVP.
- No password change functionality required at MVP.
- Minimum password length: 8 characters.

---

# Guest Session Specifics

| Aspect | Behavior |
|:---|:---|
| Authentication | Auto-assigned Guest token. |
| Role Selection | Guest chooses Contributor, Template Editor, or Admin experience. |
| Save/Export | Allowed for demo purposes only (locally, no server persistence). |
| Demo Data | Actions affect demo-only data; real system data is not touched. |
| UI Demo Mode Indicator | Thin yellow bar at top showing: `"Demo Mode — [Role]"`. |

---

# Error Handling

| Error | Behavior |
|:---|:---|
| Invalid login credentials | Show error: "Invalid email or password." |
| Expired session token | Redirect to login page with "Session expired. Please log in again." |
| Unauthorized role access | Redirect to Dashboard with "Access Denied" message. |

---

# Future Enhancements (Post-MVP)

- Password recovery ("Forgot Password" flow).
- Two-factor authentication (2FA).
- OAuth login options (Google, Microsoft).
- Admin-controlled session timeout settings.

---

# Version

Mylo Authentication System Specification v1.0 — April 2025
