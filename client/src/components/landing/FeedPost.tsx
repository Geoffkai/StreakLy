import { ImageIcon } from "@phosphor-icons/react";
import ReactionButton, { type ReactionButtonProps } from "./ReactionButton";

export type Post = {
  avatarTint: string;
  initials: string;
  name: string;
  recentActiveInHours: number;
  streakDays: number;
  topic: string;
  subject: string;
  duration: string;
  hasPhoto: boolean;
  reactions: ReactionButtonProps[];
};

export default function FeedPost({ post }: { post: Post }) {
  return (
    <li className="p-4 scroll-reveal">
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className={`grid size-10.5 shrink-0 place-items-center rounded-xl text-sm font-extrabold ${post.avatarTint}`}
        >
          {post.initials}
        </span>
        <div className="min-w-0 flex-1">
          <b className="block text-[15px]">{post.name}</b>
          <span className="text-[13px] font-medium text-ink-3">
            {post.recentActiveInHours}h ago
          </span>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 text-[12.5px] font-bold text-ink-2">
          <img src="/logo.svg" alt="" className="size-4" />
          {post.streakDays}-day streak
        </span>
      </div>
      <p className="mt-2.5 text-[14.5px] text-ink-2">
        Studied <b className="text-ink">{post.topic}</b> in {post.subject} for{" "}
        <b className="text-ink">{post.duration}</b>
      </p>

      {/* Photo Slot */}
      {post.hasPhoto && (
        <div className="mt-3 grid aspect-16/10 place-items-center rounded-[14px] border-[1.5px] border-dashed border-line-2 bg-paper">
          <div className="flex flex-col items-center gap-1.5 text-ink-3">
            <ImageIcon aria-hidden className="size-7" />

            <span className="text-[13px] font-bold">Proof photo slot</span>
            <span className="text-xs font-medium">
              Optional, added after a session
            </span>
          </div>
        </div>
      )}

      {/* reaction buttons */}
      <div className="mt-3 flex flex-wrap gap-2">
        {post.reactions.map((r) => (
          <ReactionButton
            key={r.name}
            icon={r.icon}
            name={r.name}
            count={r.count}
            pressed={r.pressed}
          />
        ))}
      </div>
    </li>
  );
}
