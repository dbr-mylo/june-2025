# Mylo Font Handling Specification v2.0 — June 2025

---

# Overview

Mylo's font handling system ensures brand consistency while separating content creation from design enforcement. Contributors focus on writing with system fonts during editing, while Template Editors control final typography in preview and export.

This updated spec provides the technical and UX clarity required for MVP delivery, including font loading strategy, fallback behavior, and Supabase storage integration.

---

# MVP Scope

* Template Editors can:
  * Upload `.woff2` and `.ttf` font files (max size: 5MB)
  * Add fonts via Google Fonts or direct external URL
  * Assign fonts to semantic roles: Heading, Body, Display, Monospace
  * Preview fonts before assignment within Template Editor

* Contributors:
  * Use system fonts in editor view for speed and simplicity
  * See assigned template fonts in Preview only
  * Fonts render correctly in Preview and PDF export
  * Font uploads are stored in Supabase Storage
  * Font metadata is stored in Supabase DB (PostgreSQL)
  * Fonts are lazy-loaded for performance
  * If a font fails to load, a fallback font chain is applied

---

# Font Management Behavior Rules

## Font Loading

* Fonts are loaded using CSS `@font-face`
* `font-display: swap` is applied for faster rendering
* External fonts (e.g., Google Fonts) are included via CSS link injection
* FontFace API is used to track loading status

```ts
const font = new FontFace('CustomFont', 'url(/fonts/custom.woff2)');
font.load().then(() => document.fonts.add(font));
```

## Fallback Chain Example

```css
font-family: 'Brand Font', 'Helvetica Neue', Helvetica, Arial, sans-serif;
```

## Storage and Validation

* Uploaded fonts are stored in Supabase Storage
* Allowed formats: `.woff2`, `.ttf`
* Max upload size: 5MB
* Each upload is validated for file type, extension, and size
* Metadata stored in DB includes:

  * Font name
  * Source URL or upload path
  * Format type
  * License (if provided)
  * Assigned template

---

# UI Behavior (Template Editor)

* Template Editors can preview fonts in a dropdown with live text samples
* Fonts load dynamically into the preview canvas on assignment
* Invalid or failed font URLs show error toast: `"Failed to load font: [Font Name]"`
* Upload errors show inline error below the file input

---

# Error Handling

| Failure                        | System Response                                            |
| ------------------------------ | ---------------------------------------------------------- |
| Font upload fails              | Inline error with retry option                             |
| Invalid font format            | Reject with explanation (e.g., ".otf not supported")       |
| Font fails to load (URL error) | Apply fallback font, show toast to Template Editor         |
| Export fails due to font issue | Retry with fallback font, log error in console, show alert |

---

# Future Enhancements (Post-MVP)

* Font subsetting for export performance
* Variable font support
* Organization-wide shared font libraries
* Font usage analytics in Admin dashboard
* Font pairing suggestions and font similarity detection
* Embedding fonts into PDF output

---

# Version

Mylo Font Handling Specification v2.0 — June 2025
