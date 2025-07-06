# Field Validation Rules — v1.0

June 2025

---

# Overview

This document outlines validation logic for user input across documents, templates, styles, and system actions. It defines constraints at both the client and API layers and includes role-based limitations and error messaging where applicable.

---

# Validation Table

| Field | Validation Rules | Role Constraints | Error Message |
|-------|------------------|------------------|---------------|
| Template Name | Max 60 chars, must be unique per user/team | Only Template Editors | “Name already in use” |
| Style Name | Required, max 40 chars, must not conflict with reserved names (e.g. `Body`, `Header`) | Template Editors only | “Invalid style name” |
| Font | Must be in approved font list (Google or uploaded) | Contributors can only select system fonts | “Font not allowed” |
| Page Size | Must match allowed enum (A4, Letter, etc.) | Only Template Editors | “Invalid page size” |
| Margin Inputs | Min 0, Max 5in, up to 2 decimal precision | Template Editors only | “Invalid margin value” |
| Document Title | Required, max 100 chars, no leading/trailing whitespace | All roles | “Title cannot be empty” |
| User Email | Valid email format (RFC 5322) | All roles | “Invalid email address” |
| Password | Min 10 chars, must include number and symbol | All roles | “Password too weak” |
| Template Set Name | Required, max 50 chars | Admin only | “Set name is required” |
| Thumbnail Upload | Must be PNG or JPG, max 1MB | Template Editors only | “Invalid file type or size” |

---

# Role-Based Validation Rules

| Rule | Role |
|------|------|
| Only Template Editors can create or rename Templates |
| Contributors cannot upload fonts or assign non-system fonts |
| Admins cannot create documents — must impersonate Contributor |
| Guest mode disables all validation errors (session-local only) |

---

# Known Gaps

- No real-time template name collision detection (Planned)
- No cross-set uniqueness for Template Sets (Post-MVP)
- Some font mismatches are not caught until preview renders (Supabase lag)

---

# Future Enhancements (Post-MVP)

- AI-powered form error guidance
- Multi-locale validation messages
- Inline collision detection (e.g., document name warning)
- Role-driven input field visibility

---

# Version

Field Validation Rules v1.0 — June 2025
