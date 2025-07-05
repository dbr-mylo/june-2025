# Supabase Auth Mocking Strategy (Mylo MVP)

This document outlines how to simulate Supabase authentication and role-based access during development and testing in Mylo, without requiring real login flows.

---

## 🎯 Purpose

- Bypass Supabase login during local dev
- Simulate Contributor, Template Editor, and Admin roles
- Enable testing of role-based UI and routing logic
- Keep CI/CD pipelines fast and isolated

---

## 🧪 Use Cases

- Navigating protected routes in dev mode
- Rendering UI components with role-specific behavior
- Testing conditional access without real user data

---

## 🏗️ Approach

### 1. `useMockUserRole()` Hook (Local Only)

Create a React hook to return a mock role for dev/testing.

```ts
// lib/useMockUserRole.ts
export function useMockUserRole() {
  return "template-editor"; // or "contributor", "admin"
}
```

Conditionally use this in your auth provider:

```ts
const role = process.env.NODE_ENV === "development"
  ? useMockUserRole()
  : supabaseUser?.role;
```

---

### 2. `.env` Flag for Mocking

```env
VITE_USE_AUTH_MOCK=true
```

In your provider logic:

```ts
const role = import.meta.env.VITE_USE_AUTH_MOCK === "true"
  ? useMockUserRole()
  : getRoleFromSupabase();
```

---

### 3. Supabase Stub for Unit Tests

In tests:

```ts
vi.mock("@supabase/supabase-js", () => ({
  createClient: () => ({
    auth: {
      getUser: () => ({ data: { user: { role: "admin" } } }),
    },
  }),
}));
```

---

## 🧼 Best Practices

- Keep mocks separate from production logic
- Document role assumptions inside tests
- Never ship mock logic to production

---

## 📌 Status

| Role             | Mocked in Dev? | Used in Tests? |
|------------------|----------------|----------------|
| Contributor      | ✅ Yes         | ✅ Yes         |
| Template Editor  | ✅ Yes         | ✅ Yes         |
| Admin            | ✅ Yes         | ✅ Yes         |

---

## 📁 Suggested File Locations

- `lib/useMockUserRole.ts` – Dev-only hook
- `supabaseClient.ts` – Mock-aware auth logic
- `__tests__/auth/` – Supabase mocks for unit tests

---

## 📎 Related Docs

- [`role-based-routing-permissions-admin-spec.md`](../user-roles-permissions/role-based-routing-permissions-admin-spec.md)
- [`supabase.ts`](../../src/lib/supabase.ts)
