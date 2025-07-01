# Mylo Font Handling Specification — v2.2

June 2025

---

# Overview

This specification defines how fonts are uploaded, loaded, previewed, stored, applied, and failed gracefully across the Mylo platform. Font handling supports separation of writing and visual design — Contributors write with system fonts while Template Editors define visual typography for Preview and Export.

---

# MVP Scope

## Roles and Responsibilities

- **Template Editors can:**
  - Upload `.woff2` and `.ttf` font files (max 5MB)
  - Add fonts from Google Fonts or external URLs
  - Assign fonts to roles: Heading, Body, Display, Monospace
  - Define fallback font chains
  - Preview fonts before assigning them in Templates

- **Contributors:**
  - Use system fonts while writing for speed and reliability
  - See assigned fonts applied in Preview and Export only

- **Fonts are:**
  - Lazy-loaded using FontFace API
  - Stored in Supabase Storage
  - Tracked via metadata in Supabase PostgreSQL
  - Embedded into PDF exports

---

# Main Behavior Sections

## Save Behavior Rules

- Fonts are saved to:
  - **Supabase Storage** (file)
  - **PostgreSQL** (metadata)
- Save is transactional — if font upload fails, metadata is not stored
- Fonts must be explicitly assigned to Template roles before they affect Preview

## UI Behavior

| UI Context | Behavior |
|------------|----------|
| Font Upload | Drag-and-drop or picker dialog |
| Format Validation | Only `.woff2` and `.ttf` accepted |
| Max Size | 5MB — enforced on client and server |
| Live Preview | Dropdown shows live font rendering per role |
| Error Feedback | Toast on font load fail; inline validation errors on upload |
| Fallback State | Spinner shows for up to 3s, then fallback font appears with warning |

### Font Loading Indicator

- Spinner appears next to font dropdown while loading
- Replaced with fallback font if loading fails
- Tooltip displays: *“Font failed to load. Using fallback.”*

---

# Stack Behavior

- Fonts loaded using:
  - `@font-face` with `font-display: swap`
  - FontFace API to detect load/failure
- Google Fonts are injected via `<link>` tags
- Uploaded fonts are loaded from Supabase public URL path
- Font usage is scoped to Template (fonts are not global)

---

# Font Loading and Fallback

### Example Fallback Chain

```css
font-family: 'Brand Font', 'Helvetica Neue', Helvetica, Arial, sans-serif;
```

### Font Detection Pattern

```ts
const font = new FontFace('CustomFont', 'url(/fonts/custom.woff2)');
font.load().then(() => document.fonts.add(font));
```

- Timeout of 3s triggers fallback
- Toast alert shown on load failure
- Preview continues with next fallback in chain

---

# Font Upload & Validation

| Check | Behavior |
|-------|----------|
| File type | `.woff2` or `.ttf` only |
| Size | Must be < 5MB |
| Duplicate file name | Allowed but stored uniquely |
| Corrupt/malformed file | Rejected with error message |
| MIME/type mismatch | Prevents upload and shows warning |

---

# Field Definitions

| Field | Type | Notes |
|-------|------|-------|
| fontName | String | Display name |
| format | Enum ("woff2", "ttf") | File type |
| size | Integer (bytes) | Max 5MB |
| sourceUrl | String | Public font URL |
| templateId | UUID | Template the font belongs to |
| role | Enum | Heading, Body, Display, Monospace |
| createdAt | ISO 8601 | Timestamp |

---

# Error Handling

| Condition | Response |
|----------|----------|
| Upload fails | Inline retry and error under input |
| Font fails to load | Toast: “Failed to load font: [Name]” |
| Export fails due to font | Retry with fallback; alert user |
| Format not supported | Error: “Only .woff2 and .ttf are allowed” |
| Oversized file | Reject with max size tooltip |

---

# Known Gaps / Outstanding Questions

- Can fonts be reused across multiple templates? (Status: Not supported yet)
- Can Template Editors preview fallback fonts? (Effort: Low, Status: TBD)
- Should license info be uploaded with the font? (Effort: Medium)
- Do we support multiple weights/styles per family? (Status: Post-MVP)

---

# Future Enhancements (Post-MVP)

- Variable font support
- Font pairing suggestions via AI
- Shared organization-wide font libraries
- Subset fonts for export optimization
- Font usage analytics
- Embedded license metadata

---

# Technical Dependencies

- `@tiptap/extension-font-family`
- `@tiptap/extension-text-style`
- Supabase Storage (bucket: `fonts/`)
- FontFace API
- Google Fonts CSS injection
- PDF export font embedding engine

---

# API / Data Schema Notes

## Font Metadata (PostgreSQL)

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

Mylo Font Handling Specification v2.2 — June 2025
