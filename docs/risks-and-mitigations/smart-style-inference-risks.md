# Smart Style Inference – Risks & Mitigations

See `smart-style-inference-spec.md` for implementation details.

## Risk 1: Misclassification
- **Issue**: AI or heuristics may mislabel a block (e.g., paragraph as heading)
- **Mitigation**:
  - Use confidence scores and fallback rules
  - Allow Template Editors to disable Smart Inference per template

## Risk 2: Performance Load
- **Issue**: AI calls per block could slow app
- **Mitigation**:
  - Debounce and batch API requests
  - Use fast heuristics for real-time feedback

## Risk 3: Preview and Editor Divergence
- **Issue**: Contributor may be confused when preview doesn’t match their formatting
- **Mitigation**:
  - Clearly label preview area
  - Add toggles to compare view/output

## Risk 4: Language Model Limitations
- **Issue**: NLP classification may fail on non-English or technical text
- **Mitigation**:
  - Document supported languages
  - Allow future override/correction tools for Template Editors
