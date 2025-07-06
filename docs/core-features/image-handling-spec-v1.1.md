# Image Handling Specification — v1.1

June 2025

---

# Overview

This specification defines how Mylo handles image insertion, replacement, rendering, restrictions, and export behavior across user roles. Images are static and embedded in the document content flow. Support is limited to the PNG and JPEG formats for MVP.

---

# MVP Scope

## Supported File Types

- `.png`, `.jpg`, `.jpeg`
- Max file size: 10MB
- Static images only — no GIF, SVG, or animated formats

## Contributor Role

- Can:
  - Insert images via the Insert menu
  - Replace placeholder images
- Cannot:
  - Move or delete locked images defined in the Template
  - Resize images
- Preview shows final image layout based on Template rules

## Template Editor Role

- Can:
  - Insert, position, and style images in the Template
  - Mark images as:
    - **Locked** (not editable by Contributors)
    - **Replaceable** (Contributor can swap but not move/resize)
- Can define image placeholder boxes with labels (e.g. “Drop headshot here”)

## Export

- Export to PDF includes all images at 300dpi
- Broken or missing image links show fallback icon in export
- Images are embedded in `.mylo` files, not linked externally

---

# Main Behavior Sections

## Save Behavior Rules

- Uploaded image assets are stored in Supabase Storage
- Image metadata is stored in Supabase DB and linked to document/template
- `.mylo` export bundles image binary content inside archive
- Replaceable image swaps preserve original bounding box and alignment

## UI Behavior

| Context | Behavior |
|---------|----------|
| Insert Menu | “Image” option opens file picker |
| Accepted Types | `.jpg`, `.jpeg`, `.png` only |
| Max File Size | 10MB — enforced on upload |
| Locked Images | Show lock icon on hover; no editing allowed |
| Replaceable Images | “Replace” button appears on click |
| Template Editor | Drag-and-drop positioning + image label UI |

---

# Stack Behavior

- Supabase Storage used for image asset storage
- Images linked via public URL stored in DB
- On document load, image metadata is resolved into position placeholders
- Export process fetches image content and embeds in PDF

## Data Models

| Field | Type | Notes |
|-------|------|-------|
| id | UUID | Image asset ID |
| url | String | Public Supabase URL |
| alt | String | Optional alt text |
| locked | Boolean | Prevents Contributor editing |
| replaceable | Boolean | Allows Contributor to swap |
| uploadedBy | UUID | User ID |
| linkedTo | UUID | Document or Template ID |

---

# Additional Technical Sections (Optional)

### Placeholder Handling

- Placeholder boxes can contain:
  - Label text (e.g. “Insert logo here”)
  - Replacement rules (required or optional)
- Labels do not appear in export if image is present

---

# Error Handling

| Condition | Behavior |
|----------|----------|
| Upload invalid file type | Reject with error message |
| Image > 10MB | Reject and display size warning |
| Image fails to load | Show “Image failed to load” message in Preview |
| Export image missing | Insert missing image icon + log warning |

---

# Known Gaps / Outstanding Questions

- Should Contributors be able to crop images? (Effort: High, Status: Deferred)
- Can Template Editors define fixed aspect ratios? (Effort: Medium, Status: TBD)
- Is there a need for alt-text enforcement in MVP? (Effort: Low, Status: Optional)

---

# Future Enhancements (Post-MVP)

- Aspect ratio locks for image placeholders
- Crop and rotate tools
- Drag-to-resize in Preview (Template Editor only)
- SVG support
- AI image generation or alt-text suggestion
- Auto-scaling to page width or columns

---

# Technical Dependencies

- Supabase Storage (bucket: `images/`)
- Image insertion handler
- File picker with size/type validation
- PDF export image embedder
- Image metadata serializer for `.mylo` files

---

# API / Data Schema Notes

- `POST /api/images/upload` — used by all roles
- `PATCH /api/images/:id` — replace or reassign
- `DELETE /api/images/:id` — Template Editor only (future)

---

# Version

Image Handling Specification v1.1 — June 2025
