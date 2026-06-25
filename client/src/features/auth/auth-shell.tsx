import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AuthShellProps {
  title: string;
  subtitle: string;
  footer: ReactNode;
  submitLabel: string;
  withName?: boolean;
  onSubmit: (values: { name?: string; email: string; password: string }) => Promise<void> | void;
}

export function AuthShell({ title, subtitle, footer, submitLabel, withName, onSubmit }: AuthShellProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="relative grid min-h-screen lg:grid-cols-2">
      {/* Left brand panel */}
      <div className="relative hidden overflow-hidden border-r border-border lg:block">
        <div aria-hidden className="absolute inset-0" style={{ background: "var(--gradient-glow)" }} />
        <div className="relative flex h-full flex-col justify-between p-10">
          <Link to="/" className="flex items-center gap-2">
            <div
              className="grid h-9 w-9 place-items-center rounded-xl text-primary-foreground"
              style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-elegant)" }}
            >
              <Code2 className="h-5 w-5" />
            </div>
            <span className="text-sm font-semibold tracking-tight">AlgoForge</span>
          </Link>
          <div>
            <h2 className="max-w-md text-3xl font-semibold leading-tight tracking-tight">
              Master DSA the way top engineers do.
            </h2>
            <p className="mt-3 max-w-md text-sm text-muted-foreground">
              Curated problem sheets, daily streaks, and an AI interview coach designed to
              get you offer-ready faster.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-3">
              {["1200+ problems", "Daily contests", "AI coach"].map((t) => (
                <div
                  key={t}
                  className="rounded-xl border border-border bg-card/50 px-3 py-2 text-xs text-muted-foreground"
                >
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right form */}
      <div className="flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-sm animate-fade-in-up">
          <div className="mb-8 flex items-center gap-2 lg:hidden">
            <div
              className="grid h-9 w-9 place-items-center rounded-xl text-primary-foreground"
              style={{ background: "var(--gradient-primary)" }}
            >
              <Code2 className="h-5 w-5" />
            </div>
            <span className="text-sm font-semibold">AlgoForge</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>

          <form
            className="mt-7 space-y-4"
            onSubmit={async (e) => {
              e.preventDefault();
              setLoading(true);
              try {
                await onSubmit({ name: withName ? name : undefined, email, password });
              } finally {
                setLoading(false);
              }
            }}
          >
            {withName && (
              <div className="space-y-1.5">
                <Label htmlFor="name">Full name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
            )}
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full text-primary-foreground"
              style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-elegant)" }}
            >
              {loading ? "Please wait…" : submitLabel}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>
        </div>
      </div>
    </div>
  );
}
