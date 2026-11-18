import type { ReactNode } from "react";
import { Link } from "react-router";
import { LockSimpleIcon } from "@phosphor-icons/react";

type AuthShellProps = { title: string; children: ReactNode };

export default function AuthShell({ title, children }: AuthShellProps) {
  return (
    <main className="flex min-h-dvh flex-col items-center bg-paper px-4 pt-10 pb-6 text-ink">
      <div className="my-auto w-full max-w-sm">
        <Link
          to="/"
          aria-label="streakly home"
          className="mx-auto flex w-fit flex-col items-center gap-3.5"
        >
          <img src="/logo.svg" alt="" className="size-16" />
          <span className="font-display text-[40px] leading-none font-extrabold tracking-[-0.035em]">
            streakly
          </span>
        </Link>
        <p className="mt-3.5 mb-10 text-center font-[550] text-ink-2">
          Study. Track. Stay consistent.
        </p>
        <h1 className="mb-5 text-center font-display text-2xl font-bold">
          {title}
        </h1>
        {children}
      </div>
      <p className="mt-10 flex items-center gap-1.5 text-[13px] font-[550] text-ink-2">
        <LockSimpleIcon aria-hidden className="size-4 shrink-0" />
        Friends-only sharing. No public leaderboards.
      </p>
    </main>
  );
}
