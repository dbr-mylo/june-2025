# Layout Normalization Spec — Editor + Preview Panel Alignment

## Purpose

This spec defines a unified layout baseline for Mylo's Editor and Preview panels. The goal is to eliminate unintentional visual drift between the two panels by removing all default padding, margin, and spacing — then reintroducing shared layout spacing deliberately. This will serve as the foundation for introducing paper-size-aware layout rules in the future.

---

## 🔧 Phase 1: Level-Set Baseline Layout (MVP Priority)

### Requirements

* [ ] Remove all panel-level `padding` and `margin` from Editor and Preview
* [ ] Reset content containers to `padding: 0`, `margin: 0`, `width: 100%`
* [ ] Use a shared `.content-wrapper` class applied to both panels
* [ ] Do **not** rely on default browser spacing (e.g., for `<p>`, `<ul>`)
* [ ] Disable or remove hardcoded spacing in Preview that is not template-driven

### Rationale

* Prevents visual drift between the panels
* Ensures all layout behavior is explicitly defined
* Sets up future support for paper sizing and margin systems

---

## 🧱 Phase 2: Reintroduce Controlled Padding (Post-Level-Set)

### Requirements

* [ ] Add a shared padding system (e.g., `padding: 48px 64px`) to `.content-wrapper`
* [ ] Apply padding consistently in both panels to create breathing room
* [ ] Use CSS variables or Tailwind utility classes for maintainability
* [ ] Position content relative to this spacing — not the panel edges

### Rationale

* Improves visual clarity without introducing inconsistency
* Prepares for page margin controls

---

## 📐 Future: Paper Size + Page Margin Logic

### Placeholder Plan

* Define paper sizes (Letter, A4, Legal) with corresponding `max-width` and `padding`
* Introduce `.document-page` or `<DocumentCanvas>` wrapper
* Support margin presets per paper size (e.g., 96px top, 72px left/right)
* Scrollable multi-page layout can be layered on top

---

## ❌ Out of Scope

* Typographic vertical rhythm or text-specific spacing
* Canvas framing or printable page render logic
* Page breaks, headers/footers, or PDF-specific rules

---

## Maintained by

Product Owner
Created: July 31, 2025
