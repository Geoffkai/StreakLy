import { Link } from "react-router";

export default function Landing() {
  return (
    <>
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
    </>
  );
}
