/* eslint-disable prettier/prettier */

import { useState } from "react";
import {
  Award,
  ArrowLeft,
  Check,
  ChevronRight,
  Code2,
  ExternalLink,
  Link2,
  Loader2,
  Pencil,
  RefreshCw,
  ShieldCheck,
  Trophy,
  Unlink,
  User,
  Zap,
} from "lucide-react";

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import leetcodeService from "@/services/leetcodeService";
import { useAuthStore } from "@/store/auth-store";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
});

interface LeetCodeProfile {
  valid: boolean;
  username: string;
  profileUrl: string;
  avatar?: string;
  realName?: string;
  ranking?: number;
  reputation?: number;
  starRating?: number;
}

function ProfilePage() {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);

  const [leetcode, setLeetcode] =
    useState<LeetCodeProfile | null>(null);

  const [username, setUsername] = useState("");

  const [checkingUsername, setCheckingUsername] =
    useState(false);

  const [connecting, setConnecting] =
    useState(false);

  const [disconnecting, setDisconnecting] =
    useState(false);

  const [editing, setEditing] = useState(false);

  /*
   * -------------------------------------------------------
   * VALIDATE LEETCODE USERNAME
   * -------------------------------------------------------
   *
   * Backend:
   *
   * POST http://localhost:5000/api/v1/leetcode/validate
   *
   * Service:
   *
   * leetcodeService.validateProfile(username)
   *
   */

 const validateLeetCodeUsername = async (value: string) => {
  const cleanUsername = value.trim();

  if (!cleanUsername) {
    return;
  }

  setCheckingUsername(true);

  try {
    const response =
      await leetcodeService.validateProfile(cleanUsername);

    if (!response.data?.success) {
      setLeetcode(null);

      toast.error(
        response.data?.message ||
          "LeetCode username not found."
      );

      return;
    }

    const profile = response.data.data;

    setLeetcode({
      valid: true,
      username: profile.username,
      profileUrl:
        profile.profileUrl ||
        `https://leetcode.com/u/${profile.username}`,
      avatar: profile.avatar,
      realName: profile.realName,
      ranking: profile.ranking,
      reputation: profile.reputation,
      starRating: profile.starRating,
    });

  } catch (error: any) {
    console.error(
      "LeetCode validation failed:",
      error
    );

    setLeetcode(null);

    toast.error(
      error?.response?.data?.message ||
        "Unable to verify LeetCode profile."
    );
  } finally {
    setCheckingUsername(false);
  }
};

  /*
   * -------------------------------------------------------
   * CONNECT LEETCODE
   * -------------------------------------------------------
   *
   * Validation itself is performed by the backend.
   *
   * For now, once validation succeeds, we consider
   * the profile connected in the UI.
   *
   */

  const handleConnect = async () => {
  const cleanUsername = username.trim();

  if (!cleanUsername) {
    toast.error("Enter your LeetCode username.");
    return;
  }

  setConnecting(true);

  try {
    const response =
      await leetcodeService.validateProfile(
        cleanUsername
      );

    if (!response.data?.success) {
      throw new Error(
        response.data?.message ||
          "Invalid LeetCode profile"
      );
    }

    const profile = response.data.data;

    setLeetcode({
      valid: true,
      username: profile.username,
      profileUrl:
        profile.profileUrl ||
        `https://leetcode.com/u/${profile.username}`,
      avatar: profile.avatar,
      realName: profile.realName,
      ranking: profile.ranking,
      reputation: profile.reputation,
      starRating: profile.starRating,
    });

    toast.success(
      `@${profile.username} connected successfully`
    );

  } catch (error: any) {
    console.error(
      "LeetCode connection failed:",
      error
    );

    toast.error(
      error?.response?.data?.message ||
        "LeetCode profile not found."
    );
  } finally {
    setConnecting(false);
  }
};

  /*
   * -------------------------------------------------------
   * DISCONNECT
   * -------------------------------------------------------
   *
   * IMPORTANT:
   *
   * If your backend already has:
   *
   * DELETE /api/v1/leetcode/disconnect
   *
   * create a method for it inside leetcodeService and
   * replace the code below with that service method.
   *
   */

const handleDisconnect = async () => {
  setDisconnecting(true);

  try {
    await leetcodeService.disconnectProfile();

    setLeetcode(null);
    setUsername("");

    toast.success(
      "LeetCode profile disconnected."
    );

  } catch (error: any) {
    console.error(
      "LeetCode disconnect failed:",
      error
    );

    toast.error(
      error?.response?.data?.message ||
        "Unable to disconnect LeetCode."
    );
  } finally {
    setDisconnecting(false);
  }
};

  /*
   * -------------------------------------------------------
   * REFRESH PROFILE
   * -------------------------------------------------------
   */

  const handleSync = async () => {
    if (!leetcode?.username) {
      return;
    }

    setCheckingUsername(true);

    try {
      const response =
        await leetcodeService.validateProfile(
          leetcode.username
        );

      if (!response.data?.success) {
        throw new Error(
          response.data?.message ||
            "Unable to refresh profile."
        );
      }

      const profile =
        response.data.data as LeetCodeProfile;

      if (!profile?.valid) {
        throw new Error(
          "LeetCode profile is no longer valid."
        );
      }

      setLeetcode(profile);

      toast.success(
        "LeetCode profile refreshed."
      );

    } catch (error: any) {
      console.error(
        "LeetCode refresh failed:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to refresh LeetCode profile."
      );
    } finally {
      setCheckingUsername(false);
    }
  };

  /*
   * -------------------------------------------------------
   * PROFILE EDIT
   * -------------------------------------------------------
   */

  const handleEditProfile = () => {
    setEditing((previous) => !previous);
  };

  /*
   * -------------------------------------------------------
   * INITIALS
   * -------------------------------------------------------
   */

  const initials = (
    user?.name || "User"
  )
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050608] text-white">

      {/* =====================================================
          AMBIENT BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute -left-52 -top-52 h-[550px] w-[550px] animate-pulse rounded-full bg-violet-600/[0.10] blur-[150px]" />

      <div className="pointer-events-none absolute right-[-220px] top-[20%] h-[500px] w-[500px] animate-pulse rounded-full bg-blue-600/[0.08] blur-[160px]" />

      <div className="pointer-events-none absolute bottom-[-250px] left-[35%] h-[450px] w-[450px] rounded-full bg-indigo-600/[0.07] blur-[150px]" />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 py-8 md:px-8">

        {/* =====================================================
            TOP BAR
        ===================================================== */}

        <div className="mb-8 flex items-center justify-between">

          <Button
            variant="ghost"
            onClick={() =>
              navigate({
                to: "/dashboard",
              })
            }
            className="gap-2 text-muted-foreground transition-all hover:bg-white/[0.05] hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Dashboard
          </Button>

          <div className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.035] px-3 py-1.5 text-xs text-muted-foreground backdrop-blur-xl">
            <User className="h-3.5 w-3.5 text-violet-400" />
            Profile
          </div>

        </div>

        {/* =====================================================
            PROFILE CARD
        ===================================================== */}

        <section className="mb-8">

          <Card className="overflow-hidden border-white/[0.08] bg-gradient-to-br from-white/[0.055] via-white/[0.025] to-violet-500/[0.035] shadow-2xl shadow-black/30 backdrop-blur-xl">

            <CardContent className="p-6 md:p-7">

              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex items-center gap-4">

                  {/* INITIALS */}

                  <div className="relative">

                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-400/20 bg-gradient-to-br from-violet-500/20 to-blue-500/10 text-lg font-semibold text-violet-300 shadow-lg shadow-violet-950/20">
                      {initials}
                    </div>

                    <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#090a0d] bg-emerald-500">
                      <Check className="h-3 w-3 text-white" />
                    </div>

                  </div>

                  <div>

                    <div className="flex items-center gap-2">

                      <h1 className="text-xl font-semibold md:text-2xl">
                        {user?.name ||
                          "Your Profile"}
                      </h1>

                      <ShieldCheck className="h-4 w-4 text-emerald-400" />

                    </div>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {user?.email ||
                        "No email available"}
                    </p>

                    <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">

                      <Code2 className="h-3.5 w-3.5" />

                      Software Engineer

                    </div>

                  </div>

                </div>

                <Button
                  variant="outline"
                  onClick={handleEditProfile}
                  className="border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
                >
                  <Pencil className="mr-2 h-3.5 w-3.5" />

                  {editing
                    ? "Done"
                    : "Edit Profile"}
                </Button>

              </div>

            </CardContent>

          </Card>

        </section>

        {/* =====================================================
            CODING PROFILES
        ===================================================== */}

        <section className="mb-10">

          <div className="mb-4">

            <h2 className="text-lg font-semibold">
              Coding Profiles
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Connect your coding platforms to personalize
              your AlgoForge preparation.
            </p>

          </div>

          <Card className="border-yellow-400/[0.08] bg-gradient-to-br from-yellow-500/[0.035] via-white/[0.025] to-transparent shadow-xl shadow-black/20 backdrop-blur-xl">

            <CardContent className="p-5 md:p-6">

              <div className="flex flex-col gap-5">

                {/* HEADER */}

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-4">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-yellow-400/10 bg-yellow-500/[0.08] text-xl">
                      🟨
                    </div>

                    <div>

                      <div className="flex items-center gap-2">

                        <h3 className="font-semibold">
                          LeetCode
                        </h3>

                        {leetcode?.valid && (
                          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/15 bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-400 animate-in fade-in zoom-in">
                            <Check className="h-2.5 w-2.5" />
                            Verified
                          </span>
                        )}

                      </div>

                      <p className="mt-1 text-xs text-muted-foreground">
                        Import your coding activity and
                        strengthen your interview insights.
                      </p>

                    </div>

                  </div>

                </div>

                {/* =================================================
                    INPUT
                ================================================= */}

                <div>

                  <label className="text-xs font-medium text-white/80">
                    LeetCode username
                  </label>

                  <div className="mt-2 flex flex-col gap-2 sm:flex-row">

                    <div className="relative flex-1">

                      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                        leetcode.com/u/
                      </span>

                      <input
                        value={username}
                        onChange={(event) => {
                          setUsername(
                            event.target.value
                          );

                          setLeetcode(null);
                        }}
                        onBlur={() =>
                          validateLeetCodeUsername(
                            username
                          )
                        }
                        placeholder="Souvik34"
                        className={`h-11 w-full rounded-xl border bg-black/30 pl-[108px] pr-10 text-sm outline-none transition-all duration-300 ${
                          leetcode?.valid
                            ? "border-emerald-400/40 shadow-[0_0_20px_rgba(16,185,129,0.08)]"
                            : "border-white/10 focus:border-violet-400/40 focus:bg-black/40"
                        }`}
                      />

                      {/* CHECK ANIMATION */}

                      <div className="absolute right-3 top-1/2 -translate-y-1/2">

                        {checkingUsername ? (

                          <Loader2 className="h-4 w-4 animate-spin text-violet-400" />

                        ) : leetcode?.valid ? (

                          <div className="flex h-5 w-5 animate-in zoom-in items-center justify-center rounded-full bg-emerald-500">
                            <Check className="h-3 w-3 text-white" />
                          </div>

                        ) : null}

                      </div>

                    </div>

                    {!leetcode?.valid ? (

                      <Button
                        onClick={() =>
                          validateLeetCodeUsername(
                            username
                          )
                        }
                        disabled={
                          checkingUsername ||
                          !username.trim()
                        }
                        className="h-11 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600"
                      >
                        {checkingUsername ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Link2 className="mr-2 h-4 w-4" />
                        )}

                        Verify
                      </Button>

                    ) : (

                      <Button
                        onClick={handleConnect}
                        disabled={connecting}
                        className="h-11 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600"
                      >
                        {connecting ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Check className="mr-2 h-4 w-4" />
                        )}

                        Connect
                      </Button>

                    )}

                  </div>

                  {/* URL PREVIEW */}

                  {leetcode?.valid && (

                    <div className="mt-3 flex animate-in fade-in slide-in-from-top-1 items-center justify-between rounded-xl border border-emerald-400/[0.08] bg-emerald-500/[0.035] px-3 py-2">

                      <div className="flex min-w-0 items-center gap-2">

                        <ExternalLink className="h-3.5 w-3.5 shrink-0 text-emerald-400" />

                        <span className="truncate text-xs text-muted-foreground">
                          {leetcode.profileUrl}
                        </span>

                      </div>

                      <button
                        onClick={() =>
                          window.open(
                            leetcode.profileUrl,
                            "_blank",
                            "noopener,noreferrer"
                          )
                        }
                        className="ml-3 shrink-0 text-xs text-emerald-400 transition hover:text-emerald-300"
                      >
                        View
                      </button>

                    </div>

                  )}

                </div>

                {/* =================================================
                    CONNECTED ACTIONS
                ================================================= */}

                {leetcode?.valid && (

                  <div className="flex flex-wrap items-center gap-2 border-t border-white/[0.06] pt-4">

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleSync}
                      disabled={checkingUsername}
                      className="border-white/10 bg-white/[0.025] hover:bg-white/[0.06]"
                    >
                      {checkingUsername ? (
                        <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <RefreshCw className="mr-2 h-3.5 w-3.5" />
                      )}

                      Refresh profile
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleDisconnect}
                      disabled={disconnecting}
                      className="text-muted-foreground hover:bg-red-500/10 hover:text-red-400"
                    >
                      {disconnecting ? (
                        <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Unlink className="mr-2 h-3.5 w-3.5" />
                      )}

                      Disconnect
                    </Button>

                  </div>

                )}

              </div>

            </CardContent>

          </Card>

        </section>

        {/* =====================================================
            VERIFIED PROFILE PREVIEW
        ===================================================== */}

        {leetcode?.valid && (

          <section className="mb-10 animate-in fade-in slide-in-from-bottom-2 duration-500">

            <div className="mb-4">

              <h2 className="text-lg font-semibold">
                LeetCode Profile
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Information currently available from your public profile.
              </p>

            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

              <MiniProfileCard
                icon={User}
                label="Username"
                value={`@${leetcode.username}`}
              />

              <MiniProfileCard
                icon={Trophy}
                label="Ranking"
                value={
                  leetcode.ranking
                    ? `#${leetcode.ranking.toLocaleString()}`
                    : "—"
                }
              />

              <MiniProfileCard
                icon={Zap}
                label="Reputation"
                value={
                  leetcode.reputation ??
                  "—"
                }
              />

              <MiniProfileCard
                icon={Award}
                label="Rating"
                value={
                  leetcode.starRating ??
                  "—"
                }
              />

            </div>

          </section>

        )}

        {/* =====================================================
            COMING NEXT
        ===================================================== */}

        {leetcode?.valid && (

          <section className="pb-10">

            <Card className="border-violet-400/[0.08] bg-gradient-to-br from-violet-500/[0.06] via-white/[0.025] to-blue-500/[0.035] shadow-xl shadow-black/20">

              <CardContent className="p-6">

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                  <div>

                    <div className="flex items-center gap-2">

                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/10">
                        <Code2 className="h-4 w-4 text-violet-400" />
                      </div>

                      <h3 className="font-semibold">
                        AlgoForge × LeetCode
                      </h3>

                    </div>

                    <p className="mt-3 max-w-2xl text-xs leading-5 text-muted-foreground">
                      Once activity syncing is enabled, AlgoForge
                      will use your LeetCode solving history to
                      understand your strengths, weak topics and
                      preparation progress.
                    </p>

                  </div>

                  <Button
                    variant="outline"
                    onClick={() =>
                      navigate({
                        to: "/dashboard",
                      })
                    }
                    className="shrink-0 border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
                  >
                    Dashboard

                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>

                </div>

              </CardContent>

            </Card>

          </section>

        )}

      </div>
    </div>
  );
}

/* ============================================================
   MINI PROFILE CARD
============================================================ */

function MiniProfileCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
}) {
  return (
    <Card className="group border-white/[0.07] bg-white/[0.025] transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-400/[0.15] hover:bg-white/[0.045]">

      <CardContent className="p-4">

        <div className="flex items-center gap-3">

          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/[0.08] transition-transform duration-300 group-hover:scale-105">
            <Icon className="h-4 w-4 text-violet-400" />
          </div>

          <div className="min-w-0">

            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
              {label}
            </p>

            <p className="mt-1 truncate text-sm font-semibold">
              {value}
            </p>

          </div>

        </div>

      </CardContent>

    </Card>
  );
}