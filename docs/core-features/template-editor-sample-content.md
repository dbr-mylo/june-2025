# Template Editor Sample Content Specification

This document defines how sample content is used within the Template Editor in Mylo. It outlines how content is inserted, stored, and rendered — ensuring it supports design testing while remaining hidden from Contributors.

---

# Overview

Template Editors require realistic placeholder content to create and test styles. This content is intended solely for internal use during template design. It must never appear to Contributors or in final exports.

Sample content helps define hierarchy, test layout fidelity, and preview styling in a way that simulates actual use cases.

---

# MVP Scope

## Sample Content Insertion

- The Template Editor includes a **Sample Content dropdown** in the toolbar or settings panel.
- Selecting an option inserts predefined blocks into the layout canvas using:
  - Headings
  - Paragraphs
  - Lists
  - Tables (if applicable)
  - Image placeholders

## Preset Options

Initial content types available in the dropdown:

- Press Release
- Resume
- News Article
- Product Page
- Essay / Longform
- Invoice / Table-heavy
- Company Memo
- Marketing One-pager

## Content Customization

- Template Editors can freely edit inserted sample content.
- Sample content may include placeholder images or labels like `[H1 Headline]`, `[Body Text]`, or `[Table Placeholder]`.

---

# UI Behavior

## Within Template Editor

- Sample content is fully visible and editable while designing the template.
- A `Show/Hide Sample Content` toggle may be available to reduce layout noise.

## Template Preview Thumbnail

- The preview thumbnail in the dashboard **should include** sample content.
- This ensures users selecting templates can visually evaluate structure and layout.

## In Contributor View

- Sample content is never shown in the Contributor's editor or preview.
- When a Contributor selects a template, the document opens with no predefined text.

## Export Behavior

- Sample content is excluded from all Contributor exports, including `.mylo` files and PDFs.
- It exists only in the Template Editor context and is not saved as part of real documents.

---

# Stack Behavior

- Sample content is stored in the template metadata under a separate field (e.g., `testContent`).
- This content is not synced into Contributor-accessible documents or views.
- When a Contributor opens a document, the `testContent` field is ignored.

---

# Future Enhancements

- Allow Template Editors to define and save custom sample content sets.
- Add preview filters for how content adapts to different lengths or devices.
- Let Admins publish sample content sets across teams for consistency.

---

# Error Handling

| Scenario                                       | Behavior                                                                 |
|-----------------------------------------------|--------------------------------------------------------------------------|
| Contributor opens a document based on template | Sample content is not loaded or visible. Document starts empty.          |
| Template Editor deletes sample content         | No impact. Styles persist. Placeholder region becomes empty.             |
| Export initiated by Contributor
