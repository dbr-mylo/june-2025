# Code vs. Spec Gaps — MVP Audit

**Version:** v1.0  
**Last Updated:** July 2025  
**Status:** Triaged Audit of Unimplemented or Misaligned Specs

---

## Overview
This document highlights major gaps between documented specifications and actual implementation as of July 2025. Each gap is tagged with an action recommendation.

---

## Gap List

### 1. 🟥 Missing Template Editor Flow Implementation
- **Issue:** No code flow exists for Template Editor to:
  - Create a new template from scratch
  - Define and save styles
  - Assign sample content for preview testing
- **Spec Exists:** ✅ `/docs/core-features/template-editor-user-stories.md`
- **Action:** Build template creation flow with save → preview → publish logic

### 2. 🟥 `autosave-sync-rules-v2.1.md` referenced nonexistent save status components
- **Issue:** UI states `saving`, `error`, `clean`, and `dirty` were undocumented
- **Now Resolved:** ✅ Added in new autosave spec (v2.1)
- **Action:** Implement UI badge and error banner with debounce logic

### 3. 🟨 No centralized `EditorContext` data flow
- **Issue:** Code duplicates document state logic across editor/preview/toolbar
- **Spec:** `/docs/system-guidelines/preview-panel-architecture.md`
- **Action:** Create shared state context or hook that synchronizes real-time updates across all Editor components

### 4. 🟨 Role-based toolbar logic incomplete
- **Issue:** Tiptap extension buttons available to Contributors that are meant to be restricted (e.g. highlight, typography)
- **Spec:** `/docs/system-guidelines/tiptap-extension-plan.md`
- **Action:** Apply role checks to all extension commands

### 5. 🟩 `role-based-routing-permissions` now aligned with implementation
- **Issue:** Contradictory v1.0 and v2.0 specs replaced
- **Now Resolved:** ✅ Canonical spec created and routing logic scaffolded
- **Action:** Remove outdated files; enforce all guards via `<RequireRole />`

### 6. 🟨 Missing Template Assignment Logic
- **Issue:** No working code for selecting a template during document creation
- **Spec Exists:** `/docs/core-features/template-system-spec.md`
- **Action:** Add dropdown or modal to connect document to template ID

---

## Scoring Key
- 🟥 High priority: MVP blocker or false spec
- 🟨 Medium: Important but not blocking yet
- 🟩 Resolved: Previously reported, now fixed

---

## Next Steps
- Validate each gap via dev review or working prototype
- Assign owners for remaining yellow items
- Close loop with Lovable on MVP audit completion
