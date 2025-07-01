# Combined User Journey — Template Editor + Contributor — v1.2

June 2025

---

# Overview

This document defines the sequential experience between the Template Editor and Contributor roles in Mylo. A Template Editor creates a template, and a Contributor selects and uses it to write content. Template Editors inherit all Contributor capabilities and add access to design, layout, and style tools.

---

# Template Editor Journey — Creating a Template

## 1. Entry

- Logs into Mylo and enters the dashboard
- Navigates to the “Templates” section
- Clicks “New Template” and chooses a blank layout or sample

## 2. Defining Structure

- Configures:
  - Page layout and margins
  - Template Settings (font, spacing, hyphenation, list behavior)
  - Styles (Headings, Body, Callout, etc.)
- Uploads logos or images (if needed)
- Adds sample content to test layout (not visible to Contributor)

## 3. Saving & Publishing

- Template is autosaved during editing
- Can trigger a version snapshot with Cmd+S
- Once complete, clicks “Publish”
  - Template becomes available to assigned Contributors
  - Can be assigned via a team, template set, or left selectable

---

# Contributor Journey — Using the Template

## 1. Entry

- Logs into Mylo and sees the dashboard
- Clicks “New Document”
- Sees a list of published templates (if multiple are available)
- Selects the one created by the Template Editor

## 2. Writing

- Editor and Preview panels open in split view
- Contributor writes freely in the Editor
- **Preview enforces the published template styles and layout**
- Any manual formatting in the Editor is ignored in Preview

## 3. Saving & Switching

- Autosave captures content every few seconds
- Contributor can trigger a version snapshot with Cmd+S
- Can switch templates from the document header dropdown
  - Warning appears: “Switching templates will change formatting in the Preview”
  - Editor formatting is preserved, Preview re-renders with new rules

## 4. Exporting

- Export always reflects the Preview (not the Editor)
- PDF and `.mylo` format supported

---

# Contributor Limitations

- Cannot modify layout, styles, or template settings
- Cannot change Preview formatting directly
- Cannot upload fonts or images
- Cannot preview unpublished templates

---

# Template Editor — Full Capabilities Summary

| Area | Capability |
|------|------------|
| Layout controls | ✅ |
| Style editor | ✅ |
| Template Settings | ✅ |
| Sample content | ✅ (not visible to Contributors) |
| Font uploads | ✅ |
| Image/logo insertion | ✅ |
| Export with Preview formatting | ✅ |
| Publish/unpublish control | ✅ |
| All Contributor functionality | ✅ (Editor + Preview) |

---

# Known Gaps

- No way to preview template behavior with real Contributor content
- No rollback UI for previous template versions
- No template set access filtering based on role

---

# Future Enhancements (Post-MVP)

- Template diff viewer before switching
- Visual inheritance indicators from Template Settings into Styles
- Template Editor role simulator: “Preview as Contributor”

---

# Version

Combined User Journey — Template Editor + Contributor — v1.2 — June 2025
