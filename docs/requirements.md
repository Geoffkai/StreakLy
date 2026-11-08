# StreakLy

> A cloud-based web app that helps college students **plan, time, and track** their study sessions.
> It uses daily streaks, estimated-vs-actual hour comparisons, and a friends-only accountability feed.
> Goal: build more consistent and realistic study habits over a semester.

| | |
|---|---|
| **Author** | Geoffrey Adam A. Tomagan |
| **Course** | CMSC 128 – Introduction to Software Engineering |
| **Main user (requirements source)** | Yvonne Angeline Y. Salinas (BS Applied Mathematics student) |
| **Target users** | College students, classmates, friends |
| **SDLC** | Agile |
| **Latest RTM version** | PR5 (submitted 2026-11-06) |

---

## Table of Contents

1. [Why StreakLy](#why-streakly)
2. [Tech Stack](#tech-stack)
3. [Modules](#modules)
4. [Feature Groups](#feature-groups)
5. [User Stories](#user-stories)
6. [Use Cases](#use-cases)
7. [Features](#features)
8. [Traceability Matrix](#traceability-matrix)
9. [Design Artifacts](#design-artifacts)
10. [Non-Functional Requirements](#non-functional-requirements)
11. [Project Status](#project-status)
12. [Known Gaps in the RTM](#known-gaps-in-the-rtm)
13. [Final Submission Checklist](#final-submission-checklist)

---

## Why StreakLy

- **Problem:** students often study inconsistently and underestimate how long topics take.
- **Solution:**
  - **Streaks** → reward studying every day.
  - **Estimated vs. actual hours** → show how realistic your planning is.
  - **Friends-only feed** → add peer accountability without going public.

### Why Agile

- The project is built in small, manageable steps.
- Each step gets regular testing and feedback from the main user.
- Better fit than **Waterfall** (too fixed) or **Spiral** (too heavy on risk analysis) for a solo, course-based project.

---

## Tech Stack

| Layer | Technology | Why |
|---|---|---|
| **Front-end** | React 18 + Vite + TypeScript + Tailwind CSS | Fast, responsive UI; familiar stack; TypeScript catches errors early |
| **Back-end** | Node.js + Express + TypeScript | Same language (TypeScript) on front-end and back-end |
| **Database** | PostgreSQL (via Supabase) | Relational data for subjects, topics, sessions, friends |
| **Auth / BaaS** | Supabase | Handles authentication and database management |
| **Hosting** | Vercel (front-end), Render (back-end), Supabase (DB + auth) | Keeps the app online all semester |

---

## Modules

The code is split into **8 modules**. Folder names match the package diagram (PD_1).

| Module | Responsibility | Features |
|---|---|---|
| `auth` | Register, log in, log out, reset password | FT_1 – FT_4 |
| `subjects` | Manage subjects and topics (with estimated hours) | FT_5, FT_6 |
| `planner` | Pick topics for the day and total their hours | FT_7 |
| `sessions` | Timer, manual entry, Pomodoro, history, proof photo, sharing, focus audio | FT_8, FT_9, FT_12, FT_17, FT_18, FT_20 |
| `progress` | Streaks, study calendar, analytics | FT_10, FT_11 |
| `friends` | Search users, send / respond to / remove friend requests | FT_14 – FT_16 |
| `feed` | View and react to friends' shared sessions | FT_13 |
| `reports` | Generate and export study reports | FT_19 |

---

## Feature Groups

| Group | Stories | Focus |
|---|---|---|
| 🟦 **Core Tracking** (single-user) | SID_1 – SID_17 | Account, subjects, planning, timing, streaks, analytics |
| 🟧 **Peer Accountability** (multi-user) | SID_18 – SID_25 | Friends, feed, reactions, proof, privacy |
| 🟩 **Reporting and Refinement** | SID_26 – SID_28 | Weekly reports, estimation trends, export |

---

## User Stories

All stories were recorded on **2026-09-15** from Yvonne Angeline Y. Salinas.
**Total estimated cost: 77 hours.**

### 🟦 Core Tracking

| ID | As a… I want to… so that… | Cost | Priority | Ver. |
|---|---|---|---|---|
| SID_1 | Register and log in, so my study data stays private and saved to me | 3 h | High | 1.0.0 |
| SID_2 | Stay logged in when I return, so I can start studying right away | 2 h | High | 1.0.0 |
| SID_3 | Log out, so I can secure my account on public devices | 2 h | Medium | 1.0.0 |
| SID_4 | Reset a forgotten password via Gmail, so I don't need a new account | 8 h | High | 1.0.0 |
| SID_5 | Add, edit, and **archive** my subjects, so I can organize studying by course | 2 h | High | **1.1.0** |
| SID_6 | Add topics under a subject with estimated hours, so I can plan time per topic | 2 h | High | 1.0.0 |
| SID_7 | Pick topics for the day and see total estimated hours, so I have a clear daily plan | 3 h | Medium | 1.0.0 |
| SID_8 | Start and stop a timer tied to a topic, so actual study time is logged automatically | 3 h | High | 1.0.0 |
| SID_9 | Manually add a past session with start and end time, so I can record untimed studying | 2 h | High | 1.0.0 |
| SID_10 | View session history filtered by subject and date, so I can review what I studied | 2 h | Medium | 1.0.0 |
| SID_11 | See my current and longest streak, so I stay motivated | 3 h | High | 1.0.0 |
| SID_12 | Have my streak continue when I complete a session that day, so consistency is tracked correctly | 2 h | High | 1.0.0 |
| SID_13 | Compare estimated vs. actual hours per topic, so I see how accurate my planning is | 3 h | High | 1.0.0 |
| SID_14 | See weekly totals and subject balance, so I know if I'm neglecting a subject | 3 h | High | 1.0.0 |
| SID_15 | Use a Pomodoro mode (focus/break), so I can study in focused intervals | 2 h | Medium | 1.0.0 |
| SID_16 | See a calendar of my logged study days, so I see consistency at a glance | 2 h | High | 1.0.0 |
| SID_17 | Play optional background audio during a session, so I stay focused | 1 h | Low | 1.0.0 |

> **Change log:** SID_5 changed from "delete" to **"archive"** subjects (v1.0.0 → v1.1.0).

### 🟧 Peer Accountability

| ID | As a… I want to… so that… | Cost | Priority | Ver. |
|---|---|---|---|---|
| SID_18 | Search for a user and send a friend request, so I can connect with study peers | 5 h | Medium | 1.0.0 |
| SID_19 | Accept or decline friend requests, so I control who I'm connected with | 3 h | Medium | 1.0.0 |
| SID_20 | Remove a friend, so I can manage my accountability circle | 2 h | Low | 1.0.0 |
| SID_21 | See a feed of friends' completed sessions, so their activity keeps me accountable | 5 h | High | 1.0.0 |
| SID_22 | Attach a photo as proof to a session, so my logged study feels credible | 3 h | High | 1.0.0 |
| SID_23 | View my friends' study sessions, so I stay motivated and know what to prioritize | 2 h | High | 1.0.0 |
| SID_24 | React to a friend's session, so I can encourage them | 2 h | High | 1.0.0 |
| SID_25 | Choose whether each session is shared to the feed, so I control my privacy | 2 h | High | 1.0.0 |

### 🟩 Reporting and Refinement

| ID | As a… I want to… so that… | Cost | Priority | Ver. |
|---|---|---|---|---|
| SID_26 | Generate a weekly report to review or export, so I can reflect on consistency | 3 h | Medium | 1.0.0 |
| SID_27 | See my estimation trend over time per subject, so I can plan more realistically | 3 h | Medium | 1.0.0 |
| SID_28 | Export my study history, so I have a personal record outside the app | 2 h | Medium | 1.0.0 |

---

## Use Cases

| ID | Use Case | Cost | Priority | Covers Stories |
|---|---|---|---|---|
| UC_1 | Register Account | 3 h | High | SID_1 |
| UC_2 | Log In | 2 h | High | SID_2 |
| UC_3 | Log Out | 2 h | Medium | SID_3 |
| UC_4 | Reset Password | 8 h | High | SID_4 |
| UC_5 | Manage Subjects | 2 h | High | SID_5 |
| UC_6 | Manage Topics | 2 h | High | SID_6 |
| UC_7 | Plan the Day's Study | 3 h | Medium | SID_7 |
| UC_8 | Log a Study Session | 5 h | High | SID_8, SID_9, SID_12, SID_17, SID_22, SID_25 |
| UC_9 | View Session History | 2 h | Medium | SID_10 |
| UC_10 | View Progress and Streak | 3 h | High | SID_11, SID_16 |
| UC_11 | View Study Analytics | 6 h | High | SID_13, SID_14 |
| UC_12 | Run a Pomodoro Session | 2 h | Medium | SID_15 |
| UC_13 | Send a Friend Request | 5 h | Medium | SID_18 |
| UC_14 | Respond to Friend Request | 3 h | Medium | SID_19 |
| UC_15 | Remove a Friend | 2 h | Low | SID_20 |
| UC_16 | View Friends' Activity Feed | 5 h | High | SID_21, SID_23, SID_24 |
| UC_17 | Generate and Export Study Report | 7 h | Medium | SID_26, SID_27, SID_28 |

---

## Features

| ID | Name | Description | Module |
|---|---|---|---|
| FT_1 | User Registration | Create a new user account | `auth` |
| FT_2 | User Log In | Authenticate and start a session | `auth` |
| FT_3 | User Log Out | End the current session | `auth` |
| FT_4 | Reset Password | Recover access via email link | `auth` |
| FT_5 | Manage Subjects | Add, edit, and archive subjects | `subjects` |
| FT_6 | Manage Topics | Add, edit, archive topics with estimated hours | `subjects` |
| FT_7 | Plan Daily Study | Pick topics for the day and total their hours | `planner` |
| FT_8 | Log Study Session | Record study time by timer or manual entry | `sessions` |
| FT_9 | View Session History | List and filter logged sessions | `sessions` |
| FT_10 | Track Streak | Show current/longest streak and study calendar | `progress` |
| FT_11 | Study Analytics | Compare estimated vs. actual hours and subject balance | `progress` |
| FT_12 | Pomodoro Timer | Study in alternating focus/break intervals | `sessions` |
| FT_13 | Friends' Activity Feed | View and react to friends' shared sessions | `feed` |
| FT_14 | Send Friend Request | Search users and send a request | `friends` |
| FT_15 | Respond to Request | Accept or decline friend requests | `friends` |
| FT_16 | Remove Friend | Remove a friend connection | `friends` |
| FT_17 | Attach Session Proof | Attach a photo as proof to a session | `sessions` |
| FT_18 | Session Sharing Control | Choose whether a session is shared to the feed | `sessions` |
| FT_19 | Study Reports | Generate and export study reports | `reports` |
| FT_20 | Focus Audio | Play background audio to focus | `sessions` |

---

## Traceability Matrix

How each story connects to its use case, feature, and diagrams.
`—` means the cell is blank in the RTM.

| Story | Use Case | Feature | Storyboard | Use Case Diagram | Sequence Diagram |
|---|---|---|---|---|---|
| SID_1 | UC_1 | FT_1 | GS_1 | UCD_1 | SD_1 |
| SID_2 | UC_2 | FT_2 | — | — | SD_2 |
| SID_3 | UC_3 | FT_3 | GS_6 | — | SD_3 |
| SID_4 | UC_4 | FT_4 | GS_1 | — | SD_4 |
| SID_5 | UC_5 | FT_5 | GS_2 | UCD_2 | SD_5 |
| SID_6 | UC_6 | FT_6 | — | — | SD_6 |
| SID_7 | UC_7 | FT_7 | GS_3 | UCD_3 | SD_7 |
| SID_8 | UC_8 | FT_8 | — | — | SD_8 |
| SID_9 | — | FT_8 | — | — | — |
| SID_10 | UC_9 | FT_9 | GS_4 | UCD_4 | SD_9 |
| SID_11 | UC_10 | FT_10 | GS_6 | — | SD_10 |
| SID_12 | UC_8 | — | GS_3 | UCD_3 | SD_8 |
| SID_13 | UC_11 | FT_11 | GS_4 | UCD_4 | SD_11 |
| SID_14 | — | — | — | — | — |
| SID_15 | UC_12 | FT_12 | GS_3 | UCD_3 | SD_12 |
| SID_16 | UC_10 | FT_10 | GS_6 | UCD_4 | SD_10 |
| SID_17 | UC_8 | FT_20 | GS_3 | UCD_3 | SD_8 |
| SID_18 | UC_13 | FT_14 | GS_5 | UCD_5 | SD_13 |
| SID_19 | UC_14 | FT_15 | — | — | SD_14 |
| SID_20 | UC_15 | FT_16 | — | — | SD_15 |
| SID_21 | UC_16 | FT_13 | — | — | SD_16 |
| SID_22 | UC_8 | FT_17 | GS_3 | UCD_3 | SD_8 |
| SID_23 | UC_16 | FT_13 | GS_5 | UCD_5 | SD_16 |
| SID_24 | — | — | — | — | — |
| SID_25 | UC_8 | FT_18 | GS_3 | UCD_3 | SD_8 |
| SID_26 | UC_17 | FT_19 | GS_4 | UCD_5 ⚠️ | SD_17 |
| SID_27 | — | — | — | — | — |
| SID_28 | — | — | — | — | — |

> Class diagram **CD_1**, package diagram **PD_1**, and the schema diagram apply to the whole system.

---

## Design Artifacts

All design diagrams are marked **Completed** in PR5.

### GUI Storyboards

| ID | Screen |
|---|---|
| GS_1 | User Authentication |
| GS_2 | Subjects & Topics |
| GS_3 | Daily Study |
| GS_4 | Insights |
| GS_5 | Socials |
| GS_6 | Profile |

### Use Case Diagrams (Case Dimension)

| ID | Name |
|---|---|
| UCD_1 | Authentication |
| UCD_2 | Subjects and Topics |
| UCD_3 | Daily Study |
| UCD_4 | Insights and Progress |
| UCD_5 | Socials |

### Sequence Diagrams (Process Dimension)

- **SD_1 – SD_17** → one per use case (UC_1 – UC_17), same names.

### Resource Dimension & Implementation

| ID | Diagram |
|---|---|
| CD_1 | StreakLy Class Diagram |
| PD_1 | StreakLy Package Diagram |
| Schema | StreakLy Schema Diagram |

---

## Non-Functional Requirements

| ID | Quality | Requirement | How the app does it | User Benefit |
|---|---|---|---|---|
| NFR_1 | Security | A student sees only their own data and sessions friends chose to share | Supabase Auth handles login; database access rules limit what each user can read | Study data stays private |
| NFR_2 | Usability | Logging a session takes **3 taps or fewer** on phone or laptop | Each topic has a Start, Stop, and Save button | Logging is quick |
| NFR_3 | Data Integrity | No future sessions; end time after start time; estimated hours above zero | Form validates input; database rejects invalid rows | Hours and streaks stay accurate |
| NFR_4 | Availability | App is online all semester for testing | Hosted on Vercel, Render, and Supabase | User can test anytime |
| NFR_5 | Maintainability | Code uses TypeScript, split into 8 modules | Shared types catch errors early; folders match the package diagram | Bugs get fixed faster |

---

## Project Status

As of **PR5 (2026-11-06)**:

| Phase | Status |
|---|---|
| Requirements elicitation (user stories) | ✅ Done (28 stories) |
| Requirements specification (use cases, features) | ✅ Done (17 use cases, 20 features) |
| GUI storyboards | ✅ Completed |
| Design models (UCD, SD, CD) | ✅ Completed |
| Package diagram + schema | ✅ Completed |
| Implementation (all features) | 🔄 Ongoing |
| Test specification | ⬜ Not started |
| Demo videos | ⬜ Not started |

---

## Known Gaps in the RTM

Things to fix in the spreadsheet so this README and the RTM stay in sync:

- **Stories with no feature ID**
  - SID_12 (streak continues) → likely FT_10 Track Streak
  - SID_14 (weekly totals, subject balance) → likely UC_11 / FT_11 Study Analytics
  - SID_24 (react to session) → likely UC_16 / FT_13 Friends' Activity Feed
  - SID_27 (estimation trend) → likely UC_17 / FT_19 Study Reports
  - SID_28 (export history) → likely UC_17 / FT_19 Study Reports
- **SID_9 has no use case ID** → likely UC_8 Log a Study Session
- **SID_26 is linked to UCD_5 (Socials)** → probably should be UCD_4 (Insights and Progress)
- **ID clash:** schema uses `SD_1`, which is also the Register Account sequence diagram → consider renaming to `SCH_1`
- **Test specification (B.4) is empty** → needs test case IDs, type, and pass/fail status
- **Demo links (F) are empty**

---

## Final Submission Checklist

From Part II of the RTM:

- [ ] **(A)** Zipped database with pre-migrated test datasets
- [ ] **(B)** Zipped source code + deployment URL
- [ ] **(C)** Login credentials for sample users (must cover all test cases)
- [ ] **(D)** Worksheet listing the pre-migrated test datasets
- [ ] **(E)** Worksheet of Data Management and related protocols

---

*Source: `CMSC 128 Project Proposal 5 - Tomagan.xlsx`, sheet **PR5**. Update this README whenever the RTM changes.*
