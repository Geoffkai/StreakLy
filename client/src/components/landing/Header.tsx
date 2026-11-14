import { Link } from "react-router";

export default function Header() {
  return (
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
  );
}
