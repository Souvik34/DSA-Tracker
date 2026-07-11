/* eslint-disable prettier/prettier */
import { api } from "@/lib/api";
import { BackendProblem } from "../features/problems/problems-data";

type ProblemsResponse = {
  problems?: BackendProblem[];
  data?: BackendProblem[];
};

type ProblemResponse = {
  problem?: BackendProblem;
  data?: BackendProblem;
};

type ProgressResponse = {
  progress?: unknown;
  data?: unknown;
};

export const problemService = {
  async list(params = {}): Promise<BackendProblem[]> {
    const res = await api.get<ProblemsResponse>("/problems", { params });

    const data = res.data;

    if (Array.isArray(data)) return data;

    return data?.problems ?? data?.data ?? [];
  },

  async getById(id: number | string): Promise<BackendProblem> {
    const res = await api.get<ProblemResponse>(`/problems/${id}`);

    const data = res.data;

    return data.problem ?? data.data!;
  },

async markSolved(problemId: number | string, difficulty: string) {
  const res = await api.post("/problems/solve", {
    problemId,
    difficulty,
  });

  return res.data;
},
  async toggleBookmark(id: number | string) {
    const res = await api.post(`/problems/${id}/bookmark`);
    return res.data;
  },

  async toggleRevision(id: number | string) {
    const res = await api.post(`/problems/${id}/revision`);
    return res.data;
  },

  async saveNotes(id: number | string, notes: string) {
    const res = await api.put(`/problems/${id}/notes`, { notes });
    return res.data;
  },

  async getProgress() {
    const res = await api.get<ProgressResponse>("/problems/progress");

    const data = res.data;

    return data.progress ?? data.data;
  },

  async submitSolution(id: number | string, payload: unknown) {
    const res = await api.post(`/problems/${id}/submit`, payload);
    return res.data;
  },

  async getNotes() {
  const res = await api.get("/problems/notes");
  return res.data.notes;
},

async getProblemNotes(id: number | string) {
  const res = await api.get(`/problems/${id}/notes`);
  return res.data.notes;
},

async saveNotes(problemId: number | string, notes: string) {
  const res = await api.put(
    `/problems/${problemId}/notes`,
    { notes }
  );

  return res.data;
},


async getBookmarks() {
  const res = await api.get("/problems/bookmarks");
  return res.data.bookmarks;
},

async addBookmark(id: number | string) {
  const res = await api.post(`/problems/${id}/bookmark`);
  return res.data;
},

async removeBookmark(id: number | string) {
  const res = await api.delete(`/problems/${id}/bookmark`);
  return res.data;
},
};


export default problemService;
