# Guest User Journey — v1.1

June 2025

---

# Overview

This document defines the Guest (Visitor) role experience in Mylo. Guest mode is intended for demos, trials, or limited local interaction. No data is persisted to the cloud. Templates and documents created during the session are stored in memory only.

---

# Entry Points

- Loads `/demo` or enters through a team invite without login
- Sees the Guest Welcome screen with options:
  - Try a document
  - Try a template
  - Learn about Mylo

---

# Behavior in Guest Mode

| Action | Behavior |
|--------|----------|
| Create document | ✅ Creates a local-only `.mylo` file |
| Create template | ✅ Can design templates, styles, layout (local only) |
| Save | ✅ Saves to local memory — not Supabase |
| Refresh page | ❌ Clears session — all changes lost unless downloaded |
| Switch template | 🚫 Not supported in demo documents |
| Export | ✅ PDF and `.mylo` export available |
| Use AI tools | 🚫 Not available in Guest mode |

---

# Limitations

- Cannot log in or create an account from Guest mode
- Cannot assign templates to teams
- Cannot preview multiple layout variants
- Cannot access role-switching or shared documents
- Cannot re-enter a previous session

---

# Warnings and Indicators

- Banner: “You are in Guest Mode. Your work will be lost unless downloaded.”
- On refresh: Confirmation dialog: “Changes will be lost. Download your work?”
- On export: Prompts to name and download `.mylo` file

---

# Known Gaps

- No persistent demo template store
- No role simulation or switching
- No guest-specific analytics dashboard

---

# Future Enhancements (Post-MVP)

- Persistent Guest sessions with token-based restoration
- Sample content library for testing
- Export-to-account upgrade flow
- Role preview toggle for Admin users running demos

---

# Version

Guest User Journey v1.1 — June 2025
