
# Mylo Font Handling Specification v2.1 — June 2025

---

# Overview

Mylo's font handling system ensures brand consistency while separating content creation from design enforcement. Contributors focus on writing with system fonts during editing, while Template Editors control final typography in preview and export.

This spec outlines the technical, behavioral, and architectural design of font loading, assignment, storage, and error handling across all Mylo user roles.

---

# MVP Scope

- Template Editors can:
  - Upload `.woff2` and `.ttf` font files (max size: 5MB)
  - Add fonts via Google Fonts or direct external URL
  - Assign fonts to semantic roles: Heading, Body, Display, Monospace
  - Preview fonts before assignment within the Template Editor
  - Customize fallback font chains
- Contributors:
  - Use system fonts in editor view for performance
  - See template-assigned fonts in Preview only
- Fonts render correctly in Preview and in PDF export
- Fonts are lazy-loaded using FontFace API
- Fonts are stored in Supabase Storage
- Metadata is stored in Supabase DB (PostgreSQL)

---

# Font Management Behavior

## Font Loading

- Loaded via CSS `@font-face`
- Uses `font-display: swap` for fast rendering
- FontFace API used to detect loading completion and failures
- External URLs (e.g., Google Fonts) injected as `<link>` tags
- Custom fonts stored locally are loaded via Supabase public URL
- Timeout fallback: system font fallback triggers after 3 seconds

## Fallback Chain Example

```css
font-family: 'Brand Font', 'Helvetica Neue', Helvetica, Arial, sans-serif;
```

Template Editors may define fallback font chains per role in the Template Settings panel.

## Font Loading Detection

```ts
const font = new FontFace('CustomFont', 'url(/fonts/custom.woff2)');
font.load().then(() => document.fonts.add(font));
```

Timeout triggers fallback display and error toast if loading exceeds 3s.

## Font Upload & Validation

- Upload via drag-and-drop interface
- Allowed file types: `.woff2`, `.ttf`
- Max file size: 5MB
- MIME type and header checked for file integrity
- Inline errors shown for:
  - Invalid file extension
  - File too large
  - Malformed font

## UI Behavior

- Live preview of selected fonts in dropdown (Heading, Body, Display)
- Font loading indicator shows spinner while fetching
- Errors during font preview show inline error toast: `"Failed to load font: [Font Name]"`
- Upload failures display inline message under file input

---

# Error Handling

| Failure                          | System Response                                           |
|----------------------------------|------------------------------------------------------------|
| Font upload fails                | Inline error with retry option                            |
| Invalid font format              | Reject with explanation (e.g., ".otf not supported")     |
| Font fails to load (URL error)   | Apply fallback font, show toast to Template Editor        |
| Export fails due to font issue   | Retry with fallback font, log error in console, show alert|

---

# Known Gaps / Outstanding Questions

- Do we support multiple font weights/styles per upload? (Effort: Medium)
- Should Template Editors be able to preview fallback fonts in UI? (Effort: Low)
- Do we allow font deletion if it is used in a published template? (Effort: High)
- Should font metadata include license file attachment? (Effort: Medium)
- Can fonts be shared across templates or are they always template-scoped? (Effort: Medium)

---

# Future Enhancements (Post-MVP)

- Font subsetting for export optimization
- Variable font support
- Organization-wide shared font libraries
- Font usage analytics (Admin dashboard)
- Font pairing suggestions via AI
- Embedding fonts in generated PDFs

---

# Technical Dependencies

- `@tiptap/extension-font-family` and `@tiptap/extension-text-style`
- FontFace API for loading status
- Supabase Storage for font files (public bucket `fonts/`)
- Google Fonts integration via CSS link injection
- PDF export font embedding engine

---

# API / Data Schema Notes

## Font Metadata Structure (PostgreSQL)

```json
{
  "id": "font_abc123",
  "name": "Roboto",
  "source_url": "https://fonts.googleapis.com/css2?family=Roboto",
  "format": "woff2",
  "license": "OFL",
  "size": 202304,
  "template_id": "tmpl_xyz789",
  "created_at": "2025-06-22T14:12:00.000Z"
}
```

---

# Version

Mylo Font Handling Specification v2.1 — June 2025
