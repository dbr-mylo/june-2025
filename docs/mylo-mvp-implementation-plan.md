# mylo-mvp-implementation-plan.md

## ✅ GOAL

Launch a functioning MVP of Mylo that enforces strict role separation (Contributor, Template Editor, Admin), supports flexible editing with Tiptap, enforces preview formatting via templates, and allows Guest usage with local storage. The app must be architected for long-term growth and team scaling.

---

## 🧱 Phase 0: Infrastructure & Architecture Setup

### Objective
Lay the foundation with proper tooling, folder structure, design system, and CI support.

### Deliverables
- ✅ Supabase connected (Auth, Storage, Database)
- ✅ Tailwind CSS + ShadCN UI installed and themed
- ✅ GitHub repo connected with GitHub Actions or other CI
- ✅ Vite + TypeScript project structure
- ✅ Initial folder structure:
  ```
  /components/
    /auth/
    /editor/
    /preview/
    /template/
    /dashboard/
  /contexts/
    UserContext.tsx
    TemplateContext.tsx
  /lib/
    auth.ts
    roles.ts
  /pages/
    index.tsx
    contributor/
    template-editor/
    admin/
  ```

---

## 🔐 Phase 1: Authentication, Role Management, Routing

### Objective
Restrict access and render the correct UI based on user role. No hardcoded user types. Everything must come from Supabase.

### Features
- Email/password signup/login
- Supabase `user_metadata` for role field
- Role context on login
- Route guards and redirects:
  - `/contributor/dashboard`
  - `/template-editor/dashboard`
  - `/admin/dashboard`
- Guest mode (no auth)

### Best Practices
- Use Supabase RLS (Row Level Security) to prevent unauthorized access to DB data
- Setup Zod for runtime validation of Supabase data
- Write unit tests for all protected routes

---

## ✍️ Phase 2: Tiptap Editor + Document Management

### Objective
Enable Contributors to write, save, and resume documents. Editor must be unstyled and fully unlocked.

### Features
- Tiptap integration with the following extensions:
  - Bold, Italic, Underline
  - Headings (H1–H3)
  - Lists (Bullet, Numbered) with Tab/Shift+Tab
  - Alignment
  - Highlight, Blockquote, Horizontal Rule
  - Font family and size (`textStyle` and `fontFamily` extensions)
- Document CRUD:
  - Supabase-backed for authenticated users
  - localStorage fallback for Guest users
- Document list view (per user)

### Best Practices
- Use optimistic UI for saves
- Abstract Tiptap editor config into reusable files
- Unit tests for document create/save/load

---

## 🎨 Phase 3: Template Engine + Preview Panel

### Objective
Allow Template Editors to define style templates. Contributors can select a template to format the **preview**, not the editor.

### Features
- Template creation UI (Template Editor only)
- Style definitions:
  ```ts
  interface Style {
    name: string; // e.g., "Heading 1"
    selector: string; // e.g., "h1"
    fontFamily: string;
    fontSize: string;
    fontWeight: string;
    color: string;
    lineHeight: string;
    etc...
  }
  ```
- Templates saved as JSON in Supabase
- Templates have versioning and optional inheritance (basic)
- Contributor can select from available templates
- Preview panel renders real-time transformation of editor content using selected template

### Best Practices
- Keep templates separate from documents — no embedding
- Validate templates on load
- Use React context for live template switching
- Preview must ignore Contributor’s manual formatting
- Write tests:
  - Editor shows user formatting
  - Preview uses template styles only

---

## 💾 Phase 4: Autosave, Export, Trash, and Error Handling

### Objective
Increase data reliability and document lifecycle control.

### Features
- Autosave after idle debounce (2s–5s)
- “Save status” display (Saving…, Saved, Error)
- PDF export:
  - Style-rendered version using template
  - Optional export as `.mylo` (JSON-based format)
- Trash system:
  - Soft-delete for docs/templates
  - View and restore from trash
- Error boundaries and user-facing error messages

### Best Practices
- Use debounce + throttling to avoid save spam
- Store template ID in document metadata
- Export must use preview-rendered output, not raw Tiptap HTML

---

## 🧪 Phase 5: Final Polish, Testing, and Readiness

### Objective
Eliminate bugs, add mobile/tablet support, and test every user path.

### Features
- Responsive layout support (Tailwind breakpoints)
- Unit tests (routing, context, utils, editor)
- Integration tests (auth + route + UI flow)
- Guest mode QA
- Full testing matrix:
  - Contributor: New doc, edit, switch template
  - Template Editor: Create/edit template, switch roles, assign template
  - Admin: Change user role
  - Guest: Save/load locally, switch templates, export

---

## 🚩 Additional Files to Create

| Filename | Purpose |
|----------|---------|
| `template-schema.md` | Define exact structure for templates |
| `shared-contexts.md` | Define how template/user context is used across panels |
| `test-strategy.md` | Detail testing coverage requirements |
| `mylo-export-spec.md` | Define PDF and `.mylo` export structure |

---

## 🧩 Risks

| Risk | Mitigation |
|------|------------|
| Guest mode diverges from normal flow | Abstract storage logic behind adapter (Supabase vs localStorage) |
| Templates are over-scoped for MVP | Use flat style definitions only at first |
| Tiptap output isn’t exportable | Convert JSON → styled HTML → PDF with headless browser (e.g., Puppeteer later) |
