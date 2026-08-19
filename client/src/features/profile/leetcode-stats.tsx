/* eslint-disable prettier/prettier */
import {
  CheckCircle2,
  CircleDot,
  Flame,
  Target,
} from "lucide-react";

interface LeetCodeStatsProps {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  acceptanceRate: string | number;
  contestRating: string | number | null;
}

const LeetCodeStats = ({
  totalSolved,
  easySolved,
  mediumSolved,
  hardSolved,
  acceptanceRate,
  contestRating,
}: LeetCodeStatsProps) => {
  const stats = [
    {
      label: "Total Solved",
      value: totalSolved,
      icon: CheckCircle2,
      className: "text-blue-400",
    },
    {
      label: "Easy",
      value: easySolved,
      icon: CircleDot,
      className: "text-emerald-400",
    },
    {
      label: "Medium",
      value: mediumSolved,
      icon: Target,
      className: "text-yellow-400",
    },
    {
      label: "Hard",
      value: hardSolved,
      icon: Flame,
      className: "text-red-400",
    },
  ];

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#0b0b0f] p-5">
      <div className="mb-5">
        <h2 className="text-base font-semibold text-white">
          Problem Statistics
        </h2>
        <p className="mt-1 text-xs text-zinc-500">
          Your LeetCode problem-solving progress
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-500">
                  {stat.label}
                </span>

                <Icon size={15} className={stat.className} />
              </div>

              <p className="mt-3 text-2xl font-bold text-white">
                {stat.value.toLocaleString()}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
          <p className="text-xs text-zinc-500">
            Acceptance Rate
          </p>

          <p className="mt-1 text-xl font-semibold text-white">
            {acceptanceRate}%
          </p>
        </div>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
          <p className="text-xs text-zinc-500">
            Contest Rating
          </p>

          <p className="mt-1 text-xl font-semibold text-white">
            {contestRating
              ? Math.round(Number(contestRating))
              : "—"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeetCodeStats;