import type { Icon } from "@phosphor-icons/react";

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
  const ariaLabel = `${name}, ${count === 0 ? "no reactions yet" : count > 1 ? `${count} reactions` : "1 reaction"}${pressed ? ", you reacted" : ""}`;
  const className = `inline-flex min-h-11 items-center gap-1.5 rounded-xl border text-sm font-bold px-3 ${pressed ? "border-transparent bg-line" : "border-line-2 hover:bg-paper"}`;

  return (
    <button
      aria-label={ariaLabel}
      className={className}
      type="button"
      aria-pressed={pressed}
    >
      <ReactionIcon
        aria-hidden
        className={`size-4.5 ${pressed ? "text-ember-deep" : ""}`}
        weight={pressed ? "fill" : undefined}
      />
      {count === 0 ? "" : count}
    </button>
  );
}
