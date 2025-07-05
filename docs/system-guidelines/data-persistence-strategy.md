# Persistence Strategy – Mylo MVP

This document outlines how data is saved in the Mylo MVP, including `.mylo` file formats and Supabase integration.

---

## Current Data Persistence

- ✅ **.mylo file format**: Supported and documented in [`local-save-export-spec.md`](../core-features/local-save-export-spec.md).
- ✅ **Supabase Integration**: Enabled. Supabase is used for:
  - User authentication
  - Document storage
  - Real-time collaboration
  - Template handling

## Auto-Save System

- ❌ **Not yet implemented**.
- ✅ Planned for implementation.
- 📁 Expected location:
  - Auto-save logic will live in a shared hook or module within `src/lib/` or `src/hooks/`.
  - Save status display will be controlled via a UI component in `src/components/status/` (or similar).

Refer to: [`autosave-sync-rules-v2.1.md`](../core-features/autosave-sync-rules-v2.1.md)

---

## Status

| Feature          | Status     |
|------------------|------------|
| `.mylo` Export   | ✅ Complete |
| Supabase Storage | ✅ Connected |
| Auto-Save Logic  | ❌ Not yet implemented |
