# Guest (Visitor) Mode Journey

## Purpose
Allow users to demo or test Mylo without signing up.

---

## Flow

### 1. Accessing Mylo
- User clicks “Try as Guest”
- A guest session is created with:
  - A unique (non-persistent) ID
  - Access to a sample workspace

### 2. Exploring the Interface
- Dashboard shows:
  - Example documents
  - Sample templates
  - Options to create new items (with restricted features)

### 3. Creating a Document
- Guest clicks “New Document”
- Selects from sample templates
- Writes in the editor
- Preview reflects the selected template

### 4. Exploring Template Editor (if allowed)
- Can open “New Template”
- Style tools are visible
- Attempting to save shows a modal:  
  _“Save unavailable in Guest mode — sign up to continue”_

### 5. Saving and Exiting
- Guest may download `.mylo` file locally
- Prompts appear:
  - “Want to keep working? Sign up”
  - “Your session will expire in 20 mins”

---

## Edge Cases

- **Guest refreshes the page:**  
  Session is lost unless local save was triggered

- **Attempts to publish a template:**  
  Blocked with explanation (e.g., "Guests cannot publish templates")

- **Edits an existing demo doc and closes browser:**  
  Work is lost unless downloaded

- **Tries to switch roles:**  
  Blocked with tooltip: “Available after signup”
