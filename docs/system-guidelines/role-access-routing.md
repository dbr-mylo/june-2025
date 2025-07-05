# Role-Based Access and Routing in Mylo

This document outlines current limitations and intended behavior for role detection and route-level access control.

---

## ✅ Current Status

| Feature | Status |
|--------|--------|
| Roles Fetched from Supabase | ❌ Not yet implemented |
| Role-based Routing | ❌ Not enforced |
| Role Context Provider | ⚠️ Partially implemented (stubbed) |

---

## 🚧 Gaps

### 1. **Are roles currently stubbed or fetched (e.g., via Supabase)?**
> **Status**: To Do

- Currently hardcoded or stubbed on the client side.
- No logic exists to fetch user metadata from Supabase `users` or `profiles` table.
- Supabase Auth token exists, but role field is unused.

### 2. **What should happen if the wrong role visits a certain route?**
> **Status**: To Do

| Scenario | Expected Behavior |
|----------|--------------------|
| Guest visits `/templates/create` | Redirect to dashboard with message: “This page is restricted.” |
| Contributor tries to access Admin dashboard | Redirect to `/unauthorized` or 403 screen |
| Template Editor opens Admin-only route | Hide features not applicable (no access to user mgmt tools) |

---

## ✅ Future Enhancements

- [ ] `useRole()` hook that checks role from Supabase
- [ ] `<RoleGate role="admin">...</RoleGate>` wrapper for UI components
- [ ] Global 403 error fallback route
- [ ] `AuthContext` should include `{ role, status }` for conditional loading

---

## 📎 Related Docs

- `docs/user-roles-permissions/role-based-routing-permissions-*.md`
- `docs/system-guidelines/role-detection.md`
