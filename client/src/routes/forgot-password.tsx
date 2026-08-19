/* eslint-disable prettier/prettier */
import { createFileRoute } from "@tanstack/react-router";
import { ForgotPassword } from "@/features/auth/forgot-password";

export const Route = createFileRoute("/forgot-password")({
  component: ForgotPassword,
});