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


const res = await api.get("/revision/due");
    return res.data;
  },

  async completeRevision(problemId: string) {
const res = await api.post(`/revision/complete/${problemId}`);
    return res.data;
  },

  async getAllRevisions() {
   const res = await api.get("/revision/all");
    return res.data;
  },
};

export default revisionService;