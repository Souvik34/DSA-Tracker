import { useEffect, useState } from "react";
import { Sparkles, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { interviewService } from "@/services/interviewService";

/**
 * Fallback prompts used until the backend AI session endpoint is wired.
 * The panel surfaces ONE prompt at a time — never a chat thread.
 */
const FALLBACK_PROMPTS = [
  "Walk me through your approach before you start coding.",
  "What's the time and space complexity of your current solution?",
  "Which edge cases should we worry about here?",
  "Can you optimise this further? What's the bottleneck?",
  "How would your solution change if the input no longer fits in memory?",
];

export interface InterviewerPrompt {
  id: string;
  message: string;
  kind?: "approach" | "complexity" | "edge-case" | "optimization";
}

interface AIInterviewerPanelProps {
  problemId: string;
  language: string;
  code: string;
}

export function AIInterviewerPanel({ problemId, language, code }: AIInterviewerPanelProps) {
  const [prompt, setPrompt] = useState<InterviewerPrompt | null>(null);
  const [loading, setLoading] = useState(false);
  const [cursor, setCursor] = useState(0);

  const loadNext = async () => {
    setLoading(true);
    try {
      // Try the backend first; gracefully fall back to local prompts.
      const res: any = await interviewService
        .submitAIResponse(problemId, { language, code, cursor })
        .catch(() => null);

      const message: string | undefined =
        res?.prompt?.message ?? res?.message ?? res?.data?.message;

      if (message) {
        setPrompt({ id: res?.prompt?.id ?? `srv-${Date.now()}`, message, kind: res?.prompt?.kind });
      } else {
        const next = FALLBACK_PROMPTS[cursor % FALLBACK_PROMPTS.length];
        setPrompt({ id: `local-${cursor}`, message: next });
      }
      setCursor((c) => c + 1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Surface the first interviewer interruption when the workspace opens.
    void loadNext();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [problemId]);

  return (
    <aside className="flex h-full w-full flex-col gap-4 border-l border-border/60 bg-card/40 p-4">
      <div className="flex items-center gap-2 text-sm font-medium text-foreground">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 text-primary">
          <Sparkles className="h-3.5 w-3.5" />
        </span>
        AI Interviewer
      </div>

      <div className="relative flex-1 overflow-hidden rounded-xl border border-border/60 bg-background/60 p-4">
        {loading ? (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            The interviewer is thinking…
          </div>
        ) : prompt ? (
          <div className="flex h-full flex-col">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              Interviewer
            </p>
            <p className="mt-2 text-sm leading-relaxed text-foreground">{prompt.message}</p>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No prompts yet.</p>
        )}
      </div>

      <Button onClick={loadNext} disabled={loading} className="gap-2">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ChevronRight className="h-4 w-4" />}
        Next interviewer prompt
      </Button>

      <p className="text-[11px] leading-relaxed text-muted-foreground">
        Treat each prompt like a live interviewer interruption — respond out loud, then
        update your code or notes before asking for the next one.
      </p>
    </aside>
  );
}
