# Mylo Reusable Toolbar Components Specification

This specification outlines the creation of reusable toolbar buttons for Mylo, focusing on maximizing code reuse, improving maintainability, and ensuring consistency across the Contributor, Template Editor, and Admin roles.

---

# Overview

Toolbar buttons like Bold, Italic, and Underline are used in both the Contributor and Template Editor roles. By creating reusable components, we reduce redundant code, improve maintainability, and ensure consistent UI behavior across both toolbars.

---

# MVP Scope

- Shared button component: `TextFormatButton` integrated with Tiptap commands.
- Props for label, icon, role, onClick, disabled.
- Used in both toolbars with conditional logic.
- Toolbar initializes based on role and allowed formatting.
- Easily extendable for future formatting features.

---

# Functional Requirements

**Contributor Toolbar**  
- **Font selector** with dropdown list of fonts.
- **Font resizing** incrementally by 1pt (input field range 1–99). Includes numeric input and increment/decrement arrows (▲ ▼).
- **Predetermined font sizes**: 8, 9, 10, 11, 12, 16, 20, 24, 32pt.
- **Font color selector**.
- **Bold, Italic, Underline, Strikethrough**.
- **Bullet lists, Number lists, Letter lists**.
- **Indent and Outdent buttons**.
- **Text alignment** (left, right, center, justify).
- **Insert link button**.
- **Superscript and Subscript buttons**.
- **Clear formatting button**.
- **Insert menu** with:
  - **Page Break**
  - **Section Break**


**Template Editor Toolbar**  
- **All Contributor Toolbar features**, plus:
  - **Insert Image** button.
  - **Dropdown list of styles** that match the styles palette.
  - **Button to display editable margins**.

**Admin Toolbar**  
- Inherits everything from **Contributor Toolbar** and **Template Editor Toolbar**.
- **No new features** added for Admin role.

---

# Error Handling

| Failure | System Response | User-facing Message |
|:---|:---|:---|
| Button logic fails | Attempt to recover the button state. | "Something went wrong with the button behavior. Please try again." |
| Role-based rendering error | Show fallback button set for the role. | "There was an issue loading the toolbar for this role." |

---

# Future Enhancements (Post-MVP)

- **Drag-and-drop toolbar customization**.
- **Dynamic toolbar layout switching** between vertical and horizontal modes.
- **Auto-detection of role and button visibility** for customization purposes.

## Future Insert Menu Items (Post-MVP)
The following Insert options are visible in mockups but not part of the MVP:

- Table
- Special Characters
- Numbered List Options
- Horizontal Line
- Chart
- Emoji
- Table of Contents
- Headers & Footers
- Page Numbers
- Footnote
- Equation

These should appear in the Insert menu with "Coming Soon" tags or be disabled with a tooltip: “Planned for future update.”


---

# File Compatibility

- Future versions may add new button functionalities or allow external button styling. The system should handle **versioning** for toolbar components and ensure backward compatibility.

---

# Version

Mylo Reusable Toolbar Components Specification v1.0 — April 2025
