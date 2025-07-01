# Template Marketplace API Specification — v2.1

June 2025

---

# Overview

This document defines the future API structure for the Mylo Template Marketplace. The Marketplace allows users to browse, preview, publish, and apply templates across teams or the public. It is not included in the MVP scope.

---

# MVP Scope

*Not applicable — this feature is entirely Post-MVP.*

---

# Main Behavior Sections

## Save Behavior Rules

- Templates must be validated before public publishing.
- Upload includes metadata and full template definition.
- Update allowed only by original creator or Admin.

## UI Behavior

*Not yet defined. Expected features:*
- Browse and filter templates
- Preview template metadata
- Publish new templates
- Apply selected template to a document

## Stack Behavior

- Templates are stored with scoped access (team, org, public)
- Search is backed by tag/category indexing
- Uploads hit API endpoint with user authentication and role validation

## Data Models

### Marketplace Template

| Field | Type | Notes |
|-------|------|-------|
| id | UUID | Template ID |
| name | String | Display name |
| authorId | UUID | Creator ID |
| description | String | Short purpose |
| tags | Array of Strings | Categories and filters |
| previewUrl | URL | Thumbnail image |
| templateDownloadUrl | URL | Template JSON + assets |
| createdAt | ISO 8601 | Publish date |
| updatedAt | ISO 8601 | Last metadata change |

---

# Additional Technical Sections (Optional)

## Example Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/templates/marketplace` | GET | List templates visible to user |
| `/api/templates/marketplace/{id}` | GET | Get metadata and download |
| `/api/templates/marketplace/search` | GET | Search/filter |
| `/api/templates/marketplace/upload` | POST | Upload a new template |
| `/api/templates/marketplace/update/{id}` | PATCH | Edit metadata (role-validated) |

---

# Error Handling

| Condition | System Response |
|----------|-----------------|
| Unauthorized upload | HTTP 403 Forbidden |
| Invalid metadata | HTTP 400 with error field |
| Nonexistent template ID | HTTP 404 Not Found |
| Duplicate name | HTTP 409 Conflict |

---

# Known Gaps / Outstanding Questions

- Should template downloads include version history? (Effort: Medium, Status: Open)
- Should templates be rate-limited or moderated? (Effort: High, Status: TBD)
- Do we support “private-only” marketplaces at launch? (Effort: Medium, Status: Consideration)

---

# Future Enhancements (Post-MVP)

- Ratings and reviews
- Version rollback
- Private vs public scoping
- Monetization model (public template sales)

---

# Technical Dependencies (Optional)

- Supabase storage (template assets)
- Auth layer for upload/review
- Search index service (tags/keywords)

---

# API / Data Schema Notes (If Applicable)

- Templates must be JSON-serializable for preview and download
- Upload requires role verification at endpoint level

---

# Version

Template Marketplace API Specification v2.1 — June 2025
