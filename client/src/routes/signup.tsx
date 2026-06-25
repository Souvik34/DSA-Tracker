import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AuthShell } from "@/features/auth/auth-shell";
import { authService } from "@/features/auth/auth-service";
import { useAuthStore } from "@/store/auth-store";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create account · AlgoForge" },
      { name: "description", content: "Create your AlgoForge account and start prepping." },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  return (
    <AuthShell
      title="Create your account"
      subtitle="Start your DSA journey in less than a minute."
      submitLabel="Create account"
      withName
      onSubmit={async ({ name, email, password }) => {
        const { user, token } = await authService.signup(name ?? "Coder", email, password);
        const resolvedUser = user ?? { id: "me", name: name ?? "Coder", email };
        setAuth(resolvedUser, token ?? "");
        navigate({ to: "/dashboard" });
      }}
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </>
      }
    />
  );
}
