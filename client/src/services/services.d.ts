declare module "@/services/authService" {
  export interface AuthUser {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
    [key: string]: unknown;
  }
  export interface AuthResult {
    user: AuthUser | null;
    token: string | null;
  }
  export const authService: {
    login(email: string, password: string): Promise<AuthResult>;
    signup(name: string, email: string, password: string): Promise<AuthResult>;
    me(): Promise<AuthUser | null>;
    logout(): Promise<void>;
    getToken(): string | null;
    isAuthenticated(): boolean;
  };
  const _default: typeof authService;
  export default _default;
}

declare module "@/services/problemService" {
  export const problemService: {
    list(params?: Record<string, unknown>): Promise<unknown[]>;
    getById(id: string): Promise<unknown>;
    markSolved(id: string, solved?: boolean): Promise<unknown>;
    toggleBookmark(id: string): Promise<unknown>;
    toggleRevision(id: string): Promise<unknown>;
    saveNotes(id: string, notes: string): Promise<unknown>;
    getProgress(): Promise<unknown>;
    submitSolution(id: string, payload: { language: string; code: string }): Promise<unknown>;
  };
  const _default: typeof problemService;
  export default _default;
}

declare module "@/services/interviewService" {
  export const interviewService: {
    listUpcoming(): Promise<unknown[]>;
    listHistory(): Promise<unknown[]>;
    getById(id: string): Promise<unknown>;
    schedule(payload: Record<string, unknown>): Promise<unknown>;
    cancel(id: string): Promise<unknown>;
    startAISession(payload: Record<string, unknown>): Promise<unknown>;
    submitAIResponse(sessionId: string, payload: Record<string, unknown>): Promise<unknown>;
  };
  const _default: typeof interviewService;
  export default _default;
}
