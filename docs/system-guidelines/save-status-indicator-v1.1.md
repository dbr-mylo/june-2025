# Save Status Indicator Specification — v1.1

June 2025

---

# Overview

This document defines the behavior, UI states, and logic behind the Save Status Indicator in Mylo. This feature communicates save progress, success, failure, and source (local vs. Supabase) to the user. Save states reflect both autosave and manual save actions.

---

# UI Placement

- Lower left corner of the interface, persistent
- Adjacent to or overlapping with the Undo/Redo panel
- Color changes and iconography reflect current state

---

# Save States

| State | Description | Indicator Text | Icon | Tooltip |
|-------|-------------|----------------|------|---------|
| `Idle` | No changes pending | “All changes saved” | ✅ | “Last saved just now” |
| `Saving` | Actively syncing | “Saving...” | Spinner | “Saving to cloud...” |
| `Saved` | Sync success | “All changes saved” | ✅ | “Saved to Supabase” |
| `Local Save` | Offline or fallback mode | “Saved locally” | 💾 | “Saved to device — will sync when online” |
| `Error` | Sync failed after retries | “Save failed” | ⚠️ | “Retrying… or save manually” |
| `Version Snapshot` | Manual Cmd+S or top-menu save | “Snapshot saved” | 📘 | “Version created” |

---

# Role-Based Visibility

| Role | Sees What |
|------|-----------|
| Contributor | Text + icon, no clickable controls |
| Template Editor | Same as Contributor, with snapshot indicator |
| Admin | Same as Template Editor |
| Guest | Local-only saves show `💾 Saved locally` — no Supabase access |

---

# Trigger Events

| Event | Resulting State |
|-------|-----------------|
| Text edit | `Saving` → `Saved` |
| Style change | `Saving` → `Saved` |
| Template switch | Forces `Saving` → `Saved` |
| Offline mode entered | Switch to `Local Save` |
| Reconnect from offline | Replays → `Saving` → `Saved` |
| API error (x3 retries) | `Error` state + toast |
| Cmd+S | `Version Snapshot` + toast |

---

# Transitions + Timing

- Debounce save start by 1.5s after final change
- Hold `Saving` state for at least 1.2s even if fast
- Auto-dismiss “Saved” indicator after 3s (unless user is idle)
- Persist “Save failed” until resolved or dismissed

---

# Known Gaps

- No visual diff if local + server states diverge
- No granular progress indicator for large templates or fonts
- No UI for retry countdown

---

# Future Enhancements (Post-MVP)

- Clickable save indicator to show full save log
- Icon-only mini mode for small screens
- Save audit history panel
- Integrate with conflict resolution UI

---

# Version

Save Status Indicator Specification v1.1 — June 2025
