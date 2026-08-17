/* eslint-disable prettier/prettier */

import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AuthShell } from "@/features/auth/auth-shell";
import { authService } from "@/features/auth/auth-service";
import { useAuthStore } from "@/store/auth-store";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      {
        title: "Sign in · AlgoForge",
      },
      {
        name: "description",
        content: "Sign in to your AlgoForge DSA prep account.",
      },
    ],
  }),

  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();

  const setAuth = useAuthStore((state) => state.setAuth);

  const handleLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const { user, token } = await authService.login(email, password);

    if (!token) {
      throw new Error("Login successful but no authentication token was received.");
    }

    const resolvedUser =
      user ??
      {
        id: "me",
        name: email.split("@")[0] || "Coder",
        email,
      };

    setAuth(resolvedUser, token);

    await navigate({
      to: "/dashboard",
      replace: true,
    });
  };

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to continue your DSA prep."
      submitLabel="Sign in"
      onSubmit={handleLogin}
      footer={
        <>
          New here?{" "}
          <Link
            to="/signup"
            className="text-primary transition-colors hover:text-blue-400 hover:underline"
          >
            Create an account
          </Link>
        </>
      }
    />
  );
}