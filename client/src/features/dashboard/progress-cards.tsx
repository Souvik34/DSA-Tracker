import { Progress } from "@/components/ui/progress";
import { Binary, GitBranch, Network, Layers } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface TopicStat {
  topic: string;
  solved: number;
  total: number;
  icon: LucideIcon;
  tint: string;
}

const stats: TopicStat[] = [
  { topic: "Arrays & Strings", solved: 84, total: 120, icon: Layers, tint: "var(--primary)" },
  { topic: "Trees & Graphs", solved: 42, total: 95, icon: Network, tint: "var(--accent)" },
  { topic: "Dynamic Programming", solved: 21, total: 70, icon: GitBranch, tint: "var(--chart-5)" },
  { topic: "Bit Manipulation", solved: 14, total: 28, icon: Binary, tint: "var(--success)" },
];

export function ProgressCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((s) => {
        const pct = Math.round((s.solved / s.total) * 100);
        return (
          <div
            key={s.topic}
            className="group rounded-2xl border border-border p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40"
            style={{ background: "var(--gradient-card)", boxShadow: "var(--shadow-card)" }}
          >
            <div className="mb-4 flex items-center justify-between">
              <div
                className="grid h-9 w-9 place-items-center rounded-lg"
                style={{ background: `color-mix(in oklab, ${s.tint} 18%, transparent)`, color: s.tint }}
              >
                <s.icon className="h-4 w-4" />
              </div>
              <span className="text-xs font-medium text-muted-foreground">{pct}%</span>
            </div>
            <div className="text-sm font-medium text-foreground">{s.topic}</div>
            <div className="mb-3 mt-0.5 text-xs text-muted-foreground">
              {s.solved} of {s.total} solved
            </div>
            <Progress value={pct} className="h-1.5" />
          </div>
        );
      })}
    </div>
  );
}
