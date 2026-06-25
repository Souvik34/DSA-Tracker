import { Flame } from "lucide-react";

export function StreakWidget() {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const filled = [true, true, true, true, true, false, false];
  const streak = 12;

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-border p-5"
      style={{ background: "var(--gradient-card)", boxShadow: "var(--shadow-card)" }}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Daily streak</div>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-3xl font-semibold tracking-tight">{streak}</span>
            <span className="text-sm text-muted-foreground">days</span>
          </div>
        </div>
        <div
          className="grid h-10 w-10 place-items-center rounded-xl"
          style={{ background: "color-mix(in oklab, var(--warning) 18%, transparent)", color: "var(--warning)" }}
        >
          <Flame className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between gap-2">
        {days.map((d, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
            <div
              className={`h-7 w-7 rounded-md border transition-all ${
                filled[i]
                  ? "border-transparent"
                  : "border-dashed border-border bg-muted/30"
              }`}
              style={
                filled[i]
                  ? { background: "var(--gradient-primary)", boxShadow: "0 0 0 3px color-mix(in oklab, var(--primary) 12%, transparent)" }
                  : undefined
              }
            />
            <span className="text-[10px] text-muted-foreground">{d}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
