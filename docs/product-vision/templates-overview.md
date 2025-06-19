# Templates Overview

This document defines the purpose, structure, and user interaction model for Templates in Mylo.

Templates are central to Mylo's mission: separating content creation from document styling, ensuring brand consistency without restricting writing flexibility.

---

# Purpose of Templates

Templates enforce consistent visual styling across all documents while allowing Contributors to focus purely on content.

Templates control:

| Category | Example Controls |
|:---|:---|
| Typography | Fonts, sizes, weights, line heights |
| Color Schemes | Text color, background color, link color |
| Layout Rules | Margins, spacing, alignment |
| List Styles | Bullet styles, numbered/lettered list formatting |
| Hyphenation Rules | On/off, exceptions |

Templates **do not** lock down or limit free content creation inside the Editor Panel —  
they **apply formatting automatically** when content is Previewed or Exported.

---

# User Roles and Template Interaction

| Role | Permissions |
|:---|:---|
| Contributor | Selects a Template when creating a new document. Cannot edit Templates. |
| Template Editor | Creates, edits, and publishes Templates. Controls Template Settings and Styles. |
| Admin | Manages Templates and assigns permissions. Inherits all Template Editor privileges. |

✅ Contributors have complete formatting freedom inside the Editor Panel —  
but Preview and Export output always reflect the assigned Template.

✅ Template Editors define the visual rules that Contributors' content will inherit automatically.

---

# How Templates Work in Mylo

| Step | Behavior |
|:---|:---|
| 1. Template Creation | Template Editor defines Typography, Colors, Layout, List Styles, and Hyphenation Settings. |
| 2. Template Publication | Once finalized, Templates are Published and made available to Contributors. |
| 3. Document Creation | Contributors select a Template (if multiple are available) when starting a new document. |
| 4. Editing Content | Contributors write freely without enforced formatting inside the Editor Panel. |
| 5. Preview/Export | Templates automatically apply styles to structure and format the document output. |

Templates are assigned **one per document**.  
Switching Templates after creation is possible but may result in minor layout adjustments.

---

# Key Behaviors

| Topic | Behavior |
|:---|:---|
| Template Enforcement | In Preview and Export only — Editor remains flexible. |
| Template Switching | Contributors may reassign Templates unless restricted by Admins. |
| Default Templates | Organizations may set a default Template for new documents. |
| Template Versioning | (Post-MVP) Allow tracking and reverting Template changes without breaking documents. |

---

# Philosophy

Templates are designed to:

- **Empower Contributors**: Contributors focus entirely on content quality, not formatting details.
- **Enforce Branding**: Template Editors ensure visual consistency across all output.
- **Support Flexibility**: Contributors can freely format text during editing, knowing the Template will finalize appearance automatically.

This separation ensures speed, clarity, and brand protection without sacrificing creativity.

---

# Future Enhancements (Post-MVP)

- Multiple layout variants inside a single Template.
- Flexible style ranges (e.g., allowing heading sizes between 24pt–30pt).
- Template marketplace integration (team and public template sharing).
- Optical kerning and advanced typography settings.

---

# Version

Templates Overview v1.0 — April 2025
