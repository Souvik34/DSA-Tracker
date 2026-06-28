/* eslint-disable prettier/prettier */
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "@tanstack/react-router";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { Topbar } from "./topbar";

import { RevisionGate } from "@/features/dashboard/revision-gate";
import revisionService, { RevisionItem } from "@/services/revisionService";

export function DashboardShell({ children }: { children: ReactNode }) {
  const [blocked, setBlocked] = useState(false);
  const [revisions, setRevisions] = useState<RevisionItem[]>([]);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const loadRevisions = async () => {
      try {
        const res = await revisionService.getDueRevisions();

        setBlocked(res.blocked);
        setRevisions(res.revisions || []);
      } catch (err) {
        console.error("Revision fetch failed:", err);
      }
    };

    loadRevisions();
  }, []);


  if (blocked && location.pathname !== "/revision") {
    return (
      <RevisionGate
        blocked={true}
        revisions={revisions}
        onStartRevision={() => navigate({ to: "/revision" })}
      />
    );
  }

  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />

        <SidebarInset className="flex min-w-0 flex-1 flex-col">
          <Topbar />

          <main className="flex-1 px-4 py-6 md:px-8 md:py-8">
            <div className="mx-auto w-full max-w-7xl animate-fade-in-up">
              {children}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}