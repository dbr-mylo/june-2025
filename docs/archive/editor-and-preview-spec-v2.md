# Editor and Preview Panel Specification

This document defines the functionality, behavior, and structure of the **Editor** and **Preview** panels in Mylo.

---

# Overview

The Mylo workspace is split into two primary panels:

- **Editor Panel:** Where Contributors freely create and edit content.
- **Preview Panel:** Where the document is rendered with the active Template applied, showing true output appearance.

These two panels work together to maximize creative flexibility while ensuring consistent document formatting.

---

# MVP Scope

## Editor Panel (MVP)
- Contributors can freely write, edit, and apply basic formatting: bold, italic, underline, lists, alignments, headings.
- **Page boundaries can be toggled on/off** in the Editor Panel via the View menu; default state is off. When enabled, pagination lines appear exactly as in the Preview.
- Real-time text editing with instant updates.
- No enforced Template styles while writing (editor is freeform).

## Preview Panel (MVP)
- Displays the current document rendered with the assigned Template.
- Enforces Template styles: fonts, sizes, colors, margins, spacing.
- Ignores Contributor formatting that is not supported by the Template.
- Live update: every keystroke in the Editor re-renders the Preview instantly.
- Shows true pagination (page breaks, margins, visual output).
- Multi-page documents are displayed in a **vertically stacked page view** (Option 1).
- Users scroll vertically to move through pages.
- Page breaks are clearly marked with visible whitespace or separator lines.
- The Preview Panel preserves accurate print layout and spacing across pages.
- Pagination updates dynamically as content is edited in the Editor.
_Note: Future versions may include a floating page navigator or zoom control. These are not included in the MVP._


## Panel Behavior (MVP)
- Panels are side-by-side, divided by a draggable handle.
- Contributors can resize Editor and Preview panels horizontally.
- Minimum width thresholds prevent collapsing either panel entirely.
- Default starting split: 50% Editor | 50% Preview.


### Scroll Together
When **Scroll Together** is enabled (via toggle in the top navigation), the Editor and Preview panels remain in sync during scrolling.
- Scrolling behavior is **cursor-based**:
  - If the user’s cursor is in the Editor, scrolling that panel will move the Preview in sync.
  - If the user clicks into the Preview, the sync behavior reverses.
- Syncing behavior only applies while typing or scrolling by mouse/trackpad.
- Manual scrolling of the non-focused panel will temporarily disable syncing until refocused.
- The default state for Scroll Together is **enabled**.


---

# Future Enhancements (Post-MVP)

- **Zoom Controls:** Zoom in/out inside the Preview Panel (e.g., 50%, 100%, 200%).
- **Snap Resizing Presets:** Quick adjustments (e.g., 70% Editor / 30% Preview).
- **Responsive Preview:** Auto-adjust Preview rendering based on panel width.
- **Detached Preview:** Allow Preview in a floating or external window.
- **Preview Toggle:** Allow hiding the Preview Panel temporarily for focus mode.

---

# Behavior Rules

- All editing happens exclusively inside the Editor Panel.
- No direct editing allowed in the Preview Panel.
- The Preview strictly reflects Template styling, not ad-hoc formatting.
- Bold, italic, and other basic formatting may be preserved if the Template allows it; otherwise, ignored.
- Divider resizing is smooth and does not require saving or reloading.

# Save Status Indicator (While Editing)

While editing a document inside the Editor Panel, users must receive live feedback about the save state of their work.

The Save Status Indicator is always visible in the top navigation bar.

| Save State             | Display Text                           |
|:-----------------------|:---------------------------------------|
| Saving in progress     | "Saving your work…"                    |
| Save complete          | "All changes saved"                    |
| Offline mode detected  | "Offline — saving locally"             |
| Save failure detected  | "Changes couldn't be saved — retrying…"|

- Save status updates automatically based on Autosave and Manual Save operations.
- Save feedback must be subtle and non-intrusive during normal operation.
- For full Save Indicator behavior and visual rules, see [Save Status Indicator Specification](save-status-indicator-spec.md).

---

# Version

Editor and Preview Panel Specification v1.1 — April 2025



## Real-Time Rendering Performance

To ensure smooth real-time updates between the Editor and Preview panels, the system should:

- Use throttling or debouncing when processing frequent input events (e.g., typing, pasting large blocks of text).
- Implement virtual rendering (render only visible pages in Preview, not all at once).
- Minimize DOM diffing and unnecessary reflows by structuring Preview content efficiently.
- Delay low-priority tasks (e.g., layout re-checks, style adjustments) until user stops typing.
- Use lightweight markup in the Preview Panel to avoid duplicate parsing/rendering logic.
- Add instrumentation (optional for MVP) to detect frame drops or performance bottlenecks in large documents.
