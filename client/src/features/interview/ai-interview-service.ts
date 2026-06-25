/**
 * Placeholder interface for future AI Interview integration.
 * Implementations will live behind this contract so UI stays decoupled.
 * No chatbot UI is mounted yet — only the architectural seam.
 */
export interface InterviewSession {
  id: string;
  topic: string;
  startedAt: string;
}

export interface AIInterviewService {
  startSession(topic: string): Promise<InterviewSession>;
  submitAnswer(sessionId: string, answer: string): Promise<{ feedback: string }>;
  endSession(sessionId: string): Promise<void>;
}

export const aiInterviewService: AIInterviewService = {
  async startSession(topic) {
    throw new Error(`AI interview not yet wired (topic: ${topic})`);
  },
  async submitAnswer() {
    throw new Error("AI interview not yet wired");
  },
  async endSession() {
    throw new Error("AI interview not yet wired");
  },
};
