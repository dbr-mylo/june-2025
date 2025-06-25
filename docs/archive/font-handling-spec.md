> **Archived Spec**  
> This document is no longer in use as of June 2025. Replaced by: guest-demo-mode-spec.md

# Mylo Font Handling Specification

Mylo's font handling system ensures brand consistency while separating content creation from design enforcement. Contributors focus on writing with system fonts during editing, while Template Editors control final typography in preview and export. This document defines the font management behavior, UX expectations, and technical scope for MVP.

---

# Overview

The Mylo font system allows Template Editors to upload or link fonts and assign them within templates. Contributors work using system fonts for editing comfort, while Preview and Export apply template-assigned fonts to maintain design standards.

---

# MVP Scope

- Template Editors can upload `.woff2` and `.ttf` font files.
- Template Editors can add external fonts via URL (e.g., Google Fonts).
- Fonts can be assigned to roles: Heading, Body, Display, Monospace.
- Contributors use system fonts during editing.
- Template-assigned fonts appear during Preview and Export.
- Uploaded font files and metadata are stored with the template.
- Admins inherit all Template Editor font management capabilities.

---

# Font Management Behavior Rules

- Fonts uploaded or linked are restricted to the specific template.
- System fonts are used during Contributor editing to maximize speed and simplicity.
- Fonts are lazy-loaded only for Preview and Export.
- Template Editors can preview fonts before assignment.
- Optional license metadata can be attached to uploaded fonts.
- If an assigned font fails to load, the system automatically falls back to a default font.

---

# Error Handling

| Failure | System Response |
|:---|:---|
| Font upload fails | Show error message with retry option. |
| Linked font fails to load | Fall back to system font for Preview and Export. |
| Export fails due to font issues | Retry export using fallback font and show warning. |

---

# Future Enhancements (Post-MVP)

- Font embedding into exported PDFs.
- Configurable font fallback chains for richer typography control.
- Contributor-facing font previews without loading template fonts during editing.
- Font version tracking and notifications for updates.

---

# Version

Mylo Font Handling Specification v1.0 — April 2025
