# Bright Tec. Park — Next.js (JavaScript)

Next.js (App Router) + React + JS/JSX + Tailwind CSS v4 + HeroUI + Gravity UI + Better Auth + MongoDB.

## Run
1. `cp .env.example .env.local` and fill in `MONGODB_URI`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL` (Google keys optional).
2. `npm install`
3. `npm run dev` → http://localhost:3000
4. `npm run build` to verify a production build.

## Admin (/admin)
- Login at `/admin/login` with `ADMIN_EMAIL` / `ADMIN_PASSWORD` from `.env.local`. There is **no admin registration**; change the credentials only by editing the env file.
- Controls: courses (create/edit/launch/cancel, batch & seats, fees), admissions (confirm enrolment, record payments: cash/bKash/Nagad/Rocket/bank + trx ID, due amount, receipt print, CSV), teachers, 10-day roadmap, reviews, notices, facilities, certificates, newsletter subscribers, and site settings (phones, address, hours, map, offer/coupon).
- Content starts from built-in defaults. In each admin tab click **"ডিফল্ট ডাটা ইমপোর্ট করুন"** once, then everything is editable and the website shows the database content immediately.
- Change the default admin password before deploying publicly.

## Google Drive / Sheets / Docs
Requires `GOOGLE_CLIENT_ID/SECRET`. In Google Cloud enable the Drive, Sheets and Docs APIs and add `BETTER_AUTH_URL/api/auth/callback/google` as a redirect URI. Students connect Google inside `/student-portal`.

## Logos
Drop the official BTEB logo at `public/bteb-logo.png` (a text seal is shown until then).

## Routes
`/` · `/courses` · `/courses/[id]` · `/admission` · `/teachers` · `/roadmap` · `/calculator` · `/verify` · `/campus` · `/ai-studio` · `/login` · `/register` · `/teachers/[id]` · `/student-portal` (protected) · `/admin` (admins only)

## API
`/api/auth/*` (Better Auth) · `/api/admissions` · `/api/newsletter` · `/api/certificates?q=` · `/api/ai-image`

## MongoDB collections
`admissions`, `newsletter_subscribers`, `certificates` (add real records here; 4 seed records are used as fallback), plus Better Auth's own collections.

## Not verified / to check after install
- This package was written without network access: `npm install` and `next build` have NOT been run. Only a JSX/JS syntax check (tsc) was run, with no syntax errors.
- Versions in package.json are major-version ranges; HeroUI v3 and Next 16 APIs may need small tweaks (HeroUI is used only in `components/ui/Button.jsx`, Gravity UI only in `components/ui/StatusLabel.jsx` + ThemeProvider).
- Offer period / batch dates in data/ are from the original (April–June 2026) and are now past — update `data/`.

## Real photos / banners (optional)
Put your original files in `public/` with these exact names and they replace the built-in illustrations automatically: `20211010_170230_edited.jpg` (campus building), `IMG_2810.JPG` (lab), `IMG_2816.JPG` (certificates), `IMG_0759_edited.png` (BENGAL ONE banner), `bteb-logo.png`.

## Optional env
`GEMINI_API_KEY` enables AI image **editing** in /ai-studio (text-to-image works without it).

## Branding
Name: **Bright Tec. Park** · logo files in `public/logo.png`, `public/logo-mark.png`, favicon `app/icon.png` · palette: green `#2F9606`, orange `#FF6600` (see `app/globals.css`). BTEB code 27117 and the Govt. Reg. seal are kept as-is.
