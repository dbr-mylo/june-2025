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

## Panel Behavior (MVP)
- Panels are side-by-side, divided by a draggable handle.
- Contributors can resize Editor and Preview panels horizontally.
- Minimum width thresholds prevent collapsing either panel entirely.
- Default starting split: 50% Editor | 50% Preview.

---

# Future Enhancements (Post-MVP)

- **Zoom Controls:** Zoom in/out inside the Preview Panel (e.g., 50%, 100%, 200%).
- **Snap Resizing Presets:** Quick adjustments (e.g., 70% Editor / 30% Preview).
- **Responsive Preview:** Auto-adjust Preview rendering based on panel width.
- **Detached Preview:** Allow Preview in a floating or external window.
- **Preview Toggle:** Allow hiding the Preview Panel temporarily for focus mode.
- **Scroll Together:** Syncs scrolling between the Editor and Preview panels.

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
