# Font Size Controls Specification

This document defines the behavior of font size adjustment controls for Contributors and Template Editors in the Mylo Editor.

Font size controls allow for incremental, precise changes to selected text without manually typing values.

---

# Overview

The Editor panel must provide a way to adjust font size quickly using both:

- **Increment/Decrement Buttons** (+/–)
- **Direct Numerical Input**

Font size adjustments are applied immediately inside the Editor,  
but final document output (Preview and Export) is styled according to the active Template — unless font size overrides are allowed by the Template design.

---

# Roles Affected

| Role | Access to Font Size Controls |
|:---|:---|
| Contributor | ✅ Can adjust font size freely while editing. |
| Template Editor | ✅ Can adjust font size freely while editing and when creating Styles. |
| Admin | ✅ Inherits Template Editor permissions. |

---

# MVP Requirements

## 1. Adjust Font Size with Buttons
> **As a Contributor, I want to use +/– buttons to adjust text font size by 1pt increments, so that I can fine-tune my document appearance.**

**Acceptance Criteria:**
- User selects text.
- Font Size control appears in formatting toolbar.
- "+" button increases font size by 1pt.
- "–" button decreases font size by 1pt.
- Font size change applies immediately to selected text.
- Updated font size is reflected numerically in the font size input field.

---

## 2. Manual Font Size Entry
> **As a Contributor, I want to manually enter a specific font size, so that I have precise control over text appearance.**

**Acceptance Criteria:**
- User can click into the font size field and type a numerical value.
- Pressing Enter or clicking outside the field commits the change.
- Manual input must respect allowed font size range (1pt–99pt).

---

## 3. Behavior When No Text Is Selected
> **As a Contributor, I want the font size controls to affect newly typed text if no selection is active.**

**Acceptance Criteria:**
- If no text is selected, changing font size sets the "typing attribute."
- Newly typed text adopts the selected font size.
- Existing text remains unchanged.

---

# Validation Rules

| Field | Constraint |
|:---|:---|
| Minimum Font Size | 1pt |
| Maximum Font Size | 99pt |
| Input Validation | Reject non-numeric input. Ignore invalid values (e.g., letters). |

---

# Keyboard Accessibility (Optional Future Enhancement)

- **Up Arrow:** Increase font size by 1pt.
- **Down Arrow:** Decrease font size by 1pt.
- **Shift + Up/Down:** Adjust font size by 5pt increments for faster control.

---

# Preview and Export Behavior

- Font size changes are visible in the Editor immediately.
- Final Preview and Export will **re-apply Template Styles** unless the Template explicitly allows font size flexibility.
- Contributors should understand that ad-hoc font changes may not match final styled output if restricted by Template.

---

# Error Handling

| Issue | Behavior |
|:---|:---|
| Input outside valid range | Clamp to minimum (1pt) or maximum (99pt). |
| Non-numeric entry | Ignore input and maintain previous font size. |

---

# Version

Font Size Controls Specification v1.0 — April 2025
