# StreakLy — Dev Log & Build Roadmap

> Your daily tracker for building StreakLy.
> **Rule:** every coding day, tick boxes + add one entry to the Daily Log at the bottom.
> Started: **Tue, 2026-10-13**

---

## 1. The Big Picture (read this first)

### How the pieces talk to each other

```
 [ React app ]  ── 1. log in ──────────────▶  [ Supabase Auth ]
  (Vercel)      ◀─ 2. gets a token (JWT) ───   (handles passwords)
      │
      │ 3. calls API + sends token
      ▼
 [ Express API ]  ── 4. checks token ──────▶  [ Supabase Auth ]
  (Render)
      │
      │ 5. runs SQL
      ▼
 [ PostgreSQL ]  (hosted by Supabase)
```

- **Supabase is NOT a new kind of database.**
  - It's just **PostgreSQL** (like your Neon DB) plus extras.
  - Extras you'll use: **Auth** (login) and **Storage** (proof photos).
- **What changes vs. SkolarTrack:**
  - You **don't** store passwords yourself.
  - Supabase keeps users in its own table: `auth.users`.
  - Your `profiles` table just points to it.
- **Your Express server still does the real work.**
  - Routes, validation, business rules (streaks, friends-only feed).

### Why we start with the database (same as SkolarTrack)

- Your old instinct was **correct** — keep it.
- Every feature reads/writes tables. No tables = nothing to build on.
- Your schema is already designed (v0.2) — we just finish and run it.
- Bugs in the data design are the **most expensive** to fix later.

### Why we deploy early (new habit)

- A "hello world" deployed in week 1 is better than a full app that breaks on deploy in week 10.
- Matches **Agile** (working software early) and **NFR_4** (available all semester).
- This is called a **walking skeleton**: thin, end-to-end, deployed, then you add muscle.

---

## 2. Roadmap

Legend: `[ ]` todo · `[x]` done · `(UC / FT)` = RTM link

### Phase 0 — Setup (Day 1–2)

- [x] Create GitHub repo `streakly` (empty, with README)
- [x] Add `.gitignore` **first** (must include `node_modules/` and `.env`)
- [x] Create a Supabase account + new project
  - [x] Region: **Singapore** (closest to PH = faster)
  - [x] Save the DB password in a password manager (not in the repo)
- [x] Explore the Supabase dashboard for 15 mins: Table Editor, SQL Editor, Authentication, Storage
- [x] Create folders: `db/` and `docs/` only (nothing else yet)
- [x] Put this file in `docs/`
- [x] First commit: `chore: initial repo setup`

### Phase 1 — Database (Day 3–6)

- [x] Finish schema **v0.3** — add relationships (foreign keys)
  - [x] `profiles.id` → `auth.users(id)` (on delete cascade)
  - [x] `subjects.user_id` → `profiles.id`
  - [x] `topics.subject_id` → `subjects.id`
  - [x] `study_sessions.topic_id` / `user_id`
  - [x] `daily_plans`, `daily_plan_items`, `friendships`, `reactions`
- [x] Add rules (CHECK constraints) → NFR_3
  - [x] `ended_at > started_at`
  - [x] `estimated_hours > 0`
  - [x] `requester_id <> addressee_id` (no friending yourself)
  - [x] unique: subject name per user, topic name per subject
- [x] Write it as numbered files: `db/001_tables.sql`, `db/002_constraints.sql`
- [x] Run each file in the Supabase **SQL Editor**
- [x] Add a trigger: auto-create a `profiles` row when someone signs up
- [x] **Turn on RLS for every table** (see Gotchas below)
- [x] Test by hand: insert fake rows in Table Editor, try breaking a rule → should fail
- [x] Commit: `feat(db): schema v0.3`

### Phase 2 — Server skeleton (Day 7–10)

- [x] Create `server/` → `npm init`, install Expres s + TypeScript
- [x] `GET /health` → returns `{ ok: true }`
- [x] Connect to Supabase Postgres (connection string in `server/.env`)
- [x] `GET /health/db` → runs `SELECT 1` to prove the DB connection works
- [x] Deploy to **Render** (env vars set in Render dashboard)
- [x] Commit: `feat(server): walking skeleton`

### Phase 3 — Client skeleton (Day 11–13)

- [x] Create `client/` with Vite (React + TypeScript template)
- [x] Add Tailwind
- [x] Page calls the API `/health/db` and shows "Server: connected"
- [x] Deploy to **Vercel** (API URL in env var)
- [x] ✅ **Milestone: full skeleton live on the internet** (2026-10-23)

### Phase 4 — Auth (Day 14–20) → UC01–UC04 / FT_1–FT_4

- [x] Client: Sign up + Log in with `supabase-js` (UC01, UC02)
- [x] Client: React Router — `/signup`, `/login`, `/today` (`/` → `/today` for now, until the landing page)
- [x] Client: Vercel SPA rewrite (`client/vercel.json`) so refreshing `/login` doesn't 404
- [x] Client: `AuthProvider` + `useAuth` — one shared session (`undefined` loading / `null` logged out / `Session`)
- [x] Client: Route guards — `RequireAuth` (logged-out → `/login`, remembers where they were going) and `RedirectIfAuthed` (logged-in → back to that page, else `/today`)
- [x] Client: Log out (UC03)
- [x] Client: Reset password (UC04)
- [x] Server: `requireAuth` middleware — reads token, asks Supabase "who is this?" _(written, not yet tested)_
- [x] Server: `GET /me` → returns `{ profile: { name } }` (no more raw `pg` result)
- [x] Test: no token → `401`

### Phase 4.5 — Landing page

- [x] Design calls: grey `paper` background (one token, easy to swap), Streak Grid logo, flame only as the in-app streak icon, product visuals instead of photos
- [x] Design tokens (`@theme` in `index.css`) + Google Fonts (Bricolage Grotesque, Plus Jakarta Sans)
- [x] Route `/` → `Landing` under `RedirectIfAuthed`; removed the debug header, health check and links from `App.tsx`
- [x] Logo: `public/logo.svg` (Streak Grid)
- [x] Nav: logo + How it works · Friends · Log in
- [x] Hero: headline + description, page capped at 1280px (`max-w-7xl`)
- [x] Week strip: 7 squares from a `week` array (`.map`), today outlined
- [x] Streak count (derived from `week`) + email form → `/signup` with `{ email }` in state, SignUp pre-fills it _(written; test the pre-fill)_
- [x] Estimate card: "Plan in hours, then see the real time beside it." (two bars + legend)
- [x] Sticky header with an outlined Sign up (the hero's "Start your streak" is the one filled button)
- [x] Animations: squares fill one by one, durations and caption fade in, off under reduced motion
- [x] Sections below the hero: How it works (`#how`), Friends (`#friends`, sample feed), night footer. Dropped the FAQ and closing CTA.
- [x] Phone layout: responsive classes (`clamp()` headline, `minmax` grids, stacked form) _(check on a real phone)_
- [x] Split into components: `ReactionButton`, `FeedPost`, `Footer`, `sampleWeek.ts` in `components/landing/`; icons from `@phosphor-icons/react`
- [ ] Motion pass (designed in `design/landing.html`): scroll-driven bars / step squares / feed / footer week, footer night grid, plus pick hero options (A–E)
- [ ] Accessibility pass (landmarks, focus, contrast)

### Phase 5 — First real feature: Manage Subjects → UC05 / FT_5

- [x] API: list, create, edit, archive, unarchive (`GET /subjects`, `POST /subjects`, `PATCH /subjects/:id`, `PATCH /subjects/:id/archived`)
- [x] Every query filters by `user_id` (privacy, NFR_1)
- [x] Split into `subjects/` routes, controller, model (D8, D15)
- [ ] Remove repeated code in the controller (name check, `22P02` / `23505` handling)
- [ ] UI: Subjects page
- [ ] ✅ **Milestone: first feature works end-to-end, deployed**

### Phase 6+ — Cycle 1 features (in dependency order)

- [ ] Manage Topics (UC06 / FT_6) — needs subjects
- [ ] Log a Study Session — timer + manual (UC08 / FT_8)
- [ ] View Session History (UC10 / FT_10)
- [ ] Track Streak + calendar (UC11 / FT_11)
- [ ] Plan the Day (UC07 / FT_7)
- [ ] Study Analytics (UC12 / FT_12)
- [ ] Pomodoro (UC09 / FT_9)
- [ ] Focus Audio — stretch (FT_20)

### Cycle 2 — Peer accountability

- [ ] Send / Respond / Remove friend (UC14–UC16 / FT_14–FT_16)
- [ ] Friends' feed + reactions (UC17 / FT_17)
- [ ] Share toggle (FT_19), proof photo via Supabase Storage (FT_18)

### Cycle 3 — Reports

- [ ] Weekly report, estimation trend, export (UC13 / FT_13)
- [ ] Fixes from user acceptance testing with Yvonne

---

## 3. Decisions Log

| #   | Date       | Decision                                                                                                               | Why                                                                                                                                                                                  |
| --- | ---------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| D1  | 2026-10-13 | Start database-first, then walking skeleton                                                                            | Everything depends on tables; deploy early to avoid end-of-sem surprises                                                                                                             |
| D2  | 2026-10-13 | One repo, folders `client/`, `server/`, `db/`, `docs/`                                                                 | Simple for a solo dev; one place for code + SQL + docs                                                                                                                               |
| D3  | 2026-10-13 | Create folders/files **only when needed**                                                                              | Your SkolarTrack habit — avoids empty, confusing structure                                                                                                                           |
| D4  | 2026-10-13 | Supabase Auth for login; Express verifies the token                                                                    | Don't build password handling yourself (security risk)                                                                                                                               |
| D5  | 2026-10-17 | Express queries the DB with the `pg` driver (`Pool` in `server/src/config/db.ts`) + own TS interfaces                  | Good TS practice, no ORM magic. Drizzle can come later if needed                                                                                                                     |
| D6  | 2026-10-17 | Enforce commit style with commitlint + husky (+ `.gitmessage` template)                                                | Consistent history (`feat(scope): ...`) from day one                                                                                                                                 |
| D7  | 2026-10-25 | "Confirm email" is OFF in Supabase while developing; decide before launch                                              | Lets me test sign-up without real inboxes. Must revisit: with it off, anyone can register an email they don't own                                                                    |
| D8  | 2026-11-08 | Keep SQL inline in `server/src/index.ts` until Phase 5, then split into routes/models                                  | Follows D3: only one real route so far, so a models folder would be empty structure                                                                                                  |
| D9  | 2026-11-08 | Server Supabase client is stateless (`persistSession: false`, `autoRefreshToken: false`); verify with `getUser(token)` | Every request brings its own token, so the server must never hold a session. `getUser` asks Supabase, so it also rejects tokens from users who signed out (a local JWT decode can't) |
| D10 | 2026-11-10 | Client session comes only from `onAuthStateChange` (no separate `getSession()`), shared through `AuthProvider`         | Subscribing fires `INITIAL_SESSION` right away, then login, logout, token refresh and other tabs. One source means no race between two calls                                         |
| D11 | 2026-11-11 | Redirects live in the route guards only; pages (Login, Today) never `navigate` after auth changes                      | One place decides where the user goes. Logout in another tab or a "go back to where you were" redirect then works without extra code in each page                                    |
| D12 | 2026-11-11 | Landing page on `/` combines the Ember Evolved exploration with StreakLy Brand & UI                                    | The direction the user chose                                                                                                                                                         |
| D13 | 2026-11-11 | Grey `paper` background for now; Streak Grid logo; flame only as the in-app streak icon; no stock photos               | Background is one token, easy to swap. The flame is generic across streak apps; the grid is unique. Photos say nothing about the product                                             |
| D14 | 2026-11-11 | Landing email form sends the visitor to `/signup` with `{ email }` in router state; browser does the validation        | No mailing list exists, so "check your inbox" would be false. `type="email"` + `required` avoids writing a regex                                                                     |
| D15 | 2026-11-20 | Server code grouped by feature (`subjects/` holds routes, controller, model), not by layer. Only the model runs SQL; only the controller knows HTTP | Cohesion: files that change together live together. Matches the modules in PD_1 (NFR_5). By layer would spread one feature over three folders |
| D16 | 2026-11-20 | Archive and unarchive share one route, `PATCH /subjects/:id/archived` with `{ "is_archived": true/false }` | One route instead of two near-identical ones. Named after the value it sets, so `false` reads correctly; the key matches the column and the GET response |
| D17 | 2026-11-20 | Duplicates are caught by the DB `unique` constraint (`23505` → 409), not a `SELECT` before the `INSERT` | A pre-check has a race (double-click: both requests see "no", both insert). The constraint checks and inserts in one step |

---

## 4. Gotchas (things that trip up Supabase beginners)

- **RLS (Row Level Security) — turn it ON for every table.**
  - Supabase auto-creates a public API for your tables.
  - Without RLS, anyone with your public key could read them.
  - RLS on + no policies = public API blocked. Your Express server still works (it connects directly).
- **Two kinds of keys.**
  - `anon` key → safe for the React app.
  - `service_role` key → **server only. Never** put it in `client/` or GitHub.
- **`.env` never goes in Git.** Add it to `.gitignore` before your first commit.
- **Time zones.** Store timestamps in UTC; streaks use `local_date` (the student's own day).
- **Free tier pauses** after ~1 week with no activity. Opening the dashboard wakes it up.
  - Symptom: `pg` error `tenant/user postgres.<project> not found` from the pooler.
- **Never trust a user id from the URL or body.** The server takes it from the verified token only (`res.locals.userId`).
- **Empty token = danger.** `getUser("")` falls back to the client's saved session, so `requireAuth` must reject a missing token before calling it.
- **`npm audit fix --force` can downgrade packages** across major versions. Read what it changes; revert with `git checkout -- package.json package-lock.json`.
- **Single-page apps 404 on refresh in production.** Vercel looks for a real `/login` file. `vercel.json` rewrites every path to `index.html` so React Router can handle it.
- **Hooks go before any early `return`.** React needs hooks called in the same order every render; a `return null` above `useLocation()` would skip it on some renders.
- **Don't redirect while the session is still `undefined`.** Supabase hasn't answered yet; guessing "logged out" sends logged-in users to `/login` on every refresh.
- **Commit new files together with the files that import them.** Untracked files don't show in `git diff`; committing only `App.tsx` would break the build at that commit.
- **`index.html` is plain HTML, not JSX.** Use `class`, not `className`. The browser ignores attributes it doesn't know.
- **Tailwind ignores unknown classes without warning.** Typos like `sr-on`, `px3.5` or `hover:shadow-sheet` just do nothing. Check with DevTools → Inspect → Styles.
- **Tailwind v4: a plain number in `leading-*` is a spacing unit.** `leading-1` = 4px line-height. Line-height 1 is `leading-none`.
- **An SVG in `<img>` can't see the page's CSS.** No CSS variables, no `currentColor`. Hard-code colors in `public/` files; put icons that follow the text color inline.
- **`<Navigate>` vs `navigate()`.** The component only works when rendered (guards). In event handlers, use the `useNavigate()` function.
- **Label router state:** send `{ email }`, not a bare string, and read `location.state?.email ?? ""`. `location.state` is `any`, so TypeScript won't catch a wrong shape.
- **`<ol>` / `<ul>` may only contain `<li>`.** Anything else confuses screen readers and the grid.
- **`React.FormEvent` is deprecated** in the current React types. Use `React.SubmitEvent<HTMLFormElement>` for form submits.
- **`overflow-hidden` freezes scroll-driven animations.** It turns the element into a scroll container, so `view()` follows it instead of the page. Use `overflow-clip`.
- **A keyframe that ends at `clip-path: none` snaps instead of animating.** Give it an explicit `to { clip-path: inset(0); }`. Opacity and transform don't need this.
- **Scroll animations at the bottom of the page need pixel ranges.** The page can't scroll past the footer, so a percentage end point might never be reached.
- **A CSS duration or delay needs a unit.** `"2400"` is thrown away; `"2400ms"` works.
- **`motion-reduce:animate-none` freezes; `motion-reduce:hidden` removes.** Remove anything that would read as data when frozen (like the half-filled session tide).
- **Check which module auto-import picked.** `Fragment` comes from `"react"`, not `"react/jsx-runtime"`.
- **`result.rows` is always an array, even with no match.** `[]` is truthy, so `if (!result.rows)` never fires. Check `rows[0]`.
- **An `UPDATE` that matches nothing is not an error.** It changes 0 rows and returns `[]`. An `INSERT` either returns the row or throws.
- **Postgres error codes to translate:** `23505` duplicate → 409, `22P02` not a valid uuid (`/subjects/abc`) → 404. Check them with `err instanceof DatabaseError` (from `pg`) so TypeScript allows `err.code`.
- **`if (!value)` rejects `false`.** For a boolean input, check `=== null`, or unarchiving (`false`) gets a 422.
- **Postman's raw body defaults to Text.** Pick **JSON**, or `express.json()` skips the body and `req.body` is `undefined`. In Express 5, use `req.body?.name`.
- **`req.params` in a separate controller is `string | string[]`.** Type it with `Request<{ id: string }>`. `req.params.id[0]` silences the error but gives the first character.
- **`req.body` is `any`.** TypeScript won't warn when you pass it to a typed function, so validate it yourself.
- **A handler that neither sends a response nor calls `next()` hangs the request.** An empty `catch {}` does exactly that.

---

## 5. Mini Glossary

- **Supabase** — hosted Postgres + login + file storage.
- **JWT / token** — a signed "ID card" the client gets after login and sends with each API call.
- **Middleware** — a function that runs before your route (e.g. "is this user logged in?").
- **Migration** — a numbered SQL file that changes the database. Run in order.
- **Walking skeleton** — the thinnest version of the whole app, deployed, end to end.
- **RLS** — Postgres rules that control which rows each user can see.
- **Context / Provider** — a "bulletin board" in React: the Provider pins a value up, any component below reads it (`useAuth()`) without passing props down.
- **Route guard** — a layout route that checks something (logged in?) and either redirects with `<Navigate>` or shows the page with `<Outlet />`.
- **Navigate `state`** — a note attached to a redirect; the next page reads it with `useLocation().state`.
- **Design token** — a named design value (color, font) defined once. In Tailwind v4, `--color-paper` inside `@theme` creates `bg-paper`, `text-paper`, etc.
- **Props** — the inputs a component receives, like function arguments. `{...r}` (spread) passes every field of an object as props.
- **`key`** — a unique id React needs on each element a `.map()` returns, so it can tell list items apart between renders.
- **Scroll-driven animation** — CSS `animation-timeline: view()`: the animation's progress follows the element's position on screen instead of a clock, so it plays as you scroll and reverses when you scroll back.
- **`@property`** — registers a CSS variable with a type (like `<integer>`), so the browser can animate it instead of jumping between values.
- **Fragment** — `<Fragment>` / `<>` groups several elements without adding a wrapper to the page. Use the long form when it needs a `key`.
- **Derived state** — a value computed from state you already have (like the shown reaction count from `isPressed`), instead of a second piece of state to keep in sync.
- **Landmark** — a region screen readers can jump to: `<header>`, `<nav>`, `<main>`, `<footer>`. One `<main>` per page.

---

## 6. Daily Log

> Format: date · what I did · what I learned · next step. Keep it 3–5 lines.

### Day 1 — Tue, 2026-10-13

- **Did:** Planned the build order with my mentor. Created this dev log.
- **Learned:** Supabase = Postgres + Auth + Storage. Same DB-first approach as SkolarTrack still works.
- **Next:** Phase 0 — GitHub repo, `.gitignore`, Supabase project (Singapore).

### Day 2 - Friday, 2026-10-16

- **Did:** Finished Phase 0 and Phase 1. Created the initial Setup in my local directory and the initial Setup for the Supabase. Finished creating the sql file and the database tables and I already queried it to the supabase.
- **Learned** Supabase user authentication, table editors, sql editors, storage.
- **Next:** Phase 3 - Server skeleton and /health check

### Day 3 — Sat–Sun, 2026-10-17 to 2026-10-18

- **Did:** Set up commitlint + husky + a commit message template. Scaffolded `server/` (Express 5, TypeScript, `tsx` dev script, `pg`, `dotenv`). Moved the entry point to `server/src/index.ts`, added the `pg` pool in `server/src/config/db.ts`, and wrote `GET /health` and `GET /health/db` (`select 1`).
- **Learned:** Express setup (`express.json()`, routes, `app.listen`), how a `pg` `Pool` takes the connection string from `.env`, and that the app should fail fast if `DATABASE_URL` is missing.
- **Stuck on:** Nothing recorded yet. `/health/db` still needs a real run against Supabase.
- **Next:** Run `npm run dev`, hit `/health` and `/health/db`, then commit the `src/` restructure and deploy to Render.

### Day 4 — Fri, 2026-10-23

- **Did:** Added CORS to the Express server (origin from `CLIENT_ORIGIN`), built the client health-check page with Vite + React + Tailwind, and deployed it to Vercel with `VITE_API_URL` pointing at the Render API. Set `CLIENT_ORIGIN` on Render to the Vercel production URL. The live page shows "Server: connected".
- **Learned:** The browser blocks cross-origin API calls unless the server sends CORS headers. `VITE_` env vars are baked into the client bundle, so they must be public values. Client and server each need the other's URL, so deploy order matters. Vercel has a production domain, a branch alias and per-deploy URLs; only the production one goes in CORS.
- **Stuck on:** `/health/db` hung on mobile data. Postgres connections stalled while HTTPS worked, and the same setup worked on school Wi-Fi, so the likely cause is my carrier filtering Postgres traffic. Fix for now: develop on Wi-Fi.
- **Next:** Phase 4 — Supabase Auth: sign up / log in with `supabase-js`, then `requireAuth` middleware and `GET /me`.

### Day 5 — Sun, 2026-10-25

- **Did:** Added `@supabase/supabase-js` and a shared client in `client/src/lib/supabase.ts` (fail-fast guard on the two env vars). Built the `SignUp` page (controlled inputs, `signUp`, loading state, error/success message) and tested short password, duplicate email and empty fields. Added the Supabase env vars on Vercel and redeployed; sign-up works on the live site and the `profiles` trigger creates the row.
- **Learned:** The client talks to Supabase **Auth** (anon key, gets a JWT) while the server talks to the **Postgres** database; the token links them. A JWT carries `sub` (user id), `exp`, `email` and a DB `role`, and is signed so it can't be edited. `VITE_` vars are public by design (anon key and URL are safe; `service_role` never is). Vercel warns about `VITE_` + key names; I had to use "Change to Config" to save them.
- **Stuck on:** Vercel blocked saving the `VITE_` variables until I switched them to Config. With confirmation off, `signUp` logs the user in, so the "Check your email" message is wrong for now.
- **Next:** Log-in page (UC02, `signInWithPassword`), then a design pass on the shared auth screen, then `requireAuth` and `GET /me`.

### Day 6 — Fri–Sun, 2026-11-06 to 2026-11-08

- **Did:** Built the `Login` page (`signInWithPassword`, `autoComplete="current-password"`). Added React Router: `BrowserRouter` in `main.tsx`, routes for `/signup` and `/login`, `/` redirects to `/login`. Reverted an `npm audit fix --force` that downgraded eslint 10 → 9. On the server: added `@supabase/supabase-js`, a stateless client in `server/src/lib/supabase.ts`, the `requireAuth` middleware (checks header, `Bearer` format, empty token, then `getUser(token)`, stores `res.locals.userId`), and a first version of `GET /me` (parameterized `SELECT` on `profiles`, 404 if missing).
- **Learned:** `BrowserRouter` must wrap everything that uses router hooks or `<Link>`. `<Link>` uses `history.pushState` instead of reloading the page. StrictMode is dev-only and runs effects twice. `VITE_` vars are for the browser; the server reads plain `process.env`. Browser client keeps the session in localStorage and refreshes it; the server client must keep nothing, because each request carries its own identity. Middleware either rejects or calls `next()`, never both. `res.locals` is per-request storage, not localStorage. Same error for wrong email and wrong password prevents user enumeration. Parameterized SQL (`$1`) stops SQL injection.
- **Stuck on:** Supabase project was paused, so the pooler said "tenant/user not found" (restored it). `--force` broke eslint. Took a while to understand why the server must not save a session.
- **Next:** Make `GET /me` send only the profile row (not the whole `pg` result) and list columns instead of `SELECT *`. Set `engines.node` to `>=22` in `server/package.json` (supabase-js needs it). Curl-test `/me`: no header, `Basic`, garbage token → 401; real token → 200. Commit, add `SUPABASE_URL` + `SUPABASE_ANON_KEY` on Render, test live. Later: Vercel refresh 404 on `/login` (SPA rewrite), Log out (UC03), Reset password (UC04).

### Day 7 — Mon–Wed, 2026-11-09 to 2026-11-11

- **Did:** Fixed `GET /me` to return only `{ profile: { name } }`. Added the `Today` page and Log out (UC03). Added the Vercel SPA rewrite. Wrote `PRODUCT.md`. Built `AuthProvider` + `useAuth` and the `RequireAuth` / `RedirectIfAuthed` route guards, then removed the manual `navigate` calls from Today and Login. Got a code review (no critical issues) and fixed its main point: after logging in, users go back to the page they were trying to open.
- **Learned:** Context shares one session with the whole app; `createContext(null)` + a `throw` in `useAuth` makes a missing provider fail loudly. Three session states (`undefined` / `null` / `Session`) let the guards wait instead of guessing. `onAuthStateChange` fires `INITIAL_SESSION` on subscribe, so it alone covers refresh, login, logout, token refresh and other tabs; unsubscribe in the effect cleanup. Guards are layout routes with `<Outlet />`. `<Navigate state={...}>` carries a note to the next page; `?.` reads it safely and `??` gives a fallback. Hooks must run before any early `return`.
- **Stuck on:** Why the redirect "forgot" the intended page. It looked fine because `/today` is the only protected route, so the bug was hidden.
- **Next:** Landing page on `/` (Ember Evolved + Brand & UI). Then Reset password (UC04; keep its page outside `RedirectIfAuthed`). Remove the "Session:" debug line and the Sign Up / Log In links from `App.tsx`. Set `engines.node` to `>=22` in `server/package.json` (still `>=20`).

### Day 8 — Wed, 2026-11-11

- **Did:** Started the landing page. Picked the design calls (grey background, Streak Grid logo, flame only in-app, no stock photos). Added design tokens and fonts, routed `/` to `Landing` under `RedirectIfAuthed`, and cleaned the debug UI out of `App.tsx`. Built the logo SVG, nav, hero, week strip, streak count and the email form that sends the email to `/signup`. A code review caught that `RequireAuth` was redirecting to `/` (losing the "where were they going" note) and that the state was an unlabeled string; fixed both.
- **Learned:** Vite turns `import "./index.css"` into a `<style>` in `<head>`, so CSS imported in `main.tsx` styles the whole page, not just `#root`. `index.html` is plain HTML (`class`, not `className`). Tailwind v4 `@theme` tokens become classes; arbitrary values use `[...]` and `_` for spaces. `max-w-7xl mx-auto` caps and centers a page. `items-baseline`, `tabular-nums`, `min-w-0` on flex inputs, `sr-only` labels. `<Navigate>` is for rendering, `useNavigate()` for events. Router state should be a labeled object.
- **Stuck on:** Why the page looked stretched on a wide screen (no width cap). Several Tailwind typos that failed without any error.
- **Next:** Commit the form + fixes. Estimate card. Then animations, the How it works / Friends sections, the phone layout, and an accessibility pass. Reset password (UC04) after the landing page.

### Day 9 — Thu–Sat, 2026-11-12 to 2026-11-14

- **Did:** Finished the landing page build (steps 0–7): night tokens and base rules, sticky header, responsive hero, estimate band with a second bar and legend, How it works with step markers and a video slot, Friends with a sample feed, night footer, and the squares filling one by one on load. Refactored the feed into `ReactionButton` and `FeedPost` driven by a `posts` array, swapped pasted SVGs for `@phosphor-icons/react`, and split the components into `components/landing/` with a shared `sampleWeek.ts`. Then designed a motion pass in `design/landing.html` (scroll-driven sections, a twinkling night grid in the footer, five hero options to choose from).
- **Learned:** Phone-first Tailwind (unprefixed = phone, `lg:` adds desktop), `clamp()`, `minmax(0, …)`, `aspect-square`, `rounded-[24%]`. `absolute` positions against the nearest `relative` ancestor (a missing `relative` gave a full-screen orange block). `{cond && <X/>}` renders only when true; `{0 && …}` prints "0". `aria-label` takes text, `aria-labelledby` takes an id, and `aria-hidden` must never go on something people interact with. Components and props, `key` on whatever `.map()` returns, spreading props, default vs named exports, `../` import paths. A page file that exports a constant breaks Vite's Fast Refresh, so shared data gets its own `.ts` file (which also removed a circular import). Inline `style` for per-item values like animation delays. `git commit --amend` is only safe before pushing.
- **Stuck on:** Many silent Tailwind typos (`gap3.5`, `shrink 0`, `order-line-2`) and misspelled ARIA attributes, which fail without any error. A missing `https://` on the LinkedIn link. Scroll animations froze under `overflow-hidden` (it turns the element into a scroll container); `overflow-clip` fixes it.
- **Next:** Pick the hero motion options and build the motion pass from `design/landing.html`. Fix the estimate legend (the "Estimate" label slipped into the second `<li>`) and the stray "/" in the video badge. Then the accessibility pass, then Reset password (UC04).

### Day 10 — Sat–Sun, 2026-11-14 to 2026-11-15

- **Did:** Fixed the estimate legend and the video badge. Built the motion pass: estimate bars draw on scroll, feed posts rise in, the footer week fills square by square with today pulsing under a twinkling night grid, and all five hero options (headline words rise, the "6" counts up, today's pulse ring and session tide, a daytime grid behind the headline). Kept the How it works markers static because the video already explains that section. Split `Landing.tsx` (~540 lines) into `Header`, `Hero`, `EstimateBand`, `HowItWorks` and `Friends`, so it's now 21 lines. Ran an accessibility audit and fixed the nested `<main>`, the "client" page title, the low-contrast email border and the reaction buttons, which now actually toggle.
- **Learned:** `@keyframes` is the script; `--animate-*` in `@theme` and `@utility` turn it into a class. `animation-timeline: view()` runs an animation on the scroll instead of a clock, and `animation-range` sets where it starts and ends. Guard motion with `@media (prefers-reduced-motion)` and `@supports` so everyone still sees the finished state. The browser can only blend between values of the same kind: `inset()` to `none` snaps halfway, so `draw-x` needed an explicit `to`. Pixel ranges finish in one or two wheel notches; `cover` percentages scale with the screen. `@property` makes a CSS variable a real integer so it can count, and a CSS counter prints it. A `.map()` that returns two siblings needs a `<Fragment key>` (the `<>` shorthand can't take a key). Spaces between inline-blocks go outside them as `{" "}`. Data moves into the component that uses it, so the sections need no props. Each page owns its own `<main>`. Derive state instead of duplicating it: store only `isPressed` and compute the count. The label says what a button is; `aria-pressed` says whether it's on.
- **Stuck on:** Scroll fills that jumped from empty to full: the range was too short, and then the keyframe ended at `none`. Thinking the footer wasn't animating when it was, because it all happens at the very bottom of the page. A `.map()` returning a span plus a space (`')' expected`). Auto-import picking `react/jsx-runtime` instead of `react` for `Fragment`. A count formula that showed 4 on load for reactions that started pressed.
- **Next:** Reset password (UC04), with its page outside `RedirectIfAuthed`. Hook up the How it works video when it's ready (the play button is a placeholder until then). I decided not to add a WCAG 2.2.2 pause control: the loops are small and decorative, and reduced motion already stops them. Still open from Day 7: set `engines.node` to `>=22` in `server/package.json`.

### Day 11 — Tue–Thu, 2026-11-17 to 2026-11-19

- **Did:** Built Reset password (UC04). `ForgotPassword` calls `resetPasswordForEmail` and shows the same message whether or not the email has an account. `ResetPassword` calls `updateUser`, signs out, and sends the user to `/login` with a note, so they log in once with the new password to help it stick. With no session it shows "invalid or expired" and a "Request a new link" link. Both routes sit outside `RedirectIfAuthed`. Added the "Forgot Password?" link to Login, and Login now shows the reset note. Added the reset URLs to the Supabase Redirect URLs allow list. Then styled all four auth pages from the Ember Evolved Log in screen: a shared `AuthShell` (logo, tagline, page title, and the lock line pinned to the bottom), a show/hide eye on every password field, and a password hint under the input. Sign up now asks for a name and sends it through `options.data` so the profile trigger stores it. The expired-link state got its own "Link expired" screen with "Request a new link" as the main button. **Decisions:** no confirm password field on Sign up or Reset, which differs from GS_1, because the eye toggle shows typos directly and the reset flow covers the rest. The auth pages are one centered column at every screen size; no split layout on laptop.
- **Learned:** Clicking a reset link _is_ a login: Supabase checks the one-time token, makes a normal session and redirects with the tokens after `#` (the hash never reaches a server). supabase-js reads them on startup (`detectSessionInUrl`) and fires `PASSWORD_RECOVERY`. That's why the reset page can't sit inside `RedirectIfAuthed`. `redirectTo` must be a full URL: `window.location.origin` is the site, and `pathname` is only the path. JSX inside an event handler does nothing; only a returned element renders, so events use `navigate()`. `onChange` needs a function, not a call. Router state should be a labeled object because `/login` gets notes from more than one page. `signOut()` logs out every device, which is what you want after a reset. `CLIENT_ORIGIN` comes from `server/.env` locally and from the Render dashboard in production, and it lists the client (Vercel), not the server itself. "Declared but never read" usually points at the bug. `children` lets one shell wrap any page content. Spacing groups things: small gaps inside a group and big gaps between groups, so a title sits close to the form it names. `my-auto` in a flex column centers the content and pushes the next item to the bottom. A placeholder disappears as you type, so rules go in a hint linked with `aria-describedby`, and placeholders only show a format. Sign-up research: ask for the fewest fields. A name is worth it here because friends see it, and the email-prefix fallback would leak part of the email.
- **Stuck on:** `redirectTo` as a bare path, then `pathname` instead of `origin`. An error message overwritten by the success message (missing `else`). `onChange={setPassword(password)}`, then an arrow function that still saved the old value. A `<Navigate>` inside the submit handler that never navigated. A link with no text. On the restyle: a hardcoded `type="password"` that made the eye do nothing (twice), silent Tailwind typos again (`outline-hiden`, `underliine`, `text--[14.5px]`, `mt-3` for `-mt-3`), and a hint placed inside the input's `relative` wrapper.
- **Next:** From the code review, before pushing: remove the stray `c` after `{message}` in `SignUp.tsx`, and trim the name before sending it (a name of only spaces passes `required`). Fix the last commit's message with `git commit --amend` (it only touched Forgot/Reset). Then push the 3 local commits. Soon: give success messages their own non-error style (not orange `role="alert"`), and extract a shared `PasswordInput` (input + eye + hint) so Log in, Sign up and Reset stop drifting. Test the full email flow (link → new password → `/login` → old password fails, new one works) and a real sign-up with a name (check the `profiles` row). Check that the Supabase minimum password length is 8 to match the forms. Low priority: the reset form also shows for normal sessions; the "Password changed" note survives a reload; submitting with the eye on can skip the browser's save-password prompt. Still open from Day 7: set `engines.node` to `>=22` in `server/package.json`.

### Day 12 — Fri, 2026-11-20

- **Did:** Wrote `docs/CODE-GUIDE.md`, a guide to every file and function with suggested comments and a list of legacy-code issues for the maintainability deliverable. Fixed the wrong `RequireAuth` comment (it said users go to `/`). Sign up now trims the name, rejects a blank one, and sends it under the `name` key the profile trigger reads. Built the whole Subjects API (Phase 5): `GET /subjects` (own subjects, newest first), `POST /subjects` (201, 422 for a bad name, 409 for a duplicate), `PATCH /subjects/:id` (rename, 404 when not found or not yours), and `PATCH /subjects/:id/archived` (one route for archive and unarchive, D16). Every query filters by `id AND user_id`, so a valid token can't touch someone else's subject. Tested every route in Postman, including another user's id. Then refactored into `server/src/subjects/` with `subjects.routes.ts` (Express `Router`, `router.use(requireAuth)` once), `subjects.controller.ts` (validation, status codes, DB error codes) and `subjects.model.ts` (SQL only, typed with a `Subject` type). `index.ts` went from about 150 lines to 55. Same Postman results after the refactor.
- **Learned:** The server gets the user id from the **verified token**, never from the URL or body; the token proves who you are, and `AND user_id` proves the row is yours. Send 404 for both "doesn't exist" and "isn't yours" so ids can't be probed. `res.locals` is a per-request box for passing data from middleware to the route, and it's never sent to the client. Status codes: 2xx ok (201 created), 4xx the client's fault (401, 404, 409, 422), 5xx the server's fault. POST returns the created item in the same shape as GET, so the client can add it to its list. Tables have no built-in order, so use `ORDER BY`. `trim()` returns a new string; `{ x }` sends the key `x`. A bare `return` is an early exit, and `finally` still runs. TypeScript basics: `: Type`, `type X = {...}`, `Type[]`, `A | B`, and `<Type>` to fill in a container (`Promise<Subject[]>`, `pool.query<Subject>`). A return type should say what can really happen: `INSERT` gives `Promise<Subject>`, `UPDATE` gives `Promise<Subject | undefined>`. MVC in an API: routes map paths, the controller handles HTTP, the model runs SQL; React is the view. Middleware calls `next()` or responds; the controller is the last stop, so it always responds. Grouping by feature vs by layer (D15). Why a `SELECT` before `INSERT` isn't enough (race condition, D17).
- **Stuck on:** A ternary missing its `:` part. `if (cleanName)` instead of `if (!cleanName)`. `{ cleanName }` sending the wrong key. `result.rows<...>` (type arguments only go on functions and types). `res.json(201)` instead of `res.status(201)`. `if (!result.rows)` that never fired. Postman sending Text instead of JSON. `req.params.id[0]` to silence a TypeScript error. A missing `await` and `if (!findSubjectsByUser)` in the controller.
- **Code review (2026-11-20, `d346c16..97e82b5`):** No real bugs. Ownership checks, validation and error handling all hold up. Small notes for later:
  - **No profile row:** if a user somehow has no `profiles` row, `POST /subjects` fails with `23503` (foreign key) and returns a generic 500. Handle `23503`, or make sure the profile exists.
  - **Case:** "Math" and "math" both get in, because `unique (user_id, name)` is case-sensitive. If they should count as the same, use a unique index on `(user_id, lower(name))`.
  - **No max length** on subject names. Reject long names (for example over 100 characters) with 422 in both handlers.
  - **HTML error page (older code):** if Supabase is unreachable, `requireAuth` calls `next(err)`, and with no error handler Express sends an HTML 500 instead of JSON. Return JSON in that `catch`, or add a JSON error handler in `index.ts`.
  - **Redirect detail:** `RequireAuth` saves only `location.pathname`, so a query string like `?tab=x` is lost after login. Only matters once a page uses query strings.
- **Next:** Commit `docs/CODE-GUIDE.md` (still untracked). Push. Remove the repeated code in the subjects controller (name check, `22P02`, `23505`). Decide on the case-insensitive and max-length rules from the review. Then the Subjects page in React (Phase 5 milestone: end to end, deployed). Later: move `GET /me` into its own module so `index.ts` has no SQL left. Still open from Day 7: set `engines.node` to `>=22` in `server/package.json`.

<!-- Copy the block below for each new day -->
<!--
### Day N — YYYY-MM-DD
- **Did:**
- **Learned:**
- **Stuck on:**
- **Next:**
-->
