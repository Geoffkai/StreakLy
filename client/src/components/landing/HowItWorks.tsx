export default function HowItWorks() {
  {
    /* How it works section */
  }
  return (
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
                  Run the focus timer or a Pomodoro. Forgot to start it? Log the
                  session after.
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
                  Any session counts. A 20-minute day keeps your streak the same
                  as a 4-hour one.
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
              Placeholder: a 60-90 second screen recording of plan, time, square
              fills. Captions on.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
