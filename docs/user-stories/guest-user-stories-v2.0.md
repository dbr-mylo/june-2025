
# Mylo Guest User Stories — June 2025

This document defines all user stories and acceptance criteria for the **Guest (Demo) Role** in Mylo. These stories reflect final behavior described in `guest-demo-mode-spec-v2.0.md` and are used for QA validation and development handoff.

---

# Overview

Guest users (aka Visitors or Demo users) access Mylo without signing up. They explore the product using mocked documents and templates. Guest behavior is restricted to read-only or limited-interaction actions. The session is ephemeral and cleared on tab close or refresh.

---

# Core User Stories

## 1. Guest Entry

**Given** I am not logged in  
**When** I click “Try as Guest” on the login page  
**Then** I should immediately enter a mock session without signing up

## 2. Editor Access

**Given** I am a Guest  
**When** I open a demo document  
**Then** I should be able to view and edit content, but saving is blocked

## 3. Preview Behavior

**Given** I am a Guest  
**When** I view my document in the Preview Panel  
**Then** I should see styles applied from the template, without affecting my original input

## 4. Save Restriction

**Given** I am a Guest  
**When** I click the Save button  
**Then** I should see a tooltip or modal prompting me to sign up

## 5. Export Restriction

**Given** I am a Guest  
**When** I click Export  
**Then** I should be blocked and shown a sign-up prompt

## 6. Session Expiry

**Given** I am a Guest  
**When** I refresh the tab or close the window  
**Then** my session and data should be lost

## 7. Role Restriction

**Given** I am a Guest  
**When** I attempt to switch to Contributor, Template Editor, or Admin  
**Then** I should see a tooltip: “Sign up to access more roles”

## 8. New Document Creation

**Given** I am a Guest  
**When** I create a new document  
**Then** I should be able to select a template and write freely, but cannot save or export

## 9. Template View Mode

**Given** I am a Guest  
**When** I view a demo template  
**Then** I should not be able to publish, share, or modify it

---

# Out of Scope / Post-MVP

- Persistent sessions using IndexedDB
- Guest-to-User conversion workflow (e.g. “Save your work” banner)
- Guest-specific analytics or tracking
- Multi-tab guest syncing

---

# Version

Mylo Guest User Stories v2.0 — June 2025
