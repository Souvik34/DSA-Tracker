/* eslint-disable prettier/prettier */
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useAuthStore } from "./auth-store";

export interface ProblemState {
  solved: boolean;
  revision: boolean;
  bookmarked: boolean;
  notes: string;
  updatedAt?: number;
}

interface ProblemsStore {
  byId: Record<string, ProblemState>;

  activeProblemId: string | null;
  startedProblems: Record<string, number>;

  startProblem: (id: string | number) => void;
  clearActiveProblem: () => void;
  removeStartedProblem: (id: string | number) => void;

  markSolved: (id: string | number) => void;
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

  resetProblems: () => void;

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

      activeProblemId: null,

      startedProblems: {},

      get: (id) =>
        get().byId[String(id)] ?? empty,

      startProblem: (id) =>
        set((state) => {
          const key = String(id);

          return {
            activeProblemId: key,

            startedProblems: {
              ...state.startedProblems,
              [key]: Date.now(),
            },
          };
        }),

      clearActiveProblem: () =>
        set({
          activeProblemId: null,
        }),

      removeStartedProblem: (id) =>
        set((state) => {
          const updated = {
            ...state.startedProblems,
          };

          delete updated[String(id)];

          return {
            startedProblems: updated,
          };
        }),

      /*
       * IMPORTANT:
       * Rebuild solved state from backend.
       *
       * This prevents old user's solved problems
       * from remaining in Zustand.
       */
      hydrateSolved: (problemIds) =>
        set((state) => {
          const solvedSet = new Set(
            problemIds.map(String)
          );

          const updated: Record<string, ProblemState> = {};

          Object.entries(state.byId).forEach(
            ([key, value]) => {
              updated[key] = {
                ...value,
                solved: solvedSet.has(key),
              };
            }
          );

          solvedSet.forEach((key) => {
            const cur = updated[key] ?? empty;

            updated[key] = {
              ...cur,
              solved: true,
            };
          });

          const updatedStartedProblems = {
            ...state.startedProblems,
          };

          solvedSet.forEach((id) => {
            delete updatedStartedProblems[id];
          });

          const activeId =
            state.activeProblemId &&
            solvedSet.has(state.activeProblemId)
              ? null
              : state.activeProblemId;

          return {
            byId: updated,
            startedProblems: updatedStartedProblems,
            activeProblemId: activeId,
          };
        }),

      /*
       * Rebuild bookmark state from backend.
       */
      hydrateBookmarks: (problemIds) =>
        set((state) => {
          const bookmarkSet = new Set(
            problemIds.map(String)
          );

          const updated: Record<string, ProblemState> = {};

          Object.entries(state.byId).forEach(
            ([key, value]) => {
              updated[key] = {
                ...value,
                bookmarked: bookmarkSet.has(key),
              };
            }
          );

          bookmarkSet.forEach((key) => {
            const cur = updated[key] ?? empty;

            updated[key] = {
              ...cur,
              bookmarked: true,
            };
          });

          return {
            byId: updated,
          };
        }),

      /*
       * Rebuild revision state from backend.
       */
      hydrateRevision: (problemIds) =>
        set((state) => {
          const revisionSet = new Set(
            problemIds.map(String)
          );

          const updated: Record<string, ProblemState> = {};

          Object.entries(state.byId).forEach(
            ([key, value]) => {
              updated[key] = {
                ...value,
                revision: revisionSet.has(key),
              };
            }
          );

          revisionSet.forEach((key) => {
            const cur = updated[key] ?? empty;

            updated[key] = {
              ...cur,
              revision: true,
            };
          });

          return {
            byId: updated,
          };
        }),

      /*
       * Rebuild notes state from backend.
       */
      hydrateNotes: (notes) =>
        set((state) => {
          const notesMap = new Map(
            notes.map((n) => [
              String(n.problem_id),
              n.notes,
            ])
          );

          const updated: Record<string, ProblemState> = {};

          Object.entries(state.byId).forEach(
            ([key, value]) => {
              updated[key] = {
                ...value,
                notes: notesMap.get(key) ?? "",
              };
            }
          );

          notesMap.forEach((notesValue, key) => {
            const cur = updated[key] ?? empty;

            updated[key] = {
              ...cur,
              notes: notesValue,
            };
          });

          return {
            byId: updated,
          };
        }),

      markSolved: (id) =>
        set((state) => {
          const key = String(id);

          const cur =
            state.byId[key] ?? empty;

          return {
            byId: {
              ...state.byId,
              [key]: {
                ...cur,
                solved: true,
                updatedAt: Date.now(),
              },
            },
          };
        }),

      toggleRevision: (id) =>
        set((state) => {
          const key = String(id);

          const cur =
            state.byId[key] ?? empty;

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

          const cur =
            state.byId[key] ?? empty;

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

          const cur =
            state.byId[key] ?? empty;

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

      resetProblems: () =>
        set({
          byId: {},
          activeProblemId: null,
          startedProblems: {},
        }),
    }),

    {
      /*
       * IMPORTANT:
       * This is no longer a single global key.
       *
       * Each user gets:
       * algoforge_problems_<userId>
       */
      name: "algoforge_problems_v1",

      storage: {
        getItem: (name) => {
          if (typeof window === "undefined") {
            return null;
          }

          const user = useAuthStore.getState().user;

          if (!user?.id) {
            return null;
          }

          const key = `${name}_${user.id}`;

          const value = localStorage.getItem(key);

          if (!value) {
            return null;
          }

          return JSON.parse(value);
        },

        setItem: (name, value) => {
          if (typeof window === "undefined") {
            return;
          }

          const user = useAuthStore.getState().user;

          if (!user?.id) {
            return;
          }

          const key = `${name}_${user.id}`;

          localStorage.setItem(
            key,
            JSON.stringify(value)
          );
        },

        removeItem: (name) => {
          if (typeof window === "undefined") {
            return;
          }

          const user = useAuthStore.getState().user;

          if (!user?.id) {
            return;
          }

          const key = `${name}_${user.id}`;

          localStorage.removeItem(key);
        },
      },
    }
  )
);