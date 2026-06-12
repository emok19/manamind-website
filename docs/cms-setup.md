# ManaMind CMS setup and handoff

The site content (case studies, careers/roles, press, investors, partners, team)
is now editable through a CMS at `/admin`. This doc covers how it works, how to
test it, and the three wiring steps still needed to let Emil log in and publish.

## How it works

- Content lives as markdown files in `content/` (one folder per collection).
- At build time, loaders in `src/lib/content/` read those files and feed the
  existing page components. No component logic changed; only the data source did.
- The CMS (Sveltia, Decap-compatible) at `/admin` edits those markdown files.
  Saving commits to GitHub, which triggers a Cloudflare Pages rebuild, which
  republishes the site. Edit -> commit -> rebuild -> live.

## What Emil can do

| Collection | Add | Edit | Delete |
|---|---|---|---|
| Case studies | yes | yes | yes |
| Careers / roles | yes | yes | yes |
| Press mentions | yes | yes | yes |
| Investors | yes | yes | yes |
| Partners | yes | yes | yes |
| Team members | yes | yes | yes |

Marketing copy, bots, legal pages, and navigation are intentionally not editable
(they are layout-coupled and rarely change).

## Test it locally right now (no GitHub needed)

1. `npm run dev`
2. Open `http://localhost:3000/admin` in Chrome or Edge.
3. `local_backend: true` is set, so it edits the local files directly via the
   browser File System Access API. Pick the project root folder when prompted.
4. Make an edit, save, and confirm the markdown file in `content/` changes.

## Three steps to make Emil's hosted login work

All three need Emil's GitHub username or a ManaMind GitHub org name. Placeholders
to replace are marked `TODO` in `public/admin/config.yml`.

1. **Repo in Emil's GitHub.** Move/own the repo under Emil's account, then set
   `backend.repo` in `config.yml` to `OWNER/REPO` (e.g. `manamind/manamind-redesign`).

2. **OAuth worker for login.** Sveltia needs a tiny auth relay because the site
   is on Cloudflare, not Netlify. Deploy the open-source `sveltia-cms-auth`
   Cloudflare Worker, create a GitHub OAuth App (callback = the worker URL), and
   set `backend.base_url` in `config.yml` to the worker URL. One-time, ~20 min.

3. **Auto-deploy on push.** In the Cloudflare Pages project, connect the GitHub
   repo (Settings -> Builds & deployments) with build command `npx next build`
   and output dir `out`. This replaces manual `wrangler` uploads so a CMS save
   republishes automatically.

## Notes

- Case studies are currently behind `CASE_STUDIES_LIVE = false` in
  `src/config/flags.ts`, so that section shows "Coming Soon". Flip to `true` to
  publish it. Two of the three sample case studies (Bitwave, Lumen Labs) read as
  placeholder studios and should be replaced with real ones before going live.
- Uploaded images land in the matching `public/` subfolder per collection
  (e.g. team photos in `/public/team`), so paths stay clean.
