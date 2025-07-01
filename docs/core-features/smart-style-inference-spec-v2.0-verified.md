# Smart Style Inference Specification — v2.0

June 2025

---

# Overview

This specification defines how Mylo infers document structure and applies formatting suggestions using a style inference engine. The system identifies headings, paragraphs, and layout intent based on heuristics, enabling the Preview panel to style untagged content appropriately.

---

# MVP Scope

## Roles

- **Contributors** benefit from inferred styles in Preview
- **Template Editors** can override or refine inference behavior when saving styles

## Inference Triggers

- On Editor content change
- On paste/import
- On document open
- On template switch

## Targets

- Headings (H1–H3)
- Body paragraphs
- Lists
- Quotes

---

# Main Behavior Sections

## Save Behavior Rules

- Inference results are **not saved** to the document
- They are transient and live only in Preview rendering context
- Styles saved by Template Editors persist independently of inference

## UI Behavior

| Context | Behavior |
|---------|----------|
| Contributor typing | Preview updates with inferred styles live |
| Pasted content | Heuristics applied on insert |
| Template Editor | Can test inference by inserting unstyled content |
| Style override | If matched manually, overrides inference |
| Import from Word | Inference used to replace lost formatting (MVP behavior) |

## Preview Behavior

- Preview applies the most likely style match for each block
- Inference is suppressed if explicit formatting exists (e.g., heading level set manually)
- Inline font styles from Contributors are ignored unless in Freeform mode

---

## Stack Behavior

- Inference is run on Tiptap JSON structure
- Scoring system weights blocks based on:
  - Line length
  - Capitalization
  - Font size (if set)
  - Paragraph position (start of doc, after break)
- Inferred style is rendered in Preview only

---

## Data Models

*No persistent data model — inference is runtime-only.*

## Field Definitions

| Field | Type | Notes |
|-------|------|-------|
| blockId | String | Internal block reference |
| inferredStyle | String | Style ID from Template |
| confidence | Number (0–1) | Used internally for threshold |
| isOverride | Boolean | True if user selected manual style |

---

# Additional Technical Sections (Optional)

### Inference Pipeline

1. Parse Tiptap JSON
2. Normalize blocks
3. Score candidates
4. Assign style tokens
5. Apply to Preview rendering context

---

# Error Handling

| Condition | Behavior |
|----------|----------|
| No match found | Default style applied (e.g., Body) |
| Conflicting match | Higher-confidence block wins |
| Malformed content | Skip block and continue |
| Template missing style | Fallback to generic paragraph |

---

# Known Gaps / Outstanding Questions

- Should inference be toggleable per document? (Effort: Medium, Status: TBD)
- Should users get visual “suggestion” tags in Editor? (Effort: High, Status: Future)
- Can Template Editors view an “inference map” of the doc? (Effort: Medium, Status: Post-MVP)

---

# Future Enhancements (Post-MVP)

- AI-enhanced heuristics (contextual understanding)
- “Why this style?” tooltip overlays
- Inference history and diffs
- Editable inference rules per template

---

# Technical Dependencies

- Tiptap JSON processor
- Inference scoring engine
- Preview panel integration
- Template style resolver

---

# API / Data Schema Notes

- No API — this runs entirely client-side

---

# Version

Smart Style Inference Specification v2.0 — June 2025
