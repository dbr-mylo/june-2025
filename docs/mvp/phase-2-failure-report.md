# ❌ Phase 2 Failure Report — MVP Bugs Blocking Progress

This document summarizes the critical issues preventing approval of Phase 2 for the Mylo MVP implementation. These must be resolved **before** Phase 3 begins. All bugs listed below break the `phase-2-acceptance-checklist.md` or conflict with `mvp-implementation-plan.md`.

---

## 🛑 Summary of Issues

### 1. ❌ Refresh Preview Button — Incorrect Behavior & Placement
- **Problem:** Preview panel updates automatically without clicking the refresh button.
- **Conflict:** This violates MVP spec which explicitly prohibits real-time preview sync.
- **Checklist Ref:** Preview must only update **manually** via the Refresh Preview button.
- **UI Problem:** Button location is inconsistent between templates.

**Required Fix:**
- Disable live preview sync.
- Ensure button manually triggers template application.
- Move the button to the correct location per consistent UI spec.

---

### 2. ❌ Broken List Nesting in Preview Panel
- **Problem:** Ordered and unordered lists do not show correct indentation in the preview.
- **Example:** Nested bullets and numbers are collapsed or flattened visually.
- **Checklist Ref:** Lists must reflect proper nesting and follow template styles for `ul`, `ol`, and `li`.

**Required Fix:**
- Fix template rendering logic to properly process and render nested list nodes.
- Validate indent levels are styled according to active template JSON.

---

### 3. ❌ Missing Word Count
- **Problem:** Word count functionality is missing.
- **Regression:** This was implemented in earlier phases and is now absent.
- **Impact:** Violates parity expectations for MVP contributor editor.

**Required Fix:**
- Restore real-time word count in the editor panel.

---

### 4. ❌ Removed Padding/Margin Around Preview Panel
- **Problem:** Preview content renders edge-to-edge without margin.
- **Impact:** Makes it hard to visually separate the preview from editor, especially with complex content.
- **Checklist Ref:** Preview must be visually distinct and clearly separated from Editor.

**Required Fix:**
- Reintroduce padding or margin inside the preview panel content container (recommend 24px).

---

### 5. ❌ Resizer (Expandable Lever) No Longer Functional
- **Problem:** The resizer between Editor and Preview is broken or missing interaction logic.
- **Checklist Ref:** Layout must support resizable or responsive panels.

**Required Fix:**
- Restore drag-to-resize functionality.
- Constrain min/max bounds for usability.

---

## ⛔ MVP Scope Violations

- **Real-time preview rendering** must be disabled.
- Only 3 hardcoded templates should be supported.
- Preview rendering must remain separate from the Editor state.

---

## ✅ Required Before Phase 3 Begins

Per `phase-2-acceptance-checklist.md`, **all** acceptance items must be complete. These issues currently **block sign-off**.

Do not begin Phase 3 until a fixed build is reviewed and approved.

---

Maintained by: Product Owner
Last Updated: July 19, 2025
