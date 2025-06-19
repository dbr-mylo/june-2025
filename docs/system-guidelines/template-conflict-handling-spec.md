# Template Conflict Handling Specification

This document defines how Mylo manages potential conflicts when a Template is applied, updated, or switched during document creation and editing.

The goal is to protect document integrity and prevent formatting errors when Template Settings or Styles conflict with Contributor-created content.

---

# Overview

Template conflicts may occur when:

- A Template is updated after a document was created.
- A Contributor switches from one Template to another.
- A Template’s Settings or Styles change significantly after assignment.

Mylo must detect and handle these conflicts gracefully without data loss or corruption.

---

# Types of Conflicts

| Type | Description |
|:---|:---|
| Style Mismatch | New Template lacks equivalent Styles for certain document elements (e.g., missing Heading 2 style). |
| Structure Mismatch | New Template enforces different layout rules (e.g., new margin settings, different page size). |
| Version Mismatch | Template has been updated but document still references older style versions. |

---

# Conflict Handling Behavior (MVP)

| Conflict | System Behavior |
|:---|:---|
| Missing Style | Fallback to system defaults for affected element (e.g., apply Body Text Style). |
| Layout Change | Automatically reflow document with new layout rules. |
| Style Version Update | Re-apply latest Template styles automatically to Preview and Export. |
| Unsavable Conflicts | Prevent Save action; prompt user to resolve conflicts manually. |

- Contributors are notified if major Template changes significantly alter document structure.
- Minor style differences (e.g., slight font size changes) are automatically adjusted silently.

---

# Conflict Detection Triggers

- On Template switch.
- On document open if Template has been updated since last save.
- On manual Template update request by Contributor (if permitted).

---

# UI Behavior During Conflict Detection

- Display non-blocking banner or notification at top of Editor/Preview Panel.
- Example messages:
  - "Template updated. Some styles have been adjusted automatically."
  - "Template switch may affect document layout. Review your content before exporting."
- Provide a "View Changes" option if possible (Post-MVP).

---

# Save and Export Behavior

| Action | Behavior |
|:---|:---|
| Save after Template change | Only allowed if no critical unsolved conflicts exist. |
| Export after Template change | Always possible, but may show warning if unsolved formatting issues are detected. |
| Auto-save during conflict | Disabled until conflict is resolved. |

---

# Error Handling

| Error | System Response |
|:---|:---|
| Missing Template | Prevent document load; prompt Contributor to select a new Template. |
| Corrupted Template data | Fall back to safe system defaults for typography and layout. |
| Unresolvable conflicts | Block Save; allow document Export with warning banner. |

---

# Future Enhancements (Post-MVP)

- "View Changes" diff tool to show specific template/style differences.
- Allow partial Template switching (e.g., update only paragraph styles, not heading styles).
- Smarter style mapping between old and new Templates during switch.

---

# Version

Template Conflict Handling Specification v1.0 — April 2025
