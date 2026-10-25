# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

College students (initially Filipino university students; the build is a CMSC 128 project) who want steadier study habits. They study across several subjects per term, plan a few topics per day, and often study late at night. The job: show up every day, know honestly how long things take, and feel a little accountable to a few friends without being ranked against them.

- Primary user and requirements source: Yvonne Angeline Y. Salinas (BS Applied Mathematics student). She gave all 28 user stories (SID_1 to SID_28, recorded 2026-09-15, all v1.0.0) and does user acceptance testing.
- Target users named in the proposal: college students, classmates, friends.

## Product Purpose

StreakLy is a study tracker that rewards showing up, not grinding. Proposal wording: "A cloud-based web app that helps college students plan, time, and track their study sessions, using daily streaks, estimated-vs-actual hour comparisons, and a friends-only accountability feed, to build more consistent and realistic study habits over a semester."

Students organise subjects and topics with time estimates, plan the day, run a focus timer or Pomodoro (or log a past session), and keep a daily streak. Success means more study days per week and estimates that get more accurate over time.

## Positioning

For college students who want steadier study habits, StreakLy is a study tracker that rewards showing up, not grinding, with daily streaks, honest time estimates, and a small circle of friends.

What separates it from generic habit or focus apps:
- A 20-minute day counts the same as a 4-hour day for the streak.
- Estimated vs actual time per topic is a first-class concept (honest planning), not a hidden stat.
- Social is friends-only. There is never a public leaderboard or ranking of hours.

## Operating Context

- Daily loop: open Today (stays logged in between visits), see streak and plan, start the next topic, focus, stop and save, optionally add a proof photo and share to friends' feed.
- Planning loop: Subjects contain Topics; each topic has estimated hours; sessions accumulate actual time.
- Review loop: Insights (analytics, history, weekly report, estimation trend, export), estimated vs actual by topic and subject, weekly totals and subject balance, streak calendar on Profile.
- Social loop: search users, send/accept/decline friend requests, remove friends, friends' activity feed, reactions (fire, clap, heart), share toggle per session.
- Usage is mostly on phones and laptops, often late at night (dark mode and the focus timer matter).

## Capabilities and Constraints

- Stack: React 19 + TypeScript + Vite, Tailwind v4 (client); Express + TypeScript (server); Supabase Postgres, Auth and Storage. Client deployed on Vercel, API on Render. (The proposal says React 18; the code uses React 19, and the code wins.)
- Process: Agile, solo course project, built in three cycles that match the proposal's feature groups: Core Tracking (single-user), Peer Accountability (multi-user), Reporting and Refinement.
- Data model (db/001_tables.sql): profiles, subjects, topics (estimated_hours), study_sessions (duration, local_date, is_shared, proof_image_path), daily_plans, daily_plan_items, friendships (pending/accepted), reactions (fire/clap/heart).
- Navigation: five primary destinations: Today, Subjects, Insights, Socials, Profile.

### Requirements traceability (proposal sheet PR3)

IDs follow the proposal spreadsheet. Module = the package the feature lives in.

| Use case | Feature | Module | Priority | Stories |
| --- | --- | --- | --- | --- |
| UC_1 Register Account | FT_1 User Registration | auth | High | SID_1 |
| UC_2 Log In | FT_2 User Log In (session persists) | auth | High | SID_2 |
| UC_3 Log Out | FT_3 User Log Out | auth | Medium | SID_3 |
| UC_4 Reset Password | FT_4 Reset Password (email link) | auth | High | SID_4 |
| UC_5 Manage Subjects | FT_5 Manage Subjects (add, edit, archive) | subjects | High | SID_5 |
| UC_6 Manage Topics | FT_6 Manage Topics (with estimated hours) | subjects | High | SID_6 |
| UC_7 Plan the Day's Study | FT_7 Plan Daily Study (pick topics, total hours) | planner | Medium | SID_7 |
| UC_8 Log a Study Session | FT_8 Log Study Session (timer or manual start/end) | sessions | High | SID_8, SID_9, SID_12 |
| UC_8 (extension) | FT_17 Attach Session Proof (photo) | sessions | High | SID_22 |
| UC_8 (extension) | FT_18 Session Sharing Control (per-session toggle) | sessions | High | SID_25 |
| UC_8 (extension) | Focus audio (no FT ID of its own) | sessions | High in sheet, stretch in build plan | SID_17 |
| UC_9 View Session History | FT_9 View Session History (filter by subject, date) | sessions | Medium | SID_10 |
| UC_10 View Progress and Streak | FT_10 Track Streak (current, longest, calendar) | progress | High | SID_11, SID_16 |
| UC_11 View Study Analytics | FT_11 Study Analytics (estimate vs actual, subject balance) | progress | High | SID_13, SID_14* |
| UC_12 Run a Pomodoro Session | FT_12 Pomodoro Timer | sessions | Medium | SID_15 |
| UC_13 Send a Friend Request | FT_14 Send Friend Request (search users) | friends | Medium | SID_18 |
| UC_14 Respond to Friend Request | FT_15 Respond to Request (accept, decline) | friends | Medium | SID_19 |
| UC_15 Remove a Friend | FT_16 Remove Friend | friends | Low | SID_20 |
| UC_16 View Friends' Activity Feed | FT_13 Friends' Activity Feed (view and react) | feed | High | SID_21, SID_23, SID_24* |
| UC_17 Generate and Export Study Report | FT_19 Study Reports (weekly report, estimation trend, export) | reports | Medium | SID_26, SID_27*, SID_28* |

\* The sheet leaves these stories without a UC/FT link. They are placed by their wording: weekly totals and subject balance (SID_14) under analytics, reactions (SID_24) under the feed, estimation trend (SID_27) and history export (SID_28) under reports.

Known gaps in the sheet, as of PR3:

- SID_17 (focus audio) lists FT_13 "Friends' Activity Feed" in its feature column, which looks like a copy error. Treat audio as its own stretch item.
- FT_5 says subjects are archived; SID_5 says "delete". The build archives, so a subject's history is kept.
- docs/STREAKLY-DEVLOG.md still uses an older numbering (for example UC10 for streak, FT_20 for audio). Use the IDs in this table.

## Brand Commitments

- Name: StreakLy (wordmark currently lowercase "streakly").
- Tagline in use: "Study. Track. Stay consistent." Big idea: "Every day you show up counts."
- Personality: steady, warm, honest, encouraging. Never preachy, hype-y, or guilt-tripping.
- Voice examples: "Still time today to keep your 5-day streak." / "Logged: 45 min on Limits." / "Took longer than planned. Your next estimate will be sharper."
- Existing visual system "Ember Paper" (design/StreakLy Brand & UI.html) is the incumbent. The owner has asked for new brand directions that differ from it, alongside one evolved version of it. It is not binding for the new directions.

## Evidence on Hand

- Brand & UI board: design/StreakLy Brand & UI.html (brand story, logo concepts, palette, type, style directions, 7 mobile screens).
- Requirements: CMSC 128 Project Proposal 3 - Tomagan.xlsx (sheet PR3 is current; PR1 and PR2 are earlier drafts; submitted 2026-09-18).
- GUI storyboards: design/GUI Storyboard/GS_1..GS_6 (PDF), all marked Completed in PR3: GS_1 User Authentication, GS_2 Subjects & Topics, GS_3 Daily Study, GS_4 Insights, GS_5 Socials, GS_6 Profile.
- No real users, testimonials, usage metrics, or press yet. Do not fabricate them; mark any sample data as sample.

## Product Principles

1. Consistency over volume: celebrate the day, not the hours.
2. Honest numbers: show estimate vs actual plainly, frame overruns as learning.
3. Small circle, no ranking: social features support peers, never compare them publicly.
4. Calm at night: the app is used late; the focus surfaces must be easy on the eyes.
5. Never guilt: streak-risk and missed days are stated kindly with a way forward.

## Accessibility & Inclusion

- WCAG AA contrast for all text pairs; never show meaning by colour alone (pair with a word or number).
- Touch targets at least 44 x 44 px; primary buttons about 52 px tall.
- Respect prefers-reduced-motion and prefers-color-scheme.
