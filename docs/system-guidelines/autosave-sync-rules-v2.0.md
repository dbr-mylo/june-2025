# Autosave and Sync Rules — v2.0

June 2025

---

# Overview

This specification defines how autosave, local save, and Supabase syncing behave within Mylo for all user roles. It also includes edge case handling for disconnects, sync conflicts, UI status indicators, and failure recovery.

---

# Save Triggers

## Autosave Events

| Trigger | Delay | Notes |
|---------|-------|-------|
| Text change | 1.5s | Debounced |
| Style change | 2.0s | Includes toolbar changes |
| Role switch | Immediate | Triggers forced save |
| Zoom reset | None | No save |
| Manual save (Cmd+S) | Immediate | Bypasses debounce |

---

# UI Save Indicators

| Indicator | Behavior |
|-----------|----------|
| “Saving...” badge | Appears bottom left while syncing |
| “All changes saved” | Success confirmation after save |
| Red warning icon | If save fails after retries |
| Spinner on menu save | Shown for Cmd+S or File > Save |
| Offline banner | “Offline — syncing when reconnected” |

---

# Sync Behavior

| Context | Behavior |
|---------|----------|
| Online + connected | Saves directly to Supabase |
| Online + degraded | Retry logic kicks in (3 attempts) |
| Offline | Saves to localStorage until reconnect |
| Reconnect | Local changes are replayed into Supabase |
| Manual save while offline | Shows modal: “Will sync when online.” |

---

# Retry Logic

- Up to 3 automatic retries
- Retry delay: 2s → 4s → 8s
- On fail:
  - Show toast: `“Autosave failed. Retrying…”`
  - Show red banner on persistent failure
- On reconnect:
  - System retries last autosave if local edits exist
  - Success triggers normal “Saved” UI

---

# Conflict Handling

- Only one version is live per document
- If user A saves while user B is editing offline:
  - User B sees “Your changes were made on an outdated version”
  - They can review diff and choose: Overwrite / Merge (Post-MVP) / Discard

---

# Document Version Snapshot Behavior

- Snapshots triggered only on:
  - Cmd+S
  - Role switch
  - Manual save from top menu
- Autosave does **not** create new version entries
- Snapshots stored in `versions` table via `/api/version/save`

---

# Technical Notes

- Editor state diffed before save
- Autosave engine listens to mutation observer + manual input hooks
- Save includes:
  - Tiptap content JSON
  - Document metadata (title, templateId, etc.)

---

# Error Handling

| Condition | Behavior |
|----------|----------|
| Supabase down | Show offline banner + store locally |
| Invalid token | Toast + return to login |
| Save fails (3x) | Banner: “Could not save. Try again manually.” |
| Local replay fails | Toast with rollback option (Post-MVP)

---

# Known Gaps / Edge Cases

- No UI diff shown for replayed edits
- Manual save fails silently during refresh (TBD)
- Reconnect queue not visible to user

---

# Future Enhancements (Post-MVP)

- Save history timeline
- Role-aware diff viewer
- Autosave batching to reduce network calls
- Guest session restore logic

---

# Version

Autosave and Sync Rules v2.0 — June 2025
