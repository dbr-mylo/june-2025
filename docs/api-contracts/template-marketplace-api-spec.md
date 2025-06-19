# Template Marketplace API Specification (Post-MVP)

This document defines the future API structure for managing Templates within a public or team-specific Template Marketplace in Mylo.

**Important:**  
The Template Marketplace is a future enhancement and is not required for MVP.

---

# Overview

The Template Marketplace will allow users to:

- Browse available Templates.
- Search by category, tags, or creator.
- Preview Template metadata.
- Download or apply Templates to new documents.
- Publish new Templates (team-only or public, depending on permissions).

The Marketplace will support team-scoped, organization-scoped, and potentially public/global sharing in the future.

---

# Marketplace API Scope

| API Area | Behavior |
|:---|:---|
| Template Listing | Fetch available Templates based on team or public access. |
| Template Metadata | Retrieve basic info (name, author, tags, description, preview thumbnail). |
| Template Download | Fetch the full Template structure and assets. |
| Template Upload | Submit a new Template to the Marketplace. |
| Search and Filter | Support queries by tag, creator, style type, popularity. |
| Version Control (Future) | Track Template versions and allow updates post-publication. |

---

# Example API Endpoints (Post-MVP)

| Endpoint | Method | Purpose |
|:---|:---|:---|
| `/api/templates/marketplace` | `GET` | List all Templates visible to user scope (team/public). |
| `/api/templates/marketplace/{templateId}` | `GET` | Fetch metadata and download link for a specific Template. |
| `/api/templates/marketplace/search` | `GET` | Search Templates by keyword, category, tags. |
| `/api/templates/marketplace/upload` | `POST` | Upload a new Template (Admin or Template Editor role only). |
| `/api/templates/marketplace/update/{templateId}` | `PATCH` | Update metadata (if versioning is allowed). |

---

# Security and Permissions

| Action | Required Role |
|:---|:---|
| View Templates | Any authenticated user. |
| Upload Template | Admins or Template Editors only. |
| Update Template Metadata | Admins or original Template creators. |
| Delete Template (Future) | Admins only (restricted). |

Templates uploaded by team members must be validated before publication if an approval workflow is enabled (future feature).

---

# Marketplace Template Data Model (Simplified)

| Field | Type | Notes |
|:---|:---|:---|
| `id` | UUID | Unique identifier for Template. |
| `name` | String | Display name of the Template. |
| `authorId` | UUID | User ID of the uploader. |
| `description` | String | Short overview of Template purpose/style. |
| `tags` | Array of Strings | Keywords for search/filter. |
| `previewUrl` | URL | Link to a thumbnail preview image. |
| `templateDownloadUrl` | URL | Link to fetch full Template JSON + assets. |
| `createdAt` | ISO 8601 Timestamp | When Template was published. |
| `updatedAt` | ISO 8601 Timestamp | Last metadata update. |

---

# Future Enhancements (Post-MVP)

- Ratings and Reviews on Templates.
- Template version history and rollback options.
- Public vs Private Marketplace scoping.
- Template marketplace monetization (optional for public Templates).

---

# Version

Template Marketplace API Specification v1.0 — April 2025
