# Template Editor User Journey — v1.1

June 2025

---

# Overview

This document outlines the Template Editor experience in Mylo. Template Editors create and manage templates that control the formatting and visual appearance of documents. They inherit all capabilities of the Contributor role.

---

# Journey

## 1. Entry

- Logs into Mylo and lands on the dashboard
- Views tabs for Documents, Templates, and Template Sets

## 2. Creating a Template

- Clicks “New Template”
- Chooses a blank canvas or sample layout
- Configures:
  - Page layout and margins
  - Template Settings (fonts, spacing, hyphenation, etc.)
  - Styles for text elements
  - Layout zones and placeholders
- Inserts sample content (not visible to Contributors)

## 3. Saving

- Template autosaves on change
- Can trigger version snapshot with Cmd+S
- All sample content is local to the template

## 4. Publishing

- Once finalized, clicks “Publish”
- Template becomes available to Contributors in their template selector
- Can assign templates to teams, groups, or leave them selectable

## 5. Document Access

- Can create and edit documents like a Contributor
- Editor and Preview behave identically to the Contributor role
- Preview shows template styling and layout applied in real time

## 6. Full Capabilities

| Area | Access |
|------|--------|
| Edit template layout, styles, settings | ✅ |
| Use sample content for testing | ✅ |
| Upload custom fonts or logos | ✅ |
| Preview as Contributor | ✅ (implicitly via Preview panel) |
| Create/edit documents | ✅ |
| Export documents | ✅ (uses Preview styling) |

---

# Limitations

- Cannot test template behavior using real Contributor documents (no live previewing)
- Cannot assign templates to users directly (Admin-only)
- Cannot audit usage of a template

---

# Future Enhancements

- “Preview as Contributor” toggle
- Cross-template reuse of layout blocks
- Style version rollback

---

# Version

Template Editor User Journey v1.1 — June 2025
