# Mylo Loading States Specification (v1.0)

This document defines what users should see during loading and save operations across the Mylo application, including templates and documents. It is part of the core UI/UX behavior standards for MVP.

---

# Overview

The goal of loading states is to provide immediate, clear feedback to users during operations that take longer than 300ms. These states must reinforce application stability, prevent user confusion, and visually indicate that work is in progress.

This specification covers:

- Template loading (open, apply, preview)
- Document saving (autosave, manual save, export)
- File fetching (dashboard views)
- Connection issues

---

# MVP Scope

## Visual Feedback for Save Operations

- **Document Autosave**
  - Show a non-intrusive inline status: “Saving...” followed by “Saved” in the top right corner of the editor.
  - Autosave confirmation disappears after 2 seconds.

- **Manual Save or Export**
  - Show a modal spinner overlay with text: “Saving your work...”
  - Dismiss automatically upon success; show confirmation: “Document saved.”

- **Template Save**
  - Same behavior as manual document save.
  - If changes are saved in the background, apply the same inline “Saved” indicator in the header.

## Template Loading

- When applying a template:
  - Dim the preview panel.
  - Show spinner overlay with message: “Applying template...”
  - Re-render preview after successful application.

- When opening a template:
  - Show skeleton loader for template editor content area for perceived responsiveness.

## Dashboard File Loading

- Display skeleton rows for documents and templates (3–5 placeholders).
- Replace with actual file content once retrieved.

## Connection or API Failure

- If a save or load fails:
  - Display persistent inline banner with error message: “Couldn’t save document. Retrying...”
  - Retry logic managed by autosave rules or triggered by user.

---

# Error Handling

- Save errors: show error icon next to “Saving...” with tooltip for more info.
- Load failures: fallback to empty state view with retry button.

---

# Future Enhancements

- Visual history of save points for long-session contributors.
- Support for optimistic UI to eliminate delay between user actions and perceived save.
- Real-time sync progress indicators (when collaboration is added post-MVP).
