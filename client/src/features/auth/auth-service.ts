/* eslint-disable prettier/prettier */
import { api } from "@/lib/api";

const TOKEN_KEY = "auth_token";

export const authService = {
  async login(email: string, password: string) {
    const { data } = await api.post("/auth/signin", {
      email,
      password,
    });

    const token = data?.token ?? data?.accessToken;
    const user = data?.user ?? data?.data?.user ?? null;

    if (token && typeof window !== "undefined") {
      localStorage.setItem(TOKEN_KEY, token);
    }

    return {
      user,
      token,
    };
  },

  async signup(name: string, email: string, password: string) {
    const { data } = await api.post("/auth/signup", {
      name,
      email,
      password,
    });

    const token = data?.token ?? data?.accessToken;
    const user = data?.user ?? data?.data?.user ?? null;

    if (token && typeof window !== "undefined") {
      localStorage.setItem(TOKEN_KEY, token);
    }

    return {
      user,
      token,
    };
  },

  /**
   * Start Google OAuth flow.
   *
   * This must redirect the browser to the backend,
   * not use axios.
   */
  googleLogin() {
    if (typeof window === "undefined") {
      return;
    }

    const baseURL = api.defaults.baseURL;

    if (!baseURL) {
      console.error("API baseURL is not configured.");
      return;
    }

    window.location.href = `${baseURL}/auth/google`;
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
      // Ignore logout API errors
    } finally {
      if (typeof window !== "undefined") {
        localStorage.removeItem(TOKEN_KEY);
      }
    }
  },

  getToken() {
    if (typeof window === "undefined") {
      return null;
    }

    return localStorage.getItem(TOKEN_KEY);
  },

  isAuthenticated() {
    return Boolean(this.getToken());
  },
  async forgotPassword(email: string) {
  const { data } = await api.post("/auth/forgot-password", {
    email,
  });

  return data;
},

async resetPassword(resetToken: string, newPassword: string) {
  const { data } = await api.post("/auth/reset-password", {
    resetToken,
    newPassword,
  });

  return data;
}
};



export default authService;