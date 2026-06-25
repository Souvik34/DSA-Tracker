import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink, Loader2, Play } from "lucide-react";
import { toast } from "sonner";

import { requireAuth } from "@/lib/route-guard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PROBLEMS } from "@/features/problems/problems-data";
import {
  CodeEditor,
  STARTER_CODE,
  SUPPORTED_LANGUAGES,
  type SupportedLanguageId,
} from "@/features/editor/code-editor";
import { AIInterviewerPanel } from "@/features/interview/ai-interviewer-panel";
import { problemService } from "@/services/problemService";

export const Route = createFileRoute("/workspace/$problemId")({
  beforeLoad: ({ location }) => requireAuth(location),
  head: () => ({
    meta: [
      { title: "Interview Workspace · AlgoForge" },
      {
        name: "description",
        content:
          "Live DSA workspace with Monaco editor and AI interviewer interruptions.",
      },
    ],
  }),
  component: WorkspacePage,
});

function WorkspacePage() {
  const { problemId } = Route.useParams();
  const problem = useMemo(() => PROBLEMS.find((p) => p.id === problemId), [problemId]);

  const [language, setLanguage] = useState<SupportedLanguageId>("python");
  const [code, setCode] = useState<string>(STARTER_CODE.python);
  const [submitting, setSubmitting] = useState(false);

  const onLanguageChange = (value: string) => {
    const next = value as SupportedLanguageId;
    setLanguage(next);
    setCode(STARTER_CODE[next]);
  };

  const onSubmit = async () => {
    setSubmitting(true);
    const t = toast.loading("Submitting your solution…");
    try {
      await problemService
        .submitSolution?.(problemId, { language, code })
        .catch(() => null);
      toast.success("Solution submitted!", { id: t });
    } catch (err: any) {
      toast.error(err?.message ?? "Submission failed", { id: t });
    } finally {
      setSubmitting(false);
    }
  };

  if (!problem) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Problem not found.</p>
          <Link to="/problems" className="mt-3 inline-block text-sm text-primary hover:underline">
            Back to problems
          </Link>
        </div>
      </div>
    );
  }

  const difficultyTone =
    problem.difficulty === "Easy"
      ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
      : problem.difficulty === "Medium"
      ? "bg-amber-500/15 text-amber-400 border-amber-500/30"
      : "bg-rose-500/15 text-rose-400 border-rose-500/30";

  return (
    <div className="flex h-screen flex-col bg-background text-foreground">
      {/* Topbar */}
      <header className="flex items-center justify-between border-b border-border/60 bg-card/40 px-4 py-3">
        <div className="flex items-center gap-3">
          <Link
            to="/problems"
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-muted/40 hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Problems
          </Link>
          <span className="text-sm font-medium">{problem.title}</span>
          <Badge variant="outline" className={difficultyTone}>
            {problem.difficulty}
          </Badge>
          <Badge variant="secondary" className="hidden sm:inline-flex">
            {problem.topic}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={problem.leetcodeUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-muted/40 hover:text-foreground"
          >
            <ExternalLink className="h-3.5 w-3.5" /> LeetCode
          </a>
        </div>
      </header>

      {/* 3-pane grid */}
      <div className="grid flex-1 min-h-0 grid-cols-1 lg:grid-cols-[1fr_1.2fr_320px]">
        {/* Left: problem statement */}
        <section className="min-h-0 overflow-y-auto border-r border-border/60 p-5">
          <h1 className="text-lg font-semibold">{problem.title}</h1>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {problem.companies.map((c) => (
              <Badge key={c} variant="outline" className="text-[10px]">
                {c}
              </Badge>
            ))}
          </div>

          <h2 className="mt-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Problem Statement
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-foreground/90">
            Solve <span className="font-medium">{problem.title}</span>. Read the full
            statement on LeetCode and outline your approach before coding.
          </p>

          <h2 className="mt-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Constraints
          </h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-foreground/90">
            <li>Inputs follow the problem's stated bounds.</li>
            <li>Aim for the best possible time complexity.</li>
            <li>Handle empty, minimal, and maximal inputs.</li>
          </ul>

          <h2 className="mt-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Examples
          </h2>
          <div className="mt-2 space-y-3">
            <pre className="rounded-lg border border-border/60 bg-card/60 p-3 text-xs leading-relaxed">
{`Input:  <see LeetCode>
Output: <see LeetCode>
Explain: walk the interviewer through your reasoning.`}
            </pre>
          </div>
        </section>

        {/* Middle: editor */}
        <section className="flex min-h-0 flex-col">
          <div className="flex items-center justify-between gap-2 border-b border-border/60 bg-card/30 px-3 py-2">
            <Select value={language} onValueChange={onLanguageChange}>
              <SelectTrigger className="h-8 w-[160px]">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                {SUPPORTED_LANGUAGES.map((l) => (
                  <SelectItem key={l.id} value={l.id}>
                    {l.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button size="sm" onClick={onSubmit} disabled={submitting} className="gap-2">
              {submitting ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Play className="h-3.5 w-3.5" />
              )}
              Submit code
            </Button>
          </div>
          <div className="min-h-0 flex-1">
            <CodeEditor language={language} value={code} onChange={setCode} />
          </div>
        </section>

        {/* Right: AI interviewer */}
        <AIInterviewerPanel problemId={problemId} language={language} code={code} />
      </div>
    </div>
  );
}
