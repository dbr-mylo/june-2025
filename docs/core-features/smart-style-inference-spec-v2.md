# Smart Style Inference System (Heuristic-Only for MVP)

## Goal

Automatically determine whether text is a heading, subhead, paragraph, etc., even if the Contributor does not explicitly label it — so that the Preview can apply the correct styles from the active Template.

## System Architecture

### Layer 1: Heuristic Detection (Real-time)

* Evaluates structure based on formatting:

  * Font size, weight, line length, punctuation
  * Line breaks and visual positioning
* Example heuristics:

  * One line, large & bold = Heading
  * Short, italic = Subhead
  * Multi-line paragraph = Body text

### Deferred: AI Classification (Post-MVP)

AI-based block classification is out of scope for MVP. All classification will rely on deterministic heuristics. Future plans include NLP-based block tagging, confidence scoring, and AI-suggested overrides.

### Layer 2: Preview Style Application

* Final style for each block in the Preview is chosen based on:

  * Heuristic result (AI classification not available in MVP)
* Each classification maps to a style defined in the Template

## Editor vs. Preview

* Contributor formats freely in the editor
* Preview uses system-detected structure + Template to apply styles
* Contributor formatting does **not affect** the Preview if a Template is active
* Ambiguous formatting (e.g., bold single-line blocks that may be headings or callouts) will default to **Body** unless a clear heuristic match exists.

## Optional Enhancements (Post-MVP)

* Confidence warnings for ambiguous blocks
* “Suggest label” prompts in low-confidence scenarios
* Template Editor override of misclassified sections
* AI refinement and override confirmation UI

---

# Version

Smart Style Inference Specification v2.0 — June 2025
