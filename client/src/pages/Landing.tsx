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

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const email = new FormData(e.currentTarget).get("email");

    navigate("/signup", {
      state: { email },
    });
  }
  return (
    <div className="mx-auto max-w-7xl">
      <header className="h-21 flex items-center justify-between px-18">
        <Link
          to="/"
          aria-label="streakly home"
          className="inline-flex items-center gap-[.32em]"
        >
          <img src="/logo.svg" alt="" className="w-8.5 h-8.5" />
          <span className="font-display text-[28px] font-extrabold tracking-[-0.035em] leading-none">
            streakly
          </span>
        </Link>
        <nav aria-label="Marketing" className="flex items-center gap-2">
          <a
            href="#how"
            className="inline-flex min-h-11 items-center px-3.5  text-[15px] font-[650]  text-ink-2 hover:text-ink rounded-[10px]"
          >
            How it works
          </a>
          <a
            href="#friends"
            className="inline-flex min-h-11 items-center px-3.5  text-[15px] font-[650]  text-ink-2 hover:text-ink rounded-[10px]"
          >
            Friends
          </a>
          <Link
            to="/login"
            className="inline-flex min-h-11 items-center px-3.5 text-[15px] font-bold text-ink border border-line-2 rounded-xl hover:bg-sheet"
          >
            Log in
          </Link>
        </nav>
      </header>
      <div className="grid grid-cols-[1.45fr_1fr] items-end gap-16 px-18 pt-9">
        <h1 className="font-display text-[92px] font-extrabold tracking-[-0.035em] leading-[0.93]">
          Every day you show up counts.
        </h1>

        <p className="mb-5 text-lg leading-normal text-ink-2">
          A study tracker that rewards showing up, not grinding. Plan topics
          with honest estimates, time your sessions, and keep a daily streak
          with a few friends.
        </p>
      </div>
      <div className="px-18 pt-10">
        <ol
          aria-label="Sample week: six study days of different lengths, each counted the same, and today still open"
          className="grid grid-cols-[repeat(7,100px)] gap-4"
        >
          {week.map((d) => (
            <li key={d.name} className="flex flex-col items-start gap-2.5">
              <div
                className={`size-25 rounded-3xl
                  ${d.isToday ? "border-2 border-ink" : " bg-ember"}`}
              />
              <span className="text-[15px] font-[750]">{d.name}</span>
              <span
                className={`-mt-2 text-sm font-semibold ${
                  d.isToday ? "text-ink-2" : "text-ink-3"
                }`}
              >
                {d.duration}
              </span>
            </li>
          ))}
        </ol>

        <div className="grid grid-cols-[680px_440px] gap-x-4 mt-4.5 items-start">
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
            <p className="pt-6 font-display text-[22px] font-[650] tracking-[-0.01em]">
              20 minutes or 4 hours, the square fills the same.
            </p>
          </div>

          {/* Right: email form + message */}
          <div>
            <form onSubmit={handleSubmit} className="flex gap-2">
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
      </div>
    </div>
  );
}
