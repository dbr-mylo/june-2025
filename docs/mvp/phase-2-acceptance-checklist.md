# Phase 2 Acceptance Checklist — Template Preview Panel

This checklist defines the required functionality and behavior for approving Phase 2 of the Mylo MVP implementation. Phase 2 introduces the Preview panel, template selection, and manual template rendering. All items must pass for sign-off.

---

## ✅ Functional Requirements

### 1. **Split Layout**

* [ ] The app displays a side-by-side layout with:

  * [ ] Editor panel (left)
  * [ ] Preview panel (right)
* [ ] Layout adjusts properly for different screen sizes (desktop + tablet)

### 2. **Template Selector**

* [ ] A dropdown is available to select between 3 templates:

  * Modern Report
  * Corporate Letterhead
  * Academic Paper
* [ ] The correct template name is visibly selected

### 3. **Refresh Preview Button**

* [ ] Clicking the "Refresh Preview" button manually triggers preview update
* [ ] Preview does **not** update on typing, blur, or save events

### 4. **Template Rendering**

* [ ] The Preview panel correctly reflects the styles from the selected template
* [ ] Styles are applied to all applicable Tiptap node types:

  * `h1`, `h2`, `h3`
  * `p`
  * `ul`, `ol`, `li`
* [ ] Output structure matches the order and content of the Editor panel
* [ ] Preview is visually distinct from Editor — user can clearly tell it's read-only

---

## 📐 Technical Accuracy

### 5. **TemplateEngine Behavior**

* [ ] Parses `editor.getJSON()`
* [ ] Maps node types to style objects from JSON template
* [ ] Converts JSON to styled HTML cleanly

### 6. **PreviewRenderer Behavior**

* [ ] Renders the styled HTML into a visually accurate preview pane
* [ ] Does not share state with the Editor
* [ ] Does not interfere with editing experience or formatting logic

---

## 🧯 Constraints Enforcement

### 7. **No Violations of MVP Scope**

* [ ] No style inference or smart logic
* [ ] No live preview sync
* [ ] No preview scaffolding for export, headers, footers, etc.
* [ ] No non-specified templates or UI polish outside the three provided

---

## 🧪 Edge Cases to Test

* [ ] Refresh Preview after editing a heading, list, or paragraph
* [ ] Switch templates and preview updates correctly
* [ ] Template switch does not alter Editor formatting
* [ ] Verify preview reflects correct fonts and spacing from template

---

## ✅ Sign-Off Condition

All boxes must be checked before Phase 3 may begin.

Maintained by: Product Owner
Last Updated: July 15, 2025
