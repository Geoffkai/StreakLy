import { Link } from "react-router";

export default function Landing() {
  return (
    <header className="h-21 flex items-center justify-between px-18">
      <Link
        to="/"
        aria-label="streakly home"
        className="inline-flex items-center gap-[.32em]"
      >
        <img src="/logo.svg" alt="streakly logo" className="w-8.5 h-8.5" />
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
  );
}
