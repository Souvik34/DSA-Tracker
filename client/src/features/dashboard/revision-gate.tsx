/* eslint-disable prettier/prettier */
import { Flame, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface RevisionItem {
  problem_id: string;
  title: string;
  topic?: string;
  priorityLabel?: string;
  priorityScore?: number;
  confidence_rating?: number;
  revision_count?: number;
}

interface RevisionGateProps {
  blocked: boolean;
  revisions: RevisionItem[];
  onStartRevision?: () => void;
}

const priorityColor = (label?: string) => {
  switch ((label || "").toLowerCase()) {
    case "high":
      return "text-red-500";
    case "medium":
      return "text-yellow-500";
    case "low":
      return "text-green-500";
    default:
      return "text-muted-foreground";
  }
};

export function RevisionGate({
  blocked,
  revisions,
  onStartRevision,
}: RevisionGateProps) {
  if (!blocked) return null;

  const visible = revisions.slice(0, 5);
  const remaining = Math.max(0, revisions.length - visible.length);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div className="relative w-full max-w-xl rounded-2xl border bg-background p-6 shadow-2xl animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="rounded-full bg-yellow-100 p-2 text-yellow-600">
            <AlertTriangle className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              Revision Checkpoint Locked
            </h2>
            <p className="text-sm text-muted-foreground">
              Complete your pending spaced revisions before continuing.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-4 rounded-lg border p-3 text-sm">
          <p>
            📌 Pending Revisions:{" "}
            <b>{revisions.length}</b>
          </p>
          <p className="text-muted-foreground">
            Solve them to unlock problem solving mode
          </p>
        </div>

        {/* List */}
        <div className="mt-5 space-y-2">
          {visible.map((r) => (
            <div
              key={r.problem_id}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <div className="min-w-0">
                <p className="truncate font-medium">
                  {r.title}
                </p>

                <p className="text-xs text-muted-foreground">
                  {r.topic ?? "General"}
                </p>

                <div className="mt-1 flex gap-3 text-xs">
                  <span className={priorityColor(r.priorityLabel)}>
                    {r.priorityLabel ?? "LOW"}
                  </span>

                  <span className="text-muted-foreground">
                    Conf: {r.confidence_rating ?? 0}
                  </span>

                  <span className="text-muted-foreground">
                    Rev: {r.revision_count ?? 0}
                  </span>
                </div>
              </div>

              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </div>
          ))}

          {remaining > 0 && (
            <p className="text-xs text-muted-foreground">
              +{remaining} more revisions pending
            </p>
          )}
        </div>

        {/* CTA */}
        <Button
          className="mt-6 w-full"
          onClick={onStartRevision}
        >
          Start Revision Mode
        </Button>
      </div>
    </div>
  );
}