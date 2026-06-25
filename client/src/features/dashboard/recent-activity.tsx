import { CheckCircle2, Code2, MessageSquare } from "lucide-react";

interface ActivityItem {
  id: string;
  icon: typeof CheckCircle2;
  title: string;
  detail: string;
  time: string;
  tone: "success" | "primary" | "muted";
}

const items: ActivityItem[] = [
  { id: "1", icon: CheckCircle2, title: "Solved Two Sum II", detail: "Easy · 6 min · O(n)", time: "2h ago", tone: "success" },
  { id: "2", icon: Code2, title: "Started LRU Cache", detail: "Medium · in progress", time: "5h ago", tone: "primary" },
  { id: "3", icon: MessageSquare, title: "Discussion reply", detail: "Sliding window pattern", time: "Yesterday", tone: "muted" },
  { id: "4", icon: CheckCircle2, title: "Completed Sheet: Striver A2Z", detail: "Section 4 · Recursion", time: "2d ago", tone: "success" },
];

const toneColor: Record<ActivityItem["tone"], string> = {
  success: "var(--success)",
  primary: "var(--primary)",
  muted: "var(--muted-foreground)",
};

export function RecentActivity() {
  return (
    <div
      className="rounded-2xl border border-border p-5"
      style={{ background: "var(--gradient-card)", boxShadow: "var(--shadow-card)" }}
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold">Recent activity</h3>
        <button className="text-xs text-primary hover:underline">View all</button>
      </div>
      <ul className="space-y-1">
        {items.map((it) => (
          <li
            key={it.id}
            className="flex items-start gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-muted/40"
          >
            <div
              className="mt-0.5 grid h-8 w-8 place-items-center rounded-lg"
              style={{
                background: `color-mix(in oklab, ${toneColor[it.tone]} 15%, transparent)`,
                color: toneColor[it.tone],
              }}
            >
              <it.icon className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium">{it.title}</div>
              <div className="truncate text-xs text-muted-foreground">{it.detail}</div>
            </div>
            <span className="whitespace-nowrap text-xs text-muted-foreground">{it.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
