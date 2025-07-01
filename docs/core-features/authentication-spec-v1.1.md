# Mylo Authentication System Specification — v1.1

June 2025

---

# Overview

This document defines the authentication and user session management system for Mylo MVP. The goal is to provide secure access for registered users and limited demo access for Guests. Role-based access is enforced immediately upon login.

---

# MVP Scope

- Email/password login for registered users.
- Guest access without formal registration.
- Token-based session management.
- Role-based access control post-login.
- No password recovery or OAuth at MVP.

---

# Main Behavior Sections

## Save Behavior Rules

*Not applicable. Authentication does not persist user data beyond tokens and login state.*

## UI Behavior

- Login screen includes:
  - Email + Password fields
  - “Continue as Guest” option
- Post-login redirect is role-based:
  - Contributor → Documents Dashboard
  - Template Editor → Templates Dashboard
  - Admin → Admin Settings

- Demo Mode shows a thin yellow bar with:  
  `"Demo Mode — [Role]"`

## Stack Behavior

- Tokens are stored in secure cookies or local storage.
- Roles are embedded in JWT or fetched post-login.
- Guest tokens expire after 2 hours or on tab close.
- Registered sessions persist for 24 hours unless user logs out.
- Auth system is built on Supabase Auth or equivalent.

## Data Models

| Field | Type | Description |
|-------|------|-------------|
| email | String | Used to log in |
| password | String | Required at login, hashed in DB |
| role | Enum | Contributor, TemplateEditor, Admin |
| token | String (JWT) | Returned on successful login |
| sessionType | Enum | Registered or Guest |

## Field Definitions

- Minimum password length: 8 characters
- Roles are assigned during account creation
- Guest role is selected after token is generated

---

# Additional Technical Sections (Optional)

### Guest Session Details

| Behavior | Description |
|----------|-------------|
| Access Scope | Simulated Contributor, Template Editor, or Admin |
| Token Duration | 2 hours max |
| Storage | Local memory (not persisted) |
| Save/Export | Local only — no cloud sync or DB write |
| Demo Data | Sandbox mode — resets after session ends |

---

# Error Handling

| Error | Behavior |
|-------|----------|
| Invalid login credentials | Show: “Invalid email or password.” |
| Expired token | Redirect to login with: “Session expired.” |
| Role mismatch or restriction | Redirect to role-appropriate dashboard with warning |

---

# Known Gaps / Outstanding Questions

- Should guest session warn user near expiration? (Effort: Low, Status: Open)
- Do Admins need session expiry overrides? (Effort: Medium, Status: TBD)
- Should Demo mode have capped features (e.g., max 2 documents)? (Effort: Low, Status: Deferred)

---

# Future Enhancements (Post-MVP)

- Password recovery flow
- OAuth login (Google, Microsoft)
- Two-factor authentication (2FA)
- Session expiration alerts and logout timers

---

# Technical Dependencies (Optional)

- Supabase Auth
- JWT decode and validation logic
- Secure cookie storage
- Role-based routing logic

---

# API / Data Schema Notes (If Applicable)

- Login: `POST /api/auth/login`
- Guest login: `POST /api/auth/guest`
- Logout: `POST /api/auth/logout`
- Auth tokens include role and expiry metadata

---

# Version

Mylo Authentication System Specification v1.1 — June 2025
