# MVP Implementation Plan: Focused Contributor + Static Template System

This plan defines the stripped-down, low-risk MVP implementation for Mylo. It validates the core value: **"Contributors write freely. Templates enforce styles."**

All features listed in `postponed-features-mvp.md` are out of scope.

---

## 🔑 Core MVP Scope

* **Single Role:** Contributor only
* **Editor:** Rich text editor with basic formatting toolbar
* **Preview:** Manual template-based styling
* **Templates:** 2–3 hardcoded options with predefined styles
* **Persistence:** Supabase integration for document storage
* **No:** Inference, real-time sync, autosave, font upload, PDF export, trash filtering, or versioning

---

## 🛠 Phase Breakdown

### Phase 1: Core Tiptap Editor (Week 1)

* Implement basic Tiptap editor with:

  * Bold, Italic, Underline
  * Headings (H1, H2, H3)
  * Bullet + Numbered lists
  * Text alignment (left, center, right)
* Add manual save to localStorage or memory
* No templates or preview logic yet

### Phase 2: Static Template System (Week 2)

* Hardcode 2–3 templates with concrete styling rules (font size, line height, color, etc.)
* Add dropdown menu for template selection
* Add **"Apply Template"** or **"Refresh Preview"** button to manually trigger preview update
* Implement side-by-side Editor + Preview layout

### Phase 3: Data Persistence (Week 3)

* Connect to Supabase:

  * Save/load documents
  * Store document metadata (title, last modified, selected template)
* Basic dashboard with document list, create, and open
* Template choice saved with document

### Phase 4: Polish & Validation (Week 4)

* Basic loading and error states
* Warning if switching templates could impact visual output
* Responsive layout for sidebar/editor/preview

---

## ❓Open Questions to Resolve

### 1. **Template Assignment UI**

* Are Contributors shown *all* available templates?
* Or are templates assigned per user/document?
* MVP Recommendation: Use dropdown with 2–3 hardcoded options

### 2. **Preview Refresh Trigger**

* Is the preview refreshed on button click? On blur? Or manual only?
* MVP Recommendation: Add **"Refresh Preview"** button

### 3. **Template Styling Format**

* How is a template defined? CSS rules? JSON-to-CSS mapping?
* MVP Requirement: Provide 1–2 example templates with actual style rules for mapping

### 4. **Authentication Scope**

* Do we need full Supabase Auth (email/password/Google)?
* Or can we stub a default Contributor user?
* MVP Recommendation: Stub auth unless data security is essential for testing

---

## 📦 Deliverables by End of MVP

* Working Editor with manual formatting
* Side-by-side Editor + Template-enforced Preview
* Document persistence to Supabase
* Template selection logic + preview trigger
* Clean layout and minimal UI polish

---

## 🧯 Explicitly Out of Scope (Confirmed in postponed-features-mvp.md)

* Smart Style Inference
* Real-time Preview Sync
* Autosave / Document Versioning
* Guest Mode
* Font Uploads
* PDF Export
* Zoom Functionality
* Role Switching
* Trash Filtering

---

## Maintained by: Product Owner

Last updated: July 14, 2025
