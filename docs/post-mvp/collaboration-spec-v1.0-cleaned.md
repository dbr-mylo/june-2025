# Collaboration Specification — Post-MVP

June 2025

---

# Overview

This document outlines Mylo’s future approach to real-time collaboration. Although collaboration is not part of the MVP, this spec defines long-term goals and architectural considerations for enabling multiple users to edit, comment, and manage documents together.

---

# Purpose

To allow users to:
- Edit the same document simultaneously
- View presence indicators (who is in the file)
- Assign comments or suggestions to specific users
- Lock regions or elements based on roles or permissions
- Prevent merge conflicts or overwrite errors

---

# Proposed Scope (Post-MVP)

## Real-Time Presence

- Show who is viewing or editing a file
- Display user cursor and selection highlights
- Collapse user indicators when >5 users

## Live Editing (Simultaneous Input)

- Enable multiple users to type/edit at once
- Conflict resolution handled via CRDT or OT framework
- Section-based locking for templates (optional)

## Commenting System

- Inline comments with thread history
- Role-aware (Contributors comment, Editors resolve, Admins delete)
- At-mentions for user assignment (`@username`)

## Permissions Control

- Document-level sharing settings
- Editable, comment-only, and view-only modes
- Temporary access tokens for guests or reviewers

---

# Behavior Summary

| Feature | Description |
|--------|-------------|
| Live cursors | Show initials or avatars as users edit |
| Field-level locking | Optional for templates or content zones |
| Edit notifications | Toasts when others join or leave |
| Conflict prevention | System auto-merges text or flags manual review |
| Access control | UI modal for assigning permissions per user |

---

# Technical Considerations

## Backend Requirements

- WebSocket or WebRTC layer (Supabase Realtime, Y.js, or Liveblocks)
- Role-based sync filtering
- Tiptap-compatible shared editing model
- Per-document event streams (join, edit, disconnect)

## Frontend Dependencies

- Presence tracker per session
- Comment thread component
- Role-based action blocking (e.g., Contributors can’t override locked styles)

---

# Error Handling

| Condition | Behavior |
|----------|----------|
| Sync conflict | Show warning and allow manual resolution |
| User disconnected | Session is dropped silently; presence removed |
| Unauthorized edit | Block action, toast: “You don’t have permission to edit this section.” |
| Reconnect failure | Fallback to read-only mode with retry option |

---

# Known Gaps / Questions

- Should template editing support real-time sync? (Status: TBD)
- Can users reserve sections to avoid conflict? (Effort: Medium)
- Should comments be tied to document versions? (Post-MVP)

---

# Future Considerations

- Comment resolution tracking
- Live chat thread within document
- Cross-user undo/redo history
- “Follow” mode (watch another user’s viewport)
- Anonymous viewer support

---

# API / Data Schema Notes

- Will likely require event-based socket API separate from REST
- Sync engine decisions still pending

---

# Document Metadata

Status: **Post-MVP**  
Author: Internal Spec Team  
Created: June 2025  
Reviewed: No  
Target Phase: Q4 2025 or later

---

# Version

Collaboration Specification v1.0 — Post-MVP — June 2025
