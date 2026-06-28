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

  async getById(id: string): Promise<BackendProblem> {
    const res = await api.get<ProblemResponse>(`/problems/${id}`);

    const data = res.data;

    return data.problem ?? data.data!;
  },

  async markSolved(id: string, solved = true) {
    const res = await api.post(`/problems/${id}/solved`, { solved });
    return res.data;
  },

  async toggleBookmark(id: string) {
    const res = await api.post(`/problems/${id}/bookmark`);
    return res.data;
  },

  async toggleRevision(id: string) {
    const res = await api.post(`/problems/${id}/revision`);
    return res.data;
  },

  async saveNotes(id: string, notes: string) {
    const res = await api.put(`/problems/${id}/notes`, { notes });
    return res.data;
  },

  async getProgress() {
    const res = await api.get<ProgressResponse>("/problems/progress");

    const data = res.data;

    return data.progress ?? data.data;
  },

  async submitSolution(id: string, payload: unknown) {
    const res = await api.post(`/problems/${id}/submit`, payload);
    return res.data;
  },
};

export default problemService;
