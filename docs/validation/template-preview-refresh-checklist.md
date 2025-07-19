# ✅ Test Case Checklist: Template Preview Refresh Behavior

**File:** `docs/validation/template-preview-refresh-checklist.md`  
**Created:** 2025-07-19  
**Purpose:** Validate manual-only template rendering behavior as defined in the MVP spec and Phase 2 acceptance criteria.

---

## Scenario 1: Template Switch Does NOT Auto-Update Preview
- [ ] Change template via dropdown
- [ ] Confirm preview does **not** change visually
- [ ] Confirm `previewTemplate` state remains unchanged

## Scenario 2: Clicking "Refresh Preview" Triggers Update
- [ ] Click “Refresh Preview” after template switch
- [ ] Confirm preview now uses new template styles
- [ ] Confirm editor content is unchanged

## Scenario 3: Editor Formatting Is Unaffected
- [ ] Apply inline formatting (bold, italic, etc.)
- [ ] Switch template and refresh
- [ ] Confirm preview changes, but editor formatting stays intact

## Scenario 4: Template Switch + Preview Refresh = Accurate Output
- [ ] Select a different template
- [ ] Click Refresh
- [ ] Confirm correct fonts, colors, and structure (H1, H2, p, ul, ol)

## Scenario 5: Re-opening Document Retains Saved Template
- [ ] Save document with selected template
- [ ] Close and re-open
- [ ] Confirm preview uses saved template (after refresh)

---

## Reference Specs
- `preview-rendering-rules.md`
- `phase-2-acceptance-checklist.md`
- `mvp-implementation-plan.md`
