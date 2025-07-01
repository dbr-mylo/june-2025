# Mylo Tech Stack Specification — v1.1

June 2025

---

# Overview

This document outlines the current and planned technology stack powering Mylo. It includes the frameworks, libraries, hosting platforms, and storage systems used for both frontend and backend architecture.

---

# Core Frontend Stack

| Tool | Purpose |
|------|---------|
| **React** | Primary UI framework |
| **Tiptap** | Rich-text editor, content schema engine |
| **Tailwind CSS** | Styling system |
| **ShadCN/UI** | UI component library |
| **Framer Motion** | Animation and transitions |
| **Lucide Icons** | Iconography |
| **Vite** | Build tool for local development |

---

# Core Backend Stack

| Tool | Purpose |
|------|---------|
| **Supabase** | Auth, database (PostgreSQL), storage |
| **Supabase Edge Functions** | Custom API endpoints |
| **Supabase Storage** | Asset management: thumbnails, fonts, images |
| **Supabase RLS** | Role-based document access |

---

# Storage Logic

| Type | Tech | Notes |
|------|------|-------|
| Templates | Supabase tables + JSON blob for styles/settings |
| Documents | Supabase + Tiptap JSON |
| Versions | Supabase `versions` table |
| Fonts | Supabase Storage (uploaded) + Google Fonts API |
| Thumbnails | Supabase Storage |
| Images | Supabase Storage |

---

# Editor & Format Engines

| Tool | Purpose |
|------|---------|
| **Tiptap** | Extension-based schema + command handling |
| **Mammoth.js** | Import Word `.docx` files into HTML (offline fallback) |
| **.mylo** | Custom local save format (JSON-wrapped doc+template) |

---

# Hosting + Deployment

| Layer | Tech |
|-------|------|
| Frontend | Vercel |
| Edge Functions | Supabase |
| CDN | Supabase global CDN |
| Local Dev | `vite dev` + Supabase CLI |

---

# Role Management

- Roles are stored via Supabase Auth with policy enforcement via RLS
- LocalStorage is no longer used for routing overrides or fallback

---

# Known Gaps

- No CLI automation for full template deployment
- No fallback if Supabase Storage bucket is full or throttled
- Font caching not yet implemented client-side

---

# Future Enhancements (Post-MVP)

- Supabase bucket replication (failover)
- Font licensing validation
- `.mylo` import/export with snapshot rollback
- CLI deployment tool for template/test environments

---

# Version

Tech Stack Specification v1.1 — June 2025
