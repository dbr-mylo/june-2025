# Mylo API and Application Error Handling Guidelines

This document defines standardized error handling practices for Mylo MVP.

Clear error handling ensures predictable system behavior and improves user experience during failure scenarios.

---

# Overview

Errors must be:
- Captured
- Categorized
- Communicated appropriately (UI feedback)
- Handled with fallback behaviors when possible

Errors should **never** silently fail without user feedback unless explicitly designed to do so (e.g., background retries).

---

# Error Categories

| Category | Description | Example |
|:---|:---|:---|
| Validation Error | User input fails rules before saving. | Missing title, invalid email. |
| Save/Export Failure | Problem saving `.mylo` file or exporting PDF. | Disk full, browser block, invalid data. |
| Resource Error | Missing templates, corrupted pages. | Template ID not found. |
| Authentication Error | User is unauthorized or session expired. | Attempt to access Admin dashboard while logged out. |
| System Error | Internal unexpected behavior. | Corrupted memory, critical uncaught exceptions. |

---

# Error Handling Rules (MVP)

## 1. Validation Errors (User Input)
- Show non-blocking in-app error messages.
- Highlight the field with the issue if possible.
- Prevent Save/Export if validation fails.

## 2. Save/Export Failures
- Immediate user-visible alert:  
  Example: "Save Failed. Please check your connection or available disk space."
- Offer Retry button.
- Auto-retry silent attempts are allowed once (only if lightweight).

## 3. Resource Errors
- Fall back to default behavior if safe (e.g., load default Template if missing).
- Otherwise, block action and display a descriptive error.
- Example: "Template not found. Please select a new Template."

## 4. Authentication Errors
- Redirect users to Login screen automatically.
- Display "Session expired. Please log in again."

## 5. System Errors
- Catch and log internally (for developer inspection).
- User sees simple message like "An unexpected error occurred."
- Offer soft refresh option without full app reload if possible.

---

# UI Behavior on Errors

| Action | UI Response |
|:---|:---|
| Validation Error | Field highlight, inline error message, save button disabled. |
| Save Failure | Alert modal or toast notification. Offer Retry. |
| Export Failure | Toast notification. |
| Template Missing | Modal: force user to reselect Template. |
| Session Expired | Redirect to login immediately. |

---

# Best Practices

- All error messages must be written in **plain English** (no technical jargon).
- Error states must be **recoverable** without requiring a full page reload when feasible.
- User should never lose typed content because of background errors.
- Background auto-saves must be robust against occasional temporary failures (e.g., retry logic).

---

# Example Error Message Templates

- **Validation Failure:**  
  "Please enter a document title before saving."

- **Save Failure:**  
  "Unable to save. Please check your connection and try again."

- **Template Missing:**  
  "The assigned Template is missing or unavailable. Please select a new Template to continue."

- **Session Expired:**  
  "Your session has expired. Please log in again."

---

# Version

Mylo Error Handling Guidelines v1.0 — April 2025
