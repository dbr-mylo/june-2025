# System State Flows — v1.1

June 2025

---

# Overview

This document defines the key system-level states a Mylo document can enter, and the transitions between them. It covers save and sync flows, template application behavior, offline fallback, and role-based access state logic.

This spec replaces outdated concepts like “drafts” with terminology aligned to Mylo’s current design philosophy: documents are always live, and formatting is governed by template rules rather than user-applied styles.

---

# Core States

| State | Description |
|-------|-------------|
| `Unsaved` | Content has changed since last autosave |
| `Saving` | Autosave is actively syncing to Supabase |
| `Saved` | All changes persisted in cloud |
| `Locally Saved` | Document saved to browser due to offline or failure state |
| `Version Snapshot` | Manual save with Cmd+S or File menu; stored in versions table |
| `Template Applied` | A template has been chosen and applied |
| `Template Switched` | A new template overrides preview formatting |
| `Preview Enforced` | Contributor sees template-driven styles, regardless of their formatting |
| `Conflict Detected` | Formatting rules cannot be resolved cleanly (Post-MVP: notify + resolve) |

---

# Transitions

| Trigger | From | To |
|---------|------|----|
| Text input | `Saved` → `Unsaved` |
| Autosave triggered | `Unsaved` → `Saving` |
| Save complete | `Saving` → `Saved` |
| Save fails | `Saving` → `Locally Saved` |
| Reconnect online | `Locally Saved` → `Saving` |
| Cmd+S | Any → `Version Snapshot` |
| Template selected | Any → `Template Applied` |
| Template changed | `Template Applied` → `Template Switched` |
| Role switch | Maintains document state; triggers save if unsaved |
| API error 3x | Any → `Locally Saved` |
| Manual override conflict | → `Conflict Detected` (Post-MVP)

---

# Role-Based Variants

| Role | Unique State Notes |
|------|--------------------|
| Contributor | Editor formatting ignored in Preview |
| Template Editor | All states visible, can manipulate templates/styles |
| Admin | Same as Template Editor + future audit tools |
| Guest | Only `Locally Saved` and `Unsaved` (no server persistence) |

---

# Known Gaps

- No state tracking for template override reversion
- No visual indicator of `Conflict Detected` status yet
- Local → Cloud replay not always exposed to user

---

# Future Enhancements (Post-MVP)

- State timeline viewer
- Inline diff for template switches
- Contributor override tracking for Admin view
- Conflict resolution modal for non-style-aligned documents

---

# Version

System State Flows v1.1 — June 2025
