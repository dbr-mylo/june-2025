# Mylo Local Save & Export Specification

This specification details the process and functionality for local saving, reopening, and exporting documents in Mylo. It ensures offline accessibility, flexible sharing, and backup options for Contributors and Template Editors.

---

# Overview

Enable users to save documents locally as `.mylo` files for offline access, export final documents to PDF for sharing, and reopen these files later for continued editing. This feature supports both Contributors and Template Editors while maintaining data integrity and flexibility.

---

# MVP Scope

- Cloud autosave (default)
- Manual Save to Device (`.mylo`)
- Export to PDF (applies template styling)
- Files include metadata (`type`, `role`, `version`)
- Role-based file access:
  - Contributors can save and open documents
  - Template Editors can open/save both documents and templates

---

# Functional Requirements

**Contributor**
- As a Contributor, I can save my document as a `.mylo` file to back it up locally.
- As a Contributor, I can reopen a `.mylo` file and continue where I left off.
- As a Contributor, I can export a final version as a PDF.

**Template Editor**
- As a Template Editor, I can save a template locally as a `.mylo` file.
- As a Template Editor, I can import a `.mylo` file and update the template.
- As a Template Editor, I can export a styled PDF for sharing with stakeholders.

---

# Error Handling

| Failure | System Response | User-facing Message |
|:---|:---|:---|
| Unsupported file extension | Attempt to parse content metadata. | "This file type is not supported." |
| Invalid metadata | Show error and prevent file open. | "File metadata is invalid. Please try again." |
| Failed save operation | Retry save or show failure warning. | "Save failed. Please check your storage or try again." |
| Contributor attempts to open a template file | Show error message or warning, block access. | "You cannot open a template file as a Contributor." |

---

# Future Enhancements (Post-MVP)

- Font embedding for PDF export.
- Handling for multiple file extensions in future releases.
- Conversion between `.mylo` file versions if needed.

---

# File Compatibility

- Future versions of Mylo may introduce new file formats (e.g., `.mylo-v2`).
- The system must **automatically convert** older `.mylo` files to the new format upon import.
- If file conversion fails, show an error and suggest the user updates their file to the latest version.
- **The `.mylo` file extension will most likely change in the future.** This change should be handled seamlessly, with automatic conversion and backward compatibility ensured.

---

# Version

Mylo Local Save & Export Specification v1.0 — April 2025
