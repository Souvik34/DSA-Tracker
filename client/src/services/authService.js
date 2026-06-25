import { api } from "@/lib/api";

const TOKEN_KEY = "auth_token";

export const authService = {
  async login(email, password) {
    const { data } = await api.post("/auth/login", { email, password });
    const token = data?.token ?? data?.accessToken;
    const user = data?.user ?? data?.data?.user ?? null;
    if (token && typeof window !== "undefined") {
      localStorage.setItem(TOKEN_KEY, token);
    }
    return { user, token };
  },

  async signup(name, email, password) {
    const { data } = await api.post("/auth/register", { name, email, password });
    const token = data?.token ?? data?.accessToken;
    const user = data?.user ?? data?.data?.user ?? null;
    if (token && typeof window !== "undefined") {
      localStorage.setItem(TOKEN_KEY, token);
    }
    return { user, token };
  },

  async me() {
    try {
      const { data } = await api.get("/auth/me");
      return data?.user ?? data ?? null;
    } catch {
      return null;
    }
  },

  async logout() {
    try {
      await api.post("/auth/logout");
    } catch {
      /* ignore */
    } finally {
      if (typeof window !== "undefined") localStorage.removeItem(TOKEN_KEY);
    }
  },

  getToken() {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(TOKEN_KEY);
  },

  isAuthenticated() {
    return Boolean(this.getToken());
  },
};

export default authService;
