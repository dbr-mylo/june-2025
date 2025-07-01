# PDF Export Specification — v1.1

June 2025

---

# Overview

This specification defines how PDF export is initiated, generated, and delivered in Mylo. PDF output reflects the content as styled by the active Template. Export is user-triggered and non-blocking, with progress and error feedback provided inline.

---

# MVP Scope

## Export Capabilities

- Export current document as a high-resolution PDF
- Includes:
  - All pages and structured content
  - Template styles (fonts, spacing, layout)
  - Static images and locked artwork
- Excludes:
  - Comments
  - Metadata (author, title, etc.)
  - Hidden layout zones or editor-only markers

## Who Can Export

- All roles: Contributor, Template Editor, Admin, Guest
- Guests can only export locally (no cloud sync)
- Export always uses **Preview panel styles**, not Editor formatting

---

# Main Behavior Sections

## Save Behavior Rules

- Export does **not** autosave the document
- PDF reflects the latest content + applied Template
- Fonts and images are embedded in final PDF
- Manual export only — no background/export-on-save supported

## UI Behavior

| Action | Behavior |
|--------|----------|
| Click “Export as PDF” | Begins export process and shows spinner |
| Export complete | Toast: “PDF exported successfully” |
| Export fails | Toast: “Export failed. Try again.” |
| Download name | `[document-title].pdf` or `untitled.pdf` fallback |
| In-progress indicator | Spinner shown next to button until complete |

---

## Export Rules

- Fonts used in Template are subset and embedded
- Images are exported at up to 300dpi (max quality)
- Page dimensions match Template layout
- Pagination, widows, and breaks follow Template behavior

---

# Stack Behavior

- Export request triggers local render of Preview content
- Output is generated using PDF layout engine (e.g., `pdf-lib`, `Puppeteer`, or custom renderer)
- Fonts and images fetched from local store or Supabase if needed
- Exported file is streamed or directly downloaded to browser

---

# Data Models

*Export is transient — no persistent models stored.*

---

# Field Definitions

| Field | Type | Notes |
|-------|------|-------|
| exportType | String | Always “pdf” for this operation |
| fileName | String | User-defined or fallback |
| includeAssets | Boolean | Always true — all assets embedded |
| layoutSource | Enum | “preview” (never “editor”) |

---

# Additional Technical Sections (Optional)

### Download Trigger

- Export is handled client-side
- Browser Save Dialog triggered once PDF blob is ready
- Does not block other interactions during processing

---

# Error Handling

| Condition | Behavior |
|----------|----------|
| Export fails | Toast + retry allowed |
| Font fails to embed | Fallback used silently, log to console |
| Image missing | Insert empty space or fallback icon |
| Browser blocks download | User prompted to enable downloads |

---

# Known Gaps / Outstanding Questions

- Should users be able to watermark PDFs? (Effort: Medium, Status: TBD)
- Should exports include alt-text metadata? (Effort: High, Status: Post-MVP)
- Can the filename be editable before download? (Effort: Low)

---

# Future Enhancements (Post-MVP)

- Custom export presets (resolution, bleed, cover page)
- Password-protected PDFs
- Metadata injection (author, org, version)
- PDF previews before download
- Export scheduling or background generation

---

# Technical Dependencies

- PDF rendering engine
- Font embedding handler
- Supabase access for image/font links
- File download utility

---

# API / Data Schema Notes

- No server API required for PDF generation (client-side only)

---

# Version

PDF Export Specification v1.1 — June 2025
