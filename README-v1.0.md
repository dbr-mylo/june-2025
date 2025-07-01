# Mylo – April 2025

**Mylo** is a modern document platform that cleanly separates content creation from layout and design. It empowers writers to focus purely on writing while ensuring visual consistency through role-based templates and styles.

---

## 🚀 Overview

Most writing tools today either:

- Give writers full control over formatting (leading to inconsistencies), or
- Require design expertise to maintain brand alignment.

**Mylo** solves this by introducing clear role separation:

- **Contributors** (Writers): Draft content freely in a structured editor.
- **Template Editors** (Designers): Define the final layout and styles.
- **Admins**: Manage users, templates, permissions, and system settings.
- **Guests**: Temporary or demo users for testing templates and documents.

---

## 🧩 Key Features

- 🔄 **Live Editor + Preview Panel** – Write in one panel, see real-time formatting in the other.
- 🧠 **Template Enforcement** – Templates control layout, styles, and visual hierarchy.
- 💾 **Local Save & Export** – Save work as `.mylo` files or export finished PDFs.
- 🎨 **Design System Support** – Manage fonts, spacing, and logos through role-specific controls.
- 🔐 **Role-Based Access** – Each user type sees and controls only what’s relevant to them.

---

## 🗂️ Project Structure

This repo includes:

- ✅ Markdown-based specs in [`/docs`](./docs/)
- ✅ User roles and permission documentation
- ✅ Core feature definitions and user stories
- ✅ Roadmaps, data models, and technical planning
- ✅ UX prototypes and starter UI directions

For an organized entry point, see [`docs/README-docs.md`](./docs/README-docs.md)

---

## ⚙️ Tech Stack

- React + Vite
- TypeScript
- TailwindCSS + shadcn/ui
- Supabase (auth + storage)
- Mammoth.js (.docx parsing)
- GitHub for version control
- Vercel (planned deployment)

---

## 🛠 Getting Started

```bash
git clone git@github.com:dbr-mylo/mylo-april-2025.git
cd mylo-april-2025
npm install
npm run dev
