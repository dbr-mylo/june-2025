# Guest Mode Specification (MVP)

**Version:** v1.0  
**Last Updated:** July 2025  
**Status:** Finalized for MVP

---

## Overview
This document defines the behavior of Guest Mode (also referred to as Demo Mode) in Mylo. It clarifies the data persistence strategy, role permissions, and usage constraints for users who are not logged in.

---

## Purpose
- Allow instant access to Mylo without requiring authentication
- Enable public testing and demoing without sign-up friction
- Provide a safe, isolated environment for experimentation

---

## Storage Method (MVP)
**`localStorage` is the official persistence layer for Guest Mode in MVP.**

| Feature                    | Behavior                                                                 |
|----------------------------|--------------------------------------------------------------------------|
| Data Storage              | Browser `localStorage` only — no backend write                          |
| Session Persistence       | Data persists across browser reloads but **not between devices**         |
| Collaboration             | ❌ Disabled — Guest mode is single-user, local only                      |
| Auth Integration          | ❌ None — no Supabase or identity provider hooks                         |
| Template Access           | ✅ Guest user can create and use templates in local memory               |
| Document Access           | ✅ Guest user can create and edit documents in memory                    |
| Save to Disk              | ✅ `.mylo` export is available                                            |
| Import From Disk          | ✅ `.mylo` or Word `.docx` files supported (via Mammoth.js)              |

---

## Guest Mode Role Capabilities
- Guest can switch between **Contributor** and **Template Editor** modes
- Role switching is UI-based and does not persist beyond session
- All templates and documents are saved as **in-memory objects** and serialized to `localStorage`

---

## UI Requirements
- “Try Without Signing In” entry point on landing screen
- Banner indicating Guest Mode is active
- Optional prompt to sign up after usage milestone (e.g. 10 mins or 1 export)

---

## Future Enhancements (Post-MVP)
- Upgrade path from Guest to real account (with cloud sync)
- Supabase-backed temporary Guest user ID with expiration
- Collaborative Guest demos with shared token-based links

---

## Known Limitations
- No real-time sync
- No user identification or team sharing
- Storage cleared on browser reset or incognito session

---

## Final Decision
**localStorage is confirmed as the storage method for Guest Mode in MVP.**  
This is non-negotiable and must not be overridden by Supabase or other login flows.

---

## Related Specs
- `/docs/system-guidelines/local-save-spec.md`
- `/docs/core-features/template-editor-user-stories.md`
- `/docs/core-features/contributor-user-stories.md`
