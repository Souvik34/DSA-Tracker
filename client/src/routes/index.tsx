import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    if (typeof window !== "undefined" && !localStorage.getItem("auth_token")) {
      throw redirect({ to: "/login" });
    }
    throw redirect({ to: "/dashboard" });
  },
});

