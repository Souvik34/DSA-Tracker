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
      const res = await revisionService.getDueRevisions();
      setRevisions(res.revisions);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRevisions();
  }, []);

  const handleComplete = async (problemId: string) => {
    await revisionService.completeRevision(problemId);

    clearRevisionCache();

    const res = await revisionService.getDueRevisions();

    if (!res.blocked) {
      navigate({ to: "/dashboard" });
      return;
    }

    setRevisions(res.revisions);
  };

  if (loading) {
    return (
      <DashboardShell>
        <div>Loading revisions...</div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <div className="mx-auto max-w-5xl space-y-6">

        <div>
          <h1 className="text-3xl font-bold">
            Revision Mode
          </h1>

          <p className="text-muted-foreground">
            Complete every revision to unlock the application.
          </p>
        </div>

        {revisions.length === 0 ? (
          <div className="rounded-xl border p-6">
            No pending revisions 🎉
          </div>
        ) : (
          revisions.map((rev) => (
            <div
              key={rev.problem_id}
              className="rounded-xl border p-5 flex items-center justify-between"
            >
              <div>
                <h2 className="font-semibold text-lg">
                  {rev.title}
                </h2>

                <p className="text-muted-foreground">
                  {rev.topic}
                </p>

                <p className="text-sm mt-2">
                  Priority : {rev.priorityLabel}
                </p>
              </div>

              <Button
                onClick={() => handleComplete(rev.problem_id)}
              >
                Mark Complete
              </Button>
            </div>
          ))
        )}

      </div>
    </DashboardShell>
  );
}