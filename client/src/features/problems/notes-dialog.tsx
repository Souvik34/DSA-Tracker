import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useProblemsStore } from "@/store/problems-store";
import type { Problem } from "./problems-data";

interface Props {
  problem: Problem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NotesDialog({ problem, open, onOpenChange }: Props) {
  const stored = useProblemsStore((s) => (problem ? s.byId[problem.id] : undefined));
  const setNotes = useProblemsStore((s) => s.setNotes);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    setDraft(stored?.notes ?? "");
  }, [problem, stored?.notes]);

  if (!problem) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Notes — {problem.title}</DialogTitle>
          <DialogDescription>
            Approach, complexity, pitfalls. Saved locally for revision.
          </DialogDescription>
        </DialogHeader>
        <Textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="// Approach&#10;// Time: O(n)&#10;// Space: O(1)"
          className="min-h-[220px] font-mono text-sm"
        />
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              setNotes(problem.id, draft);
              onOpenChange(false);
            }}
          >
            Save notes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
