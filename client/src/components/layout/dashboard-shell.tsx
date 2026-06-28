/* eslint-disable prettier/prettier */
import type { ReactNode } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { Topbar } from "./topbar";
import { RevisionGate } from "@/features/dashboard/revision-gate";
import { useEffect, useState } from "react";
import revisionService from "@/services/revisionService";
import type { RevisionItem } from "@/services/revisionService";

export function DashboardShell({ children }: { children: ReactNode }) {
  const [blocked, setBlocked] = useState(false);
  const [revisions, setRevisions] = useState<RevisionItem[]>([]);



  useEffect(() => {
    const loadRevisions = async () => {
      try {
        const res = await revisionService.getDueRevisions();
        setBlocked(res.blocked);
        setRevisions(res.revisions);
      } catch (err) {
        console.error("revision check failed", err);
      }
    };

    loadRevisions();
  }, []);

  return (
    <>
     
      <RevisionGate blocked={blocked} revisions={revisions} />

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
    </>
  );
}