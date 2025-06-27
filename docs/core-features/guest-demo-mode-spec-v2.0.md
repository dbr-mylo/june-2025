
# Mylo Guest Demo Mode Specification v2.0 — June 2025

---

# Overview

Guest Mode (also referred to as Visitor Mode or Demo Mode) allows users to explore Mylo without authentication. It provides a safe, isolated, read-only environment using mock data. This is intended for onboarding, demos, and exploratory testing — not for persistent use or collaboration.

---

# MVP Scope

- Guest users access Mylo via a single **“Try as Guest”** button on the login screen
- No login, signup, or Supabase session is created
- Guest state is tracked locally (`localStorage.demoMode = true`)
- All data (documents, templates) is mocked and ephemeral
- Session ends when the tab closes or is refreshed
- Guests cannot save or export unless explicitly enabled as mock actions

---

# Guest UI Behavior

| UI Area         | Behavior                                                                 |
|-----------------|--------------------------------------------------------------------------|
| Dashboard       | Shows example documents and templates                                     |
| Editor Panel    | Read-only or editable with warning on save attempt                       |
| Preview Panel   | Shows how template styles apply (styled mock preview)                    |
| Save Button     | Disabled or mocked with signup prompt (“Sign up to save your work”)      |
| Export Button   | Hidden or triggers signup modal                                          |
| New Document    | Enabled with template picker; warns that work will not be saved          |
| New Template    | View-only mode; save triggers “Guests cannot save templates” toast       |
| Navigation      | Role switching blocked with tooltip: “Only available after signup”       |

---

# Demo Mode Behavior

## Session Rules

- Tracked using `localStorage.demoMode = true`
- All data exists only in-memory
- Session resets on:
  - Tab close
  - Page refresh
- Timer: Optional 20-minute soft-expiration with notification banner

## Access Control

- Guest has lowest role in the hierarchy: `Guest → Contributor → Template Editor → Admin`
- No access to Contributor, Template Editor, or Admin functionality
- Cannot access shared templates or organization content

## Edge Cases

| Scenario                            | Behavior                                                                 |
|-------------------------------------|--------------------------------------------------------------------------|
| Guest refreshes page                | All data is lost unless `.mylo` file was downloaded                      |
| Tries to save/export                | Blocked with tooltip or mock modal prompting signup                      |
| Tries to publish or assign template | Blocked with explanation                                                 |
| Edits existing demo doc, then exits | All edits are lost unless exported                                       |
| Tries to switch roles               | Blocked with tooltip                                                     |

---

# Error Handling

| Event                               | Handling                                                                |
|-------------------------------------|-------------------------------------------------------------------------|
| Guest tries restricted action       | Show tooltip: “Sign in to access this feature”                          |
| Session timer expires               | Show banner: “Your demo session has ended. Sign up to keep working.”    |
| Guest opens template with invalid data | Load fallback demo content and warn user                               |

---

# Known Gaps / Outstanding Questions

- Is 20-minute session long enough for all demo use cases? (Effort: Low)
- Should Guests be allowed to export `.mylo` with signup prompt after download? (Effort: Medium)
- Do we store any usage analytics to track guest engagement? (Effort: Medium)
- Should session persist across refresh using IndexedDB or not at all? (Effort: Medium)

---

# Future Enhancements (Post-MVP)

- Guest-to-user conversion modal (post-export or post-edit)
- Persistent Guest sessions with IndexedDB (or temp cache)
- AI prompt examples or content generation demos
- Mock collaboration preview with fake users

---

# Technical Dependencies

- No Supabase auth — guest state stored in browser only
- Local-only JSON for mock documents and templates
- Conditional rendering of features via `demoMode` toggle
- No server interaction for save/export or template publishing

---

# Role Enforcement Rules

| Feature                         | Guest | Contributor | Template Editor | Admin |
|---------------------------------|:-----:|:-----------:|:----------------:|:-----:|
| Open Demo Docs/Templates        |  ✅   |      –      |        –         |   –   |
| Save/Export Content             |  🚫   |     ✅      |       ✅         |  ✅   |
| Create/Edit Templates           |  🚫   |      –      |       ✅         |  ✅   |
| Switch Roles                    |  🚫   |     🚫      |       ✅         |  ✅   |
| View Preview Styling            |  ✅   |     ✅      |       ✅         |  ✅   |

---

# Version

Guest Demo Mode Specification v2.0 — June 2025
