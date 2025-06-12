# Thumbnail Creation for Templates

This document defines the behavior, triggers, and technical handling of template thumbnail generation in Mylo.

---

# Overview

Template thumbnails provide a quick visual reference for each saved template in the dashboard and selection menus. They are automatically generated and updated by the system based on specific triggers. Only Template Editors and Admins can initiate thumbnail creation.

---

# MVP Scope

- Automatic thumbnail creation on first save
- Thumbnail regeneration only if layout or style settings are changed
- Manual regenerate option in UI
- Placeholder shown when no thumbnail exists
- Store as part of the template object (`thumbnailUrl` field)

**Not included in MVP:**

- Custom uploads
- Choosing a different page as the thumbnail
- Previewing before save

---

# System Behavior

## When Thumbnails Are Created or Updated

| Trigger                      | Behavior                                                                 |
|------------------------------|--------------------------------------------------------------------------|
| First template save          | Automatically generate a thumbnail of the first layout page              |
| Subsequent saves             | Auto-regenerate **only if layout or style settings changed**             |
| Manual trigger (button)      | “Regenerate Thumbnail” re-captures the visual state                      |
| Template deletion            | Thumbnail is also deleted from storage                                   |
| No visual content yet        | Show a static placeholder thumbnail (e.g., branded or generic image)     |

## When Thumbnails Are Not Regenerated

- Content-only changes (text, placeholder box content)
- Meta changes (template name, visibility)
- Auto-saves with no layout/style changes
- When a thumbnail has been manually overridden (future enhancement)

## UI Behavior (Template Dashboard)

| State                      | Behavior / Visual Feedback                                     |
|----------------------------|---------------------------------------------------------------|
| No Thumbnail Yet           | Placeholder with "No thumbnail yet" label                     |
| Generating Thumbnail       | Spinning loader or “Generating…” overlay                      |
| Manual Regenerate Trigger  | Hover button: “Regenerate Thumbnail”                          |
| Updated Successfully       | Silent update or subtle “Thumbnail updated” toast             |
| Failed to Generate         | Error toast + fallback image shown                            |

## Role Permissions

| Role            | Can Trigger Thumbnail Updates? |
|------------------|-------------------------------|
| Contributor     | ❌ No                          |
| Template Editor | ✅ Yes (automated + manual)    |
| Admin           | ✅ Yes                         |

---

# Technical Notes

| Property         | Value/Details                             |
|------------------|-------------------------------------------|
| Format           | PNG or WebP                               |
| Size             | ~400×300 px                               |
| Quality          | Medium                                    |
| Crop             | First layout page, full bleed             |
| Storage          | Supabase Storage or object URL            |
| Linked Field     | `template.thumbnailUrl`                   |

- Thumbnail image is captured via headless rendering of the first layout page.
- Stored in Supabase Storage; URL saved as `template.thumbnailUrl`.
- Regeneration is debounce-limited to avoid performance spikes.

---

# Error Handling

- **Thumbnail generation failure**: Fallback placeholder is displayed; system logs error and retries once.
- **Storage upload failure**: Save continues but with no updated thumbnail; error toast shown to user.
- **Missing layout data**: System skips thumbnail creation and shows default placeholder.
- **Manual regenerate failure**: Toast message: “Thumbnail could not be regenerated. Try again.”

---

# Future Enhancements (Post-MVP)

- Allow custom thumbnail upload/override
- Preview thumbnails before saving
- Allow selection of a different page or frame to represent the template

---

# Version

Mylo Thumbnail Creation Specification v1.0 — June 2025
