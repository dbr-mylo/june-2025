# Document Versioning Specification

This document defines how **Document Versioning** works in Mylo.

Versioning supports internal data integrity and potential recovery, though no user-facing version history is exposed at MVP.

---

# Overview

- Versioning captures lightweight document snapshots automatically.
- Versions are stored inside `.mylo` files.
- No visible "Version History" UI at MVP.

---

# MVP Scope

## Version Capture Triggers
- When a user manually saves.
- When a document auto-saves after major edits.
- When a Template is applied or changed.
- When a document is exported.

## What is Saved in Each Version
- Full document content at time of capture.
- Template reference.
- Metadata (title, user ID, timestamps).

## Version Storage
- Versions are embedded in the `.mylo` file structure.
- Only the most recent **5 versions** are retained (or configurable).
- Versions are lightweight to avoid unnecessary file size growth.

## User Interaction
- No ability to view, browse, or restore previous versions at MVP.
- Silent versioning supports future recovery features.

---

# Future Enhancements (Post-MVP)

- **Visible Version History:** Timeline view of versions.
- **Restore to Previous Version:** Allow users to revert if needed.
- **Named Saves:** Allow marking specific saves as milestones.
- **Collaborative Version Merging:** Support multi-user editing with branch/merge functionality.

---

# Behavior Rules

- Versions save automatically without user action.
- If auto-save fails, user is notified non-intrusively.
- Future versions must ensure backward compatibility with `.mylo` file updates.

---

# Version

Document Versioning Specification v1.0 — April 2025
