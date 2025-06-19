# Smart Style Inference – Risks & Mitigations (MVP Scope)

See `smart-style-inference-spec.md` for implementation details.

---

## Risk 1: Misclassification
- **Issue**: Heuristics may mislabel a block (e.g., paragraph as heading)
- **Mitigation**:
  - Use fallback rules and prioritization logic
  - Allow Template Editors to disable Smart Inference per template

---

## Risk 2: Preview and Editor Divergence
- **Issue**: Contributor may be confused when preview doesn’t match their formatting
- **Mitigation**:
  - Clearly label preview area
  - Add toggles to compare view/output

---

> 📝 Note: AI-based classification and NLP limitations are **out of scope for MVP** and will be re-evaluated in a future phase.
