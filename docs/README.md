# Mylo Documentation Overview

This directory contains all system, behavior, and architectural documentation for the Mylo platform.

---

## 📘 Start With These Files

- [`starter-kit-spec-organization-standard-V2.1.md`](./starter-kit-spec-organization-standard-V2.1.md)
- [`entry-points.md`](./system-guidelines/entry-points.md)
- [`editor-preview-flow.md`](./system-guidelines/editor-preview-flow.md)
- [`role-detection.md`](./system-guidelines/role-detection.md)
- [`role-access-routing.md`](./system-guidelines/role-access-routing.md)
- [`data-persistence-strategy.md`](./system-guidelines/data-persistence-strategy.md)

---

## 📁 Folder Structure

- `core-features/` — Finalized specs for MVP scope
- `api/` — API behavior and endpoints
- `system-guidelines/` — Implementation logic, runtime flow, edge handling
- `post-mvp/` — Deferred features or roadmap specs
- `user-roles-permissions/` — Role-specific behaviors and restrictions
- `user-journeys/` — Role-based flow documentation
- `archive/` — Deprecated or historical spec versions

---

## 🔁 How to Contribute

1. Follow the Starter Kit standard.
2. Keep all filenames kebab-case and versioned when needed.
3. Document gaps clearly under `## Known Gaps`.
4. Add all runtime logic in `system-guidelines/`.

---

## 📎 Related

- See `../README.md` for full-stack overview and tech stack.


### 🛠 Toolbar & Formatting Controls

| Question                                                                 | Status   |
|--------------------------------------------------------------------------|----------|
| Is there a placeholder for a toolbar (e.g., `Toolbar.tsx`) or any stub for formatting buttons? | To Do    |
| How do toolbar buttons connect to the editor? If none exist, where will they go? | To Do    |
