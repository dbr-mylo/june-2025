# Mylo Template Settings Specification

Template Settings define the global design defaults every document starts with. Individual documents can override these via the Style Settings modal.

---

# Overview

Although Template Settings and Styles are presented in separate panels within the Template Editor, both are saved together as a single template entity. This ensures consistency and portability across templates, while preserving clear boundaries for editing and presentation.

Template Settings are the “master controls” for page layout and formatting. They live in the Template Editor’s dashboard under “Settings” and apply to all new documents created from that template.

Template Settings cover layout and formatting rules that are **not style-specific**. The Style Palette is defined separately and managed via the Styles system. While implementation details may evolve, both Template Settings and Styles are expected to be stored consistently as part of the same template object.

---

# MVP Scope

## Page Layout

* Set page size and individual margins (top, right, bottom, left) using numeric inputs.

## Global Hyphenation

* Toggle hyphenation on/off for the entire template.
* Configure basic rules (e.g., minimum prefix/suffix characters).
* Hyphenation is a Template-level setting and does not live in individual styles.

## Smart Text Sanitation (Preview Only)

Applied only in the Preview panel and Export—not during editing. These improve layout quality without affecting writing flow.

* Collapse double or more spaces into a single space
* Remove trailing spaces at the end of lines/paragraphs
* Remove leading space at the start of a paragraph
* Normalize quotation marks:

  * Replace straight quotes with smart quotes
  * Exception: use straight quotes after numbers (e.g., inches)
* Standardize ellipses: Convert `...` to `…`
* Strip unsupported/invisible characters (e.g., zero-width spaces, non-breaking spaces)

---

# Functional Requirements

**Template Editor**

* Set page size and margin values
* Enable/disable global hyphenation and configure its rules
* Set text sanitation behaviors for preview/export

**Contributor**

* Inherit Template Settings when creating a new document
* Override styles per document via Style Settings modal
* Cannot override hyphenation settings
* View template formatting applied in Preview panel only

---

# Interaction Between Template Settings & Style Settings Modal

* Any value left at “default” in the Style Settings modal inherits from Template Settings
* Resetting document styles re-syncs with Template Settings
* Style Settings affect only the document; Template Settings remain unchanged
* All sanitation and formatting rules apply only in the Preview and Export views
* If both Template Settings and a Style define the same property (e.g., font family or line height), the Style takes precedence. Template Settings act as global defaults and are overridden by Styles where applicable."

---

# Error Handling

* **Invalid Input Values**: If an invalid margin or style value is entered, the system highlights the field and prevents saving until corrected.
* **Template Load Failure**: If a template fails to load, a fallback message appears and contributors are prompted to choose another template or start without one.
* **Sanitation Errors in Preview**: If sanitation rules fail to apply (e.g., due to unsupported characters), the system logs the issue and continues rendering without crashing. A fallback rendering mode is used.
* **Unavailable Fonts**: If a font defined in the template is unavailable, a default fallback font is used and flagged in the Preview panel.

---

# Future Enhancements (Post-MVP)

## Layout and Structural

* Column gutters / multi-column layouts
* Header/footer presets
* Responsive spacing rules (based on content length or layout size)
* Ruler in Template Settings UI
* Contributor controls for page number, header visibility, footer visibility

## Style System

* Allow more than 10 named styles
* Custom naming and grouping of styles
* Support for style ranges (e.g., font size range, line height range)
* First-line indent and list style customization (moved to styles)

## Behavior and Sanitization

* Auto-capitalize first letter of sentences
* Auto-correct common typos
* Smart punctuation replacement (e.g., `--` → em dash, `+/-` → ±)
* Detect and flag ALL CAPS words
* Custom dash handling preferences (template-level):

  * Em dash (no space)
  * En dash (with space)
  * No substitution
* Define behavior for tabs in pasted text (e.g., strip, replace, indent)

---

# Version

Mylo Template Settings Specification v1.3 — June 2025
