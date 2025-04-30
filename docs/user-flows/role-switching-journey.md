# Role-Switching Journey

## Purpose
Enable users with multiple permissions to work across roles fluidly.

---

## Flow

### 1. Login
- User logs in with dual-role access (Template Editor + Contributor)

### 2. Starts as Contributor
- Creates a new document
- Writes and previews with a selected template

### 3. Needs Template Customization
- Realizes a new layout is needed
- Switches roles via top nav or dashboard

### 4. Becomes Template Editor
- Creates a new template or edits an existing one
- Modifies styles, layout, and imagery
- Publishes template

### 5. Returns to Contributor
- Opens original document
- Applies new template
- Continues writing

---

## Edge Cases

- **Edits a document then switches roles:**  
  If document is unsaved, prompt appears:  
  _“Save before switching roles?”_

- **Applies a new template that significantly alters layout:**  
  Confirmation modal:  
  _“This will update the Preview styling. Continue?”_

- **Tries to edit locked design elements in Contributor mode:**  
  Message appears:  
  _“This image is locked by the template and cannot be modified”_

- **Switches to a role without required permissions (Admin only):**  
  Access denied with tooltip or message
