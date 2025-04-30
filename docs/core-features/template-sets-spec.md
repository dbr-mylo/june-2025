# Mylo Template Sets (MVP) Specification

Template Sets help organize and control the visibility of branded templates within an organization. They simplify template management and ensure the right templates are available to the right users.

---

# Overview

Template Sets are collections of templates organized by use case, team, or role. These sets help manage and control which templates are visible to different users, ensuring that the right templates are always available to the right users. They simplify template management and support team-specific workflows.

---

# MVP Scope

- Templates belong to a **company workspace**.
- **Template Sets** are named collections of templates.
- Template Editors can assign visibility based on **roles** and **teams**.
- Contributors only see the templates in the sets assigned to them.
- Templates always use the **latest published version** in the set.

---

# Functional Requirements

**Template Editor**
- As a Template Editor, I can create **Template Sets** to organize templates by **team** or **use case**.
- As a Template Editor, I can assign **visibility** of Template Sets based on **roles** or **teams**.
- As a Template Editor, I can **edit** or **delete** Template Sets as needed.

**Contributor**
- As a Contributor, I see only the Template Sets that are assigned to me or are **public**.
- As a Contributor, I can **preview templates** before applying them.
- As a Contributor, I can **apply templates** from the sets assigned to me.

---

# Error Handling

| Failure                        | System Response | User-facing Message |
|:---|:---|:---|
| Contributor tries to access private set | Show "Access Denied" message | "You do not have permission to view this set." |
| Set is empty                   | Show "No templates" message | "There are no templates in this set." |
| Template removed from set      | Remove silently                      | "This template has been removed from the set." |

---

# Future Enhancements (Post-MVP)

- **Template versioning** and version pinning.
- **Template search/filter** functionality within sets.
- **Support for nested sets** or tagging templates for better organization.
- **Audit logs** to track changes made to Template Sets.

---

# File Compatibility

- Future versions may add new template functionalities or allow external template tagging. The system should handle **versioning** for Template Sets and ensure backward compatibility.

---

# Version

Mylo Template Sets (MVP) Specification v1.0 — April 2025
