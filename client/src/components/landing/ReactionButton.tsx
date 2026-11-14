import type { Icon } from "@phosphor-icons/react";
import { useState } from "react";

export type ReactionButtonProps = {
  icon: Icon;
  name: string;
  count: number;
  pressed: boolean;
};

export default function ReactionButton({
  icon: ReactionIcon,
  name,
  count,
  pressed,
}: ReactionButtonProps) {
  const [isPressed, setIsPressed] = useState(pressed);
  const shownCount = count + (pressed === isPressed ? 0 : pressed ? -1 : 1);
  const ariaLabel = `${name}, ${shownCount === 0 ? "no reactions yet" : shownCount > 1 ? `${shownCount} reactions` : "1 reaction"}`;
  const className = `inline-flex min-h-11 items-center gap-1.5 rounded-xl border text-sm font-bold px-3 ${isPressed ? "border-transparent bg-line" : "border-line-2 hover:bg-paper"}`;

  return (
    <button
      aria-label={ariaLabel}
      className={className}
      type="button"
      aria-pressed={isPressed}
      onClick={() => setIsPressed((p) => !p)}
    >
      <ReactionIcon
        aria-hidden
        className={`size-4.5 ${isPressed ? "text-ember-deep" : ""}`}
        weight={isPressed ? "fill" : undefined}
      />
      {shownCount === 0 ? "" : shownCount}
    </button>
  );
}
