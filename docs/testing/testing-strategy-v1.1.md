# Mylo Testing Strategy

This document defines the testing philosophy, coverage goals, and implementation plan for the Mylo application.

---

## Overview

Testing ensures that core functionality in Mylo behaves as expected across different user roles, document states, and UI flows. As of now, no automated tests are implemented. This document serves as a baseline for what needs to be built.

---

## Testing Categories

### ✅ Unit Tests
Tests for individual functions or components (e.g., toolbar buttons, formatting logic).

**Target tools:**
- `vitest`
- `@testing-library/react`

### ✅ Integration Tests
Tests that verify combined behavior across components or services (e.g., typing text and seeing it appear in the Preview).

**Target tools:**
- `@testing-library/react`

### ✅ Snapshot Tests *(Optional)*
Capture component render output to track changes over time.

**Tool:**
- `vitest` with JSX snapshot plugins

### ✅ End-to-End (E2E) Tests *(Post-MVP)*
Simulate full user flows such as logging in, selecting a template, typing a document, and exporting to PDF.

**Tool:**
- `Playwright` or `Cypress` (post-MVP)

---

## Initial Test Coverage Plan (MVP)

| Area                        | Type         | Status      | Notes                                 |
|-----------------------------|--------------|-------------|----------------------------------------|
| MyloEditor (Tiptap config)  | Unit         | Not started | Needs testing for extensions/props     |
| Toolbar formatting buttons  | Unit         | Not started | Should verify button behaviors         |
| Dual-pane sync behavior     | Integration  | Not started | Confirm editor + preview stay in sync |
| Role-based routing          | Integration  | Not started | Route protection tests needed          |
| Save/Autosave logic         | Integration  | Not started | Requires fake Supabase/mock write flow |

---

## Testing Utilities

- Mocking tools: `msw` (Mock Service Worker) may be used for Supabase or API stubbing
- Fixtures: Static `.mylo` files can be used for consistent document tests
- Helper wrappers: `RoleProvider` and `PreviewProvider` test helpers may be needed

---

## Terminology — What is "Stubbed"?

**Stubbed** means something is simulated or hard-coded, not yet connected to the real implementation.

Examples:
- A user role like "Admin" is hardcoded in context rather than retrieved from Supabase Auth.
- The `saveDocument()` function writes to `console.log()` instead of Supabase.
- The preview panel returns fake HTML rather than live-rendering template logic.

Use stubs during early development, but always document them clearly.

---

## Related Docs

- [`supabase-auth-mocking.md`](./system-guidelines/supabase-auth-mocking.md) – Mocking roles and auth for local/test environments

---

## Next Steps

- [ ] Set up `vitest` and `@testing-library/react` for unit tests
- [ ] Add first test file: `MyloEditor.test.tsx`
- [ ] Create a `test-utils.tsx` wrapper with mock providers
- [ ] Define coverage goals and track progress in the MVP checklist

---

## Ownership

Testing is a shared responsibility between spec authors and implementation developers. Each core feature spec should list critical test cases when feasible.


---

## Folder & Naming Conventions

- Unit tests go next to components (e.g., `MyloEditor.test.tsx`)
- Integration tests live in `/tests/integration/`
- E2E tests (post-MVP) go in `/tests/e2e/`
- Use `*.test.tsx` for all test files

We recommend colocating unit tests with components during early MVP work.
