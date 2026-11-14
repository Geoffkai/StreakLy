import { Link, useNavigate } from "react-router";
import {
  FireIcon,
  HandsClappingIcon,
  HeartIcon,
  LockSimpleIcon,
} from "@phosphor-icons/react";
import FeedPost, { type Post } from "../components/landing/FeedPost";
import Footer from "../components/landing/Footer";
import { week } from "../components/landing/sampleWeek";
import { Fragment } from "react";

type DaySquare = {
  top: string;
  left: string;
  delay: string;
};

const posts: Post[] = [
  {
    avatarTint: "bg-ember-wash text-ember-ink",
    initials: "BS",
    name: "Bea Santos",
    recentActiveInHours: 2,
    streakDays: 12,
    topic: "Eigenvalues",
    subject: "Linear Algebra",
    duration: "1h 10m",
    hasPhoto: true,
    reactions: [
      { icon: FireIcon, name: "Fire", count: 3, pressed: true },
      { icon: HandsClappingIcon, name: "Clap", count: 2, pressed: false },
      { icon: HeartIcon, name: "Heart", count: 0, pressed: false },
    ],
  },
  {
    avatarTint: "bg-line text-ink-2",
    initials: "AA",
    name: "Asher Abesia",
    recentActiveInHours: 5,
    streakDays: 4,
    topic: "Integrals of Trigonometric Functions",
    subject: "Calculus II",
    duration: "2h 45m",
    hasPhoto: false,
    reactions: [
      { icon: FireIcon, name: "Fire", count: 1, pressed: false },
      { icon: HandsClappingIcon, name: "Clap", count: 2, pressed: true },
      { icon: HeartIcon, name: "Heart", count: 0, pressed: false },
    ],
  },
];

const daySquares: DaySquare[] = [
  { top: "40px", left: "40px", delay: "2.4s" },
  { top: "112px", left: "148px", delay: "5s" },
  { top: "4px", left: "220px", delay: "3.6s" },
  { top: "184px", left: "76px", delay: "6.4s" },
  { top: "76px", left: "328px", delay: "8.2s" },
];

export default function Landing() {
  const navigate = useNavigate();
  const streak = week.filter((d) => !d.isToday).length;

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const email = new FormData(e.currentTarget).get("email");

    navigate("/signup", {
      state: { email },
    });
  }

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-paper">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-18 sm:px-8 lg:px-18">
          <Link
            to="/"
            aria-label="streakly home"
            className="inline-flex items-center gap-[.32em]"
          >
            <img src="/logo.svg" alt="" className="size-7 sm:size-8" />
            <span className="font-display text-2xl leading-none font-extrabold tracking-[-0.035em] sm:text-[28px]">
              streakly
            </span>
          </Link>
          <nav aria-label="Main" className="flex items-center gap-1 sm:gap-2">
            <a
              href="#how"
              className="hidden min-h-11 items-center rounded-[10px] px-3.5 text-[15px] font-[650] text-ink-2 hover:text-ink md:inline-flex"
            >
              How it works
            </a>
            <a
              href="#friends"
              className="hidden min-h-11 items-center rounded-[10px] px-3.5 text-[15px] font-[650] text-ink-2 hover:text-ink md:inline-flex"
            >
              Friends
            </a>
            <Link
              to="/login"
              className="inline-flex min-h-11 items-center rounded-xl px-3.5 text-[15px] font-bold text-ink hover:bg-sheet"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="inline-flex min-h-11 items-center rounded-xl border border-ember-deep px-4 text-[15px] font-bold text-ink transition hover:bg-sheet active:scale-98"
            >
              Sign up
            </Link>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero section */}
        <section
          aria-labelledby="hero-h"
          className="relative isolate mx-auto max-w-7xl px-4 sm:px-8 lg:px-18"
        >
          <div
            aria-hidden="true"
            className="bg-streak-grid-day pointer-events-none absolute top-0 left-0 -z-10 hidden h-80 w-full mask-intersect mask-[linear-gradient(to_right,#000,transparent_50%),linear-gradient(to_bottom,#000_30%,transparent)] [--twinkle-peak:0.4] sm:block"
          >
            {daySquares.map((square, i) => (
              <span
                key={i}
                className="absolute size-7 rounded-[7px] bg-ember opacity-0 animate-twinkle motion-reduce:animate-none"
                style={{
                  top: square.top,
                  left: square.left,
                  animationDelay: square.delay,
                }}
              />
            ))}
          </div>
          <div className="grid gap-5 pt-6 lg:grid-cols-[1.45fr_1fr] lg:items-end lg:gap-16 lg:pt-9">
            <h1
              id="hero-h"
              className="font-display text-[clamp(3rem,9vw,5.75rem)] font-extrabold tracking-[-0.035em] leading-[0.93] text-balance"
            >
              {"Every day you show up counts.".split(" ").map((word, i) => (
                <Fragment key={i}>
                  <span
                    style={{ animationDelay: `${i * 70}ms` }}
                    className="inline-block animate-word-rise motion-reduce:animate-none"
                  >
                    {word}
                  </span>{" "}
                </Fragment>
              ))}
            </h1>

            <p className="lg:mb-5 text-lg leading-normal text-ink-2">
              A study tracker that rewards showing up, not grinding. Plan topics
              with honest estimates, time your sessions, and keep a daily streak
              with a few friends.
            </p>
          </div>

          <ol
            aria-label="Sample week: six study days of different lengths, each counted the same, and today still open"
            className="mt-8 grid grid-cols-[repeat(7,minmax(0,100px))] gap-2 sm:gap-4 lg:mt-10"
          >
            {/* The ember boxes */}
            {week.map((d, i) => (
              <li
                key={d.name}
                className="flex flex-col items-start gap-2 sm:gap-2.5"
              >
                <div
                  className={`aspect-square w-full rounded-[24%] border-2 relative 
                  ${d.isToday ? "border-ink" : "border-dashed border-line-2"}`}
                >
                  {d.isToday ? (
                    <>
                      {/* pulse ring */}
                      <span
                        style={{ animationDelay: `2400ms` }}
                        className="absolute -inset-0.5 rounded-[inherit] border-2 border-ember opacity-0 animate-today-pulse motion-reduce:animate-none"
                      />

                      {/* session tide */}
                      <span
                        style={{ animationDelay: "2400ms" }}
                        className="absolute inset-0 rounded-[20%] bg-ember/30 animate-session-tide motion-reduce:hidden"
                      />
                    </>
                  ) : (
                    <span
                      style={{ animationDelay: `${i * 260 + 250}ms` }}
                      className="absolute -inset-0.5 rounded-[inherit] bg-ember animate-fill-up motion-reduce:animate-none"
                    ></span>
                  )}
                </div>
                <span className="text-xs sm:text-[15px] font-[750]">
                  {d.name}
                </span>
                <span
                  style={
                    d.isToday
                      ? undefined
                      : { animationDelay: `${i * 260 + 420}ms` }
                  }
                  className={`-mt-1.5 text-[11px] leading-tight sm:-mt-2 sm:text-sm font-semibold ${
                    d.isToday
                      ? "text-ink-2"
                      : "text-ink-3 animate-fade-in motion-reduce:animate-none"
                  }`}
                >
                  {d.duration}
                </span>
              </li>
            ))}
          </ol>

          <div className="mt-6 grid gap-6 lg:mt-4.5 lg:grid-cols-[minmax(0,1fr)_440px] lg:items-start lg:gap-x-4">
            {/* Left: streak count + caption */}
            <div className="flex flex-col">
              <div className="flex items-baseline gap-2.5">
                {/* visible number is drawn by CSS (streak-count); screen readers get the sr-only one */}
                <b
                  aria-hidden="true"
                  style={{ "--to": streak } as React.CSSProperties}
                  className="streak-count font-display text-[56px] font-extrabold leading-[0.9] tracking-[-0.035em] tabular-nums"
                />
                <span className="sr-only">{streak}</span>
                <span className="text-[15px] font-[650] text-ink-2">
                  day streak
                </span>
              </div>
              <p
                style={{ animationDelay: "2100ms" }}
                className="pt-4 font-display text-[22px] font-[650] tracking-[-0.01em] text-balance lg:pt-6 animate-fade-in motion-reduce:animate-none"
              >
                20 minutes or 4 hours, the square fills the same.
              </p>
            </div>

            {/* Right: email form + message */}
            <div>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-2 sm:flex-row"
              >
                <label htmlFor="lp-email" className="sr-only">
                  Email
                </label>
                <input
                  id="lp-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@school.edu.ph"
                  className="min-h-13 min-w-0 flex-1 rounded-xl border-[1.5px] border-line-2 bg-sheet px-3.5 text-base font-medium text-ink placeholder:text-ink-3 focus:border-ember-deep focus:outline-hidden focus:ring-3 focus:ring-ember-wash"
                />
                <button
                  type="submit"
                  className="min-h-13 whitespace-nowrap rounded-xl bg-ember-deep px-5 text-base font-bold text-sheet transition hover:bg-ember-ink active:scale-98"
                >
                  Start your streak
                </button>
              </form>
              <p className="mt-2.5 flex min-h-5.5 items-center gap-1.5 text-sm font-semibold text-ink-2">
                <LockSimpleIcon aria-hidden className="size-4 shrink-0" />
                Friends-only sharing. No public leaderboards.
              </p>
            </div>
          </div>
        </section>

        {/* Estimation band section */}
        <section
          aria-labelledby="est-h"
          className="mt-14 border-y border-line bg-sheet lg:mt-16"
        >
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-18 lg:py-14">
            <div>
              <h2
                id="est-h"
                className="font-display text-[clamp(2rem,4vw,2.5rem)] leading-[1.05] font-extrabold tracking-[-0.03em] text-balance"
              >
                Plan in hours, then see the real time beside it.
              </h2>
              <p className="mt-4 max-w-[46ch] text-ink-2">
                Every topic keeps its estimate next to the time you actually
                spent. Going over isn't a failure. It's how your next estimate
                gets sharper.
              </p>
            </div>

            <div className="flex flex-col gap-7 lg:pt-2">
              <div>
                {/* Derivative + estimate hour */}
                <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 text-[15px] font-[650]">
                  <span>Derivatives</span>
                  <span className="inline-flex items-center gap-1.5 font-bold text-ink">
                    <span
                      aria-hidden="true"
                      className="size-2.75 shrink-0 rounded-[2.5px] border-[1.5px] border-ink-2 bg-[repeating-linear-gradient(135deg,var(--color-ink-2)_0_1.5px,transparent_1.5px_4px)]"
                    />
                    1h 40m of 1h, over by 40m
                  </span>
                </div>

                {/* The progress bar */}
                <div
                  role="img"
                  aria-label="Estimated 1 hour, took 1 hour 40 minutes"
                  className="relative mt-3 h-3.5"
                >
                  {/* estimate: dashed outline */}
                  <span className="absolute inset-y-0 left-0 w-3/5 rounded-[3px] border-[1.5px] border-dashed border-indigo" />
                  {/* actual time, up to the estimate */}
                  <span className="scroll-draw absolute inset-y-0 left-0 w-3/5 rounded-[3px] bg-ink-2" />
                  {/* overrun: striped, starts where the estimate ends */}
                  <span className="scroll-draw [--range:cover_40%_cover_55%] absolute inset-y-0 left-3/5 w-2/5 rounded-r-[3px] border-[1.5px] border-l-0 border-ink-2 bg-[repeating-linear-gradient(135deg,var(--color-ink-2)_0_2px,transparent_2px_5px)]" />
                </div>
              </div>

              {/* row 2 */}
              <div>
                <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 text-[15px] font-[650]">
                  <span>Integrals</span>
                  <span className="text-ink-2">34m of 2h</span>
                </div>
                <div
                  role="img"
                  aria-label="Estimated 2 hours, 34 minutes done so far"
                  className="relative mt-3 h-3.5"
                >
                  <span className="absolute inset-0 rounded-[3px] border-[1.5px] border-dashed border-indigo" />
                  <span className="scroll-draw absolute inset-y-0 left-0 w-[28%] rounded-[3px] bg-ink-2" />
                </div>
              </div>

              {/* legend */}
              <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[13px] font-semibold text-ink-2">
                <li className="inline-flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="h-2.5 w-5 rounded-xs border-[1.5px] border-dashed border-indigo"
                  />
                  Estimate
                </li>
                <li className="inline-flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="h-2.5 w-5 rounded-xs bg-ink-2"
                  />
                  Actual
                </li>
                <li className="inline-flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="h-2.5 w-5 rounded-xs border-[1.5px] border-ink-2 bg-[repeating-linear-gradient(135deg,var(--color-ink-2)_0_2px,transparent_2px_5px)]"
                  />
                  Over
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* How it works section */}
        <section id="how" aria-labelledby="how-h" className="scroll-mt-20">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-8 lg:px-18 lg:py-28">
            <h2
              id="how-h"
              className="max-w-[14ch] font-display text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.02] font-extrabold tracking-[-0.035em] text-balance"
            >
              Three steps, once a day.
            </h2>

            <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-16">
              <ol className="flex flex-col gap-9">
                <li className="grid grid-cols-[44px_minmax(0,1fr)] gap-4 sm:gap-5">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 size-11 rounded-[24%] border-2 border-dashed border-line-2"
                  />
                  <div>
                    <h3 className="font-display text-2xl font-bold tracking-[-0.015em]">
                      Plan your topics
                    </h3>
                    <p className="mt-1.5 max-w-[42ch] text-ink-2">
                      Add your subjects and give each topic an estimate.
                    </p>
                  </div>
                </li>
                <li className="grid grid-cols-[44px_minmax(0,1fr)] gap-4 sm:gap-5">
                  <span
                    aria-hidden="true"
                    className="relative mt-0.5 size-11 overflow-hidden rounded-[24%] border-2 border-ember"
                  >
                    <span className="absolute inset-x-0 bottom-0 h-1/2 bg-ember" />
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-bold tracking-[-0.015em]">
                      Time the session
                    </h3>
                    <p className="mt-1.5 max-w-[42ch] text-ink-2">
                      Run the focus timer or a Pomodoro. Forgot to start it? Log
                      the session after.
                    </p>
                  </div>
                </li>
                <li className="grid grid-cols-[44px_minmax(0,1fr)] gap-4 sm:gap-5">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 size-11 rounded-[24%] bg-ember"
                  />
                  <div>
                    <h3 className="font-display text-2xl font-bold tracking-[-0.015em]">
                      Today's square fills
                    </h3>
                    <p className="mt-1.5 max-w-[42ch] text-ink-2">
                      Any session counts. A 20-minute day keeps your streak the
                      same as a 4-hour one.
                    </p>
                  </div>
                </li>
              </ol>

              <figure>
                <div className="relative grid aspect-video place-items-center overflow-hidden rounded-[20px] bg-ink">
                  <span className="pointer-events-none absolute inset-3 rounded-[14px] border-[1.5px] border-dashed border-night-3" />
                  <button
                    type="button"
                    aria-label="Play the how-it-works video (placeholder)"
                    className="relative grid size-18 place-items-center rounded-[24%] bg-ember-deep text-sheet transition hover:bg-ember-ink active:scale-98 sm:size-20"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="ml-1 size-8"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M7 4.5v15a1 1 0 0 0 1.5.86l12-7.5a1 1 0 0 0 0-1.72l-12-7.5A1 1 0 0 0 7 4.5Z" />
                    </svg>
                  </button>
                  <span className="absolute bottom-6 left-6 rounded-lg bg-night-2 px-2.5 py-1 text-[13px] font-bold text-moon tabular-nums">
                    Video slot · 16:9
                  </span>
                </div>
                <figcaption className="mt-3 text-sm font-semibold text-ink-3">
                  Placeholder: a 60-90 second screen recording of plan, time,
                  square fills. Captions on.
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* Friends Section */}
        <section
          id="friends"
          aria-labelledby="fr-h"
          className="scroll-mt-20 border-y border-line bg-sheet"
        >
          <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,500px)] lg:items-center lg:gap-16 lg:px-18 lg:py-28">
            {/* Left side of friends (A few friends. No leaderboard.) */}
            <div>
              <h2
                id="fr-h"
                className="max-w-[14ch] font-display text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.02] font-extrabold tracking-[-0.035em] text-balance"
              >
                A few friends. No leaderboard.
              </h2>
              <p className="mt-5 max-w-[44ch] text-lg leading-normal text-ink-2">
                Studying is easier when someone notices. Share a session with
                the classmates you add, and they can cheer you on.
              </p>
              <ul className="mt-8 flex flex-col gap-3.5">
                <li className="grid grid-cols-[10px_minmax(0,1fr)] gap-3.5 text-[15px] font-semibold">
                  <span
                    aria-hidden="true"
                    className="mt-1.75 size-2.5 rounded-[2.5px] bg-ember "
                  />
                  You choose what to share. It's a switch on every session.
                </li>
                <li className="grid grid-cols-[10px_minmax(0,1fr)] gap-3.5 text-[15px] font-semibold">
                  <span
                    aria-hidden="true"
                    className="mt-1.75 size-2.5 rounded-[2.5px] bg-ember "
                  />
                  Friends react with a fire, a clap or a heart.
                </li>
                <li className="grid grid-cols-[10px_minmax(0,1fr)] gap-3.5 text-[15px] font-semibold">
                  <span
                    aria-hidden="true"
                    className="mt-1.75 size-2.5 rounded-[2.5px] bg-ember "
                  />
                  Nobody is ranked by hours. Not friends, not strangers.
                </li>
              </ul>
            </div>

            {/* The Friends Page */}
            <figure className="rounded-[28px] bg-paper p-3 sm:p-4">
              {/* Caption */}
              <figcaption className="px-2 pt-1 pb-3 text-[13px] font-semibold text-ink-3">
                Sample feed. Names are made up.
              </figcaption>
              <ul className="divide-y divide-line rounded-[20px] border border-line bg-sheet">
                {posts.map((post) => (
                  <FeedPost key={post.name} post={post} />
                ))}

                {/* Mika Reyes example */}
                <li className="flex items-center gap-3 p-4 scroll-reveal">
                  <span
                    aria-hidden="true"
                    className="grid size-10.5 shrink-0 place-items-center rounded-xl bg-indigo-wash text-sm font-extrabold text-indigo"
                  >
                    MR
                  </span>
                  <p className="min-w-0 flex-1 text-[14.5px] text-ink-2">
                    <b className="text-ink">Mika Reyes</b> studied{" "}
                    <b className="text-ink">Limits</b> for{" "}
                    <b className="text-ink">20m</b>
                  </p>
                  <span className="shrink-0 text-[13px] font-medium text-ink-3">
                    Just now
                  </span>
                </li>
              </ul>
            </figure>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
