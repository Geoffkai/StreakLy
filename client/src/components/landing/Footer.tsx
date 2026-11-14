import { week } from "./sampleWeek";
import { BrowsersIcon, LinkedinLogoIcon } from "@phosphor-icons/react";

type NightSquare = {
  top: string;
  right: string;
  delay: string;
};

const squares: NightSquare[] = [
  { top: "4px", right: "40px", delay: "0s" },
  { top: "40px", right: "112px", delay: "2.6s" },
  { top: "76px", right: "4px", delay: "5.1s" },
  { top: "76px", right: "184px", delay: "1.4s" },
  { top: "112px", right: "76px", delay: "3.8s" },
  { top: "40px", right: "256px", delay: "6.3s" },
  { top: "148px", right: "148px", delay: "4.4s" },
];

export default function Footer() {
  return (
    <footer className="relative night overflow-clip bg-night text-moon">
      <div
        aria-hidden="true"
        className="bg-streak-grid pointer-events-none absolute inset-x-0 top-0 hidden h-72 mask-intersect mask-[linear-gradient(to_left,#000,transparent_70%),linear-gradient(to_bottom,#000_40%,transparent)] sm:block"
      >
        {squares.map((square, i) => (
          <span
            key={i}
            className="absolute size-7 rounded-[7px] bg-ember-night opacity-0 animate-twinkle motion-reduce:animate-none"
            style={{
              top: square.top,
              right: square.right,
              animationDelay: square.delay,
            }}
          />
        ))}
      </div>
      <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-8 lg:px-18 lg:pt-20">
        <div aria-hidden="true" className="flex gap-2 sm:gap-2.5">
          {week.map((d, i) => (
            <span
              key={d.name}
              className={`relative size-7 rounded-[24%] sm:size-9 border-2 border-dashed ${d.isToday ? "border-dusk" : "border-night-3"}`}
            >
              {d.isToday ? (
                <span className="absolute -inset-0.5 rounded-[inherit] border-2 border-ember-night opacity-0 animate-today-pulse motion-reduce:animate-none" />
              ) : (
                <span
                  className="scroll-fill absolute -inset-0.5 rounded-[inherit] bg-ember-night"
                  style={
                    {
                      "--range": `cover ${20 + i * 25}px cover ${80 + i * 25}px`,
                    } as React.CSSProperties
                  }
                />
              )}
            </span>
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
