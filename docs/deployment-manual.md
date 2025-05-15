# Mylo Deployment Manual

This document outlines the steps required to deploy the Mylo application in a local, staging, or production environment.

---

## Table of Contents

1. Prerequisites
2. Environment Setup
3. Installation Steps
4. Configuration
5. Running the Application
6. Deployment to Production
7. Verification
8. Troubleshooting

---

## 1. Prerequisites

Ensure the following tools are installed:

- **Node.js** (v18+ recommended)
- **npm** (v9+)
- **Git**
- **Supabase CLI** (optional for local Supabase setup)
- **PostgreSQL** (for production DB if not using Supabase)
- **Vercel / Netlify** (for deployment if applicable)

---

## 2. Environment Setup

Clone the repository:

```bash
git clone https://github.com/dbr-mylo/mylo-april-2025.git
cd mylo-april-2025
```

---

## 3. Installation Steps

Install dependencies:

```bash
npm install
```

If using workspaces or monorepo structure:

```bash
npm run bootstrap
```

Build the application:

```bash
npm run build
```

---

## 4. Configuration

Create a `.env` file in the project root with the following variables:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_APP_ENV=development

# Optional — Only required if enabling AI features (post-MVP) 
VITE_OPENAI_KEY=your_openai_key
```

Refer to `.env.example` if present.

---

## 5. Running the Application

To run locally:

```bash
npm run dev
```

This launches the frontend on the default Vite port (usually `localhost:5173`).

---

## 6. Deployment to Production

### Option 1: Vercel

1. Connect your GitHub repo to Vercel.
2. Configure environment variables in Vercel settings.
3. On push to `main`, Vercel will deploy the latest version.

### Option 2: Netlify

1. Set build command to `npm run build`.
2. Set publish directory to `dist`.
3. Add environment variables.

### Option 3: Custom Static Hosting

1. Run `npm run build` to generate files in `dist/`.
2. Upload to your hosting provider.
3. Ensure environment variables are correctly configured.

---

## 7. Verification

After deployment:

- Load the deployed URL.
- Sign in or sign up.
- Create a new document.
- Ensure document is saved and preview updates correctly.
- Check browser dev tools for errors.

---

## 8. Troubleshooting

| Issue | Possible Solution |
|-------|-------------------|
| 404 on deploy | Set `base` in `vite.config.ts` if deploying to subpath |
| Supabase not connecting | Double-check Supabase keys and region URL |
| Styles broken | Confirm Tailwind and `shadcn/ui` are properly configured and built |
| `.env` ignored | Restart `npm run dev` after changes to `.env` |
| Guest mode errors | Ensure guest permissions are handled in routing logic |

---

## Notes

- `.mylo` is the only supported local file extension.
- Guest mode is for testing/demo only.
- All documents are saved in Supabase unless explicitly downloaded.

For further configuration, consult the Lovable AI integration notes or Supabase documentation.
