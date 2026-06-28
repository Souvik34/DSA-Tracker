/* eslint-disable prettier/prettier */
import { api } from "@/lib/api";

export interface RevisionItem {
  problem_id: string;
  title: string;
  topic?: string;
  priorityLabel?: string;
  priorityScore?: number;
}

export interface DueRevisionResponse {
  success: boolean;
  blocked: boolean;
  revisions: RevisionItem[];
}

const revisionService = {
  async getDueRevisions(): Promise<DueRevisionResponse> {
    // assuming backend uses JWT (recommended approach)
    const res = await api.get<DueRevisionResponse>("/revision/due/me");
    return res.data;
  },

  async completeRevision(problemId: string) {
    const res = await api.post(`/revision/complete/me/${problemId}`);
    return res.data;
  },

  async getAllRevisions() {
    const res = await api.get("/revision/all/me");
    return res.data;
  },
};

export default revisionService;