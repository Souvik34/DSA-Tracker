/* eslint-disable prettier/prettier */
import { createFileRoute } from "@tanstack/react-router";
// import { createFileRoute } from "@tanstack/react-router";
import { ResetPassword } from "@/features/auth/reset-password";

export const Route = createFileRoute("/reset-password")({
  validateSearch: (search: Record<string, unknown>) => ({
    token:
      typeof search.token === "string"
        ? search.token
        : "",
  }),

  component: ResetPassword,
});