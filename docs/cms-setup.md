# ManaMind CMS - setup, status, and handoff

A CMS lets the ManaMind team edit site content (case studies, careers, press,
investors, partners, team) at `/admin` without code. This doc is the single
reference: how it works, what is already done, and the exact steps left to hand
it over to Emil.

Last updated: 2026-06-12.

---

## 1. What it does

- Content lives as markdown files in `content/` (one folder per section).
- Build-time loaders in `src/lib/content/` read those files and feed the page
  components. No design changed; only the data source moved from hardcoded TS to
  markdown.
- The CMS at `/admin` (Sveltia, Decap-compatible) edits those markdown files.
  Saving commits to GitHub, which triggers a Cloudflare Pages rebuild, which
  republishes the site.

Edit in /admin -> commit to GitHub -> Cloudflare rebuilds -> live. No developer
in the loop.

### Editable sections (all add / edit / delete)

| Section | Folder |
|---|---|
| Case studies | `content/case-studies/` |
| Careers / roles | `content/roles/` |
| Press mentions | `content/press/` |
| Investors | `content/investors/` |
| Partners | `content/partners/` |
| Team members | `content/team/` |

Marketing copy, bots, legal pages, and navigation are intentionally NOT editable
(layout-coupled, rarely change).

---

## 2. Current status (proven on staging)

Everything below is built and verified working on a real hosted URL. The live
production site at manamind.ai has NOT been touched.

- **Staging site (Git-connected, auto-deploys):**
  https://manamind-cms-staging.pages.dev
  - Admin: https://manamind-cms-staging.pages.dev/admin
  - Cloudflare Pages project `manamind-cms-staging`, in Emil's Cloudflare
    account, connected to the GitHub repo below. Build command `npx next build`,
    output `out`, `NODE_VERSION=20`, production branch `master`.
- **GitHub repo (source of truth, currently Aniket's):**
  `writetoaniketparihar-collab/-manamind-redesign`, branch `master`.
- **Login auth worker:** `https://manamind-cms-auth.emil-fee.workers.dev`
  (deployed in Emil's Cloudflare account; the Sveltia `sveltia-cms-auth` worker).
- **GitHub OAuth App:** "ManaMind CMS" under Aniket's GitHub. Callback URL
  `https://manamind-cms-auth.emil-fee.workers.dev/callback`. Client ID/secret
  stored as encrypted variables on the worker.

Verified end to end on 2026-06-12: logged in via GitHub at the staging /admin,
edited a press title, it committed to GitHub, Cloudflare auto-rebuilt, and the
change appeared live on the staging site.

Config that ties it together is in `public/admin/config.yml` (`backend.repo` and
`backend.base_url`).

---

## 3. Test it (two ways)

**Locally (no login, edits local files):**
1. `npm run dev`
2. Open `http://localhost:3000/admin/index.html` in Chrome or Edge. (Local dev
   needs the full `/admin/index.html`; the clean `/admin` works only on the
   hosted site.)
3. Choose "Work with Local Repository" and pick the project folder.

**Hosted (real login + auto-publish):**
1. Open https://manamind-cms-staging.pages.dev/admin
2. Sign in with GitHub, approve the "ManaMind CMS" app.
3. Edit something, Save. Wait ~2 min, refresh the public page to see it live.

---

## 4. Remaining work: hand off to Emil

The staging setup is owned by Aniket's GitHub. To make this Emil's, with the same
loop running on manamind.ai, do the following once Emil has a GitHub account and
you have his username (or a ManaMind GitHub org).

### 4a. Transfer the GitHub repo to Emil
1. Repo on GitHub -> **Settings** -> bottom **Danger Zone** -> **Transfer**.
2. Type the repo name to confirm, enter Emil's GitHub username (or org).
3. Emil receives an email and must **accept** to finalize.
4. After accepting, Emil should add Aniket back as a **collaborator** so Aniket
   can keep maintaining it.
5. (Optional) Rename the repo from `-manamind-redesign` to something cleaner like
   `manamind-website`.

Transferring breaks the current staging auto-deploy (Cloudflare is connected to
the repo under Aniket's account). That is expected.

### 4b. Repoint the CMS config
In `public/admin/config.yml`, change `backend.repo` to the new owner, e.g.
`emilusername/manamind-website`. Commit and push.

### 4c. Reconnect Cloudflare Pages
Either reconnect `manamind-cms-staging` to the transferred repo, or create the
real production Pages project pointed at manamind.ai. Same build settings:
`npx next build`, output `out`, `NODE_VERSION=20`, branch `master`. Connect via
the Cloudflare GitHub app installed on the repo's new owner.

### 4d. Auth worker / OAuth (optional move)
The worker and OAuth App can stay as-is (they work regardless of repo owner) or
be recreated under Emil's accounts for full ownership. If recreated, update
`backend.base_url` and the OAuth callback accordingly.

---

## 5. Notes and cleanup

- **Case studies are hidden** behind `CASE_STUDIES_LIVE = false` in
  `src/config/flags.ts` (shows "Coming Soon"). Flip to `true` to publish. Two of
  the three samples (Bitwave, Lumen Labs) are placeholder studios; replace with
  real ones before going live.
- **Redundant project to delete:** `manamind-staging` (the earlier
  manual-upload project, superseded by `manamind-cms-staging`).
- **Junk file:** `public/manamind-logo-original-backup.png` is an untracked
  backup; safe to delete.
- Uploaded images land in the matching `public/` subfolder per section (e.g.
  team photos in `/public/team`).
- Static export serves `/about`, not `/about/`.
