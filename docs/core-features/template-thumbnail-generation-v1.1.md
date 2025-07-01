# Template Thumbnail Generation Specification — v1.1

June 2025

---

# Overview

This specification defines how thumbnails for Templates are generated and displayed in Mylo. Thumbnails help users visually identify Templates during selection and switching. Thumbnails are created in the Template Editor and displayed to all users who have access to the Template.

---

# MVP Scope

## Behaviors

- Each Template includes one associated thumbnail
- Thumbnails are captured by the Template Editor
- Contributors see the thumbnail when selecting a Template
- Thumbnails update manually — no auto-refresh
- Thumbnail is optional at time of creation; placeholder used if none exists

---

# Main Behavior Sections

## Save Behavior Rules

- Thumbnail is saved as part of the Template metadata
- Saved to Supabase Storage
- Overwrites any existing thumbnail when updated
- Not versioned independently

## UI Behavior

| Action | Behavior |
|--------|----------|
| Capture thumbnail | Template Editor clicks “Set Thumbnail” |
| Placeholder | Default icon shown until thumbnail is added |
| Hover on thumbnail | Shows “Click to update thumbnail” (Template Editor only) |
| Thumbnail in picker | Appears in template switcher dropdown and dashboard views |
| Delete thumbnail | Reverts to placeholder; image removed from storage |

---

## Stack Behavior

- Captured thumbnail = screenshot of canvas area (SVG or PNG)
- Uploaded thumbnail = stored in `thumbnails/` bucket (Supabase)
- Template metadata updated with image path
- Contributor-side: `GET` only access to thumbnail URL

---

## Data Models

### Template with Thumbnail Field

```json
{
  "id": "tmpl_456",
  "name": "Client Report",
  "thumbnailUrl": "https://cdn.mylo.app/thumbnails/tmpl_456.png",
  "createdBy": "user_999"
}
```

## Field Definitions

| Field | Type | Notes |
|-------|------|-------|
| thumbnailUrl | String | Public image URL stored in Supabase |
| createdBy | UUID | User who created the template |
| updatedAt | ISO 8601 | Used to track recapture |

---

# Additional Technical Sections (Optional)

### Capture Method

- System takes a screenshot of visible canvas area
- Includes:
  - Sample content
  - Active template layout
- Excludes UI elements or tool overlays

---

# Error Handling

| Condition | Behavior |
|----------|----------|
| Capture fails | Show toast: “Thumbnail capture failed” |
| Upload fails | Retry option shown |
| Missing file on load | Fallback to placeholder thumbnail |
| Contributor can’t access URL | Silent fail; placeholder shown |

---

# Known Gaps / Outstanding Questions

- Should thumbnails be auto-generated on template save? (Effort: Medium, Status: Deferred)
- Can multiple thumbnails represent layout variants? (Effort: High, Post-MVP)
- Can thumbnails be reordered or categorized? (Status: Post-MVP)

---

# Future Enhancements (Post-MVP)

- Multiple thumbnails per template (carousel or selector)
- Auto-thumbnailing after major layout change
- Custom thumbnail upload (instead of screenshot)
- Preview thumbnails based on template structure type (letterhead, proposal, etc.)

---

# Technical Dependencies

- Canvas screenshot engine
- Supabase thumbnail upload endpoint
- Template metadata update logic
- Thumbnail rendering in dashboard and dropdowns

---

# API / Data Schema Notes

- `POST /api/templates/:id/thumbnail`
- Thumbnail URLs stored in Template object
- Served via CDN

---

# Version

Template Thumbnail Generation Specification v1.1 — June 2025
