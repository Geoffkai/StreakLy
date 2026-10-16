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
  (Railway)
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
- [X] Create GitHub repo `streakly` (empty, with README)
- [X] Add `.gitignore` **first** (must include `node_modules/` and `.env`)
- [X] Create a Supabase account + new project
  - [X] Region: **Singapore** (closest to PH = faster)
  - [X] Save the DB password in a password manager (not in the repo)
- [X] Explore the Supabase dashboard for 15 mins: Table Editor, SQL Editor, Authentication, Storage
- [X] Create folders: `db/` and `docs/` only (nothing else yet)
- [X] Put this file in `docs/`
- [X] First commit: `chore: initial repo setup`

### Phase 1 — Database (Day 3–6)
- [X] Finish schema **v0.3** — add relationships (foreign keys)
  - [X] `profiles.id` → `auth.users(id)` (on delete cascade)
  - [X] `subjects.user_id` → `profiles.id`
  - [X] `topics.subject_id` → `subjects.id`
  - [X] `study_sessions.topic_id` / `user_id`
  - [X] `daily_plans`, `daily_plan_items`, `friendships`, `reactions`
- [ ] Add rules (CHECK constraints) → NFR_3
  - [X] `ended_at > started_at`
  - [X] `estimated_hours > 0`
  - [X] `requester_id <> addressee_id` (no friending yourself)
  - [X] unique: subject name per user, topic name per subject
- [X] Write it as numbered files: `db/001_tables.sql`, `db/002_constraints.sql`
- [ ] Run each file in the Supabase **SQL Editor**
- [ ] Add a trigger: auto-create a `profiles` row when someone signs up
- [X] **Turn on RLS for every table** (see Gotchas below)
- [ ] Test by hand: insert fake rows in Table Editor, try breaking a rule → should fail
- [ ] Commit: `feat(db): schema v0.3`

### Phase 2 — Server skeleton (Day 7–10)
- [ ] Create `server/` → `npm init`, install Express + TypeScript
- [ ] `GET /health` → returns `{ ok: true }`
- [ ] Connect to Supabase Postgres (connection string in `server/.env`)
- [ ] `GET /health/db` → runs `SELECT 1` to prove the DB connection works
- [ ] Deploy to **Railway** (env vars set in Railway dashboard)
- [ ] Commit: `feat(server): walking skeleton`

### Phase 3 — Client skeleton (Day 11–13)
- [ ] Create `client/` with Vite (React + TypeScript template)
- [ ] Add Tailwind
- [ ] Page calls the API `/health` and shows "API connected ✅"
- [ ] Deploy to **Vercel** (API URL in env var)
- [ ] ✅ **Milestone: full skeleton live on the internet**

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

| # | Date | Decision | Why |
|---|---|---|---|
| D1 | 2026-10-13 | Start database-first, then walking skeleton | Everything depends on tables; deploy early to avoid end-of-sem surprises |
| D2 | 2026-10-13 | One repo, folders `client/`, `server/`, `db/`, `docs/` | Simple for a solo dev; one place for code + SQL + docs |
| D3 | 2026-10-13 | Create folders/files **only when needed** | Your SkolarTrack habit — avoids empty, confusing structure |
| D4 | 2026-10-13 | Supabase Auth for login; Express verifies the token | Don't build password handling yourself (security risk) |
| D5 | *pending (Phase 2)* | How Express queries the DB | Suggested: `pg` driver + your own TS interfaces (good TS practice). Option: Drizzle ORM later |

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

<!-- Copy the block below for each new day -->
<!--
### Day N — YYYY-MM-DD
- **Did:**
- **Learned:**
- **Stuck on:**
- **Next:**
-->
