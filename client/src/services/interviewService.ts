/* eslint-disable prettier/prettier */
import { api } from "@/lib/api";

export const interviewService = {
  async listUpcoming() {
    const { data } = await api.get("/interview/upcoming");
    return data?.interviews ?? data?.data ?? data ?? [];
  },

  async listHistory() {
    const { data } = await api.get("/interview/history");
    return data?.interviews ?? data?.data ?? data ?? [];
  },

  async getById(id: string) {
    const { data } = await api.get(`/interview/${id}`);
    return data?.interview ?? data?.data ?? data;
  },

  runCode: async(data:{
    code:string;
    language:string;
    sessionId:string;
})=>{

    return api.post(
        `/interview/run/${data.sessionId}`,
        {
            code:data.code,
            language:data.language
        }
    );

},
getInterviewState: async (sessionId: string) => {
    return api.get(`/interview/${sessionId}`);
},


evaluateCode: async(data:{
    code:string;
    language:string;
    sessionId:string;
})=>{

    return api.post(
        `/interview/evaluate/${data.sessionId}`,
        {
            code:data.code,
            language:data.language
        }
    );

},

  async schedule(payload: any) {
    const { data } = await api.post("/interview", payload);
    return data?.interview ?? data?.data ?? data;
  },

  async cancel(id: string) {
    const { data } = await api.delete(`/interview/${id}`);
    return data;
  },

  async startAISession(payload: any) {
    const { data } = await api.post("/interview/start", payload);
    return data;
  },

 getInterviewReport: async(
    sessionId: string
)=>{

    const { data } = await api.get(
        `/interview/report/${sessionId}`
    );

    return data;

},
  async submitAIResponse(sessionId: string, payload: any) {
    const { data } = await api.post(
      `/interview/message`,
      {
        sessionId,
        ...payload,
      }
    );
    return data;
  },
getInterviewHistory: () => {
    return api.get("/interview/history");
},
  async endInterview(sessionId: string) {
    const { data } = await api.post("/interview/end", {
      sessionId,
    });
    return data;
  },
};

export default interviewService;