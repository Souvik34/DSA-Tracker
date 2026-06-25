import { redirect } from "@tanstack/react-router";

/**
 * Shared `beforeLoad` guard for authenticated routes.
 * Redirects to /login when no JWT is present in localStorage.
 */
export function requireAuth(location?: { href: string }) {
  if (typeof window === "undefined") return;
  if (!localStorage.getItem("auth_token")) {
    throw redirect({
      to: "/login",
      search: location ? { redirect: location.href } : undefined,
    });
  }
}
