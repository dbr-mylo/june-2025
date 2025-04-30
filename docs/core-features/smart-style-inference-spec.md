# Smart Style Inference System (Hybrid Heuristic + AI Classification)

## Goal
Automatically determine whether text is a heading, subhead, paragraph, etc., even if the Contributor does not explicitly label it — so that the Preview can apply the correct styles from the active Template.

## System Architecture

### Layer 1: Heuristic Detection (Real-time)
- Evaluates structure based on formatting:
  - Font size, weight, line length, punctuation
  - Line breaks and visual positioning
- Example heuristics:
  - One line, large & bold = Heading
  - Short, italic = Subhead
  - Multi-line paragraph = Body text

### Layer 2: AI Classification (Async Refinement)
- Analyzes block-level content using NLP
- Labels blocks as:
  - Title / Heading / Subhead
  - Paragraph
  - Quote
  - Callout
- Assigns confidence scores
- Refines or overrides heuristic guesses

### Layer 3: Preview Style Application
- Final style for each block in the Preview is chosen based on:
  - High-confidence AI label
  - Otherwise, heuristic result
- Each classification maps to a style defined in the Template

### Performance Model
- Heuristics: Instant
- AI: Runs async (debounced), cached per document
- No visual flicker in preview; stable rendering

## Editor vs. Preview
- Contributor formats freely in the editor
- Preview uses system-detected structure + Template to apply styles
- Contributor formatting does **not affect** the Preview if a Template is active

## Optional Enhancements (Post-MVP)
- Confidence warnings for ambiguous blocks
- “Suggest label” prompts in low-confidence scenarios
- Template Editor override of misclassified sections
