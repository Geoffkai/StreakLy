import { Link, useNavigate } from "react-router";
type Day = { name: string; duration: string; isToday?: boolean };

const week: Day[] = [
  { name: "Mon", duration: "20 min" },
  { name: "Tue", duration: "4h" },
  { name: "Wed", duration: "45 min" },
  { name: "Thu", duration: "1h 30m" },
  { name: "Fri", duration: "25 min" },
  { name: "Sat", duration: "2h" },
  { name: "Today", duration: "Still open", isToday: true },
];

export default function Landing() {
  const navigate = useNavigate();

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
          className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-18"
        >
          <div className="grid gap-5 pt-6 lg:grid-cols-[1.45fr_1fr] lg:items-end lg:gap-16 lg:pt-9">
            <h1
              id="hero-h"
              className="font-display text-[clamp(3rem,9vw,5.75rem)] font-extrabold tracking-[-0.035em] leading-[0.93] text-balance"
            >
              Every day you show up counts.
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
            {week.map((d) => (
              <li
                key={d.name}
                className="flex flex-col items-start gap-2 sm:gap-2.5"
              >
                <div
                  className={`aspect-square w-full rounded-[24%] border-2
                  ${d.isToday ? "border-ink" : " relative border-dashed border-line-2"}`}
                >
                  {!d.isToday && (
                    <span className="absolute -inset-0.5 rounded-[inherit] bg-ember"></span>
                  )}
                </div>
                <span className="text-xs sm:text-[15px] font-[750]">
                  {d.name}
                </span>
                <span
                  className={`-mt-1.5 text-[11px] leading-tight sm:-mt-2 sm:text-sm font-semibold ${
                    d.isToday ? "text-ink-2" : "text-ink-3"
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
                <b className="font-display text-[56px] font-extrabold leading-[0.9] tracking-[-0.035em] tabular-nums">
                  {week.filter((d) => !d.isToday).length}
                </b>
                <span className="text-[15px] font-[650] text-ink-2">
                  day streak
                </span>
              </div>
              <p className="pt-4 font-display text-[22px] font-[650] tracking-[-0.01em] text-balance lg:pt-6">
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 256 256"
                  fill="currentColor"
                  aria-hidden="true"
                  className="size-4 shrink-0"
                >
                  <path d="M208,80H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80ZM96,56a32,32,0,0,1,64,0V80H96ZM208,208H48V96H208V208Z" />
                </svg>
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
                  <span className="absolute inset-y-0 left-0 w-3/5 rounded-[3px] bg-ink-2" />
                  {/* overrun: striped, starts where the estimate ends */}
                  <span className="absolute inset-y-0 left-3/5 w-2/5 rounded-r-[3px] border-[1.5px] border-l-0 border-ink-2 bg-[repeating-linear-gradient(135deg,var(--color-ink-2)_0_2px,transparent_2px_5px)]" />
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
                  <span className="absolute inset-y-0 left-0 w-[28%] rounded-[3px] bg-ink-2" />
                </div>
              </div>

              {/* legend */}
              <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[13px] font-semibold text-ink-2">
                <li className="inline-flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="h-2.5 w-5 rounded-xs border-[1.5px] border-dashed border-indigo"
                  />
                </li>
                <li className="inline-flex items-center gap-2">
                  Estimate
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
                    Video slot · 16:9 /
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
              <ul className="mt-8 flex flex-col gap3.5">
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
                {/* Bea Santos */}
                <li className="p-4">
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className={`grid size-10.5 shrink-0 place-items-center rounded-xl text-sm font-extrabold bg-ember-wash text-ember-ink`}
                    >
                      BS
                    </span>
                    <div className="min-w-0 flex-1">
                      <b className="block text-[15px]">Bea Santos</b>
                      <span className="text-[13px] font-medium text-ink-3">
                        2h ago
                      </span>
                    </div>
                    <span className="inline-flex shrink 0 items-center gap-1.5 text-[12.5px] font-bold text-ink-2">
                      <img src="/logo.svg" alt="" className="size-4" />
                      12-day streak
                    </span>
                  </div>
                  <p className="mt-2.5 text-[14.5px] text-ink-2">
                    Studied <b className="text-ink">Eigenvalues</b> in Linear
                    Algebra for <b className="text-ink">1h 10m</b>
                  </p>

                  {/* Photo Slot */}
                  <div className="mt-3 grid aspect-16/10 place-items-center rounded-[14px] border-[1.5px] border-dashed border-line-2 bg-paper">
                    <div className="flex flex-col items-center gap-1.5 text-ink-3">
                      <svg
                        viewBox="0 0 256 256"
                        fill="currentColor"
                        aria-hidden="true"
                        className="size-7"
                      >
                        <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V158.75l-26.07-26.06a16,16,0,0,0-22.63,0l-20,20-44-44a16,16,0,0,0-22.62,0L40,149.37V56ZM40,172l52-52,80,80H40Zm176,28H194.63l-36-36,20-20L216,181.38V200ZM144,100a12,12,0,1,1,12,12A12,12,0,0,1,144,100Z" />
                      </svg>

                      <span className="text-[13px] font-bold">
                        Proof photo slot
                      </span>
                      <span className="text-xs font-medium">
                        Optional, added after a session
                      </span>
                    </div>
                  </div>

                  {/* reaction buttons */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {/* Fire */}
                    <button
                      type="button"
                      aria-pressed="true"
                      aria-label="Fire, 3 reactions, you reacted"
                      className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-transparent bg-line px-3 text-sm font-bold"
                    >
                      <svg
                        viewBox="0 0 256 256"
                        fill="currentColor"
                        aria-hidden="true"
                        className="size-4.5 text-ember-deep"
                      >
                        <path d="M143.38,17.85a8,8,0,0,0-12.63,3.41l-22,60.41L84.59,58.26a8,8,0,0,0-11.93.89C51,87.530,40,116.08,40,144a88,88,0,0,0,176,0C216,84.550,165.21,36,143.38,17.85Zm40.51,135.49a57.6,57.6,0,0,1-46.56,46.55A7.65,7.65,0,0,1,136,200a8,8,0,0,1-1.32-15.89c16.57-2.79,30.63-16.85,33.44-33.45a8,8,0,0,1,15.78,2.68Z" />
                      </svg>
                      3
                    </button>

                    {/* Clapping Hands */}
                    <button
                      type="button"
                      aria-pressed="false"
                      aria-label="Clap, 2 reactions"
                      className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-line-2 px-3 text-sm font-bold hover:bg-paper"
                    >
                      <svg
                        viewBox="0 0 256 256"
                        fill="currentColor"
                        aria-hidden="true"
                        className="size-4.5"
                      >
                        <path d="M160.22,24V8a8,8,0,0,1,16,0V24a8,8,0,0,1-16,0ZM196.1,41a7.91,7.91,0,0,0,4.17,1.17,8,8,0,0,0,6.84-3.83l8-13.11a8,8,0,0,0-13.68-8.33l-8,13.1A8,8,0,0,0,196.1,41Zm47.51,12.59a8,8,0,0,0-10.08-5.16l-15.06,4.85a8,8,0,0,0,2.46,15.62,8.15,8.15,0,0,0,2.46-.39l15.05-4.85A8,8,0,0,0,243.61,53.55ZM217,97.58a80.22,80.22,0,0,1-10.22,94c-.34,1.73-.72,3.46-1.19,5.18A80.17,80.17,0,0,1,58.77,216L23.5,155a26,26,0,0,1,19.24-38.79l-3-5.2a26,26,0,0,1,19.2-38.78L58.24,71A26,26,0,0,1,95.470,36.53,26.06,26.06,0,0,1,140.3,37l12.26,21.2A26.07,26.07,0,0,1,195.81,61ZM109.07,55l0,0h0l25,43.17a26,26,0,0,1,17.33-10L126.42,45a10,10,0,1,0-17.35,10ZM72.12,63l6.46,11.17a26.05,26.05,0,0,1,17.32-10L89.45,53A10,10,0,1,0,72.12,63Zm111.54,81-20.22-35a10,10,0,0,0-17.74,9.25L158.3,140a8,8,0,0,1-13.87,8l-36.5-63A10,10,0,1,0,90.58,95l26.05,45a8,8,0,0,1-13.87,8L71,93h0l0,0a10,10,0,0,0-17.33,10l35.22,61A8,8,0,0,1,75,172L54.72,137a10,10,0,0,0-17.34,10l35.27,61a64.12,64.12,0,0,0,117.42-15.44A63.52,63.52,0,0,0,183.66,144Zm19.410-38.42L181.930,69A10,10,0,0,0,164.55,79l33,57.05A80.2,80.2,0,0,1,207,161.51,64.230,64.230,0,0,0,203.07,105.58Z" />
                      </svg>
                      2
                    </button>

                    <button
                      type="button"
                      aria-pressed="false"
                      aria-label="Heart, no reactions"
                      className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-line-2 px-3 text-sm font-bold hover:bg-paper"
                    >
                      <svg
                        viewBox="0 0 256 256"
                        fill="currentColor"
                        aria-hidden="true"
                        className="size-4.5"
                      >
                        <path d="M178,40c-20.65,0-38.73,8.88-50,23.89C116.73,48.88,98.65,40,78,40a62.07,62.07,0,0,0-62,62c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,228.66,240,172,240,102A62.07,62.07,0,0,0,178,40ZM128,214.8C109.74,204.16,32,155.69,32,102A46.06,46.06,0,0,1,78,56c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,155.61,146.24,204.15,128,214.8Z" />
                      </svg>
                    </button>
                  </div>
                </li>

                {/* Asher Abesia Example */}
                <li className="p-4">
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className={`grid size-10.5 shrink-0 place-items-center rounded-xl text-sm font-extrabold bg-ink-2 text-line`}
                    >
                      AA
                    </span>
                    <div className="min-w-0 flex-1">
                      <b className="block text-[15px]">Asher Abesia</b>
                      <span className="text-[13px] font-medium text-ink-3">
                        5h ago
                      </span>
                    </div>
                    <span className="inline-flex shrink 0 items-center gap-1.5 text-[12.5px] font-bold text-ink-2">
                      <img src="/logo.svg" alt="" className="size-4" />
                      4-day streak
                    </span>
                  </div>
                  <p className="mt-2.5 text-[14.5px] text-ink-2">
                    Studied{" "}
                    <b className="text-ink">
                      Integrals of Trigonometric Function
                    </b>{" "}
                    in Calculus II for <b className="text-ink">2h 45m</b>
                  </p>

                  {/* reaction buttons */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {/* Fire */}
                    <button
                      type="button"
                      aria-pressed="true"
                      aria-label="Fire, 3 reactions, you reacted"
                      className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-line-2 px-3 text-sm font-bold hover:bg-paper"
                    >
                      <svg
                        viewBox="0 0 256 256"
                        fill="currentColor"
                        aria-hidden="true"
                        className="size-4.5"
                      >
                        <path d="M183.89,153.34a57.6,57.6,0,0,1-46.56,46.55A8.75,8.75,0,0,1,136,200a8,8,0,0,1-1.32-15.89c16.57-2.79,30.63-16.85,33.44-33.45a8,8,0,0,1,15.78,2.68ZM216,144a88,88,0,0,1-176,0c0-27.92,11-56.47,32.66-84.85a8,8,0,0,1,11.930-.89l24.12,23.41,22-60.41a8,8,0,0,1,12.63-3.41C165.21,36,216,84.55,216,144Zm-16,0c0-46.09-35.79-85.92-58.21-106.33L119.52,98.74a8,8,0,0,1-13.09,3L80.06,76.16C64.09,99.21,56,122,56,144a72,72,0,0,0,144,0Z" />
                      </svg>
                      1
                    </button>

                    {/* Clapping Hands */}
                    <button
                      type="button"
                      aria-pressed="false"
                      aria-label="Clap, 2 reactions"
                      className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-transparent bg-line px-3 text-sm font-bold"
                    >
                      <svg
                        viewBox="0 0 256 256"
                        fill="currentColor"
                        aria-hidden="true"
                        className="size-4.5 text-ember-deep"
                      >
                        <path d="M188.87,65A18,18,0,0,0,157.62,83L133.36,41a18,18,0,0,0-31.22,18L96.4,49A18,18,0,0,0,65.18,67l3.34,5.77A26,26,0,0,0,39.74,111l3,5.2A26,26,0,0,0,23.5,155l35.27,61a80.14,80.14,0,0,0,149.52-39.57A71.92,71.92,0,0,0,210,101.58Zm1.2,127.56A64.12,64.12,0,0,1,72.65,208L37.38,147a10,10,0,0,1,17.34-10L75,172a8,8,0,0,0,13.87-8L53.62,103A10,10,0,0,1,71,93l31.81,55a8,8,0,0,0,13.87-8l-26-45a10,10,0,0,1,17.35-10l36.5,63a8,8,0,0,0,13.87-8l-12.6-21.75A10,10,0,0,1,163.44,109l20.22,35A63.52,63.52,0,0,1,190.07,192.57ZM160.22,24V8a8,8,0,0,1,16,0V24a8,8,0,0,1-16,0Zm33.22,6,8-13.1a8,8,0,0,1,13.68,8.33l-8,13.11a8,8,0,0,1-6.84,3.83A8,8,0,0,1,193.44,30Zm45,33.66-15.05,4.85a8.15,8.15,0,0,1-2.46.39,8,8,0,0,1-2.46-15.62l15.06-4.85a8,8,0,1,1,4.910,15.23Z" />
                      </svg>
                      2
                    </button>

                    <button
                      type="button"
                      aria-pressed="false"
                      aria-label="Heart, no reactions"
                      className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-line-2 px-3 text-sm font-bold hover:bg-paper"
                    >
                      <svg
                        viewBox="0 0 256 256"
                        fill="currentColor"
                        aria-hidden="true"
                        className="size-4.5"
                      >
                        <path d="M178,40c-20.65,0-38.73,8.88-50,23.89C116.73,48.88,98.65,40,78,40a62.07,62.07,0,0,0-62,62c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,228.66,240,172,240,102A62.07,62.07,0,0,0,178,40ZM128,214.8C109.74,204.16,32,155.69,32,102A46.06,46.06,0,0,1,78,56c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,155.61,146.24,204.15,128,214.8Z" />
                      </svg>
                    </button>
                  </div>
                </li>

                <li className="flex items-center gap-3 p-4">
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
    </>
  );
}
