import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AuthShell } from "@/features/auth/auth-shell";
import { authService } from "@/features/auth/auth-service";
import { useAuthStore } from "@/store/auth-store";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in · AlgoForge" },
      { name: "description", content: "Sign in to your AlgoForge DSA prep account." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to continue your DSA prep."
      submitLabel="Sign in"
      onSubmit={async ({ email, password }) => {
        const { user, token } = await authService.login(email, password);
        const resolvedUser = user ?? { id: "me", name: email.split("@")[0] ?? "Coder", email };
        setAuth(resolvedUser, token ?? "");
        navigate({ to: "/dashboard" });
      }}
      footer={
        <>
          New here?{" "}
          <Link to="/signup" className="text-primary hover:underline">
            Create an account
          </Link>
        </>
      }
    />
  );
}
