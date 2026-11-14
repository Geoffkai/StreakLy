import { FireIcon, HandsClappingIcon, HeartIcon } from "@phosphor-icons/react";
import FeedPost, { type Post } from "./FeedPost";

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

export default function Friends() {
  {
    /* Friends Section */
  }
  return (
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
            Studying is easier when someone notices. Share a session with the
            classmates you add, and they can cheer you on.
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
  );
}
