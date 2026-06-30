/* eslint-disable prettier/prettier */
import { api } from "@/lib/api";

export interface RevisionItem {
  id: number;
  problem_id: number;

  revision_count: number;
  next_revision_date: string;
  is_completed: boolean;

  user_id: string;

  felt_difficulty: string;
  confidence_rating: number;

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

async completeRevision(problemId: number | string) {
  const res = await api.post(`/revision/complete/${problemId}`);
  return res.data;
},

  async getAllRevisions() {
   const res = await api.get("/revision/all");
    return res.data;
  },
};

export default revisionService;