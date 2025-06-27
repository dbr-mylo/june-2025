# Mylo Data Models

This document defines the core **data models** for Mylo's MVP.

These models describe what information is stored and how different entities relate to each other.

---

# Core Objects (MVP)

## 1. User

| Property | Type | Notes |
|:---|:---|:---|
| id | String (UUID) | Unique identifier |
| name | String | Display name |
| email | String | User's email address |
| role | Enum (Contributor, Template Editor, Admin) | Permissions assigned |
| createdAt | Timestamp | Account creation date |

**Relationships:**
- User creates Documents.
- Template Editors create Templates.
- Admins manage Users.

---

## 2. Document

| Property | Type | Notes |
|:---|:---|:---|
| id | String (UUID) | Unique identifier |
| title | String | Document title |
| createdBy | String (User ID) | Owner |
| templateId | String (Template ID) | Template applied |
| pages | Array of Page IDs | Pages contained |
| versions | Array of Version IDs | Internal version snapshots |
| createdAt | Timestamp | Creation timestamp |
| updatedAt | Timestamp | Last modified timestamp |

**Relationships:**
- Document uses one Template.
- Document has multiple Pages.
- Document has multiple Versions.

---

## 3. Template

| Property | Type | Notes |
|:---|:---|:---|
| id | String (UUID) | Unique identifier |
| name | String | Template name |
| createdBy | String (User ID) | Owner |
| status | Enum (Draft, Published, Unpublished) | Publishing state |
| styles | JSON Object | Font, color, spacing settings |
| createdAt | Timestamp | Creation date |

**Relationships:**
- Template is used by multiple Documents.

---

## 4. Page

| Property | Type | Notes |
|:---|:---|:---|
| id | String (UUID) | Unique identifier |
| pageNumber | Integer | Order within document |
| content | Text/String | Text content of the page |

**Relationships:**
- Page belongs to a Document.

---

## 5. Version

| Property | Type | Notes |
|:---|:---|:---|
| id | String (UUID) | Unique identifier |
| documentId | String (Document ID) | Associated Document |
| snapshot | JSON Object | Full document state at save |
| timestamp | Timestamp | Save timestamp |

**Relationships:**
- Version belongs to a Document.

---

# Data Model Diagram (Text Representation)

```
User
 └── creates → Document
                  ├── uses → Template
                  ├── has → Pages
                  └── has → Versions
```

---

# Future Expansion (Post-MVP)

- **Text Frames:** Rich layout inside pages.
- **Assets Management:** Images, logos as independent objects.
- **Template Sets:** Bundled Templates for different teams/projects.

---

# Version

Mylo Data Models v1.0 — April 2025


## Failure Recovery and Data Validation

To ensure robust handling of save or load failures:

- All document objects must validate against schema before save/export.
- On load failure (e.g., version corruption, missing template ID), the app must:
  - Attempt recovery using last known valid version (if available)
  - Log error and fallback to a blank or minimal document state
  - Notify the user with a non-blocking alert: `"We couldn’t fully load your document. Some data may be missing."`

- Document and template IDs must always be cross-verified before preview generation.
- Partial objects or schema-violating fields should be discarded on load.
