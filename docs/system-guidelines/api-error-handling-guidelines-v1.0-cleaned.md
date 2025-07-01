# API Error Handling Guidelines — v1.0

June 2025

---

# Overview

This document defines how Mylo handles API-level errors across autosave, template save, user actions, and document versioning endpoints. Errors are surfaced to users with context-aware feedback, while developers receive logs for tracing and debugging.

---

# Error Surfaces

| Surface | Behavior |
|--------|----------|
| Editor | Shows toasts for save/version errors |
| Preview | Silent failure fallback to last good render |
| Top Menu | Disabled options show tooltip if triggered during an error state |
| Toasts | Always visible (bottom left), auto-dismiss or persistent on failure |
| Log Console | Developer error output during local/dev mode |

---

# Retry Logic

## Autosave

- If autosave fails:
  - System retries up to 3x with exponential backoff (2s, 4s, 8s)
  - If all fail, user sees: `“Autosave failed. Retrying…”`
  - Upon recovery, toast updates: `“Changes saved successfully.”`

## Version Save

- Retry 2x max
- If fails, user must click “Try Again” from manual Save menu
- Failed version saves are logged, not retried in background

## Template Save

- No auto-retry to avoid partial template corruption
- Display modal: `“Template save failed. Please check your connection.”`

---

# Role-Based Error Visibility

| Role | Error Feedback |
|------|----------------|
| Contributor | Minimal detail. Generic toast. No stack trace. |
| Template Editor | Generic toast + link to docs or support. |
| Admin | Toast + log details available in Admin Panel (Post-MVP) |

---

# UI Error Toast Standards

| Type | Message | Persistent? | Action |
|------|---------|-------------|--------|
| Minor | “Autosave failed. Retrying…” | No | Retry auto |
| Major | “Unable to save version.” | Yes | Manual retry |
| Critical | “Template failed to save.” | Yes | Modal blocks next step |
| Unauthorized | “You do not have permission.” | No | Return to home |
| Network | “You are offline. Changes will sync when reconnected.” | Yes | Status bar banner |

---

# Error Severity Levels

| Level | Description | Action Required |
|-------|-------------|-----------------|
| Info | Background error, user not alerted | Log only |
| Warning | Recoverable, retry scheduled | Toast |
| Major | Save failed, user must retry | Toast + icon |
| Critical | Blocking error | Modal + abort workflow |

---

# Developer Logging

- All `500`, `403`, and `401` errors logged to internal telemetry
- Error payloads scrubbed for PII before storage
- Version save failures tagged with `docId`, `userId`, and timestamp

---

# Known Gaps / Edge Cases

- No user-side log access (Post-MVP Admin feature)
- No diff-on-failure to show what content was lost
- Retry logic not visible in UI (consider status pulse icon)

---

# Future Enhancements (Post-MVP)

- Reconnect-aware retry system
- Timeline of failed saves for recovery/debug
- Guest mode errors linked to local storage ID
- In-app bug report form with auto-injected logs

---

# Version

API Error Handling Guidelines v1.0 — June 2025
