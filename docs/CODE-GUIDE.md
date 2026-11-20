# StreakLy Code Guide

What every directory, file, and function does, plus a ready-to-paste comment for each one.

Use this guide two ways:

1. **To read the codebase.** Start with [Project map](#1-project-map) and [How the pieces connect](#2-how-the-pieces-connect).
2. **To comment the code.** Each file in [File reference](#4-file-reference) has a *Suggested comments* block. Paste them where it says, and change any wording you like.

Section 5, [Maintainability notes](#5-maintainability-notes), lists comments that are wrong, leftover template code, and repeated code. These are the "legacy code" issues to fix or mention in the deliverable.

---

## 0. Commenting conventions

These follow common practice in professional TypeScript/React teams.

### The rule: comment the *why*, not the *what*

The code already says *what* it does. A comment should say what the code **can't**: the reason, the rule it follows, or what breaks if someone changes it.

```ts
// Bad: repeats the code
setLoading(true); // set loading to true

// Good: explains a decision a reader would question
// No navigate() here: RedirectIfAuthed sees the new session and redirects for us.
```

### Three kinds of comments

| Kind | Syntax | Where | Purpose |
|---|---|---|---|
| **Doc comment** (TSDoc) | `/** ... */` | Directly above an exported function, component, type, or constant | Shows up when you hover the name in VS Code. Say what it is, what it needs, and what it returns. |
| **Inline comment** | `//` | Above or beside one tricky line | Says why that line exists. |
| **File header** | `/** ... */` at the top | Only in files whose purpose isn't clear from the name | One or two sentences on the file's job. Most files don't need one. |

In JSX, use `{/* ... */}` inside the markup. In SQL, use `--`. In CSS, use `/* ... */`.

### TSDoc tags (use only when they add something)

| Tag | Meaning | Example |
|---|---|---|
| `@param name` | What an argument is | `@param token - The Supabase access token` |
| `@returns` | What comes back | `@returns The profile row, or 404` |
| `@throws` | When it throws | `@throws If VITE_SUPABASE_URL is missing` |
| `@remarks` | Extra detail or a gotcha | `@remarks Runs before every protected route` |
| `@example` | Short usage | `@example <AuthShell title="Log in">...</AuthShell>` |

For React components, describe the props in the type, not with `@param`:

```tsx
type AuthShellProps = {
  /** Heading shown above the form. */
  title: string;
  /** The form or message for this page. */
  children: ReactNode;
};
```

### Marker tags

| Tag | Use for |
|---|---|
| `// TODO:` | Planned work that isn't done yet |
| `// FIXME:` | Known bug or wrong behavior |
| `// NOTE:` | Important context a future reader must not miss |

### Don't comment

- Obvious lines (`const navigate = useNavigate();`)
- Every Tailwind class
- Code that's commented out (delete it; Git keeps the history)
- Your name or the date (Git records both)

---

## 1. Project map

```
StreakLy/
├── client/                 React app (what the user sees). Deployed to Vercel.
│   ├── public/             Static files served as-is (logo, favicon).
│   ├── src/
│   │   ├── main.tsx        Entry point: mounts React with router + auth.
│   │   ├── App.tsx         The route table: which URL shows which page.
│   │   ├── index.css       Design tokens, animations, custom Tailwind utilities.
│   │   ├── lib/            Shared clients (the Supabase connection).
│   │   ├── auth/           Login state + route guards.
│   │   ├── pages/          One file per URL (Landing, Login, SignUp, ...).
│   │   └── components/
│   │       ├── auth/       Layout shared by the auth pages.
│   │       └── landing/    Sections of the landing page.
│   ├── index.html          HTML shell; loads fonts and main.tsx.
│   ├── vite.config.ts      Build tool config (React + Tailwind plugins).
│   └── vercel.json         Sends every URL to index.html so React Router works.
├── server/                 Express API. Deployed to Render.
│   └── src/
│       ├── index.ts        Creates the app, sets middleware, defines routes.
│       ├── config/db.ts    PostgreSQL connection pool.
│       ├── lib/supabase.ts Supabase client used only to check tokens.
│       └── middleware/     Code that runs before routes (requireAuth).
├── db/                     SQL scripts, run in order in the Supabase SQL Editor.
├── design/                 Design files and mockups (not shipped).
├── docs/                   Product docs, requirements, dev log, this guide.
├── .husky/ + commitlint    Checks commit messages follow "type(scope): summary".
└── .gitmessage             Commit message template.
```

**Suggested README line per folder** (if your instructor wants folder-level docs, put a short `README.md` in each, or paste these into the root README):

| Folder | One-liner |
|---|---|
| `client/src/auth/` | Holds the current login session and the route guards that use it. |
| `client/src/pages/` | Top-level screens. Each file matches one route in `App.tsx`. |
| `client/src/components/` | Reusable pieces of pages, grouped by the page that uses them. |
| `client/src/lib/` | One-time setup for outside services, shared across the app. |
| `server/src/middleware/` | Express middleware that runs before route handlers. |
| `db/` | Database schema. Files are numbered and must run in order. |

---

## 2. How the pieces connect

### Signing up

```
SignUp.tsx ─ supabase.auth.signUp({ email, password, options.data.name })
      │
      ▼
Supabase Auth inserts a row into auth.users (name saved in raw_user_meta_data)
      │
      ▼
db/002 trigger on_auth_user_created ─ inserts matching row into public.profiles
```

### Logging in and route guards

```
Login.tsx ─ signInWithPassword() ─▶ Supabase
                                        │ fires onAuthStateChange
                                        ▼
AuthProvider.tsx stores the session ─▶ useAuth() gives it to any component
                                        │
       ┌────────────────────────────────┴───────────────────────────┐
RedirectIfAuthed (/, /login, /signup)                RequireAuth (/today)
  logged in  → go to /today (or where they were)       logged out → go to /login
```

### Calling the API

```
client ─ GET /me  (header: Authorization: Bearer <token>)
            │
server  requireAuth ─ supabase.auth.getUser(token) ─ sets res.locals.userId
            │
        /me route ─ SELECT name FROM profiles WHERE id = $1
```

### The session has three states

Used across `auth/` and `ResetPassword.tsx`. Worth knowing before reading any of them.

| Value | Meaning | What guards do |
|---|---|---|
| `undefined` | Supabase hasn't answered yet | Render nothing (avoids a flash of the wrong page) |
| `null` | Logged out | Redirect or show logged-out UI |
| `Session` | Logged in | Show the page |

---

## 3. Environment variables

There is no `.env.example` yet (see [5.8](#58-no-envexample-files)). Both apps stop at startup with an error if a required value is missing.

| App | Variable | Used in | Purpose |
|---|---|---|---|
| client | `VITE_SUPABASE_URL` | `lib/supabase.ts` | Supabase project URL |
| client | `VITE_SUPABASE_ANON_KEY` | `lib/supabase.ts` | Public key. Safe in the browser; the database's rules decide access. |
| client | `VITE_API_URL` | not used yet | Base URL of the Express API |
| server | `DATABASE_URL` | `config/db.ts` | PostgreSQL connection string |
| server | `SUPABASE_URL` | `lib/supabase.ts` | Same project URL, for token checks |
| server | `SUPABASE_ANON_KEY` | `lib/supabase.ts` | Same public key |
| server | `CLIENT_ORIGIN` | `index.ts` | Which site may call the API (CORS). Defaults to `http://localhost:5173`. |
| server | `PORT` | `index.ts` | Port to listen on. Defaults to 3000. |

---

## 4. File reference

Format for each file: **Purpose**, then **Functions/exports**, then **Suggested comments**.

### 4.1 Client: entry and routing

#### `client/src/main.tsx`

**Purpose:** Starts the React app inside `<div id="root">` in `index.html`.

The wrapper order matters. `BrowserRouter` is outermost so every component can use router hooks. `AuthProvider` sits inside it so the guards inside `App` can read the session.

**Suggested comments**

```tsx
// Order matters: AuthProvider must be inside BrowserRouter and around App,
// so every route and guard can read both the URL and the session.
createRoot(document.getElementById("root")!).render(
```

---

#### `client/src/App.tsx`

**Purpose:** The route table. Maps each URL to a page and groups pages under the guard that protects them.

| Function | What it does |
|---|---|
| `App()` | Returns the `<Routes>` tree. Layout routes (`<Route element={<Guard />}>` with no `path`) wrap child routes so the guard runs first. |

**Suggested comments**

```tsx
/**
 * App route table.
 *
 * Guards are layout routes: they run first, then render the child page
 * through <Outlet />.
 */
function App() {
```

```tsx
      {/* Logged-out only. Logged-in users get sent to /today. */}
      <Route element={<RedirectIfAuthed />}>
```

```tsx
      {/* Logged-in only. Logged-out users get sent to /login. */}
      <Route element={<RequireAuth />}>
```

```tsx
      {/* No guard on purpose: the email reset link logs the user in with a
          temporary session, so RedirectIfAuthed would bounce them to /today. */}
      <Route path="/forgot-password" element={<ForgotPassword />} />
```

---

#### `client/vercel.json`

**Purpose:** Tells Vercel to serve `index.html` for every URL. Without it, refreshing `/today` gives a 404 because no `today` file exists on the server. React Router then reads the URL and shows the right page.

JSON doesn't allow comments, so document this in the README or here.

---

### 4.2 Client: `lib/`

#### `client/src/lib/supabase.ts`

**Purpose:** Creates the one Supabase client the whole frontend shares. It handles login, sessions, and token refresh.

| Export | What it is |
|---|---|
| `supabase` | The shared client. Import it; don't create another one. |

**Suggested comments** (replace the current STEP comments, see [5.3](#53-leftover-tutorial-comments-in-libsupabasets))

```ts
/**
 * Shared Supabase client for the browser.
 *
 * Import this instead of calling createClient() again. One client means one
 * session, one token refresh timer, and one auth listener.
 *
 * @throws If VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is missing from client/.env.
 */
```

```ts
// Fail at startup with a clear message instead of a confusing error later.
if (!supabaseUrl || !supabaseAnonKey) {
```

---

### 4.3 Client: `auth/`

#### `client/src/auth/useAuth.ts`

**Purpose:** Defines the auth context and the hook components use to read the session.

| Export | What it does |
|---|---|
| `AuthContext` | React context holding `{ session }`. Default is `null` so the hook can tell if the provider is missing. |
| `useAuth()` | Returns `{ session }`. Throws if used outside `<AuthProvider>`. |

**Suggested comments**

```ts
/**
 * Current Supabase session.
 * undefined = still loading, null = logged out, Session = logged in.
 */
type AuthValue = { session: Session | null | undefined };
```

```ts
/**
 * Reads the current session from AuthProvider.
 *
 * @returns The auth value: `{ session }`.
 * @throws If called outside <AuthProvider>, so a missing provider fails loudly
 *         instead of acting like a logged-out user.
 */
export function useAuth() {
```

---

#### `client/src/auth/AuthProvider.tsx`

**Purpose:** Keeps the login session in React state and shares it with the whole app.

| Function | What it does |
|---|---|
| `AuthProvider({ children })` | Subscribes to Supabase auth changes once on mount, saves each new session to state, and unsubscribes on unmount. |

**Suggested comments**

```tsx
/**
 * Holds the Supabase session and shares it through AuthContext.
 *
 * Wrap the app with this once (see main.tsx). Read it with useAuth().
 */
export default function AuthProvider({ children }: { children: ReactNode }) {
```

```tsx
    // Supabase calls this right away with the saved session (if any),
    // then again on every login, logout, and token refresh.
    const { data } = supabase.auth.onAuthStateChange((_event, newSession) => {
```

```tsx
    // Stop listening when the provider unmounts, so we don't leak listeners.
    return () => data.subscription.unsubscribe();
```

---

#### `client/src/auth/RequireAuth.tsx`

**Purpose:** Route guard for logged-in pages.

| Function | What it does |
|---|---|
| `RequireAuth()` | Loading: renders nothing. Logged out: redirects to `/login` and saves the current path in `state.from`. Logged in: renders the child route. |

**Suggested comments** (the current comment is wrong, see [5.1](#51-wrong-comment-in-requireauthtsx))

```tsx
/**
 * Route guard for pages that need a logged-in user.
 *
 * Sends logged-out users to /login and saves where they were going in
 * `state.from`, so RedirectIfAuthed can send them back after login.
 */
export default function RequireAuth() {
```

```tsx
  // `replace` so the Back button doesn't return to a page they can't see.
  if (session === null)
```

---

#### `client/src/auth/RedirectIfAuthed.tsx`

**Purpose:** The opposite guard. Keeps logged-in users off the landing, login, and signup pages.

| Function | What it does |
|---|---|
| `RedirectIfAuthed()` | Loading: renders nothing. Logged in: redirects to `state.from`, or `/today` if there is none. Logged out: renders the child route. |

**Suggested comments**

```tsx
/**
 * Route guard for logged-out pages (/, /login, /signup).
 *
 * Sends logged-in users to the page they were trying to reach before login
 * (set by RequireAuth), or to /today.
 */
export default function RedirectIfAuthed() {
```

---

### 4.4 Client: `pages/`

All the auth pages share one pattern. Document it once at the top of a page, or in this guide, rather than in every file:

```
handleSubmit:
  1. e.preventDefault()           stop the browser reloading the page
  2. setLoading(true), clear msg  disable the button, hide the old error
  3. await supabase.auth.xxx()    do the work
  4. show error.message or success text
  5. finally setLoading(false)    re-enable the button whatever happened
```

#### `client/src/pages/Landing.tsx`

**Purpose:** The public home page at `/`. Only puts the landing sections in order.

**Suggested comments**

```tsx
/** Public landing page at "/". Arranges the sections in components/landing/. */
export default function Landing() {
```

---

#### `client/src/pages/SignUp.tsx`

**Purpose:** Create-account form at `/signup`.

| Item | What it does |
|---|---|
| `preEmail` | Email typed into the Hero form on the landing page, passed through router state. |
| `handleSubmit(e)` | Calls `supabase.auth.signUp` with email, password, and `name` in `options.data`. Shows the error, or tells the user to check their email. |
| `isPasswordShown` | Toggles the password field between hidden and visible. |

**Suggested comments**

```tsx
/**
 * Sign-up page at /signup.
 *
 * Creates a Supabase user. The database trigger in db/002_profile_trigger.sql
 * then creates the matching row in `profiles`.
 */
export default function SignUp() {
```

```tsx
  // Prefilled when the user typed their email in the landing page Hero form.
  const preEmail = location.state?.email ?? "";
```

```tsx
        // `name` goes into user metadata; the profile trigger reads it from there.
        options: { data: { name } },
```

Replace the existing comment on line 32 with:

```tsx
        // Email confirmation is on, so there is no session until they click the link.
        setMessage("Check your email to confirm");
```

---

#### `client/src/pages/Login.tsx`

**Purpose:** Log-in form at `/login`.

| Item | What it does |
|---|---|
| `resetMessage` | Success notice sent from `ResetPassword` after a password change. |
| `handleSubmit(e)` | Calls `signInWithPassword`. Only handles errors; success is handled by the guard. |
| `isPasswordShown` | Show/hide password toggle. |

**Suggested comments**

```tsx
/**
 * Log-in page at /login.
 *
 * On success this page does nothing else: the new session reaches
 * RedirectIfAuthed, which sends the user to /today.
 */
export default function Login() {
```

```tsx
  // Set by ResetPassword after a successful password change.
  const resetMessage = location.state?.resetMessage ?? "";
```

```tsx
      // No navigate() on success: RedirectIfAuthed redirects once the session updates.
      if (error) {
```

---

#### `client/src/pages/ForgotPassword.tsx`

**Purpose:** Asks for an email and sends a password reset link.

| Item | What it does |
|---|---|
| `handleSubmit(e)` | Calls `resetPasswordForEmail` with `redirectTo` set to this site's `/reset-password`. |

**Suggested comments**

```tsx
/**
 * Forgot-password page. Emails a reset link that opens /reset-password.
 */
export default function ForgotPassword() {
```

```tsx
        // Uses the current origin so the link works on localhost and on Vercel.
        redirectTo: `${window.location.origin}/reset-password`,
```

```tsx
        // Same message whether or not the email exists, so this form can't be
        // used to check who has an account.
        setMessage(
```

---

#### `client/src/pages/ResetPassword.tsx`

**Purpose:** Where the reset email link lands. Lets the user choose a new password.

| Item | What it does |
|---|---|
| `session` check | The reset link logs the user in with a temporary session. No session means the link is invalid, expired, or already used. |
| `handleSubmit(e)` | Calls `updateUser({ password })`, then signs out and goes to `/login` with a success message. |

**Suggested comments**

```tsx
/**
 * Reset-password page, opened from the link in the reset email.
 *
 * The link signs the user in with a temporary session. With no session the
 * link is invalid or used, so we show "Link expired" instead of the form.
 */
export default function ResetPassword() {
```

```tsx
        // Sign out so the user logs in again with the new password.
        const { error } = await supabase.auth.signOut();
```

```tsx
  // undefined = still checking the link; render nothing to avoid a flash.
  if (session === undefined) return null;
```

---

#### `client/src/pages/Today.tsx`

**Purpose:** The main logged-in page. Right now it is a placeholder with a log-out button.

| Function | What it does |
|---|---|
| `handleLogout()` | Calls `signOut`. On success, `RequireAuth` sees `session === null` and redirects to `/login`. |

**Suggested comments**

```tsx
/**
 * Today page: the user's home after login.
 *
 * TODO: Replace placeholder with today's plan and study timer.
 */
export default function Today() {
```

```tsx
  // No navigate() needed: after signOut, RequireAuth redirects to /login.
  async function handleLogout() {
```

---

### 4.5 Client: `components/auth/`

#### `client/src/components/auth/AuthShell.tsx`

**Purpose:** The shared layout for Login, SignUp, ForgotPassword, and ResetPassword: logo, tagline, page title, and footer note.

| Export | What it does |
|---|---|
| `AuthShell({ title, children })` | Renders the frame and puts `children` (the form) below the title. |

**Suggested comments**

```tsx
type AuthShellProps = {
  /** Page heading, e.g. "Log in". */
  title: string;
  /** The form or message shown under the heading. */
  children: ReactNode;
};

/**
 * Shared layout for the auth pages: logo, tagline, title, and privacy note.
 *
 * @example
 * <AuthShell title="Log in"><form>...</form></AuthShell>
 */
export default function AuthShell({ title, children }: AuthShellProps) {
```

---

### 4.6 Client: `components/landing/`

These are mostly markup. Give each component one doc comment, and only comment the logic.

#### `sampleWeek.ts`

**Purpose:** Fake week of study data shared by `Hero` and `Footer`, so both show the same streak.

```ts
/** One day in the demo week. `isToday` marks the day still in progress. */
type Day = { name: string; duration: string; isToday?: boolean };

/** Demo data for the landing page only. Not real user data. */
export const week: Day[] = [
```

#### `Header.tsx`

**Purpose:** Sticky top bar with logo, links to page sections, and Log in / Sign up.

```tsx
/** Landing page top bar. Sticks to the top while scrolling. */
export default function Header() {
```

#### `Hero.tsx`

**Purpose:** First section: headline, email form, and animated week of streak squares.

| Item | What it does |
|---|---|
| `daySquares` | Positions and delays for the twinkling squares in the background grid. |
| `streak` | Number of finished days in `week`, shown as the streak count. |
| `handleSubmit(e)` | Reads the email from the form and opens `/signup` with it in router state. |

```tsx
/** Background squares that twinkle. Positions line up with the 36px grid. */
const daySquares: DaySquare[] = [
```

```tsx
/**
 * Landing hero: headline, email signup, and the demo streak week.
 */
export default function Hero() {
  // Days done so far; today doesn't count until it's finished.
  const streak = week.filter((d) => !d.isToday).length;
```

```tsx
  // Send the email to SignUp so the user doesn't type it twice.
  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
```

#### `EstimateBand.tsx`

**Purpose:** Section showing a topic's estimated hours next to the actual time spent.

```tsx
/** Landing section: estimated vs. actual study time, with a sample bar. */
export default function EstimateBand() {
```

#### `HowItWorks.tsx`

**Purpose:** Steps explaining how the app is used. Linked from the header as `#how`.

```tsx
/** Landing "How it works" steps. Anchor target for the header link #how. */
export default function HowItWorks() {
```

#### `Friends.tsx`

**Purpose:** Section showing a sample friends feed. Linked from the header as `#friends`.

```tsx
/** Demo posts for the landing feed. Not real users. */
const posts: Post[] = [
```

```tsx
/** Landing section: friends-only feed with sample posts. */
export default function Friends() {
```

#### `FeedPost.tsx`

**Purpose:** One post in the feed: avatar, name, streak, what they studied, optional photo slot, reactions.

```tsx
/** Data for one feed post. */
export type Post = {
  /** Tailwind classes for the avatar's background and text color. */
  avatarTint: string;
  ...
  /** Hours since the post, shown as "2h ago". */
  recentActiveInHours: number;
  /** Shows the "Proof photo slot" placeholder when true. */
  hasPhoto: boolean;
  ...
};

/** One post in the landing page friends feed. */
export default function FeedPost({ post }: { post: Post }) {
```

#### `ReactionButton.tsx`

**Purpose:** A toggle button for one reaction (fire, clap, heart) with a count.

| Item | What it does |
|---|---|
| `isPressed` | Local on/off state, starting from the `pressed` prop. |
| `shownCount` | Adjusts `count` by one when the user's click differs from the starting state. |
| `ariaLabel` | Reads "Fire, 3 reactions" for screen readers. |

```tsx
/**
 * Reaction toggle with a live count.
 *
 * @remarks Demo only: the state lives in this component and is never saved.
 */
export default function ReactionButton({
```

```tsx
  // `count` already includes the starting press. Add or remove 1 only when
  // the user changed it: pressed → unpressed = -1, unpressed → pressed = +1.
  const shownCount = count + (pressed === isPressed ? 0 : pressed ? -1 : 1);
```

```tsx
export type ReactionButtonProps = {
  /** Phosphor icon component to draw. */
  icon: Icon;
  /** Reaction name, read aloud by screen readers. */
  name: string;
  /** Count before the user clicks, including the user's own reaction. */
  count: number;
  /** Whether the user had already reacted. */
  pressed: boolean;
};
```

#### `Footer.tsx`

**Purpose:** Dark "night" footer with a twinkling grid and the demo week.

```tsx
/** Twinkling squares in the footer grid, positioned from the right edge. */
const squares: NightSquare[] = [
```

```tsx
/**
 * Landing footer in the night theme.
 *
 * @remarks The `night` class swaps the streak square colors (see index.css).
 */
export default function Footer() {
```

---

### 4.7 Client: styles

#### `client/src/index.css`

**Purpose:** All global styling. Tailwind is loaded here, and this file adds the design tokens and custom utilities.

| Block | What it does |
|---|---|
| `@theme { --color-* }` | Design tokens. Each becomes Tailwind classes (`--color-ember` → `bg-ember`, `text-ember`). |
| `@theme { --font-* }` | Font families (`font-display`, `font-ui`). Fonts load in `index.html`. |
| `@theme { --animate-* }` + `@keyframes` | Named animations, used as `animate-twinkle` etc. |
| `@property --streak` + `streak-count` | Counts the streak number up by animating a CSS integer. |
| `@layer base` | Focus ring and the `--mk-*` square colors. `.night` swaps them for the dark footer. |
| `scroll-fill`, `scroll-draw`, `scroll-reveal` | Animations driven by scrolling. Off for reduced motion and in browsers without `animation-timeline`. |
| `bg-streak-grid`, `bg-streak-grid-day` | Repeating square grid background (inline SVG). |

**Suggested comments** (section headers make long CSS easy to scan)

```css
/* ==========================================================================
   Design tokens: colors and fonts. Each one becomes Tailwind classes.
   ========================================================================== */
@theme {
```

```css
/* Night theme (footer). Applied with the `.night` class. */
  --color-night: #16142a;
```

```css
/* ==========================================================================
   Scroll-driven animations. Skipped for reduced motion and in browsers
   without animation-timeline, so content is always visible.
   ========================================================================== */
```

```css
/* Square grid background drawn with an inline SVG. 36px tile, 28px square. */
@utility bg-streak-grid {
```

---

### 4.8 Server

#### `server/src/index.ts`

**Purpose:** Creates the Express app, sets middleware, defines routes, and starts listening.

| Route | Auth | What it does |
|---|---|---|
| `GET /me` | Yes | Returns the logged-in user's profile name. 404 if no profile row. |
| `GET /health` | No | Returns `{ ok: true }` if the server is up. |
| `GET /health/db` | No | Runs `select 1` to check the database connection. |

**Suggested comments**

```ts
/**
 * StreakLy API server.
 *
 * Every route that reads user data must use requireAuth, which sets
 * res.locals.userId from the verified token.
 */
```

```ts
// Only the frontend may call this API from a browser.
app.use(
  cors({
```

```ts
/**
 * GET /me — the logged-in user's profile.
 *
 * @returns 200 `{ profile: { name } }`, 404 if no profile, 500 on DB error.
 */
app.get("/me", requireAuth, async (req, res) => {
```

```ts
    // $1 placeholder, never string concatenation: prevents SQL injection.
    // userId comes from the verified token, never from the request body.
    const result = await pool.query("SELECT name FROM profiles WHERE id = $1", [
```

```ts
/** GET /health — server is up. Used by Render to check the deploy. */
app.get("/health", (req, res) => {
```

```ts
/** GET /health/db — server can reach the database. */
app.get("/health/db", async (req, res) => {
```

---

#### `server/src/config/db.ts`

**Purpose:** Creates one PostgreSQL connection pool shared by all routes.

```ts
/**
 * Shared PostgreSQL pool. A pool reuses open connections instead of
 * opening a new one for every query.
 *
 * @throws If DATABASE_URL is missing from server/.env.
 */
export const pool = new Pool({
```

```ts
// NOTE: This connects directly, not through the Supabase API, so Row Level
// Security does not protect these queries. Always filter by res.locals.userId.
```

(Check that the `NOTE` is true for your setup: it holds when `DATABASE_URL` uses the default `postgres` user, which owns the tables.)

---

#### `server/src/lib/supabase.ts`

**Purpose:** Supabase client for the server. Only used to check tokens in `requireAuth`. Already has good comments; add a doc comment on the export.

```ts
/**
 * Server-side Supabase client, used only to verify access tokens.
 * Sessions are off because each request brings its own token.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
```

---

#### `server/src/middleware/requireAuth.ts`

**Purpose:** Express middleware that rejects requests without a valid Supabase token.

| Step | What happens |
|---|---|
| 1 | Reads `Authorization: Bearer <token>`. |
| 2 | Missing or malformed header: 401. |
| 3 | `supabase.auth.getUser(token)` asks Supabase if the token is valid. |
| 4 | Invalid or expired: 401. Valid: saves the user's id in `res.locals.userId` and calls `next()`. |
| 5 | Unexpected error: `next(err)` hands it to Express's error handler. |

**Suggested comments**

```ts
/**
 * Express middleware: only lets requests with a valid Supabase token through.
 *
 * Expects `Authorization: Bearer <access_token>`. On success, sets
 * `res.locals.userId` for the route handler.
 *
 * @returns 401 if the header is missing or the token is invalid or expired.
 */
export async function requireAuth(
```

```ts
    // Asks Supabase to verify the token. Works even if a user was deleted or
    // logged out, unlike checking the token's signature locally.
    const { data, error } = await supabase.auth.getUser(token);
```

---

### 4.9 Database: `db/`

#### `db/001_tables.sql`

**Purpose:** Creates every table, relationship, and rule. Runs in one transaction, so it all succeeds or nothing is created.

| Table | Stores | Key rules |
|---|---|---|
| `profiles` | Public info per user (name) | `id` = `auth.users.id`. Deleted with the user. |
| `subjects` | A user's subjects (e.g. "Linear Algebra") | Name unique per user. |
| `topics` | Topics in a subject, with estimated hours | Name unique per subject. Hours > 0. |
| `study_sessions` | One timed study block | End after start. Duration > 0. `local_date` is the user's own calendar day, used for streaks. |
| `daily_plans` | A user's plan for one date | One plan per user per day. |
| `daily_plan_items` | Topics in a daily plan | A topic appears once per plan. |
| `friendships` | Friend requests and accepted friends | Can't friend yourself. One row per pair in either direction. |
| `reactions` | A reaction on a study session | Type is fire, clap, or heart. One reaction per user per session. |

**Suggested comments** (put one `--` line above each `create table`, and above the less obvious rules)

```sql
-- One row per user. Created automatically by the trigger in 002.
create table profiles (
```

```sql
-- One timed study block. Shown to friends only when is_shared is true.
create table study_sessions (
```

```sql
    -- The user's calendar day when they studied. Stored separately from
    -- started_at so streaks follow the user's timezone, not UTC.
    local_date date not null,
    -- Path in Supabase Storage, not the image itself. Null = no photo.
    proof_image_path text,
```

```sql
-- least/greatest sorts the two ids, so A→B and B→A count as the same pair.
-- This blocks duplicate or crossed friend requests.
create unique index friendships_one_per_pair on friendships (
```

```sql
-- RLS is on with no policies yet: the Supabase API can't read or write this
-- table. Add policies before the client queries it directly.
alter table profiles enable row level security;
```

---

#### `db/002_profile_trigger.sql`

**Purpose:** When Supabase Auth creates a user, this trigger creates their `profiles` row.

| Item | What it does |
|---|---|
| `handle_new_user()` | Inserts `(id, name)` into `public.profiles`. Name comes from sign-up metadata, or the part of the email before `@`. |
| `on_auth_user_created` | Runs `handle_new_user()` after each insert into `auth.users`. |

**Suggested comments**

```sql
-- Creates a profile row for every new sign-up.
-- security definer: runs with the owner's rights, because the auth system
-- that inserts the user can't write to public.profiles itself.
-- search_path = '': blocks search_path tricks; that's why every name is
-- written in full (public.profiles).
create function public.handle_new_user() returns trigger language plpgsql security definer
```

```sql
            -- Name from SignUp.tsx (options.data.name), else the email prefix.
            coalesce (
```

---

## 5. Maintainability notes

Issues found while writing this guide. These are the "legacy code" smells: misleading comments, template leftovers, and repetition. Fix them, or list them in the deliverable as identified issues.

### 5.1 Wrong comment in `RequireAuth.tsx`

[client/src/auth/RequireAuth.tsx:4](../client/src/auth/RequireAuth.tsx#L4) says logged-out users are "sent to /". The code sends them to `/login`. A wrong comment is worse than none. Replace it with the comment in [4.3](#clientsrcauthrequireauthtsx).

### 5.2 Incomplete comment in `RedirectIfAuthed.tsx`

[client/src/auth/RedirectIfAuthed.tsx:4](../client/src/auth/RedirectIfAuthed.tsx#L4) lists `/login, /signup`, but `/` (Landing) is also wrapped. It also says users go to `/today`, but they go to `state.from` first if it's set.

### 5.3 Leftover tutorial comments in `lib/supabase.ts`

[client/src/lib/supabase.ts](../client/src/lib/supabase.ts) still has "STEP 1… Fill the blank with the function's name". These were learning notes. The blanks are filled, so the notes now confuse readers.

### 5.4 Comments that do nothing

[EstimateBand.tsx:2-4](../client/src/components/landing/EstimateBand.tsx#L2-L4), [Hero.tsx:34-36](../client/src/components/landing/Hero.tsx#L34-L36), and [Friends.tsx:40-42](../client/src/components/landing/Friends.tsx#L40-L42) contain:

```tsx
  {
    /* Hero section */
  }
```

Outside JSX this is an empty code block holding a comment, which Prettier formatted this way. Replace it with a `/** */` doc comment above the function.

### 5.5 Unclear comment in `SignUp.tsx`

[SignUp.tsx:32](../client/src/pages/SignUp.tsx#L32): "This is set because in the production this should be the message" doesn't say why. Suggested replacement is in [4.4](#clientsrcpagessignuptsx).

### 5.6 Repeated code

- The show/hide password input (input + eye button, about 25 lines) is copied in `Login.tsx`, `SignUp.tsx`, and `ResetPassword.tsx`. A `PasswordInput` component in `components/auth/` would put it in one place.
- The same long input `className` appears in all four auth pages. A shared component or constant would mean one edit changes all of them.
- All four auth pages repeat the same `loading` / `message` / `try-catch-finally` flow (see the pattern in [4.4](#44-client-pages)).

### 5.7 Possibly unused files (Vite template leftovers)

No file imports these:

- `client/src/App.css`
- `client/src/assets/hero.png`, `react.svg`, `vite.svg`
- `client/public/icons.svg`
- `client/README.md` is the default Vite template text.

Search the project once more before deleting.

### 5.8 No `.env.example` files

`.gitignore` already allows `.env.example`, but none exists. Add `client/.env.example` and `server/.env.example` with variable names and empty values (see [Section 3](#3-environment-variables)), so a new developer knows what to set.

### 5.9 Small cleanups

- [Login.tsx:3-4](../client/src/pages/Login.tsx#L3-L4) imports from `react-router` twice. Merge into one line.
- The root `package.json` lists `@supabase/supabase-js`, but the root has no code that uses it. Probably installed in the wrong folder.
- `"main": "index.js"` in the root and `server/package.json` points to a file that doesn't exist. The real entry is `dist/index.js`.
- The root `README.md` is empty. It should at least say what StreakLy is and how to run both apps.
- Error messages name the env file differently: `config/db.ts` says ".env", `lib/supabase.ts` says "server/.env".
- `VITE_API_URL` is set in `client/.env` but not used yet.
