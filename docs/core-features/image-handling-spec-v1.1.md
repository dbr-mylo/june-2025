
# Mylo Image Handling Specification v1.1 — July 2025

---

# Overview
This document defines how images are uploaded, stored, positioned, and rendered in Mylo, across all user roles. It distinguishes between template-controlled images and contributor-inserted images, and outlines current MVP support versus post-MVP behavior.

---

# MVP Scope

## Image Types Supported
1. **Template Images (Fixed)**
   - Added by Template Editors only
   - Not editable or replaceable by Contributors
   - Used for logos, decorative elements, and layout artwork

## Upload & Storage
- **Roles Allowed**: Only Template Editors
- **Supported formats**: `.jpg`, `.png`, `.svg`
- **Max file size**: 5MB
- **Storage Location**: Supabase Storage
- **Path Format**: `/images/{templateId}/{filename}`
- **Security**: Signed URLs; scoped access by user role

## Placement Behavior (Template Images)
- Position and size are defined statically by the Template Editor at the time of placement
- Template Editors set image frame dimensions via numeric inputs or size presets
- ❌ **Interactive resizing** (e.g., drag handles) is not supported in MVP
- CSS `object-fit` strategies (`contain`, `cover`) control image fit within the defined frame
- Contributors cannot move, replace, or remove template images

## UI Behavior
- Template Editors:
  - Upload via drag-and-drop or file picker
  - Define frame size before or during upload
  - Can preview, replace, or remove image assets
- Contributors:
  - See template images in Preview and Export only
  - Cannot interact with images in any way

## Error Handling
- Upload fails → inline error with retry option
- Image fails to load → fallback to placeholder icon and toast alert

---

# Post-MVP Support

## Contributor-Controlled Images

### 1. **Zone-Based Image Upload (Static Slots)**
- Contributor places images in predefined zones
- Zones defined by Template Editor with fixed dimensions
- Drop behavior: `contain` or `cover`
- Use case: Profile pictures, feature images

### 2. **Inline (In-Flow) Images**
- Contributor inserts images directly in the content stream
- Behaves like rich-text blocks (e.g., Notion, Google Docs)
- Requires wrapping rules, float alignment, spacing logic
- Complex to implement, not supported in MVP

### 3. **Placeholder Images / Soft Zones**
- Template includes hints for where an image might go
- Contributor decides to insert image or ignore it
- Visual placeholders may be displayed but are non-binding

### 4. **Background Images / Decorative Zones**
- Full-page or section-level background images
- Always controlled by the Template Editor
- Positioned behind text and locked

### 5. **External or Dynamic Images**
- Sourced from external APIs or DAMs
- Used for user profile photos, external data pulls
- Requires URL validation, CORS handling

---

# Image Movement and Repositioning

## MVP
- **No repositioning support**
- Template Editor defines image position and frame size statically
- ❌ Images cannot be dragged, resized, or adjusted after placement

## Post-MVP
- Template Editors may be allowed to interactively:
  - Drag and reposition images
  - Resize images using handles
  - Toggle aspect-ratio lock
- ✅ This will require a **layout engine** to manage:
  - Click-to-select behavior
  - Live resizing and snapping
  - Z-index and layering control
  - Canvas/grid-based positioning

---

# Future Considerations
- Shared image libraries across teams
- Cropping and zooming tools
- Alt-text and accessibility metadata
- Image versioning and rollback

---

# Version
Mylo Image Handling Specification v1.1 — July 2025
