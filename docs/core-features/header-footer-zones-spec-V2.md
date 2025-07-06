# Mylo Spec — Header/Footer Zones (MVP)

---

# Overview

This specification defines how the Template Editor can create and manage document headers and footers within Mylo. Headers and footers are treated as distinct layout zones, separate from the main body content. They are not part of `template settings`, but rather standalone sections editable only in Template Editor mode. Contributors cannot modify or interact with these zones.

---

# MVP Scope

**Included:**
- Template Editors can add headers and footers to a template
- Header/Footer zones support static text, basic formatting, and token placeholders
- Tokens are automatically resolved in Preview and Export views
- Contributors cannot see or edit header/footer zones inside their writing panel
- Header/Footer content appears in the Preview and exported PDF

**Excluded:**
- Per-page headers/footers or pagination-specific behavior
- Inline editing of headers/footers inside the main Tiptap editor
- Contributor access to header/footer content
- Conditional or dynamic layout logic
- Editable header/footer zones at the document level

---

# Header/Footer Zones — Behavior and Structure

## Header/Footer Entry Point

- In the Template Editor workspace, the design sidebar includes:
  - `[ + Add Header ]`
  - `[ + Add Footer ]`
- Once added, each opens a dedicated mini-editor.

## Mini-Editor Capabilities

Each header/footer zone supports:
- Static text
- Token insertion via dropdown (`{{document_title}}`, `{{date}}`, etc.)
- Basic text formatting (bold, italic, alignment)
- Inline layout styling (e.g., alignment: left/center/right for multi-part headers)

## Display Rules

- Headers and footers are **not visible** in the Template Editor’s main document canvas.
- They are rendered **only** in:
  - Template Preview
  - Contributor Preview
  - Exported PDF
- Contributors never see or interact with the raw header/footer editor.

## Storage Structure (Example)

```json
{
  "template": {
    "header": {
      "content": "ACME Corp | {{document_title}} | {{date}}",
      "alignment": "center",
      "tokens": ["document_title", "date"]
    },
    "footer": {
      "content": "Page {{page_number}} of {{total_pages}}",
      "alignment": "center",
      "tokens": ["page_number", "total_pages"]
    }
  }
}
```

---

# Token Support (MVP)

Refer to [tokens-supported-in-template-spec.md](tokens-supported-in-template-spec.md) for a full list of supported tokens, their usage, fallback behavior, and resolution logic.


| Token | Description | Editable By |
|-------|-------------|-------------|
| `{{document_title}}` | Document title entered by Contributor | ✅ |
| `{{date}}` | Current date or doc creation date | System |
| `{{author_name}}` | Contributor’s name | System |
| `{{page_number}}` | Current page index (for preview/export only) | System |
| `{{total_pages}}` | Total page count (preview/export only) | System |

---

# Error Handling

- If required tokens cannot be resolved (e.g. missing `document_title`), fallback text will display:
  - `{{document_title}}` → “Untitled Document”
- If header/footer zones are empty, they are not rendered.
- Malformed tokens are ignored silently — no rendering or error shown.

---

# Future Enhancements (Out of Scope)

- Per-page conditional logic
- “First page only” or “different last page” logic
- Column layout for header/footer
- Contributor-controlled fields in header/footer
- Rich formatting (images, tables)
