# Postponed Features: Deferred Until Post-MVP

This document tracks all Mylo features, specifications, and ideas that are postponed until after MVP delivery. These features are either high-complexity, non-essential to core functionality, or introduce significant implementation risk. They are not to be built or scoped for MVP.

---

## 🚫 Deferred Features

### 1. Smart Style Inference
- Complex heuristic engine based on capitalization, line length, paragraph position, etc.
- Confidence scoring system not defined.
- Real-time inference adds performance and correctness risk.
- Post-MVP task: Define clear algorithms, failure fallbacks, and spec conflicts with manual formatting.

### 2. Real-Time Preview Sync
- Every keystroke → JSON diff → Template Engine → DOM render.
- High risk for large documents or complex templates.
- MVP solution: Manual refresh button or blur-based preview update.

### 3. Guest Mode (LocalStorage-based)
- Adds routing complexity, fallback handling, and persistent demo state logic.
- Not essential for internal MVP.
- Post-MVP task: Re-evaluate after auth flows are stable.

### 4. Autosave + Full Document Versioning
- Autosave intervals, idle timers, retries, conflict handling are undefined.
- Version retention (5 autosaves + manual) introduces sync issues.
- MVP solution: Manual save button with simple success/failure feedback.

### 5. Custom Font Upload
- Requires Supabase Storage, licensing UI, validation, size limits.
- Complex dependency for PDF generation.
- MVP uses Google Fonts + system fonts only.

### 6. PDF Export with Style Enforcement
- Requires fully functional Preview engine and PDF styling engine.
- Embedded fonts, layout integrity, and PDF-specific error handling not yet designed.
- MVP: Defer export. Focus on getting preview accurate first.

### 7. Zoom Functionality
- MVP does not require zooming in editor or preview.
- Adds complexity to layout resizing and scroll sync.

### 8. Trash Filters and Full Trash Management
- Type-based filtering, 30-day retention, and permanent delete logic.
- Not required for MVP file management.
- MVP: Show simple trash list and restore/delete actions only.

### 9. Role Switching UI
- Mockups suggest role selection; unclear if intended for real use or dev testing.
- MVP does not support live role switching.

### 10. Admin Batch User Creation
- "Add Another" UX not necessary for MVP.
- MVP: Add one user at a time.

### 11. Style Modal Tab Conflict Resolution
- No logic defined for when typography, lists, lines, and hyphenation settings collide.
- MVP: Focus on Typography tab only, defer others.

### 12. Smart Breadcrumbs, Error States, and Loading States
- Breadth of state management not fully defined.
- MVP: Use basic loading indicators and toasts.

---

## ✅ Notes:
- All above features must be explicitly excluded from the current MVP implementation.
- Do not stub or scaffold these unless explicitly instructed.
- Re-evaluate for post-MVP roadmap after core Contributor + Template Editor loop is stable.

---

Maintained by: Product Owner
Updated: [Insert Date Here]
