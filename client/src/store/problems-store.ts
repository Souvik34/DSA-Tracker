import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ProblemState {
  solved: boolean;
  revision: boolean;
  bookmarked: boolean;
  notes: string;
  updatedAt?: number;
}

interface ProblemsStore {
  byId: Record<string, ProblemState>;
  toggleSolved: (id: string) => void;
  toggleRevision: (id: string) => void;
  toggleBookmark: (id: string) => void;
  setNotes: (id: string, notes: string) => void;
  get: (id: string) => ProblemState;
}

const empty: ProblemState = { solved: false, revision: false, bookmarked: false, notes: "" };

export const useProblemsStore = create<ProblemsStore>()(
  persist(
    (set, get) => ({
      byId: {},
      get: (id) => get().byId[id] ?? empty,
      toggleSolved: (id) =>
        set((s) => {
          const cur = s.byId[id] ?? empty;
          return { byId: { ...s.byId, [id]: { ...cur, solved: !cur.solved, updatedAt: Date.now() } } };
        }),
      toggleRevision: (id) =>
        set((s) => {
          const cur = s.byId[id] ?? empty;
          return { byId: { ...s.byId, [id]: { ...cur, revision: !cur.revision, updatedAt: Date.now() } } };
        }),
      toggleBookmark: (id) =>
        set((s) => {
          const cur = s.byId[id] ?? empty;
          return { byId: { ...s.byId, [id]: { ...cur, bookmarked: !cur.bookmarked, updatedAt: Date.now() } } };
        }),
      setNotes: (id, notes) =>
        set((s) => {
          const cur = s.byId[id] ?? empty;
          return { byId: { ...s.byId, [id]: { ...cur, notes, updatedAt: Date.now() } } };
        }),
    }),
    { name: "algoforge_problems_v1" },
  ),
);
