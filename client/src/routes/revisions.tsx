/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { requireAuth } from "@/lib/route-guard";
import { DashboardShell } from "@/components/layout/dashboard-shell";

import revisionService from "@/services/revisionService";
import type { RevisionItem } from "@/services/revisionService";

import { clearRevisionCache } from "@/lib/revision-state";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/revisions")({
  beforeLoad: ({ location }) => requireAuth(location),
  component: RevisionsPage,
});

function RevisionsPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [revisions, setRevisions] = useState<RevisionItem[]>([]);

  const loadRevisions = async () => {
    try {
      setLoading(true);

      const res = await revisionService.getDueRevisions();

      setRevisions(res?.revisions ?? []);
    } catch (err) {
      console.error("Failed to load revisions:", err);
      setRevisions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRevisions();
  }, []);

  const handleComplete = async (problemId: number) => {
    try {
      await revisionService.completeRevision(problemId);

      clearRevisionCache();

      // optimistic UI update
      setRevisions((prev) =>
        prev.filter((r) => r.problem_id !== problemId)
      );

      const res = await revisionService.getDueRevisions();

      if (!res.blocked) {
        navigate({ to: "/dashboard" });
        return;
      }

      setRevisions(res.revisions ?? []);
    } catch (err) {
      console.error("Failed to complete revision:", err);
    }
  };

  if (loading) {
    return (
      <DashboardShell>
        <div className="text-sm text-muted-foreground">
          Loading revisions...
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <div className="mx-auto max-w-5xl space-y-6">

        {/* Blocking banner */}
        {revisions.length > 0 && (
          <div className="rounded-lg border bg-yellow-50 p-3 text-sm text-yellow-800">
            ⚠️ You must complete {revisions.length} revision(s) before continuing.
          </div>
        )}

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Revision Mode</h1>
          <p className="text-muted-foreground">
            Complete your spaced revisions to unlock the platform.
          </p>
        </div>

        {/* Empty state */}
        {revisions.length === 0 ? (
          <div className="rounded-xl border p-6">
            No pending revisions 🎉
          </div>
        ) : (
          revisions.map((rev) => (
            <div
              key={rev.problem_id}
              className="rounded-xl border p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:shadow-sm transition"
            >
              {/* Left section */}
              <div>
                <h2 className="font-semibold text-lg">
                  {rev.title}
                </h2>

                <p className="text-muted-foreground">
                  {rev.topic}
                </p>

                {/* Priority + stats */}
                <div className="text-xs text-muted-foreground space-y-1 mt-2">
                  <p>
                    Priority:{" "}
                    <b
                      className={
                        rev.priorityLabel === "HIGH"
                          ? "text-red-500"
                          : rev.priorityLabel === "MEDIUM"
                          ? "text-yellow-500"
                          : "text-green-500"
                      }
                    >
                      {rev.priorityLabel}
                    </b>
                  </p>

                  <p>Score: {rev.priorityScore ?? 0}</p>
                  <p>Confidence: {rev.confidence_rating ?? "N/A"}</p>
                  <p>Revisions done: {rev.revision_count ?? 0}/8</p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() =>
                    navigate({ to: `/workspace/${rev.problem_id}` })
                  }
                >
                  Open Problem
                </Button>

                <Button
                 onClick={() => handleComplete(rev.problem_id)}
                >
                  Mark Complete
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </DashboardShell>
  );
}