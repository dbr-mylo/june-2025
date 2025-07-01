# Admin User Journey — v1.1

June 2025

---

# Overview

This document defines the full experience of the Admin role in Mylo. Admins inherit all capabilities of the Template Editor and Contributor roles, plus user management, team control, trash access, and version history visibility.

---

# Access

- Logs into `/dashboard` or Admin-specific dashboard
- Sees:
  - Team documents and templates
  - Template Sets
  - Trash
  - User & team settings

---

# Core Capabilities

| Area | Admin Behavior |
|------|----------------|
| Create/edit templates | ✅ Full Template Editor capabilities |
| Write/edit documents | ✅ Full Contributor capabilities |
| Manage users | ✅ Invite/remove, assign roles |
| Manage teams | ✅ Create or archive teams |
| Manage template sets | ✅ Assign to team or group |
| Access trash | ✅ View and restore deleted items |
| View versions | ✅ Access all document version history |
| Role switching | ✅ Can assume or revoke roles as needed |

---

# Limitations

- Cannot impersonate another user (no masquerade mode)
- Cannot see unpublished documents owned by others unless shared
- Cannot bypass template preview rules (rendered Preview = truth)

---

# Admin-Specific Screens

- **User Admin:** Invite users, change roles
- **Template Sets Manager:** Create collections for brand or product lines
- **Trash Panel:** Browse and restore deleted documents or templates
- **Version History (Post-MVP):** See all save points across documents

---

# Known Gaps

- No audit trail for role changes or template reassignment
- No masquerade/test mode to simulate other roles
- No admin-only export settings (e.g. “force landscape export”)

---

# Future Enhancements (Post-MVP)

- Audit log for user actions and role edits
- Template version rollback with change diff
- Org-wide template enforcement logic
- Real-time dashboard for activity monitoring

---

# Version

Admin User Journey v1.1 — June 2025
