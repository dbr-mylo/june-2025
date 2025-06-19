# Mylo Field Validation Rules Specification

This document defines strict validation requirements for all key user-inputted or system-generated fields in Mylo.

It ensures predictable system behavior, prevents corrupted saves, and enforces clean data integrity across documents, templates, users, and versions.

---

# Overview

All fields must be validated **before** saving, exporting, or submitting content.  
Validation occurs both client-side and server-side (if/when a cloud backend is introduced).

---

# Field Validation Table

| Entity | Field | Validation Rule | Required? |
|:---|:---|:---|:---|
| Document | `title` | Non-empty string, max 255 characters | ✅ |
| Document | `id` | UUID v4 format | ✅ |
| Document | `createdBy` | UUID v4 format | ✅ |
| Document | `templateId` | UUID v4 format | ✅ |
| Document | `pages` | Array; must contain at least 1 page | ✅ |
| Page | `pageNumber` | Integer > 0, sequential starting from 1 | ✅ |
| Page | `content` | String (can be empty `""`) | ✅ |
| Template | `name` | Non-empty string, max 150 characters | ✅ |
| Template | `id` | UUID v4 format | ✅ |
| Template | `status` | Enum: `"Draft"`, `"Published"`, `"Unpublished"` | ✅ |
| Template | `fonts.headingFont`, `fonts.bodyFont` | Non-empty ASCII/Unicode string | ✅ |
| Template | `fontSizes.*` | Integer between 6 and 72 (points) | ✅ |
| Template | `colors.*` | Valid hex code (`#RRGGBB`) | ✅ |
| Template | `spacing.lineHeight` | Decimal between 1.0 and 3.0 | ✅ |
| Template | `spacing.paragraphSpacing` | Integer between 0 and 100 (pixels) | ✅ |
| Template | `alignment.*` | Enum: `"left"`, `"center"`, `"right"`, `"justify"` | ✅ |
| User | `name` | Non-empty string, max 100 characters | ✅ |
| User | `email` | Valid email format (RFC 5322 standard) | ✅ |
| User | `role` | Enum: `"Contributor"`, `"TemplateEditor"`, `"Admin"` | ✅ |
| User | `id` | UUID v4 format | ✅ |
| Version | `versionId` | UUID v4 format | ✅ |
| Version | `documentId` | UUID v4 format | ✅ |
| Version | `timestamp` | ISO 8601 UTC timestamp | ✅ |
| Version | `snapshotSummary.title` | Non-empty string, max 255 characters | ✅ |
| Version | `snapshotSummary.pageCount` | Integer > 0 | ✅ |

---

# Special Validation Rules

- **UUID Validation**:  
  All `id`, `createdBy`, `templateId`, etc., must comply with UUID v4 formatting (e.g., `"550e8400-e29b-41d4-a716-446655440000"`).

- **Hex Color Codes**:  
  Colors must be valid 6-character hex codes beginning with `#`. (e.g., `#FFFFFF`).

- **Email Format**:  
  Emails must include a local part, an `@` symbol, and a valid domain according to RFC 5322 rules.

- **Page Numbering**:  
  Pages must start at `pageNumber = 1` and increment sequentially. No gaps allowed.

- **Font Size Ranges**:  
  No font smaller than 6pt or larger than 72pt is allowed.

- **Line Height Range**:  
  Acceptable line height for paragraphs: `1.0` to `3.0` inclusive.

- **Paragraph Spacing**:  
  Must be between 0 and 100 pixels.

- **Role Enforcement**:  
  Only defined roles (`Contributor`, `TemplateEditor`, `Admin`) allowed at save time.

---

# Error Handling on Validation Failure

| Validation Failure | System Response |
|:---|:---|
| Document title missing | Block Save. Show inline error on title field. |
| Invalid email on user | Block user creation. Show error. |
| Missing Template ID | Block document save. Require Template selection. |
| Invalid page numbers | Block save/export. Prompt user to correct. |
| Font size out of range | Prevent Template save until corrected. |

---

# Version

Mylo Field Validation Rules v1.0 — April 2025
