# Deployment Manual — v2.1

June 2025

---

# Overview

This deployment manual outlines the steps required to locally run, test, and deploy the Mylo application. It includes instructions for setting up the environment, connecting to Supabase, and configuring frontend deployment via Vercel or Netlify.

---

# MVP Scope

- One-click deploy support to Vercel and Netlify
- `.env` configuration guidance
- Supabase environment integration
- Cross-platform local dev support (Mac, Linux, Windows)
- Browser support expectations
- Deployment safety notes

---

# Main Behavior Sections

## Save Behavior Rules

*Not applicable for deployment manual.*

## UI Behavior

*Not applicable — this is a technical document.*

---

# Deployment Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

Make sure Node.js and npm are installed (LTS version recommended).

---

### 2. Connect Supabase Project

Create a `.env` file and add your Supabase credentials:

```bash
SUPABASE_URL=https://xyzcompany.supabase.co
SUPABASE_ANON_KEY=public-anon-key
```

Other optional environment variables:

```bash
NEXT_PUBLIC_SITE_NAME=Mylo
ENABLE_ANALYTICS=false
```

---

### 3. Run Locally

```bash
npm run dev
```

Starts the development server at `http://localhost:3000`.

---

### 4. Deploy to Vercel or Netlify

- **Vercel**: Use Vercel CLI or GitHub auto-deploy. Add `.env` vars in Vercel dashboard.
- **Netlify**: Add project repo, set build command to `npm run build`, and supply `.env` vars.

---

### 5. Configure Production Settings

For production builds:

```bash
npm run build
npm run start
```

Use environment variables securely. Do **not** expose `SERVICE_ROLE_KEY` in client-side code.

---

# Technical Sections

## Browser Support

| Browser | Status |
|---------|--------|
| Chrome | ✅ Full support |
| Firefox | ✅ Full support |
| Safari | ✅ Full support |
| Edge | ✅ Tested |
| Mobile browsers | ⚠️ Not optimized for mobile (MVP) |

---

## Build Artifacts

- Build outputs go to `.next` directory
- PDF engine may require Puppeteer if server-side rendering used (Post-MVP)

---

# Error Handling

| Condition | Behavior |
|----------|----------|
| Missing `.env` variables | Startup fails with descriptive error |
| Supabase connection fails | App shows login screen failure |
| Build script error | CI fails with exit code |
| Environment mismatch | Logs warning with guidance on setup |

---

# Known Gaps / Outstanding Questions

- Should we support Docker for local dev? (Status: Open)
- Should Supabase seeding be automated? (Post-MVP)
- Can staging and prod builds share auth configs? (TBD)

---

# Future Enhancements (Post-MVP)

- Docker-based setup with seeding
- Staging/production branch deployment support
- GitHub Actions workflow for automated testing and deploy
- CLI tool for config file validation

---

# Technical Dependencies

- Supabase project (auth, database, storage)
- Node.js LTS
- Vercel or Netlify CLI (optional)
- `dotenv` for loading environment variables

---

# API / Data Schema Notes

- Not applicable to deployment manual

---

# Version

Deployment Manual v2.1 — June 2025
