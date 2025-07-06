# Mylo Interaction Flow — Header/Footer Zones (MVP)

---

# Overview

This document outlines the step-by-step interaction flow for managing headers and footers within the Template Editor interface. The goal is to support basic layout zones using a clean and focused UI, while enforcing separation of concerns between Template Editor and Contributor roles.

---

# 1. Add Header

1. Template Editor clicks `[ + Add Header ]` in the right sidebar
2. Mini-editor opens (modal or side panel)
3. User enters: `ACME Corp | {{document_title}} | {{date}}`
4. Applies alignment: Center
5. Clicks `Save`
6. Right panel now shows: `[ ✏️ Edit Header ]`

---

# 2. Add Footer

1. Template Editor clicks `[ + Add Footer ]`
2. Mini-editor opens
3. User enters: `Page {{page_number}} of {{total_pages}}`
4. Alignment: Right
5. Clicks `Save`

---

# 3. Preview Experience (Template Editor)

- Header appears at the top of the preview
- Footer appears at the bottom
- Tokens display live values based on document context

---

# 4. Contributor Experience

- Contributor creates a document using the template
- Header/footer content appears in Preview panel only
- Editor panel does not display or allow interaction with those zones
- Tokens resolve using document metadata (e.g., title, author)

---

# 5. Optional Remove Flow

1. Template Editor clicks `[ ✖ Remove Header ]`
2. Header is deleted
3. Sidebar reverts to: `[ + Add Header ]`
