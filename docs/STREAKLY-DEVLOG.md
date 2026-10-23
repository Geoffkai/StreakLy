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

- [ ] Client: Sign up + Log in with `supabase-js` (UC01, UC02)
- [ ] Client: Log out (UC03), Reset password (UC04)
- [ ] Server: `requireAuth` middleware — reads token, asks Supabase "who is this?"
- [ ] Server: `GET /me` → returns the logged-in user's profile
- [ ] Test: no token → `401`

### Phase 5 — First real feature: Manage Subjects → UC05 / FT_5

- [ ] API: list, create, edit, archive, unarchive
- [ ] Every query filters by `user_id` (privacy, NFR_1)
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

| #   | Date       | Decision                                                                                              | Why                                                                      |
| --- | ---------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| D1  | 2026-10-13 | Start database-first, then walking skeleton                                                           | Everything depends on tables; deploy early to avoid end-of-sem surprises |
| D2  | 2026-10-13 | One repo, folders `client/`, `server/`, `db/`, `docs/`                                                | Simple for a solo dev; one place for code + SQL + docs                   |
| D3  | 2026-10-13 | Create folders/files **only when needed**                                                             | Your SkolarTrack habit — avoids empty, confusing structure               |
| D4  | 2026-10-13 | Supabase Auth for login; Express verifies the token                                                   | Don't build password handling yourself (security risk)                   |
| D5  | 2026-10-17 | Express queries the DB with the `pg` driver (`Pool` in `server/src/config/db.ts`) + own TS interfaces | Good TS practice, no ORM magic. Drizzle can come later if needed         |
| D6  | 2026-10-17 | Enforce commit style with commitlint + husky (+ `.gitmessage` template)                               | Consistent history (`feat(scope): ...`) from day one                     |

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

---

## 5. Mini Glossary

- **Supabase** — hosted Postgres + login + file storage.
- **JWT / token** — a signed "ID card" the client gets after login and sends with each API call.
- **Middleware** — a function that runs before your route (e.g. "is this user logged in?").
- **Migration** — a numbered SQL file that changes the database. Run in order.
- **Walking skeleton** — the thinnest version of the whole app, deployed, end to end.
- **RLS** — Postgres rules that control which rows each user can see.

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

<!-- Copy the block below for each new day -->
<!--
### Day N — YYYY-MM-DD
- **Did:**
- **Learned:**
- **Stuck on:**
- **Next:**
-->
