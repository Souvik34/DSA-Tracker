/* eslint-disable prettier/prettier */
interface LeetCodeBadge {
  name: string;
  icon: string;
  earned_at: string;
}

interface LeetCodeBadgesProps {
  badges: LeetCodeBadge[];
}

const LeetCodeBadges = ({
  badges,
}: LeetCodeBadgesProps) => {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#0b0b0f] p-5">
      <div className="mb-5">
        <h2 className="text-base font-semibold text-white">
          Badges
        </h2>

        <p className="mt-1 text-xs text-zinc-500">
          Achievements earned on LeetCode
        </p>
      </div>

      {badges.length === 0 ? (
        <div className="py-8 text-center text-sm text-zinc-500">
          No badges found.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {badges.map((badge, index) => {
            const earnedDate = new Date(
              badge.earned_at
            ).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            });

            const icon =
              badge.icon.startsWith("http")
                ? badge.icon
                : `https://leetcode.com${badge.icon}`;

            return (
              <div
                key={`${badge.name}-${badge.earned_at}-${index}`}
                className="group rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-center transition hover:border-white/[0.12] hover:bg-white/[0.04]"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center">
                  <img
                    src={icon}
                    alt={badge.name}
                    className="h-14 w-14 object-contain transition group-hover:scale-105"
                  />
                </div>

                <p className="mt-3 truncate text-sm font-medium text-white">
                  {badge.name}
                </p>

                <p className="mt-1 text-[10px] text-zinc-500">
                  {earnedDate}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LeetCodeBadges;