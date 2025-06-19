# Combined User Journey: Contributor + Template Editor

## Purpose
To outline how a user with both Contributor and Template Editor roles works fluidly across writing, styling, and publishing workflows.

---

## Flow

### 1. Log In / Access Mylo
- User signs in via email, Google, or GitHub.
- Lands on the **Dashboard**, which includes:
  - Recent Documents
  - Available Templates
  - “Create New” buttons for both documents and templates

---

### 2. Document Creation Workflow (Contributor Mode)
- User clicks **“New Document”**
- Chooses to:
  - Start from a blank page
  - Select a published template

- In the **Editor + Preview split panel**:
  - Writes freely in the Editor panel
  - Preview panel reflects the current template style, overriding manual formatting
- May:
  - Add headings, paragraphs, bullet lists, etc.
  - Insert images into flow
  - Save document locally (`.mylo` file) or to the cloud

---

### 3. Switch to Template Editor Mode
- From dashboard or top nav, user selects **“New Template”** or opens an existing one
- Enters the **Template Editor environment**:
  - Same Editor + Preview layout, but with **style control and layout panels** enabled

---

### 4. Template Design Workflow
- Sets template properties:
  - Name, description, category
  - Base font, line height, spacing
  - Logo placement and placeholder imagery
- Creates styles:
  - Paragraph and character styles
  - Inheritance rules (e.g., Subhead inherits from Headline but overrides size)
- Applies styles to example content blocks
- Adds layout hints (spacing suggestions, widows/orphans flags)

---

### 5. Testing the Template with Real Content
- Switches into **Contributor mode within the template editor** to simulate real use
- Adds sample text to evaluate how styles behave under different content lengths
- Adjusts styles based on layout issues observed in Preview

---

### 6. Publishing / Managing Templates
- Returns to the Template Overview Panel
- Publishes the template to:
  - A team/group (MVP)
  - (Marketplace = future)
- Can unpublish templates to make them private again

---

### 7. Creating a Document from a Template (Validation Step)
- Returns to Dashboard
- Selects their newly created template to start a new document
- Tests how Contributor role interacts with it:
  - Confirms Preview accurately applies template styles
  - Verifies Contributor cannot edit locked design elements

---

### 8. Ongoing Iteration
- Edits saved templates based on feedback or formatting bugs
- Uses versioning logic (auto-saved diffs) to roll back changes if needed
- May switch between Contributor and Template Editor roles frequently for real-world validation


---

## Edge Cases

- **User switches templates mid-document:**  
  Manual formatting remains, but preview may look dramatically different. Prompt appears:  
  _“Changing the template may alter the visual layout. Proceed?”_

- **Template Editor updates a style currently in use by Contributor:**  
  Contributor sees immediate changes in Preview; manual formatting is preserved in Editor.

- **Contributor tries to edit a locked design element:**  
  Action blocked with tooltip:  
  _“This element is controlled by the template and cannot be edited.”_

- **Template Editor publishes a template with missing styles:**  
  Preview may render fallback styles (e.g., default body text). System warns before publishing.

- **Contributor opens a document linked to an unpublished template:**  
  Warning banner appears:  
  _“This document uses an unpublished or missing template. Preview may not display correctly.”_

- **Switching between roles during editing without saving:**  
  Modal prompts:  
  _“Save changes before switching roles?”_

- **Template Editor deletes a style that’s applied in an existing document:**  
  Preview reverts to fallback styles; system logs the issue in version history.

