# Mylo – June 2025

**Mylo** is a role-based document platform that separates content creation from visual design. It empowers Contributors to write freely while allowing Template Editors to control formatting and structure through reusable templates.

---

## 🚀 Overview

Most writing tools either:

- Give writers full control over formatting (creating inconsistency), or
- Require designers to manage every visual detail.

**Mylo** fixes this with clean role separation:

- **Contributors**: Write freely using a live Editor while the Preview panel enforces formatting.
- **Template Editors**: Create and manage templates, including layout, styles, and brand assets.
- **Admins**: Assign templates, manage users, and maintain role-based access.
- **Guests**: Temporary/demo users who can explore Mylo in a sandboxed environment.

---

## 🧩 Key Features

- 📝 **Dual-Pane Interface** – Contributors write on the left and preview output on the right.
- 🧠 **Template Enforcement** – Styles, layouts, and formatting defined by role-based templates.
- 💾 **Local Save & Export** – Save `.mylo` files or export print-ready PDFs.
- 🎨 **Design System Support** – Templates include custom fonts, spacing, and images.
- 🔐 **Role-Based Permissions** – All access is scoped by user role.

---

## 🗂️ Documentation Structure

All official documentation lives in [`/docs`](./docs/), organized by feature area and versioned using semantic tags (`v1.0`, `v1.1`, etc.).

For details, start with:

- [`/docs/README.md`](./docs/README.md)
- [`starter-kit-spec-organization-standard-V2.md`](./docs/starter-kit-spec-organization-standard-V2.md)

Every spec follows the same structure and includes:
- MVP scope
- Behavior and UI rules
- Error handling
- Known gaps and future enhancements

---

## ⚙️ Tech Stack

- **React + Vite** (frontend)
- **TypeScript**
- **TailwindCSS + shadcn/ui**
- **Supabase** (auth + storage)
- **Mammoth.js** (.docx import)
- **GitHub** (version control)
- **Vercel** (planned deployment)
- **Lovable.dev** (AI agent used to build and update Mylo’s codebase)

---

## 🛠 Getting Started

```bash
git clone git@github.com:dbr-mylo/june-2025.git
cd june-2025
npm install
npm run dev
```

---

## 📘 README Changelog

### v2.0 — June 2025

- Rewrote to reflect new project scope and terminology  
- Replaced all references to “Writer” and “Designer” with **Contributor** and **Template Editor**  
- Updated role definitions to match latest inheritance model  
- Replaced outdated `/docs/README-docs.md` pointer with `/docs/README.md`  
- Added full folder breakdown based on `docs/` structure as of June 2025  
- Introduced versioning principles and documentation standards  
- Added table of recommended reading order for onboarding  

---

### v1.0 — April 2025

- Initial project definition and folder setup  
- Described concept of role-based document formatting  
- Outlined high-level tech stack and contributor goals  

---

## 📌 Version

Mylo Root README v2.0 — June 2025
