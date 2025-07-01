# Mylo Starter Kit — Documentation Hub

This folder contains the complete technical and functional documentation for the Mylo platform. It includes specifications, user journeys, feature breakdowns, API contracts, test plans, and post-MVP planning.

---

## 📁 Directory Structure

Each subfolder contains markdown documentation focused on a specific area of the system:

| Folder | Purpose |
|--------|---------|
| `admin-tools/` | Admin role features (user management, permissions) |
| `api-contracts/` | API spec for saving, loading, and syncing Mylo entities |
| `archive/` | Old or deprecated specs (not actively maintained) |
| `core-features/` | Primary app functionality (Editor, Templates, Zoom, Autosave, etc.) |
| `data-models/` | Source-of-truth data shape definitions |
| `glossary/` | Shared terminology and system vocabulary |
| `mocks/` | Visual design reference: mockup directory mappings |
| `post-mvp/` | Future features and roadmap extensions |
| `product-vision/` | High-level vision and guiding principles |
| `risks-and-mitigations/` | Known risks by feature + planned resolutions |
| `roadmap/` | Timeline and milestone tracking |
| `site-map/` | Navigation architecture and screen-level flow |
| `system-guidelines/` | Mylo-wide patterns and conventions |
| `testing/` | Test plans and QA checklists |
| `user-flows/` | End-to-end flows per user type |
| `user-roles-permissions/` | Role definitions and routing rules |
| `user-stories/` | Contributor, Template Editor, Admin, and Guest stories |

---

## 🧠 Document Style Principles

- Every spec follows the `starter-kit-spec-organization-standard-V2.md` structure.
- All filenames include a semantic version number (e.g., `-v1.2.md`).
- When patched, older files may be moved to `archive/` or versioned upward.
- Each spec is self-contained: no external tool links are required to understand behavior.

---

## 📎 Recommended Reading Order

For new contributors to the codebase or documentation, start here:

1. `product-vision/`
2. `site-map/`
3. `core-features/editor-and-preview-spec-v3.1.md`
4. `user-roles-permissions/`
5. `user-stories/`
6. `core-features/template-settings-spec-v2.0.md`
7. `data-models/`
8. `testing/`
9. `post-mvp/` (optional)

---

## ✅ Contributing Guidelines

- All updates must be versioned.
- Don't delete prior versions unless explicitly archived.
- Validate against the spec standard before PR approval.

---

## Version

Mylo Starter Kit v2.0 — June 2025
