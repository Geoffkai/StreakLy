export default function EstimateBand() {
  {
    /* Estimation band section */
  }
  return (
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
            Every topic keeps its estimate next to the time you actually spent.
            Going over isn't a failure. It's how your next estimate gets
            sharper.
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
              <span className="scroll-draw absolute inset-y-0 left-0 w-3/5 rounded-[3px] bg-ink-2" />
              {/* overrun: striped, starts where the estimate ends */}
              <span className="scroll-draw [--range:cover_40%_cover_55%] absolute inset-y-0 left-3/5 w-2/5 rounded-r-[3px] border-[1.5px] border-l-0 border-ink-2 bg-[repeating-linear-gradient(135deg,var(--color-ink-2)_0_2px,transparent_2px_5px)]" />
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
              <span className="scroll-draw absolute inset-y-0 left-0 w-[28%] rounded-[3px] bg-ink-2" />
            </div>
          </div>

          {/* legend */}
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[13px] font-semibold text-ink-2">
            <li className="inline-flex items-center gap-2">
              <span
                aria-hidden="true"
                className="h-2.5 w-5 rounded-xs border-[1.5px] border-dashed border-indigo"
              />
              Estimate
            </li>
            <li className="inline-flex items-center gap-2">
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
  );
}
