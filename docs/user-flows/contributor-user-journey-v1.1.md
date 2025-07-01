# Contributor User Journey — v1.1

June 2025

---

# Overview

This document outlines the Contributor experience in Mylo. Contributors focus solely on content creation. They can format text in the Editor, but the Preview panel reflects the template’s enforced styles. Contributors cannot modify layout, styles, or artwork.

---

# Journey

## 1. Access

- Logs in or is invited to a team
- Sees their own documents on the dashboard
- May be assigned one or more templates

## 2. Creating a Document

- Clicks “New Document”
- Chooses a template (if assigned multiple) or begins in freeform mode
- Editor and Preview panels appear side-by-side (split panel is default)
- Starts writing immediately

## 3. Formatting Behavior

- Contributor applies formatting freely in the Editor (bold, lists, etc.)
- **Preview ignores this formatting** unless it matches the inferred style rules
- Smart style inference heuristics may recognize headings/lists, but **Preview applies template styles only**

## 4. Template Switching

- If more than one template is available, Contributor can switch
- A warning appears: “Switching templates will override formatting in the Preview”
- Manual formatting is preserved in the Editor but may appear different in Preview

## 5. Saving

- Autosave is enabled
- Contributor can also trigger manual version saves with Cmd+S
- Can download `.mylo` file for offline work

## 6. Export

- Final export (PDF, etc.) reflects **Preview**, not Editor formatting
- Contributors cannot export using their own formatting unless no template is applied (freeform)

## 7. Limitations

- Cannot access or edit template settings
- Cannot modify layout zones
- Cannot upload fonts or modify artwork
- Cannot see full style logic — only rendered output in Preview

---

# Future Enhancements

- Preview diff viewer showing changes from manual formatting
- Smart style tagging inline
- Editable “Preview Mode” toggle (admin-controlled)

---

# Version

Contributor User Journey v1.1 — June 2025
