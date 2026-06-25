import { CalendarClock, Video } from "lucide-react";
import { Button } from "@/components/ui/button";

export function UpcomingInterview() {
  return (
    <div
      className="rounded-2xl border border-border p-5"
      style={{ background: "var(--gradient-card)", boxShadow: "var(--shadow-card)" }}
    >
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold">Upcoming interview</h3>
        <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-medium text-primary">
          Tomorrow
        </span>
      </div>
      <div className="flex items-start gap-3">
        <div
          className="grid h-11 w-11 place-items-center rounded-xl"
          style={{ background: "color-mix(in oklab, var(--primary) 18%, transparent)", color: "var(--primary)" }}
        >
          <CalendarClock className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-medium">Mock: System Design — Caches</div>
          <div className="text-xs text-muted-foreground">Thu, 10:30 AM · 45 min</div>
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <Button size="sm" className="flex-1" variant="outline">
          Reschedule
        </Button>
        <Button
          size="sm"
          className="flex-1 text-primary-foreground"
          style={{ background: "var(--gradient-primary)" }}
        >
          <Video className="mr-1.5 h-4 w-4" /> Join
        </Button>
      </div>
    </div>
  );
}
