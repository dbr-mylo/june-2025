# Mylo Spec — Tokens Supported in Templates (MVP)

---

# Overview

This specification defines all tokens supported in Mylo templates for the MVP. Tokens allow Template Editors to insert dynamic placeholders into headers, footers, or body content. These tokens are resolved at render time using document metadata or system values. Contributors cannot insert or edit tokens directly.

---

# MVP Scope

**Included:**
- List of supported tokens
- Allowed usage zones (header, footer, body)
- Who inserts the token
- Where values are pulled from
- Fallback behavior if missing

**Excluded:**
- Custom user-defined tokens
- Conditional logic or token expressions
- Contributor insertion of tokens
- In-editor token preview

---

# Supported Tokens (MVP)

| Token | Description | Allowed In | Inserted By | Resolved From | Fallback |
|-------|-------------|------------|-------------|----------------|----------|
| `{{document_title}}` | Title of the document | Header, Footer, Body | Template Editor | Contributor input | “Untitled Document” |
| `{{date}}` | Current date or document creation date | Header, Footer | Template Editor | System metadata | Current date |
| `{{author_name}}` | Contributor’s full name | Header, Footer | Template Editor | User profile | “Anonymous” |
| `{{page_number}}` | Page index during render | Footer | Template Editor | Render engine | “1” |
| `{{total_pages}}` | Total number of pages | Footer | Template Editor | Render engine | “1” |

---

# Token Resolution Behavior

- Tokens are replaced in the **Preview panel** and in **exported PDFs**.
- If a token has no available value, fallback text is substituted.
- Tokens are **not editable** or visible in the Contributor's text editor.
- Tokens are **render-only** placeholders and never exposed as raw `{{...}}` strings to Contributors.

---

# Token Insertion

- Tokens are only insertable in the Template Editor via UI dropdowns in:
  - Header editor
  - Footer editor
  - (Future) Body content if allowed
- Tokens may not be manually typed — this prevents misformatting or misuse.

---

# Error Handling

- If a token cannot be resolved and no fallback exists, the system logs a warning (dev mode only).
- Rendered output uses fallback strings as a safe default.
- Invalid or misspelled tokens are silently ignored during rendering.

---

# Future Enhancements (Out of Scope)

- Support for custom tokens (e.g., `{{client_name}}`)
- Conditional tokens (`{{if author_name}}`)
- Token formatting (e.g., `{{date | YYYY-MM-DD}}`)
- Contributor-controlled tokens or field bindings
