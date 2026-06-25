import { api } from "@/lib/api";

export const interviewService = {
  async listUpcoming() {
    const { data } = await api.get("/interviews/upcoming");
    return data?.interviews ?? data?.data ?? data ?? [];
  },

  async listHistory() {
    const { data } = await api.get("/interviews/history");
    return data?.interviews ?? data?.data ?? data ?? [];
  },

  async getById(id) {
    const { data } = await api.get(`/interviews/${id}`);
    return data?.interview ?? data?.data ?? data;
  },

  async schedule(payload) {
    const { data } = await api.post("/interviews", payload);
    return data?.interview ?? data?.data ?? data;
  },

  async cancel(id) {
    const { data } = await api.delete(`/interviews/${id}`);
    return data;
  },

  // Reserved for future AI interview integration
  async startAISession(payload) {
    const { data } = await api.post("/interviews/ai/start", payload);
    return data;
  },

  async submitAIResponse(sessionId, payload) {
    const { data } = await api.post(`/interviews/ai/${sessionId}/respond`, payload);
    return data;
  },
};

export default interviewService;
