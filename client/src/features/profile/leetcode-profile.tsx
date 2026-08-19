/* eslint-disable prettier/prettier */
import { ExternalLink, Trophy } from "lucide-react";

interface LeetCodeProfileProps {
  username: string;
  avatar: string | null;
  realName: string | null;
  ranking: number | null;
  reputation: number | null;
  starRating: string | number | null;
}

const LeetCodeProfile = ({
  username,
  avatar,
  realName,
  ranking,
  reputation,
  starRating,
}: LeetCodeProfileProps) => {
  const initials =
    realName
      ?.split(" ")
      .map((name) => name[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || username.slice(0, 2).toUpperCase();

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#0b0b0f] p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 text-lg font-bold text-blue-400 ring-1 ring-white/[0.08]">
            {avatar ? (
              <img
                src={avatar}
                alt={username}
                className="h-full w-full rounded-xl object-cover"
              />
            ) : (
              initials
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-white">
                {realName || username}
              </h2>

              <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                Connected
              </span>
            </div>

            <p className="mt-0.5 text-sm text-zinc-500">
              @{username}
            </p>
          </div>
        </div>

        <a
          href={`https://leetcode.com/u/${username}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] px-3 py-2 text-xs text-zinc-400 transition hover:border-white/[0.15] hover:text-white"
        >
          Profile
          <ExternalLink size={13} />
        </a>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
          <p className="text-xs text-zinc-500">Ranking</p>
          <p className="mt-1 text-lg font-semibold text-white">
            #{ranking?.toLocaleString() ?? "—"}
          </p>
        </div>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
          <p className="text-xs text-zinc-500">Reputation</p>
          <p className="mt-1 text-lg font-semibold text-white">
            {reputation ?? "—"}
          </p>
        </div>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
          <p className="text-xs text-zinc-500">Star Rating</p>
          <p className="mt-1 flex items-center gap-1.5 text-lg font-semibold text-white">
            <Trophy size={15} className="text-yellow-400" />
            {starRating ?? "—"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeetCodeProfile;