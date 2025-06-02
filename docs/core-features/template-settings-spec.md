# Mylo Template Settings Specification

Template Settings define the global design defaults every document starts with. Individual documents can override these via the Style Settings modal.

---

# Overview

Template Settings are the “master controls” for page layout and formatting. They live in the Template Editor’s dashboard under “Settings” and apply to all new documents created from that template.

---

# MVP Scope

## Page Layout

* Set page size and individual margins (top, right, bottom, left) using numeric inputs.
* Live ruler preview in the Template Settings UI.

## Global Hyphenation

* Toggle hyphenation on/off for the entire template.
* Configure basic rules (e.g., minimum prefix/suffix characters).
* Hyphenation is a Template-level setting and does not live in individual styles.

## Style Palette

* Define up to **10 named styles** (e.g., Heading 1, Body Text, Caption).
* Each style includes:

  * Font family
  * Font size
  * Font weight
  * Text color
  * Line height
  * Letter spacing
* Styles are managed within the palette and are applied via toolbar dropdown or on-canvas palette.

## Contributor Controls (Template-Dependent)

* Contributors can toggle the following if allowed by the Template:

  * Page numbering
  * Header visibility
  * Footer visibility

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
* Define and manage style palette (up to 10 styles)
* Set text sanitation behaviors for preview/export
* Allow toggles for page number, header/footer visibility

**Contributor**

* Inherit Template Settings when creating a new document
* Override styles per document via Style Settings modal
* Cannot override hyphenation settings
* Apply styles via toolbar dropdown or canvas palette
* View template formatting applied in Preview panel only

---

# Interaction Between Template Settings & Style Settings Modal

* Any value left at “default” in the Style Settings modal inherits from Template Settings
* Resetting document styles re-syncs with Template Settings
* Style Settings affect only the document; Template Settings remain unchanged
* All sanitation and formatting rules apply only in the Preview and Export views

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
