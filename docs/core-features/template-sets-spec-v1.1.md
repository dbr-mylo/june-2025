# Template Sets Specification — v1.1

June 2025

---

# Overview

This specification defines how Template Sets are created, assigned, and managed within Mylo. A Template Set is a group of one or more Templates assigned to a team, workspace, or Contributor. Sets determine which templates Contributors can use when authoring documents.

---

# MVP Scope

## Supported Capabilities

- Template Editors can:
  - Create new Template Sets
  - Add or remove templates within a set
  - Assign a Template Set to a Contributor or team
- Contributors:
  - Can choose from templates within the assigned set
  - Cannot modify or view templates outside their assigned set

## Constraints

- Each Contributor can be assigned only **one** Template Set at a time
- A Template Set may contain one or many templates
- Unassigned users default to Freeform mode

---

# Main Behavior Sections

## Save Behavior Rules

- Template Set data is stored in Supabase
- Assignment changes are saved immediately
- Contributor sessions are refreshed to reflect new Template Set
- Changing a Template Set may alter the template currently in use

## UI Behavior

| Action | Behavior |
|--------|----------|
| Add Template to Set | Dropdown or search to select templates |
| Remove Template | “Remove” button next to template thumbnail |
| Assign Set to User | Admin or Template Editor dropdown assigns set |
| Contributor opens document | Template picker shows only assigned set |
| Unassigned Contributor | Gets default template or Freeform mode |

---

## Stack Behavior

- Template Set is a collection of template UUIDs
- Contributor’s session loads permitted templates only
- If Contributor changes document’s template:
  - Options limited to templates in assigned set
  - Style override behavior is enforced

---

## Data Models

### Template Set Object

```json
{
  "id": "tmplset_123",
  "name": "Marketing Templates",
  "templateIds": ["tmpl_abc", "tmpl_def", "tmpl_ghi"],
  "assignedTo": ["user_xyz", "user_lmn"],
  "createdAt": "2025-06-01T10:00:00Z"
}
```

## Field Definitions

| Field | Type | Notes |
|-------|------|-------|
| id | UUID | Unique Template Set ID |
| name | String | Display name |
| templateIds | Array | List of included template UUIDs |
| assignedTo | Array | User or team UUIDs |
| createdAt | ISO 8601 | Timestamp |

---

# Additional Technical Sections (Optional)

### Role Requirements

- Only Template Editors and Admins can manage Template Sets
- Contributor assignment handled through Admin dashboard or profile edit

---

# Error Handling

| Condition | Behavior |
|----------|----------|
| Remove last template from set | Warning: “Set must include at least one template” |
| Assign empty set to user | Prevented with alert |
| Contributor opens invalid set | Fallback to Freeform mode with warning |
| Duplicate name | Allowed; names are display-only |

---

# Known Gaps / Outstanding Questions

- Should sets allow grouping by template purpose (e.g., "Reports", "Slides")? (Status: Open)
- Should Contributors see Template Set name? (Status: Deferred)
- Can one template belong to multiple sets? (Yes)

---

# Future Enhancements (Post-MVP)

- Smart recommendation of template sets based on doc type
- Shared org-wide default Template Sets
- Contributor-set switching via UI (if multiple sets assigned)
- Role-based template visibility by category

---

# Technical Dependencies

- Template Set object in Supabase
- UI controls in Admin and Template Editor dashboards
- Contributor-side set resolver for template picker

---

# API / Data Schema Notes

- CRUD routes for Template Set management
- Linked to Contributor profiles via Supabase joins

---

# Version

Template Sets Specification v1.1 — June 2025
