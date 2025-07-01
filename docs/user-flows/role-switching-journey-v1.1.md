# Role Switching Journey — v1.1

June 2025

---

# Overview

This document defines the user experience when switching roles in Mylo. While most users have one role, Admins or demo/test users may assume multiple roles during a session. Role switching affects navigation access, feature visibility, and save behavior.

---

# Trigger Points

- Admin switching roles for testing
- Guest simulating Contributor or Template Editor
- Template Editor switching to Contributor to preview experience
- Team member promoted/demoted to different role level

---

# Confirmation Modal

When unsaved changes exist, role switching triggers a confirmation modal:

**Modal ID:** `ROLE_SWITCH_UNSAVED_WARNING`

**Content:**
- “You have unsaved changes. Switching roles may reset your view or impact styling.”
- Options:
  - `Cancel`
  - `Switch Anyway`

If no unsaved changes, role switches instantly without prompt.

---

# Behavior Per Role

| Role | Switchable To | Notes |
|------|---------------|-------|
| Admin | All roles | Full access |
| Template Editor | Contributor | For preview/testing |
| Contributor | ❌ | Cannot switch |
| Guest | Limited | May simulate other roles via demo UI, not full switch |

---

# State Persistence

- Autosave triggers before switch (where possible)
- Editor formatting preserved, but **Preview will reflect new role's permissions**
- Role persists only for current session unless changed by Admin

---

# Save + Routing Sync

| Action | Result |
|--------|--------|
| Role switch during editing | Autosave → Redirect to new role's dashboard |
| Manual Cmd+S before switch | Snapshot saved |
| Switch from Template Editor to Contributor | Loses access to style/layout tools until switched back |

---

# Limitations

- No impersonation or masquerade mode (admin cannot act *as* another user)
- No cross-session memory of prior simulated roles
- No persistent role override URL (e.g. `?as=editor`)

---

# Future Enhancements (Post-MVP)

- Role-based view replay (activity logging)
- Admin-triggered role simulation with audit trail
- Route parameter to simulate roles for debugging (`?role=contributor`)

---

# Version

Role Switching Journey v1.1 — June 2025
