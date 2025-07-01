# Local Save and Export Specification — v1.1

June 2025

---

# Overview

This document defines how Mylo handles local file saves, exports, and downloads. Mylo uses the `.mylo` format for native local saves and supports export to PDF. All actions are initiated by the user — no automatic local downloads are triggered by the system.

---

# MVP Scope

## Supported Export Types

- `.mylo` — native file format (JSON + assets)
- `.pdf` — rendered version using template styles

## Roles

- **All roles** (Contributor, Template Editor, Admin) may:
  - Save a document locally as `.mylo`
  - Open a `.mylo` file for continued editing
  - Export a document to PDF
- **Guest mode** only allows local save (no cloud sync)

## Export Triggers

- Manual via top-bar dropdown or menu
- Autosave never triggers file download
- Export can occur at any time — no requirement to save first

---

# Main Behavior Sections

## Save Behavior Rules

- Local save captures:
  - Current Editor content (Tiptap JSON)
  - Preview state metadata
  - Template ID and all applied styles
  - Image and font assets embedded
  - All document versions (up to 5)
- File is serialized and downloaded to local disk
- File is not synced to server unless explicitly re-uploaded

## UI Behavior

| Action | Behavior |
|--------|----------|
| “Export as .mylo” | Triggers file download (name: `filename.mylo`) |
| “Export as PDF” | Opens save dialog after render |
| Guest User | Local-only save with warning: “Not synced to cloud.” |
| Open `.mylo` file | Loads into active session |
| Import Conflict | Shows modal: “Replace current document or merge?” (future) |

- No autosave to disk — only manual exports
- No background saves — user action required for download

---

## Stack Behavior

- Save handler serializes content to `.mylo` bundle
- Font and image assets are encoded or embedded in archive
- PDF generation handled via rendering engine and layout rules
- Guest save = local download only; registered save may sync in future

---

## Data Models

### .mylo File Example

```json
{
  "type": "mylo-file",
  "version": "1.0",
  "docId": "uuid-xyz",
  "editorContent": {...},
  "templateId": "template-abc",
  "styles": {...},
  "fonts": [...],
  "images": [...],
  "versions": [...]
}
```

## Field Definitions

| Field | Type | Notes |
|-------|------|-------|
| fileType | String | Always “mylo-file” |
| version | String | Current file format version |
| editorContent | JSON | Tiptap JSON |
| templateId | UUID | Associated template |
| images | Array | Embedded base64 or blob URLs |
| fonts | Array | Embedded or linked fonts |
| versions | Array | Up to 5 latest autosave snapshots |

---

# Additional Technical Sections (Optional)

### Filename Behavior

- Default format: `[document-title].mylo`
- If empty, fallback to `untitled.mylo`
- Filename is user-editable via browser save dialog

---

# Error Handling

| Condition | Behavior |
|----------|----------|
| Save fails | Toast: “Could not save file.” |
| File corrupt | Show error: “This file is invalid or unsupported.” |
| PDF export fails | Toast: “Export failed. Try again.” |
| Guest exits before save | Warning modal: “All unsaved data will be lost.” |

---

# Known Gaps / Outstanding Questions

- Should `.mylo` file open trigger save slot or overwrite? (Effort: Medium, Status: TBD)
- Will future versions support diff/merge of `.mylo`? (Effort: High)
- Can font licenses be embedded in `.mylo`? (Status: Post-MVP)

---

# Future Enhancements (Post-MVP)

- Automatic version tagging in `.mylo`
- Drag-and-drop `.mylo` open from desktop
- `.mylo` diff/merge tool for teams
- Export bundle with metadata, screenshots, and backups

---

# Technical Dependencies

- Save-to-file handler
- Archive builder (for `.mylo`)
- PDF rendering engine
- Tiptap + Template sync bridge

---

# API / Data Schema Notes

- None — local save/export operates fully on client

---

# Version

Local Save and Export Specification v1.1 — June 2025
