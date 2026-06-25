import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth-store";

export function WelcomeCard() {
  const user = useAuthStore((s) => s.user);
  const name = user?.name?.split(" ")[0] ?? "there";

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-border p-6 md:p-8"
      style={{ background: "var(--gradient-card)", boxShadow: "var(--shadow-card)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--gradient-glow)" }}
      />
      <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
            <Sparkles className="h-3 w-3" /> Daily goal active
          </div>
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Welcome back, {name}.
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            You're 3 problems away from your weekly target. Let's keep the streak alive.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            className="text-primary-foreground"
            style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-elegant)" }}
          >
            Resume practice <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
          <Button variant="outline">Today's pick</Button>
        </div>
      </div>
    </div>
  );
}
