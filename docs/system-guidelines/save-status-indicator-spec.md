# Save Status Indicator Specification

This document defines the design, behavior, and rules for the Save Status Indicator component inside the Mylo Contributor and Template Editor panels.

The goal is to unobtrusively communicate save status without disrupting the writing or design workflow.

---

# Overview

The Save Status Indicator provides **lightweight, persistent feedback** about the document’s save state.

It is **always visible** in the top navigation bar, positioned next to the Preview toggle and Scroll Together checkbox.

---

# Placement

| Location | Notes |
|:---|:---|
| Top Navigation Bar (Top Right) | Aligned after "Scroll Together" and "Preview" controls. |

---

# Text States and Behavior

| State | Display Text | Color | Behavior |
|:---|:---|:---|:---|
| Saving in Progress | "Saving your work…" | Neutral Gray (#666) | Show immediately on any edit that triggers autosave. |
| Save Successful | "All changes saved" | Neutral Gray (#666) | Replace "Saving your work…" after successful save. |
| Offline Mode | "Offline — saving locally" | Yellow (#FFC107) | Show automatically if connection loss is detected. |
| Save Failure | "Changes couldn't be saved — retrying…" | Red (#D32F2F) | Show if autosave fails after retry. |

---

# Visibility Rules

- The indicator text is **always visible** when a document is open.
- Text updates live based on document autosave state changes.
- No additional popups, modals, or toasts are triggered unless an unrecoverable error occurs (e.g., fatal save crash).

---

# Visual Guidelines

| Aspect | Detail |
|:---|:---|
| Font Size | Same as other top nav text (small, 12–14px depending on overall system scale). |
| Font Weight | Normal (not bold). |
| Spinner (Optional) | Very small inline spinner next to "Saving your work…" if desired. |
| Icon for Offline/Error | Optional small cloud-slash icon (Offline) or warning triangle icon (Save Failure) — left-aligned to text. |
| Spacing | At least 12px padding between Save Indicator and other top nav items. |

---

# Tooltip Behavior

- Hovering over the Save Status Indicator shows a tooltip displaying:
  - Exact timestamp of last successful save.
  - Example: "Last saved at 9:42 AM"

---

# Error Escalation (Out of Scope for MVP)

- If the Save Failure persists for more than 60 seconds without recovery, optionally escalate to a non-blocking toast or soft warning notification.
- Not required for MVP launch but useful for stability tracking post-launch.

---

# Version

Save Status Indicator Specification v1.0 — April 2025
