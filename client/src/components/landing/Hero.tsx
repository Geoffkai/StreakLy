import { Fragment } from "react";
import { week } from "./sampleWeek";
import { useNavigate } from "react-router";
import { LockSimpleIcon } from "@phosphor-icons/react";

type DaySquare = {
  top: string;
  left: string;
  delay: string;
};

const daySquares: DaySquare[] = [
  { top: "40px", left: "40px", delay: "2.4s" },
  { top: "112px", left: "148px", delay: "5s" },
  { top: "4px", left: "220px", delay: "3.6s" },
  { top: "184px", left: "76px", delay: "6.4s" },
  { top: "76px", left: "328px", delay: "8.2s" },
];

export default function Hero() {
  const streak = week.filter((d) => !d.isToday).length;
  const navigate = useNavigate();

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const email = new FormData(e.currentTarget).get("email");

    navigate("/signup", {
      state: { email },
    });
  }

  {
    /* Hero section */
  }
  return (
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
            <span className="text-xs sm:text-[15px] font-[750]">{d.name}</span>
            <span
              style={
                d.isToday ? undefined : { animationDelay: `${i * 260 + 420}ms` }
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
  );
}
