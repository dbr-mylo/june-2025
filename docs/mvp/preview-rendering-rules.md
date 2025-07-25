# Preview Rendering Rules: MVP Template Format

This document defines the styling format and rendering behavior for templates used in Mylo MVP preview.

---

## 🧱 Template Format

Templates are defined as JSON objects that map Tiptap node types (e.g. `h1`, `p`, `ul`) to CSS-like style declarations. These styles are applied **only in the Preview panel** and do not affect the editing experience directly.

Each template has:
- A `name`
- A `styles` object containing key-value pairs of node type and associated styling

---

## ✅ MVP Preview Behavior

- A manual **"Refresh Preview"** button triggers the application of the selected template to the current editor content.
- Templates are applied by merging the JSON-defined style rules with the parsed Tiptap content.
- Preview layout and styling should remain consistent regardless of editing state.

---

## 🧪 Example Templates

### Template 1: Modern Report
```json
{'name': 'Modern Report', 'styles': {'h1': {'fontFamily': 'Lato', 'fontSize': '32px', 'color': '#1a1a1a'}, 'h2': {'fontFamily': 'Lato', 'fontSize': '24px', 'color': '#1a1a1a'}, 'p': {'fontFamily': 'Georgia', 'fontSize': '16px', 'lineHeight': '1.6', 'color': '#333333'}, 'ul': {'fontFamily': 'Georgia', 'fontSize': '16px', 'color': '#333333'}, 'ol': {'fontFamily': 'Georgia', 'fontSize': '16px', 'color': '#333333'}}}
```

### Template 2: Corporate Letterhead
```json
{'name': 'Corporate Letterhead', 'styles': {'h1': {'fontFamily': 'Helvetica', 'fontSize': '28px', 'color': '#0055a5'}, 'h2': {'fontFamily': 'Helvetica', 'fontSize': '20px', 'color': '#0055a5'}, 'p': {'fontFamily': 'Times New Roman', 'fontSize': '14px', 'lineHeight': '1.4', 'color': '#000000'}, 'ul': {'fontFamily': 'Times New Roman', 'fontSize': '14px', 'color': '#000000'}, 'ol': {'fontFamily': 'Times New Roman', 'fontSize': '14px', 'color': '#000000'}}}
```

### Template 3: Academic Paper
```json
{'name': 'Academic Paper', 'styles': {'h1': {'fontFamily': 'Times New Roman', 'fontSize': '24px', 'color': '#000000', 'fontWeight': 'bold'}, 'h2': {'fontFamily': 'Times New Roman', 'fontSize': '18px', 'color': '#000000', 'fontWeight': 'bold'}, 'p': {'fontFamily': 'Times New Roman', 'fontSize': '12pt', 'lineHeight': '2', 'color': '#000000'}, 'ul': {'fontFamily': 'Times New Roman', 'fontSize': '12pt', 'color': '#000000'}, 'ol': {'fontFamily': 'Times New Roman', 'fontSize': '12pt', 'color': '#000000'}}}
```

---

## 📌 Notes
- Templates are hardcoded in MVP (2–3 total)
- No template editing, assigning, or validation logic is needed
- All Contributors have access to the same template list
