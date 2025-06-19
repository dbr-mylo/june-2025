# Template Selection & Switching Journey

## Purpose
Show how Contributors interact with templates mid-document.

---

## Flow

### 1. Start a Document
- User opens a blank or template-based doc
- Writes and formats freely in Editor

### 2. Preview Uses Current Template
- Template determines visual output (e.g., font, spacing)
- User sees how styles are applied live

### 3. User Chooses to Switch Template
- Selects new template from a dropdown
- Preview updates immediately

### 4. Continues Writing
- Editor formatting persists
- Preview adapts to new styles
- Can undo or try another template

---

## Edge Cases

- **Switches to a template with fewer styles defined:**  
  System gracefully falls back to base styles (e.g., body text)

- **Switches to a template with dramatically different layout:**  
  Modal warns:  
  _“This template uses a multi-column layout. Some formatting may shift.”_

- **Switches multiple times rapidly:**  
  Debounce ensures templates aren’t reapplied too quickly

- **Applies a broken or unpublished template (future bug scenario):**  
  Error fallback:  
  _“Template could not be applied. Reverting to previous template.”_

- **Tries to switch when Preview is disabled (due to error or offline):**  
  Blocked with notice:  
  _“Preview unavailable. Please reconnect or resolve errors first.”_
