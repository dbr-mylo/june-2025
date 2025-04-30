# Mylo Template Settings Specification

Template Settings define the global design defaults every document starts with. Individual documents can override these via the Style Settings modal.

---

# Overview

Template Settings are the “master controls” for page layout and formatting. They live in the Template Editor’s dashboard under “Settings” and apply to all new documents created from that template.

---

# MVP Scope

- **Page Margins & Size**  
  - Set top, right, bottom, and left margins (e.g., 1" each) with numeric inputs.  
  - Live ruler preview in the Template Settings UI.

- **Global Hyphenation**  
  - Toggle hyphenation on/off for the entire template.  
  - Configure basic rules (min prefix/suffix letters, hyphen limits).

- **Style Palette**  
  - Define up to **10 named styles** (e.g., Heading 1, Body Text, Caption).  
  - Each style configurable with: font family, font size, font weight, color, line height, letter spacing.  
  - Styles can be toggled on/off in the palette.  
  - Users apply styles via a toolbar dropdown or by clicking in the on-canvas Styles Palette.

---

# Functional Requirements

**Template Editor**  
- Set page dimensions and margins for a template.  
- Enable or disable hyphenation globally and configure basic hyphenation rules.  
- Create, rename, and toggle up to 10 named styles in the Style Palette, and set their typographic properties.  

**Contributor**  
- Inherit all Template Settings defaults when creating a new document.  
- Override per-document style properties via the Style Settings modal (except global hyphenation, which remains template-controlled).  
- Access and apply the Style Palette via the toolbar dropdown or on-canvas palette.

---

# Interaction Between Template Settings & Style Settings Modal

- Any value left at “default” in the Style Settings modal reads from Template Settings.  
- Resetting a document to defaults re-syncs with Template Settings values.  
- Style Settings changes apply only to the document; Template Settings remain unchanged.

---

# Future Enhancements (Post-MVP)

- **Column Gutters / Multi-column Layouts**: Support setting column count and gutter width.  
- **User-Preference Defaults**: Move Default Zoom into user preferences rather than template.  
- **Additional Style Controls**: Allow custom naming and grouping of styles beyond the initial 10 presets.  
- **Header/Footer Presets**: Revisit after refining common use-cases and patterns.

---

# Version

Mylo Template Settings Specification v1.2 — April 2025
