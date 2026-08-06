/* eslint-disable prettier/prettier */
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { createPortal } from "react-dom";
import {
  Bookmark,
  BookmarkCheck,
  Check,
  ExternalLink,
  FileText,
  RotateCcw,
  Search,
  SquareCode,
    ChevronLeft,
  ChevronRight,
  ChevronUp 
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useProblemsStore } from "@/store/problems-store";
// import { COMPANIES, PROBLEMS, TOPICS, type Difficulty, type Problem } from "./problems-data";
import type { Problem, BackendProblem, Difficulty } from "./problems-data";
import problemService from "../../services/problemService";
// import { useEffect } from "react";
import { NotesDialog } from "./notes-dialog";
import revisionService from "@/services/revisionService";
import { toast } from "sonner";

const difficultyClasses: Record<Difficulty, string> = {
  Easy: "bg-success/15 text-success border-success/30",
  Medium: "bg-warning/15 text-warning border-warning/30",
  Hard: "bg-destructive/15 text-destructive border-destructive/30",
};

export function ProblemsTable() {

  
  const byId = useProblemsStore((s) => s.byId);
  const startProblem = useProblemsStore((s) => s.startProblem);
const activeProblemId = useProblemsStore((s) => s.activeProblemId);

const removeStartedProblem = useProblemsStore(
  (s) => s.removeStartedProblem
);
const clearActiveProblem = useProblemsStore(
  (s) => s.clearActiveProblem
);

const toggleSolved = useProblemsStore((s) => s.toggleSolved);
const startedProblems = useProblemsStore((s)=>s.startedProblems);


const toggleRevision = useProblemsStore((s) => s.toggleRevision);
const toggleBookmark = useProblemsStore((s) => s.toggleBookmark);

const hydrateSolved = useProblemsStore((s) => s.hydrateSolved);
const hydrateBookmarks = useProblemsStore((s) => s.hydrateBookmarks);
const hydrateNotes = useProblemsStore((s) => s.hydrateNotes);
const hydrateRevision = useProblemsStore((s) => s.hydrateRevision);

  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState<string>("all");
  const [company, setCompany] = useState<string>("all");
  const [difficulty, setDifficulty] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");
  const [notesFor, setNotesFor] = useState<Problem | null>(null);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [page, setPage] = useState(1);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [warningProblem, setWarningProblem] = useState<Problem | null>(null);
const LIMIT = 50;
const formatDifficulty = (d?: string): Difficulty => {
  if (!d) return "Easy";

  const val = d.toLowerCase();

  if (val === "easy") return "Easy";
  if (val === "medium") return "Medium";
  if (val === "hard") return "Hard";

  return "Easy";
};
useEffect(() => {
  if (warningProblem) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return () => {
    document.body.style.overflow = "auto";
  };
}, [warningProblem]);
useEffect(() => {
  const check = async () => {
    const res = await revisionService.getDueRevisions();

    if (res.blocked) {
      alert(
        "You have pending revisions that need to be completed before accessing the problems page. Please complete your revisions first.",
      );
      window.location.href = "/revisions";
    }
  };

  check();
}, []);

useEffect(() => {
  let ignore = false;

  const loadProblems = async () => {
    try {
     const data = await problemService.list({
  page,
  limit: LIMIT,
});
      const progress = await problemService.getProgress();
const bookmarks = await problemService.getBookmarks();
const notes = await problemService.getNotes();
const revisions = await revisionService.getAllRevisions();



const solvedIds = progress.map(
  (p: { problem_id: number }) => p.problem_id
);

hydrateRevision(
    revisions.revisions
        .filter(r => !r.is_completed)
        .map(r => r.problem_id)
);
hydrateSolved(solvedIds);
      const mappedProblems: Problem[] = data.map((p) => ({
        id: p.id,
        title: p.title,
        difficulty: formatDifficulty(p.difficulty),
        topic: p.topic,
        companies: [],
        leetcodeUrl: p.question_link,
      }));

     if (!ignore) {
  setProblems(mappedProblems);

  hydrateSolved(
    progress.map((p: any) => p.problem_id)
  );

  hydrateBookmarks(
    bookmarks.map((b: any) => b.problem_id)
  );

  hydrateNotes(notes);
}
    } catch (err) {
      console.error("Failed to load problems:", err);
      if (!ignore) setProblems([]); // safe fallback
    }
  };

  loadProblems();

  return () => {
    ignore = true;
  };
}, [page]);
useEffect(() => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}, [page]);

useEffect(() => {
  const handleScroll = () => {
    setShowScrollTop(window.scrollY > 250);
  };

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);
  const filtered = useMemo(() => {
    return problems.filter((p) => {
      if (query && !p.title.toLowerCase().includes(query.toLowerCase())) return false;
      if (topic !== "all" && p.topic !== topic) return false;
      if (company !== "all" && !p.companies.includes(company)) return false;
      if (difficulty !== "all" && p.difficulty !== difficulty) return false;
      const st = byId[p.id];
      if (status === "solved" && !st?.solved) return false;
      if (status === "unsolved" && st?.solved) return false;
      if (status === "revision" && !st?.revision) return false;
      if (status === "bookmarked" && !st?.bookmarked) return false;
      return true;
    });
  }, [problems, query, topic, company, difficulty, status, byId]);
const hasNextPage = problems.length === LIMIT;
  const stats = useMemo(() => {
    const total = problems.length;
    let solved = 0;
    let revision = 0;
    let bookmarked = 0;
    for (const p of problems) {
      const s = byId[p.id];
      if (s?.solved) solved++;
      if (s?.revision) revision++;
      if (s?.bookmarked) bookmarked++;
    }
    return { total, solved, revision, bookmarked, pct: total ? Math.round((solved / total) * 100) : 0 };
  }, [problems, byId]);


const navigate = useNavigate(); 
const handleOpenProblem = async (p: Problem) => {

  if (
    activeProblemId &&
    activeProblemId !== String(p.id)
  ) {

    const previous =
      problems.find(
        (item) =>
          String(item.id) === activeProblemId
      );

    if (previous) {
      setWarningProblem(previous);
      return;
    }
  }


  try {

    await problemService.startProblem(p.id);

    startProblem(p.id);

    window.open(
      p.leetcodeUrl,
      "_blank"
    );

  } catch(err){

    console.error(
      "Start problem failed",
      err
    );

  }

};
const handleSolve = async (p: Problem) => {

  try {

    const startTime =
      startedProblems[String(p.id)];


    if (!startTime) {

      toast.error(
        "Open the problem first before marking it solved."
      );

      return;

    }


    const timeTaken =
      Math.floor(
        (Date.now() - startTime) / 60000
      );
console.log("SOLVING", {
  id: p.id,
  difficulty: p.difficulty
});

    const res =
      await problemService.markSolved(
        p.id,
        p.difficulty,
        timeTaken
      );


    toggleSolved(p.id);


    removeStartedProblem(p.id);

    clearActiveProblem();


    await revisionService.getDueRevisions();


    if (res?.blocked) {

      navigate({
        to: "/revisions"
      });

    }


  } catch(err){

    console.error(
      "Solve failed:",
      err
    );

  }

};
  return (
    <div className="space-y-6">
      {/* Header / stats */}
      <div className="glass rounded-2xl border border-border/60 p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Problems</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Curated DSA roadmap. Track progress, take notes, jump to LeetCode.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <StatPill label="Solved" value={`${stats.solved}/${stats.total}`} accent="success" />
            <StatPill label="Revision" value={stats.revision} accent="warning" />
            <StatPill label="Bookmarked" value={stats.bookmarked} accent="primary" />
          </div>
        </div>
        <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${stats.pct}%`, background: "var(--gradient-primary)" }}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="grid gap-3 md:grid-cols-12">
        <div className="relative md:col-span-4">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search problems..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <FilterSelect
          className="md:col-span-2"
          value={topic}
          onChange={setTopic}
          placeholder="Topic"
          options={[
            { value: "all", label: "All topics" },
            ...Array.from(new Set(problems.map((p) => p.topic))).map((t) => ({
              value: t,
              label: t,
            })),
          ]}
        />
        <FilterSelect
          className="md:col-span-2"
          value={company}
          onChange={setCompany}
          placeholder="Company"
          options={[{ value: "all", label: "All companies" }]}
        />
        <FilterSelect
          className="md:col-span-2"
          value={difficulty}
          onChange={setDifficulty}
          placeholder="Difficulty"
          options={[
            { value: "all", label: "All difficulty" },
            { value: "Easy", label: "Easy" },
            { value: "Medium", label: "Medium" },
            { value: "Hard", label: "Hard" },
          ]}
        />
        <FilterSelect
          className="md:col-span-2"
          value={status}
          onChange={setStatus}
          placeholder="Status"
          options={[
            { value: "all", label: "Any status" },
            { value: "solved", label: "Solved" },
            { value: "unsolved", label: "Unsolved" },
            { value: "revision", label: "For revision" },
            { value: "bookmarked", label: "Bookmarked" },
          ]}
        />
      </div>

      {/* Table */}
      <div className="glass overflow-hidden rounded-2xl border border-border/60">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-12 pl-4"></TableHead>
              <TableHead>Problem</TableHead>
              <TableHead className="hidden md:table-cell">Topic</TableHead>
              <TableHead className="hidden lg:table-cell">Companies</TableHead>
              <TableHead>Difficulty</TableHead>
              <TableHead className="w-[180px] text-right pr-4">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((p) => {
              const st = byId[p.id];
              return (
                <TableRow key={p.id} className="group transition-colors">
                  <TableCell className="pl-4">
                 <Checkbox
  checked={!!st?.solved}
onCheckedChange={() => {

const started = startedProblems[p.id];

if(!started){

toast.error(
"Open the problem first before marking it solved"
);

return;

}

handleSolve(p);

}}
  aria-label="Mark solved"
/>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-0.5">
                      <span
                        className={cn(
                          "font-medium leading-tight",
                          st?.solved && "text-muted-foreground line-through",
                        )}
                      >
                        {p.title}
                      </span>
                      <div className="flex items-center gap-2 md:hidden">
                        <span className="text-xs text-muted-foreground">{p.topic}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="secondary" className="font-normal">
                      {p.topic}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {p.companies.slice(0, 3).map((c) => (
                        <Badge key={c} variant="outline" className="font-normal text-xs">
                          {c}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium",
                        difficultyClasses[p.difficulty],
                      )}
                    >
                      {p.difficulty}
                    </span>
                  </TableCell>
                  <TableCell className="pr-4">
                    <div className="flex items-center justify-end gap-1">
                      <IconAction
                        title={st?.revision ? "Remove from revision" : "Mark for revision"}
                        active={!!st?.revision}
                        onClick={async () => {
  try {
    const st = byId[p.id];

    if (st?.revision) {

      toast.info("Already added to revision queue");
   return;
    } else {
      await revisionService.addRevision(p.id);
toggleRevision(p.id);
    }
  } catch (err) {
    console.error("Revision toggle failed:", err);
  }
}}
                      >
                        <RotateCcw className="h-4 w-4" />
                      </IconAction>
                      <IconAction
                        title={st?.bookmarked ? "Remove bookmark" : "Bookmark"}
                        active={!!st?.bookmarked}
                        onClick={async () => {
  try {
    if (st?.bookmarked) {
      await problemService.removeBookmark(p.id);
    } else {
      await problemService.addBookmark(p.id);
    }

    toggleBookmark(p.id);
  } catch (err) {
    console.error(err);
  }
}}
                      >
                        {st?.bookmarked ? (
                          <BookmarkCheck className="h-4 w-4" />
                        ) : (
                          <Bookmark className="h-4 w-4" />
                        )}
                      </IconAction>
                      <IconAction
                        title={st?.notes ? "Edit notes" : "Add notes"}
                        active={!!st?.notes}
                        onClick={() => setNotesFor(p)}
                      >
                        <FileText className="h-4 w-4" />
                      </IconAction>
                    
                 <Button
  variant="ghost"
  size="icon"
  title="Open on LeetCode"
  onClick={() => handleOpenProblem(p)}
>
  <ExternalLink className="h-4 w-4" />
</Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="py-12 text-center text-sm text-muted-foreground">
                  No problems match your filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

 

      <NotesDialog
        problem={notesFor}
        open={!!notesFor}
        onOpenChange={(o) => !o && setNotesFor(null)}
      />
{warningProblem &&
  createPortal(
    <div
      className="
        fixed
        inset-0
        z-[999999]
        flex
        items-center
        justify-center
        bg-black/60
        backdrop-blur-sm
      "
    >
      <div className="w-[400px] rounded-xl border bg-background p-6 shadow-xl">

        <h2 className="text-lg font-semibold">
          Previous problem unfinished
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          You started "{warningProblem.title}".
          Please solve or mark it before starting another problem.
        </p>

        <div className="mt-5 flex justify-end gap-3">

          <Button
            variant="outline"
            onClick={() => setWarningProblem(null)}
          >
            Cancel
          </Button>

          <Button
            onClick={() => {
              startProblem(warningProblem.id);

              window.open(
                warningProblem.leetcodeUrl,
                // document.body.style.overflow = "hidden";
                "_blank"
              );

              setWarningProblem(null);
            }}
          >
            Continue Previous
          </Button>

        </div>

      </div>
    </div>,
    document.body
  )}
    <div className="mt-6 flex items-center justify-center gap-4">
<Button
  variant="outline"
  disabled={page === 1}
  onClick={() => setPage((p) => p - 1)}
>
  <ChevronLeft className="mr-2 h-4 w-4" />
  Previous
</Button>

  <span className="text-sm font-medium">
    Page {page}
  </span>
<Button
  variant="outline"
  disabled={!hasNextPage}
  onClick={() => setPage((p) => p + 1)}
>
  Next
  <ChevronRight className="ml-2 h-4 w-4" />
</Button>




</div>
    </div>

    
  );

  
}



function StatPill({
  label,
  value,
  accent,
}: {
  label: string;
  value: string | number;
  accent: "success" | "warning" | "primary";
}) {
  const tone =
    accent === "success" ? "text-success" : accent === "warning" ? "text-warning" : "text-primary";
  const Icon = accent === "success" ? Check : accent === "warning" ? RotateCcw : Bookmark;
  return (
    <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-card/60 px-3 py-1.5">
      <Icon className={cn("h-3.5 w-3.5", tone)} />
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className={cn("text-sm font-semibold", tone)}>{value}</span>
    </div>
  );
}

function IconAction({
  children,
  title,
  active,
  onClick,
}: {
  children: React.ReactNode;
  title: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      variant="ghost"
      size="icon"
      title={title}
      onClick={onClick}
      className={cn(active && "text-primary")}
    >
      {children}
    </Button>
  );
}

function FilterSelect({
  value,
  onChange,
  placeholder,
  options,
  className,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  options: { value: string; label: string }[];
  className?: string;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((o) => (
          <SelectItem key={o.value} value={o.value}>
            {o.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
