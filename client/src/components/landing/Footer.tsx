import { week } from "./sampleWeek";
import { BrowsersIcon, LinkedinLogoIcon } from "@phosphor-icons/react";

export default function Footer() {
  return (
    <footer className="night bg-night text-moon">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-8 lg:px-18 lg:pt-20">
        <div aria-hidden="true" className="flex gap-2 sm:gap-2.5">
          {week.map((d) => (
            <span
              key={d.name}
              className={`size-7 rounded-[24%] sm:size-9 ${d.isToday ? "border-2 border-dashed border-dusk" : "bg-ember-night"}`}
            />
          ))}
        </div>
        <p className="mt-6 font-display text-[clamp(2rem,5vw,3.5rem)] leading-none font-extrabold tracking-[-0.035em] text-balance">
          Today's square is still open.
        </p>

        <div className="mt-14 flex flex-col gap-1.5 border-t border-night-3 pt-6 text-sm font-medium text-dusk sm:flex-row sm:justify-between">
          <p>© 2026 StreakLy</p>
          <div className="sm:text-right">
            <p>Made by Geoffrey Adam Tomagan for CMSC 128</p>
            <ul className="mt-1 -ml-2 flex gap-1 sm:-mr-2 sm:ml-0 sm:justify-end">
              <li>
                <a
                  href="https://geoffkai.github.io/Geoff-Portfolio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-lg px-2 font-semibold text-dusk hover:text-moon"
                >
                  <BrowsersIcon aria-hidden className="size-4.5" />
                  Portfolio
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/geoffrey-adam-tomagan-238034286"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-lg px-2 font-semibold text-dusk hover:text-moon"
                >
                  <LinkedinLogoIcon aria-hidden className="size-4.5" />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
