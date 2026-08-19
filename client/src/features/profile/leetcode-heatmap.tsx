/* eslint-disable prettier/prettier */
interface CalendarEntry {
  activity_date: string;
  submission_count: number;
}

interface LeetCodeHeatmapProps {
  calendar: CalendarEntry[];
}

const LeetCodeHeatmap = ({
  calendar,
}: LeetCodeHeatmapProps) => {
  const data = new Map(
    calendar.map((entry) => [
      entry.activity_date.slice(0, 10),
      entry.submission_count,
    ])
  );

  const today = new Date();

  const days: Date[] = [];

  for (let i = 364; i >= 0; i--) {
    const date = new Date(today);

    date.setDate(today.getDate() - i);

    days.push(date);
  }

  const getIntensity = (count: number) => {
    if (count === 0) return "bg-white/[0.04]";
    if (count <= 2) return "bg-blue-500/25";
    if (count <= 5) return "bg-blue-500/45";
    if (count <= 10) return "bg-blue-500/65";

    return "bg-blue-500";
  };

  const monthLabels: {
    label: string;
    index: number;
  }[] = [];

  days.forEach((date, index) => {
    if (
      date.getDate() === 1 ||
      index === 0
    ) {
      monthLabels.push({
        label: date.toLocaleDateString(
          "en-US",
          { month: "short" }
        ),
        index,
      });
    }
  });

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#0b0b0f] p-5">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <h2 className="text-base font-semibold text-white">
            LeetCode Activity
          </h2>

          <p className="mt-1 text-xs text-zinc-500">
            Your submission activity over the last year
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs text-zinc-500">
            Active days
          </p>

          <p className="mt-1 text-lg font-semibold text-white">
            {calendar.length}
          </p>
        </div>
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="min-w-[760px]">
          <div className="relative mb-2 h-4 text-[10px] text-zinc-600">
            {monthLabels.map((month) => (
              <span
                key={`${month.label}-${month.index}`}
                className="absolute"
                style={{
                  left: `${(month.index / 364) * 100}%`,
                }}
              >
                {month.label}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-[repeat(53,minmax(10px,1fr))] gap-[3px]">
            {days.map((date) => {
              const key =
                date.toISOString().slice(0, 10);

              const count = data.get(key) ?? 0;

              return (
                <div
                  key={key}
                  title={`${key}: ${count} submission${
                    count === 1 ? "" : "s"
                  }`}
                  className={`aspect-square rounded-[2px] ${getIntensity(
                    count
                  )} ring-1 ring-white/[0.02]`}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end gap-2 text-[10px] text-zinc-500">
        Less

        <span className="h-3 w-3 rounded-[2px] bg-white/[0.04]" />
        <span className="h-3 w-3 rounded-[2px] bg-blue-500/25" />
        <span className="h-3 w-3 rounded-[2px] bg-blue-500/45" />
        <span className="h-3 w-3 rounded-[2px] bg-blue-500/65" />
        <span className="h-3 w-3 rounded-[2px] bg-blue-500" />

        More
      </div>
    </div>
  );
};

export default LeetCodeHeatmap;