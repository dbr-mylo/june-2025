# Mylo Data Models Specification

**Version:** v1.0  
**Last Updated:** July 2025  
**Status:** Draft for MVP Implementation

---

## Overview
This document defines the **core data models** used across the Mylo application. These models support document creation, editing, template application, user roles, and preview rendering. All frontend logic and backend storage must adhere to these schemas to ensure data consistency.

---

## Document Model

```ts
interface Document {
  id: string
  title: string
  content: string // serialized Tiptap JSON or HTML
  templateId: string | null
  authorId: string
  createdAt: string
  updatedAt: string
  autosaveState?: 'clean' | 'dirty' | 'saving' | 'error'
  metadata?: Record<string, any>
}
```

**Notes:**
- `content` should be persisted in a format compatible with Tiptap (JSON preferred)
- `templateId` links the document to a stored template (nullable for freeform mode)
- `autosaveState` used by frontend to track save cycles (not persisted to backend)

---

## Template Model

```ts
interface Template {
  id: string
  name: string
  createdBy: string
  styleSettings: StyleBlock[]
  templateSettings: TemplateSettings
  sampleContent?: string // used only in Editor view, not shown to Contributors
  createdAt: string
  updatedAt: string
}
```

**Notes:**
- `styleSettings` is an array of named style definitions (see `StyleBlock` below)
- `templateSettings` includes global layout rules (see Template Settings spec)

---

## StyleBlock (Template Style Definition)

```ts
interface StyleBlock {
  id: string
  name: string // e.g. Heading 1, Body Text
  inheritsFrom?: string // optional parent style ID
  fontFamily: string
  fontSize: number
  fontWeight: string
  lineHeight?: number
  letterSpacing?: number
  color?: string
  alignment?: 'left' | 'center' | 'right' | 'justify'
  margins?: {
    top?: number
    bottom?: number
  }
}
```

---

## TemplateSettings (Global Template Controls)

```ts
interface TemplateSettings {
  pageSize: 'A4' | 'Letter' | 'Custom'
  margins: {
    top: number
    right: number
    bottom: number
    left: number
  }
  hyphenationEnabled: boolean
  spaceControl: {
    stripDoubleSpaces: boolean
    stripTrailingSpaces: boolean
  }
  widowControlEnabled: boolean
}
```

---

## User Model

```ts
interface User {
  id: string
  email: string
  displayName: string
  role: 'contributor' | 'template-editor' | 'admin'
  createdAt: string
  lastLoginAt?: string
  metadata?: Record<string, any>
}
```

**Notes:**
- Role is used for routing and permission enforcement
- Metadata may include usage patterns, A/B flags, etc.

---

## Future Enhancements (Post-MVP)
- Audit trails (createdBy, lastEditedBy, history logs)
- Field-level change history for documents
- Shared access permissions for teams
- Marketplace metadata (template ratings, downloads, etc.)

---

## Next Steps
- Confirm Supabase schema alignment
- Implement migration files or JSON schema enforcement
- Add validation and fallback rules for optional fields
