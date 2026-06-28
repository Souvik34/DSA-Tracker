/* eslint-disable prettier/prettier */
import { Flame } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface RevisionItem {
  problem_id: string;
  title: string;
  topic?: string;
  priorityLabel?: string;
  priorityScore?: number;
}

interface RevisionGateProps {
  blocked: boolean;
  revisions: RevisionItem[];
  onStartRevision?: () => void;
}

const priorityToneClass = (label?: string) => {
  switch ((label || "").toLowerCase()) {
    case "very high":
      return "text-destructive";
    case "high":
      return "text-warning";
    case "medium":
      return "text-accent";
    default:
      return "text-muted-foreground";
  }
};

export function RevisionGate({ blocked, revisions, onStartRevision }: RevisionGateProps) {
  if (!blocked) return null;

  const visible = revisions.slice(0, 5);
  const remaining = Math.max(0, revisions.length - visible.length);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="revision-gate-title"
    >
      {/* Backdrop — blocks interaction; clicks do nothing */}
      <div className="absolute inset-0 bg-background/70 backdrop-blur-md" aria-hidden="true" />

      <div className="relative w-full max-w-lg animate-fade-in-up">
        <div className="glass rounded-2xl border border-border/60 p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
              <Flame className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <h2
                id="revision-gate-title"
                className="text-xl font-semibold tracking-tight sm:text-2xl"
              >
                Time for Revision
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                You have pending spaced revisions. Complete them before solving new problems.
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Pending Revisions
            </h3>
            <ul className="mt-3 space-y-2">
              {visible.map((r) => (
                <li
                  key={r.problem_id}
                  className="flex items-center justify-between gap-3 rounded-lg border border-border/50 bg-card/40 px-3 py-2.5 transition-colors hover:bg-card/70"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">{r.title}</p>
                    {r.topic && <p className="truncate text-xs text-muted-foreground">{r.topic}</p>}
                  </div>
                  {r.priorityLabel && (
                    <span
                      className={`shrink-0 text-xs font-semibold ${priorityToneClass(r.priorityLabel)}`}
                    >
                      {r.priorityLabel}
                    </span>
                  )}
                </li>
              ))}
            </ul>
            {remaining > 0 && (
              <p className="mt-3 text-xs text-muted-foreground">+{remaining} more revisions</p>
            )}
          </div>

          <Button size="lg" className="mt-6 w-full" onClick={() => onStartRevision?.()}>
            Start Revision
          </Button>
        </div>
      </div>
    </div>
  );
}

export default RevisionGate;
