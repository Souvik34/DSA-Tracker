import { api } from "@/lib/api";

export const problemService = {
  async list(params = {}) {
    const { data } = await api.get("/problems", { params });
    return data?.problems ?? data?.data ?? data ?? [];
  },

  async getById(id) {
    const { data } = await api.get(`/problems/${id}`);
    return data?.problem ?? data?.data ?? data;
  },

  async markSolved(id, solved = true) {
    const { data } = await api.post(`/problems/${id}/solved`, { solved });
    return data;
  },

  async toggleBookmark(id) {
    const { data } = await api.post(`/problems/${id}/bookmark`);
    return data;
  },

  async toggleRevision(id) {
    const { data } = await api.post(`/problems/${id}/revision`);
    return data;
  },

  async saveNotes(id, notes) {
    const { data } = await api.put(`/problems/${id}/notes`, { notes });
    return data;
  },

  async getProgress() {
    const { data } = await api.get("/problems/progress");
    return data?.progress ?? data?.data ?? data;
  },

  async submitSolution(id, payload) {
    const { data } = await api.post(`/problems/${id}/submit`, payload);
    return data;
  },
};

export default problemService;
