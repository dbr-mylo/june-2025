# Role Detection in Mylo

Mylo supports role-based access control (RBAC) using **Supabase Auth** and metadata-driven logic to determine user capabilities.

---

## 🧠 How Role Detection Works

1. **User logs in via Supabase Auth**
   - JWT token is issued and stored client-side.

2. **User profile is fetched from Supabase**
   - Role is stored in a `users` or `profiles` table.
   - Example: `{ id: 'abc123', email: 'x@example.com', role: 'template-editor' }`

3. **Frontend reads role using `useRole()`**
   - Cached in context or global state (e.g., Zustand or React Context).
   - Used to determine layout, page access, and feature toggles.

---

## 📦 Where It Should Live in Code

| File | Role |
|------|------|
| `src/hooks/useRole.ts` | Hook to fetch and cache role from Supabase |
| `src/context/AuthProvider.tsx` | App-wide auth and session manager |
| `src/components/RoleGate.tsx` | Conditional UI logic by role |
| `src/pages/**` | Page-level route guarding logic |

---

## 🔐 Role Values

| Role             | Description |
|------------------|-------------|
| `contributor`     | Can write/edit content only |
| `template-editor` | Can create and manage templates |
| `admin`           | Full access, including user and template management |
| `guest`           | Read-only/demo access, no persistence |

---

## 🟨 Status

| Area | Status |
|------|--------|
| Supabase Auth | ✅ Installed |
| Role Table | ⚠️ Needs validation in DB |
| `useRole()` Hook | ❌ Not implemented |
| Route Guards | ❌ Not implemented |
| UI Logic | ⚠️ Some pages assume static role context |

---

## 🗂 Suggested Documentation Links

- `docs/user-roles-permissions/role-based-routing-permissions-*.md`
- `docs/system-guidelines/editor-preview-flow.md`
