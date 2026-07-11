/* eslint-disable prettier/prettier */
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

  toggleSolved: (id: string | number) => void;
  toggleRevision: (id: string | number) => void;
  toggleBookmark: (id: string | number) => void;
  setNotes: (id: string | number, notes: string) => void;

  hydrateSolved: (problemIds: number[]) => void;
  hydrateBookmarks: (problemIds: number[]) => void;
  hydrateRevision: (problemIds: number[]) => void;
  hydrateNotes: (
    notes: {
      problem_id: number;
      notes: string;
    }[]
  ) => void;

  get: (id: string | number) => ProblemState;
}

const empty: ProblemState = {
  solved: false,
  revision: false,
  bookmarked: false,
  notes: "",
};

export const useProblemsStore = create<ProblemsStore>()(
  persist(
    (set, get) => ({
      byId: {},

      get: (id) => get().byId[String(id)] ?? empty,

      hydrateSolved: (problemIds) =>
        set((state) => {
          const updated = { ...state.byId };

          problemIds.forEach((id) => {
            const key = String(id);
            const cur = updated[key] ?? empty;

            updated[key] = {
              ...cur,
              solved: true,
            };
          });

          return { byId: updated };
        }),

      hydrateBookmarks: (problemIds) =>
        set((state) => {
          const updated = { ...state.byId };

          problemIds.forEach((id) => {
            const key = String(id);
            const cur = updated[key] ?? empty;

            updated[key] = {
              ...cur,
              bookmarked: true,
            };
          });

          return { byId: updated };
        }),

      hydrateRevision: (problemIds) =>
        set((state) => {
          const updated = { ...state.byId };

          problemIds.forEach((id) => {
            const key = String(id);
            const cur = updated[key] ?? empty;

            updated[key] = {
              ...cur,
              revision: true,
            };
          });

          return { byId: updated };
        }),

      hydrateNotes: (notes) =>
        set((state) => {
          const updated = { ...state.byId };

          notes.forEach((n) => {
            const key = String(n.problem_id);
            const cur = updated[key] ?? empty;

            updated[key] = {
              ...cur,
              notes: n.notes,
            };
          });

          return { byId: updated };
        }),

      toggleSolved: (id) =>
        set((state) => {
          const key = String(id);
          const cur = state.byId[key] ?? empty;

          return {
            byId: {
              ...state.byId,
              [key]: {
                ...cur,
                solved: !cur.solved,
                updatedAt: Date.now(),
              },
            },
          };
        }),

      toggleRevision: (id) =>
        set((state) => {
          const key = String(id);
          const cur = state.byId[key] ?? empty;

          return {
            byId: {
              ...state.byId,
              [key]: {
                ...cur,
                revision: !cur.revision,
                updatedAt: Date.now(),
              },
            },
          };
        }),

      toggleBookmark: (id) =>
        set((state) => {
          const key = String(id);
          const cur = state.byId[key] ?? empty;

          return {
            byId: {
              ...state.byId,
              [key]: {
                ...cur,
                bookmarked: !cur.bookmarked,
                updatedAt: Date.now(),
              },
            },
          };
        }),

      setNotes: (id, notes) =>
        set((state) => {
          const key = String(id);
          const cur = state.byId[key] ?? empty;

          return {
            byId: {
              ...state.byId,
              [key]: {
                ...cur,
                notes,
                updatedAt: Date.now(),
              },
            },
          };
        }),
    }),
    {
      name: "algoforge_problems_v1",
    }
  )
);