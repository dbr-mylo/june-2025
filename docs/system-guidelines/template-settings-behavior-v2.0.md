# Template Settings Behavior Specification — v2.0

June 2025

---

# Overview

Template Settings define global formatting defaults that are applied across the entire document in Mylo. These settings are configured by Template Editors and affect all content rendered in the Preview panel.

Template Settings are distinct from Styles, but they work together to drive layout, typography, and consistency. Contributors cannot override Template Settings, and Preview always reflects the applied settings.

---

# Core Settings (MVP)

| Setting | Description | Applies To |
|---------|-------------|------------|
| Default Font | Base font used when no style is applied | Body text, headers |
| Hyphenation | Global toggle for word breaking | All text blocks |
| List Handling | Rules for bullet/numbered lists (spacing, indent) | All lists |
| Page Margins | Global layout spacing | Full document |
| Space Handling | Collapse or preserve multiple spaces | Inline content |
| Widow Control | Suggest edits if single line at end of paragraph | Display-only (Contributor can accept/reject suggestion) |

---

# Contributor Behavior

| Area | Behavior |
|------|----------|
| Editor | Can apply formatting freely |
| Preview | Ignores Contributor formatting, enforces template styles |
| Overrides | Not possible — all Template Settings are enforced in Preview |
| Save | Writing is never blocked, even if Template Settings change |

---

# Template Editor Behavior

| Area | Behavior |
|------|----------|
| Can edit Template Settings | ✅ |
| Can override defaults in specific Styles | ❌ (MVP) |
| Can preview how Template Settings affect layout | ✅ |
| Can remove Template Settings | ✅ — if removed, fallback defaults apply |

---

# Inheritance Behavior

- Styles currently inherit from Template Settings automatically (e.g., font, size).
- For MVP, **this inheritance is suggestive** — all values are editable by the Template Editor.
- **There is no locking or enforcement mechanism** for inherited values.
- Changes to Template Settings do **not retroactively override** saved custom style values.

---

# Removal & Fallback Behavior

If a Template Setting is removed:
- Any style that inherited that value will retain its most recent saved version.
- No cascade or override occurs after removal.
- Contributors still see enforced Preview based on current template config.

---

# Known Gaps

- No UI to show what styles inherit from a given Template Setting
- No template diff viewer showing what changed between versions
- No warning if a Template Setting is removed but used in styles

---

# Future Enhancements (Post-MVP)

- Allow Template Editors to override Template Settings within individual Styles
- Inline indicators for inherited values vs. overridden values
- Template diff viewer to compare Template Settings between versions
- Optional enforcement flags (e.g., “always use this font”)

---

# Version

Template Settings Behavior Specification v2.0 — June 2025
