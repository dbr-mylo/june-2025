# Template Performance Optimization Specification — v1.1

June 2025

---

# Overview

This document outlines performance strategies used when applying templates in Mylo. Templates are composed of metadata, styles, layout rules, and artwork (e.g., logos, placeholders). To maintain a responsive user experience, templates use selective caching, async preloading, and fallbacks.

---

# Optimization Techniques

| Method | Description |
|--------|-------------|
| **In-memory caching** | Recently used templates are cached client-side during session. Does **not** persist across browser tabs or reloads. |
| **Preload on hover** | Hovering over a template thumbnail begins loading styles and assets in the background. |
| **Lazy-load artwork** | Logos and images are deferred until the template is selected and applied. |
| **Single-load per session** | Templates applied more than once in the same session use cached version unless explicitly refreshed. |
| **Fallback fonts** | If a custom font fails to load, system fonts are used based on declared fallback list. |

---

# Supabase Storage Notes

- Template artwork (logos, images) is stored in Supabase Storage.
- Supabase’s public buckets are accessed with signed URLs.
- Download errors are caught and fall back to:
  - Blank placeholder if image fails
  - Silent suppression if image is non-critical

---

# Guest Mode Considerations

| Scenario | Behavior |
|----------|----------|
| Guest applies template | Uses in-memory cache only; not saved to Supabase |
| Guest refreshes page | Cache is cleared; must reload assets |
| Guest preview fails | Shows placeholder assets; no retry UI shown |
| Guest enters template mode | Artwork and styles are lazy-loaded only during interaction |

---

# Error Handling

| Failure Type | Fallback |
|--------------|----------|
| Image not found | Invisible placeholder used |
| Font download fails | Use declared fallback (e.g., Arial, sans-serif) |
| Template partially corrupt | Fallback to default style template (Post-MVP) |
| JSON parse error | Block template selection, show modal error |

---

# Known Gaps

- No persistent cache across sessions
- No UI for reloading corrupted template assets
- No loading spinner for large artwork (fonts/images)

---

# Future Enhancements (Post-MVP)

- IndexedDB or localStorage for persistent caching
- Expiry logic for stale template cache
- Retry failed asset loads (fonts/images)
- Spinner or shimmer for templates while loading

---

# Version

Template Performance Optimization Specification v1.1 — June 2025
