# Mylo Style Settings Modal Specification

This specification defines the behavior, layout, and controls of the Style Settings modal, which lets users configure typography, lists, lines, and hyphenation. Tabs appear in the fixed order: Typography → Lists → Lines → Hyphenation. Hyphenation is least-used and can also be set globally in template settings.

---

# Overview

The Style Settings modal provides per-document overrides for text and list appearance. Users switch tabs to adjust font family, size, color, spacing, list markers, and rule lines.

---

# MVP Scope

- Four fixed tabs in this order:  
  1. Typography  
  2. Lists  
  3. Lines  
  4. Hyphenation  
- Panels for each tab with labeled input controls.  
- All numeric inputs show **px** by default.  
- Hyphenation settings available but noted as secondary; global override exists in template settings.

---

# Tab & Panel Behavior

- Tabs render in the fixed order above and cannot be reordered.  
- Active tab is highlighted; clicking a tab shows its panel.  
- Modal header displays “Style Settings.”  
- Close (“×”) and “Reset to Defaults” buttons in top-right.

---

# Typography Panel

- **Font Family** (dropdown)  
- **Font Weight** (dropdown)  
- **Font Size** (dropdown; numeric input to enter custom size)  
- **Font Color** (color picker or hex input)  
- **Line Height** (dropdown or ratio input, e.g. “auto” / “1.5x”)  
- **Text Alignment** (dropdown: Left, Center, Right, Justify)  
- **Letter Spacing** (dropdown or numeric input)  
- **Live Preview**: small sample text updates in real time.

---

# Lists Panel

- **List Type** (dropdown: None, Bullets, Numbers, Letters, Roman Numerals)  
- **Font Weight** for markers (dropdown)  
- **Indent Size** (numeric input in px)  
- **Live Preview**: sample list rendered below controls.

---

# Lines Panel

- **Line Above** (checkbox to enable)  
  - **Weight** (numeric input)  
  - **Color** (picker)  
  - **Type** (dropdown: Solid, Dashed, Dotted)  
  - **Offset** (numeric input)  
- **Line Below** (checkbox, same controls)  
- **Live Preview**: sample paragraph with line applied.

---

# Hyphenation Panel

- **Weight**, **After First # Letters**, **Before Last # Letters**, **Hyphen Limit** (numeric inputs; unitless)  
- **Options** (checkboxes): Hyphenate Capitalized Words, Hyphenate Last Word, Hyphenate Across Column  
- Note: hyphenation settings are secondary. Link or tooltip points to **Template Settings → Hyphenation** for global control.

---

# Error Handling

| Scenario                            | Response                                    | Message                          |
|-------------------------------------|---------------------------------------------|----------------------------------|
| Numeric input out of range          | Clamp to nearest min/max                    | (no user message)                |
| Invalid hex in Color input          | Revert to last valid color                  | “Invalid color code.”            |

---

# Future Enhancements (Post-MVP)

- **Per-user persistence** of modal settings across sessions.  
- **Additional units** (e.g., em, rem, pt by default).  
- **Drag-to-measure**: click ruler to draw measurement guides.  
- **Copy/Paste Styles**: apply settings from one selection to another.  
- **Accessibility**: keyboard-only navigation of all controls.

---

# Version

Mylo Style Settings Modal Specification v1.1 — April 2025
