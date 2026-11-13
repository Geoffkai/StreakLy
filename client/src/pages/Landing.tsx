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

        <section
          id="friends"
          aria-labelledby="fr-h"
          className="scroll-mt-20 border-y border-line bg-sheet"
        >
          <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,500px)] lg:items-center lg:gap-16 lg:px-18 lg:py-28">
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
          </div>
        </section>
      </main>
    </>
  );
}
