# Mylo /docs Directory – Specification Overview

All official documentation lives inside this `/docs` directory.

Specifications are organized by feature and follow consistent markdown standards, including:

- MVP scope
- Behavior & UI rules
- Technical dependencies (optional)
- Error handling
- Known gaps and future enhancements

---

## 📘 Start With These Files

- [`starter-kit-spec-organization-standard-V2.md`](./starter-kit-spec-organization-standard-V2.md)
- `tech-stack-spec.md`
- `editor-and-preview-spec.md`

---

## 🧭 Folder Structure

- `core/` – Core MVP features (editor, template logic, font handling)
- `ui/` – Toolbar components, zoom controls, trash system
- `system/` – Save/export logic, routing, undo/redo, autosave
- `post-mvp/` – Future enhancements (collaboration, task lists, image editing)
- `archive/` – Deprecated or replaced versions
- `glossary.md` – Project-wide terminology

Each file is versioned using the `-vX.X.md` convention. Always reference the latest version unless otherwise specified.
