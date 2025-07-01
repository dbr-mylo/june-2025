# Mylo Glossary — v1.1

June 2025

---

# Overview

This glossary defines key terms used throughout the Mylo Starter Kit. It ensures shared understanding across documentation, design discussions, and development. Terms are grouped for clarity and marked if they are planned for post-MVP.

---

# Roles

| Term | Definition |
|------|------------|
| **Admin** | A role with full permissions. Can manage users, assign templates, and access all system settings. |
| **Contributor** | The base role in Mylo, focused on writing content. Formerly known as Writer. |
| **Guest** | Temporary access role used for demo or testing purposes. No data persistence. |
| **Template Editor** | A role with full Contributor permissions plus the ability to create and manage templates. Formerly Designer. |

---

# Core System Terms

| Term | Definition |
|------|------------|
| **Document** | A saved file containing user content, structured using Tiptap JSON and styled via Templates. |
| **Template** | A design object that controls layout, styles, typography, and formatting rules applied to documents. |
| **Template Set** | A collection of Templates assigned to a user or team. Contributors can only use Templates from their assigned set. |
| **Style** | A named group of formatting properties (font, size, line height, etc.) saved as part of a Template. |
| **Style Settings Modal** | A modal where Contributors can override default Template styles at the document level. |
| **Template Settings** | Global configuration values for a Template (e.g., page size, margins, hyphenation). Distinct from individual styles. |

---

# Features and Components

| Term | Definition |
|------|------------|
| **Editor** | The panel where Contributors write. Formatting here may be overridden by the Template in Preview. |
| **Preview** | The panel that shows how the document will look with the selected Template applied. |
| **Split View** | The default layout mode showing Editor and Preview side-by-side. |
| **Thumbnail** | A visual snapshot representing a Template, used in the template picker and dashboard. |
| **Autosave** | Background save process triggered by content or metadata changes. |
| **Undo/Redo** | History controls powered by Tiptap, allowing reversal of recent editing actions. |
| **Zoom** | UI control for adjusting visual scale of the Editor or Preview panels. |
| **Trash** | Soft-deleted items are stored here for up to 30 days before permanent deletion. |
| **Top Menu** | Persistent menu bar giving access to file actions, template switching, and export. |

---

# Technical Terms

| Term | Definition |
|------|------------|
| **Tiptap** | The rich-text editor framework used in Mylo. |
| **Supabase** | The backend platform providing authentication, storage, and database services. |
| **.mylo File** | A locally saved document file with both content and metadata. Can be reopened later. |
| **Supabase Storage** | Location where uploaded assets (e.g., fonts, thumbnails) are kept. |
| **UUID** | Universally Unique Identifier used for referencing documents, templates, users, etc. |

---

# Future-Oriented Terms (Post-MVP)

| Term | Definition |
|------|------------|
| **Marketplace** | A future system where templates can be published, shared, or licensed. |
| **Template Variants** | Planned support for layout alternatives within a single Template. |
| **Conditional Styling** | Rules that apply different formatting based on context or content length. |
| **Bubble Menu** | Inline floating toolbar under consideration for Contributor text actions. |
| **Style Diff Viewer** | Tool to show changes when switching Templates. |
| **Layout Zones** | Predefined content areas (columns, sidebars) within a Template (Planned). |

---

# Version

Mylo Glossary v1.1 — June 2025
