# Template Conflict Handling Specification — v1.1

June 2025

---

# Overview

This document outlines how Mylo detects, manages, and resolves conflicts that occur when a document’s formatting diverges from its assigned template. Conflicts are surfaced in the Preview panel but do not block writing or autosave. Contributors are never prevented from editing content.

---

# What Triggers a Conflict?

| Trigger | Description |
|---------|-------------|
| Template switch | The new template defines styles that override Contributor’s manual formatting |
| Style drift | Contributor formatting differs from Preview-rendered style |
| Template update | Styles or rules in the applied template were changed after document creation |
| Font mismatch | Contributor used a font not allowed in the template |
| Layout boundary | Contributor text flows into a region where layout constraints change (Post-MVP) |

---

# Conflict Severity Levels

| Level | Description | Impact |
|-------|-------------|--------|
| Minor | Font, spacing, or size difference | Preview enforces style silently |
| Major | Style mismatch alters layout | Modal shown on template switch |
| Critical | Template logic incompatible (e.g., missing styles) | Error banner shown, fallback applied |

---

# Contributor Experience

- **Never blocked** from editing due to template conflict
- May see:
  - Warning toast: “Preview may look different than your editor formatting”
  - Modal (on switch): “Switching templates will override your current styles”
  - Badge: “Preview uses template styles” (passive)
- Cannot override enforced styles in Preview
- Manual formatting is preserved in the editor unless document is exported or style sync is triggered

---

# Template Editor Experience

- Can inspect which parts of content are diverging
- Style diff may be exposed in future as an overlay or panel
- Editing the template updates the enforced Preview immediately
- May see version warnings if styles were removed/renamed

---

# Conflict Resolution Actions

| Action | Role | Outcome |
|--------|------|---------|
| Continue writing | Contributor | No change, preview enforces template |
| Reapply template | Contributor or Editor | Resets Preview and formatting |
| Roll back template | Template Editor | Restores prior template version (Post-MVP) |
| Manually style match | Contributor | Visuals may improve, but Preview still wins |

---

# Known Gaps

- No inline indicators for overridden formatting
- No Preview-on-hover for comparison
- No save history linked to template versions

---

# Future Enhancements (Post-MVP)

- Visual diff viewer between Editor and Preview
- Style fallback suggestions (AI-assisted)
- Conflict audit panel (Admin/Template Editor only)
- Ability to toggle Preview enforcement (with lock state)

---

# Version

Template Conflict Handling Specification v1.1 — June 2025
