/* eslint-disable prettier/prettier */

import { useEffect, useMemo, useState } from "react";
import {
  Award,
  ArrowLeft,
  Check,
  ChevronRight,
  Code2,
  ExternalLink,
  Flame,
  Link2,
  Loader2,
  RefreshCw,
  ShieldCheck,
  Trophy,
  Unlink,
  User,
  Zap,
  Target,
  CalendarDays,
  Star,
  Sparkles,
  Activity,
  TrendingUp,
} from "lucide-react";

import {
  createFileRoute,
  useNavigate,
} from "@tanstack/react-router";

import { toast } from "sonner";

import leetcodeService from "@/services/leetcodeService";
import { useAuthStore } from "@/store/auth-store";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
});

/* ============================================================
   TYPES
============================================================ */

interface LeetCodeProfile {
  valid: boolean;
  username: string;
  profileUrl: string;
  avatar?: string;
  realName?: string;
  ranking?: number;
  reputation?: number;
  starRating?: number | string;
}

interface LeetCodeStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalSubmissions?: number;
  acceptanceRate?: number | string;
  contestRating?: number | string | null;
}

interface LeetCodeBadge {
  name: string;
  icon?: string;
  earned_at?: string;
}

interface LeetCodeCalendarEntry {
  activity_date: string;
  submission_count: number;
}

interface LeetCodeData {
  connection?: {
    username: string;
    connected_at?: string;
    last_synced_at?: string;
  };

  profile?: {
    username?: string;
    avatar?: string;
    real_name?: string;
    ranking?: number;
    reputation?: number;
    star_rating?: number | string;
    profile_url?: string;
  };

  stats?: {
    total_solved?: number;
    easy_solved?: number;
    medium_solved?: number;
    hard_solved?: number;
    total_submissions?: number;
    acceptance_rate?: number | string;
    contest_rating?: number | string | null;
  };

  badges?: LeetCodeBadge[];

  calendar?: LeetCodeCalendarEntry[];
}

/* ============================================================
   RESPONSE
============================================================ */

function extractData(response: any): LeetCodeData {
  return response?.data?.data || response?.data || {};
}

/* ============================================================
   APPLY BACKEND DATA
============================================================ */

function applyLeetCodeData(
  data: LeetCodeData,
  setters: {
    setLeetcode: React.Dispatch<
      React.SetStateAction<LeetCodeProfile | null>
    >;

    setStats: React.Dispatch<
      React.SetStateAction<LeetCodeStats | null>
    >;

    setBadges: React.Dispatch<
      React.SetStateAction<LeetCodeBadge[]>
    >;

    setCalendar: React.Dispatch<
      React.SetStateAction<LeetCodeCalendarEntry[]>
    >;

    setConnection: React.Dispatch<
      React.SetStateAction<LeetCodeData["connection"] | null>
    >;
  },
) {
  const {
    setLeetcode,
    setStats,
    setBadges,
    setCalendar,
    setConnection,
  } = setters;

  if (data.connection) {
    setConnection(data.connection);
  }

  const username =
    data.connection?.username || data.profile?.username;

  if (username) {
    setLeetcode({
      valid: true,
      username,
      profileUrl:
        data.profile?.profile_url ||
        `https://leetcode.com/u/${username}`,
      avatar: data.profile?.avatar,
      realName: data.profile?.real_name,
      ranking: data.profile?.ranking,
      reputation: data.profile?.reputation,
      starRating: data.profile?.star_rating,
    });
  }

  if (data.stats) {
    setStats({
      totalSolved: Number(data.stats.total_solved ?? 0),
      easySolved: Number(data.stats.easy_solved ?? 0),
      mediumSolved: Number(data.stats.medium_solved ?? 0),
      hardSolved: Number(data.stats.hard_solved ?? 0),
      totalSubmissions: Number(
        data.stats.total_submissions ?? 0,
      ),
      acceptanceRate: data.stats.acceptance_rate ?? 0,
      contestRating: data.stats.contest_rating ?? null,
    });
  }

  if (Array.isArray(data.badges)) {
    setBadges(data.badges);
  }

  if (Array.isArray(data.calendar)) {
    setCalendar(data.calendar);
  }
}

/* ============================================================
   PAGE
============================================================ */

function ProfilePage() {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);

  const [leetcode, setLeetcode] =
    useState<LeetCodeProfile | null>(null);

  const [stats, setStats] =
    useState<LeetCodeStats | null>(null);

  const [badges, setBadges] =
    useState<LeetCodeBadge[]>([]);

  const [calendar, setCalendar] =
    useState<LeetCodeCalendarEntry[]>([]);

  const [connection, setConnection] =
    useState<LeetCodeData["connection"] | null>(null);

  const [username, setUsername] = useState("");

  const [checkingUsername, setCheckingUsername] =
    useState(false);

  const [connecting, setConnecting] =
    useState(false);

  const [disconnecting, setDisconnecting] =
    useState(false);

  const [loaded, setLoaded] = useState(false);

  /* ============================================================
     LOAD
  ============================================================ */

  useEffect(() => {
    let mounted = true;

    const loadLeetCode = async () => {
      try {
        const response =
          await leetcodeService.getProfile();

        if (!mounted) return;

        const data = extractData(response);

        applyLeetCodeData(data, {
          setLeetcode,
          setStats,
          setBadges,
          setCalendar,
          setConnection,
        });

        if (data.connection?.username) {
          setUsername(data.connection.username);
        }
      } catch (error: any) {
        if (!mounted) return;

        setLeetcode(null);
        setStats(null);
        setBadges([]);
        setCalendar([]);
        setConnection(null);
      } finally {
        if (mounted) {
          setLoaded(true);
        }
      }
    };

    loadLeetCode();

    return () => {
      mounted = false;
    };
  }, []);

  /* ============================================================
     USER AVATAR
  ============================================================ */

  const userAvatar =
    (user as any)?.avatar ||
    (user as any)?.image ||
    (user as any)?.profileImage ||
    leetcode?.avatar;

  const initials = (user?.name || "User")
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  /* ============================================================
     VALIDATE
  ============================================================ */

  const validateLeetCodeUsername = async (
    value: string,
  ) => {
    const cleanUsername = value.trim();

    if (!cleanUsername) return;

    setCheckingUsername(true);

    try {
      const response =
        await leetcodeService.validateProfile(
          cleanUsername,
        );

      if (!response.data?.success) {
        setLeetcode(null);

        toast.error(
          response.data?.message ||
            "LeetCode username not found.",
        );

        return;
      }

      const profile = response.data.data;

      setLeetcode({
        valid: true,
        username:
          profile.username || cleanUsername,
        profileUrl:
          profile.profileUrl ||
          `https://leetcode.com/u/${
            profile.username || cleanUsername
          }`,
        avatar: profile.avatar,
        realName: profile.realName,
        ranking: profile.ranking,
        reputation: profile.reputation,
        starRating: profile.starRating,
      });

      toast.success(
        `@${profile.username || cleanUsername} verified`,
      );
    } catch (error: any) {
      console.error(
        "LeetCode validation failed:",
        error,
      );

      setLeetcode(null);

      toast.error(
        error?.response?.data?.message ||
          "Unable to verify LeetCode profile.",
      );
    } finally {
      setCheckingUsername(false);
    }
  };

  /* ============================================================
     CONNECT
  ============================================================ */

  const handleConnect = async () => {
    const cleanUsername = username.trim();

    if (!cleanUsername) {
      toast.error("Enter your LeetCode username.");
      return;
    }

    setConnecting(true);

    try {
      const validation =
        await leetcodeService.validateProfile(
          cleanUsername,
        );

      if (!validation.data?.success) {
        throw new Error(
          validation.data?.message ||
            "Invalid LeetCode profile.",
        );
      }

      await leetcodeService.connectProfile(
        cleanUsername,
      );

      const profileResponse =
        await leetcodeService.getProfile();

      const data = extractData(profileResponse);

      applyLeetCodeData(data, {
        setLeetcode,
        setStats,
        setBadges,
        setCalendar,
        setConnection,
      });

      setUsername(
        data.connection?.username ||
          data.profile?.username ||
          cleanUsername,
      );

      toast.success(
        `@${cleanUsername} connected successfully`,
      );
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to connect LeetCode.",
      );
    } finally {
      setConnecting(false);
    }
  };

  /* ============================================================
     DISCONNECT
  ============================================================ */

  const handleDisconnect = async () => {
    setDisconnecting(true);

    try {
      await leetcodeService.disconnectProfile();

      setLeetcode(null);
      setStats(null);
      setBadges([]);
      setCalendar([]);
      setConnection(null);
      setUsername("");

      toast.success(
        "LeetCode profile disconnected.",
      );
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Unable to disconnect LeetCode.",
      );
    } finally {
      setDisconnecting(false);
    }
  };

  /* ============================================================
     REFRESH
  ============================================================ */

  const handleSync = async () => {
    setCheckingUsername(true);

    try {
      const response =
        await leetcodeService.getProfile();

      const data = extractData(response);

      applyLeetCodeData(data, {
        setLeetcode,
        setStats,
        setBadges,
        setCalendar,
        setConnection,
      });

      if (data.connection?.username) {
        setUsername(data.connection.username);
      }

      toast.success("LeetCode data refreshed.");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Unable to refresh LeetCode data.",
      );
    } finally {
      setCheckingUsername(false);
    }
  };

  /* ============================================================
     CALENDAR STATS
  ============================================================ */

  const calendarStats = useMemo(() => {
    if (!calendar.length) {
      return {
        total: 0,
        activeDays: 0,
        bestDay: 0,
      };
    }

    const total = calendar.reduce(
      (sum, day) =>
        sum + Number(day.submission_count || 0),
      0,
    );

    const activeDays = calendar.filter(
      (day) =>
        Number(day.submission_count || 0) > 0,
    ).length;

    const bestDay = Math.max(
      ...calendar.map((day) =>
        Number(day.submission_count || 0),
      ),
    );

    return {
      total,
      activeDays,
      bestDay,
    };
  }, [calendar]);

  /* ============================================================
     RENDER
  ============================================================ */

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#040508] text-white">

      {/* ======================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        <div className="absolute -left-[15%] -top-[18%] h-[650px] w-[650px] rounded-full bg-violet-600/[0.10] blur-[180px]" />

        <div className="absolute -right-[15%] top-[15%] h-[600px] w-[600px] rounded-full bg-blue-600/[0.08] blur-[190px]" />

        <div className="absolute bottom-[-20%] left-[35%] h-[550px] w-[550px] rounded-full bg-fuchsia-500/[0.045] blur-[180px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(115deg, transparent 0%, transparent 32%, rgba(139,92,246,.4) 32.1%, transparent 32.25%, transparent 68%, rgba(59,130,246,.35) 68.1%, transparent 68.25%)",
            backgroundSize: "900px 900px",
          }}
        />

      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1380px] px-5 py-6 md:px-8 lg:px-10">

        {/* ====================================================
            TOP BAR
        ==================================================== */}

        <div className="mb-8 flex items-center justify-between">

          <Button
            variant="ghost"
            onClick={() =>
              navigate({
                to: "/dashboard",
              })
            }
            className="group gap-2 rounded-xl text-xs text-muted-foreground hover:bg-white/[0.05] hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Dashboard
          </Button>

          <div className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.035] px-3 py-1.5 text-[10px] text-muted-foreground backdrop-blur-xl">
            <Sparkles className="h-3.5 w-3.5 text-violet-400" />
            Developer Profile
          </div>

        </div>

        {/* ====================================================
            HERO PROFILE
        ==================================================== */}

        <Card className="group relative mb-6 overflow-hidden border-white/[0.08] bg-gradient-to-br from-white/[0.045] via-white/[0.025] to-violet-500/[0.025] shadow-2xl shadow-black/40 backdrop-blur-2xl">

          <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-violet-500/[0.10] blur-[100px] transition-all duration-700 group-hover:bg-violet-500/[0.15]" />

          <div className="pointer-events-none absolute bottom-[-100px] left-[30%] h-52 w-52 rounded-full bg-blue-500/[0.06] blur-[90px]" />

          <CardContent className="relative p-6 md:p-8">

            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

              <div className="flex items-center gap-5">

                {/* AVATAR */}

                <div className="relative shrink-0">

                  <div className="h-[78px] w-[78px] overflow-hidden rounded-[24px] border border-white/10 bg-gradient-to-br from-violet-500/20 via-blue-500/10 to-white/[0.03] p-[2px] shadow-xl shadow-violet-950/20">

                    <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-[22px] bg-[#0a0b10]">

                      {userAvatar ? (
                        <img
                          src={userAvatar}
                          alt={user?.name || "Profile"}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="text-xl font-semibold text-violet-300">
                          {initials}
                        </span>
                      )}

                    </div>

                  </div>

                  <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-[3px] border-[#07080b] bg-emerald-500 shadow-lg shadow-emerald-500/30">

                    <Check className="h-3 w-3 text-white" />

                  </div>

                </div>

                <div>

                  <div className="flex flex-wrap items-center gap-2">

                    <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
                      {user?.name || "Your Profile"}
                    </h1>

                    <ShieldCheck className="h-4 w-4 text-emerald-400" />

                  </div>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {user?.email || "Developer profile"}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-2">

                    <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-400/10 bg-violet-500/[0.08] px-2.5 py-1 text-[10px] text-violet-300">

                      <Code2 className="h-3 w-3" />

                      Software Engineer

                    </span>

                    {leetcode?.valid && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-yellow-400/10 bg-yellow-500/[0.06] px-2.5 py-1 text-[10px] text-yellow-300">

                        <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />

                        LeetCode connected

                      </span>
                    )}

                  </div>

                </div>

              </div>

              {/* PROFILE SUMMARY */}

              {leetcode?.valid && (
                <div className="grid grid-cols-3 gap-2">

                  <MiniMetric
                    label="Solved"
                    value={stats?.totalSolved ?? 0}
                  />

                  <MiniMetric
                    label="Rating"
                    value={
                      stats?.contestRating
                        ? Number(
                            stats.contestRating,
                          ).toFixed(0)
                        : "—"
                    }
                  />

                  <MiniMetric
                    label="Streak"
                    value={`${calendarStats.activeDays}d`}
                  />

                </div>
              )}

            </div>

          </CardContent>

        </Card>

        {/* ====================================================
            LEETCODE CONNECTION
        ==================================================== */}

        <Card className="mb-6 overflow-hidden border-yellow-400/[0.09] bg-gradient-to-br from-yellow-500/[0.035] via-white/[0.02] to-transparent shadow-xl shadow-black/30 backdrop-blur-2xl">

          <CardContent className="p-6 md:p-7">

            <div className="flex flex-col gap-5">

              {/* HEADER */}

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-yellow-400/10 bg-yellow-500/[0.08] shadow-lg shadow-yellow-900/10">

                    <span className="text-xl">
                      🟨
                    </span>

                  </div>

                  <div>

                    <div className="flex items-center gap-2">

                      <h2 className="text-lg font-semibold">
                        LeetCode
                      </h2>

                      {leetcode?.valid && (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/15 bg-emerald-500/10 px-2 py-0.5 text-[9px] font-medium text-emerald-400">

                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />

                          Connected

                        </span>
                      )}

                    </div>

                    <p className="mt-1 text-[11px] text-muted-foreground">
                      {leetcode?.valid
                        ? "Your coding activity is synced with Dykstra."
                        : "Connect your profile to import coding progress."}
                    </p>

                  </div>

                </div>

                {leetcode?.valid && (
                  <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">

                    <CalendarDays className="h-3.5 w-3.5 text-yellow-400/70" />

                    {connection?.last_synced_at
                      ? `Synced ${new Date(
                          connection.last_synced_at,
                        ).toLocaleDateString()}`
                      : "Synced"}

                  </div>
                )}

              </div>

              {/* INPUT */}

              {!leetcode?.valid && (
                <div className="rounded-2xl border border-white/[0.06] bg-black/20 p-4">

                  <label className="text-[11px] font-medium text-white/75">
                    LeetCode username
                  </label>

                  <div className="mt-2 flex flex-col gap-2 sm:flex-row">

                    <div className="relative flex-1">

                      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                        leetcode.com/u/
                      </span>

                      <input
                        value={username}
                        onChange={(event) => {
                          setUsername(
                            event.target.value,
                          );
                          setLeetcode(null);
                        }}
                        onBlur={() =>
                          validateLeetCodeUsername(
                            username,
                          )
                        }
                        className="h-11 w-full rounded-xl border border-white/10 bg-black/40 pl-[106px] pr-10 text-xs outline-none transition-all placeholder:text-muted-foreground/50 focus:border-violet-400/40 focus:ring-2 focus:ring-violet-500/[0.08]"
                        placeholder="username"
                      />

                      {checkingUsername && (
                        <Loader2 className="absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 animate-spin text-violet-400" />
                      )}

                    </div>

                    <Button
                      onClick={() =>
                        validateLeetCodeUsername(
                          username,
                        )
                      }
                      disabled={
                        checkingUsername ||
                        !username.trim()
                      }
                      className="h-11 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-7 text-xs shadow-lg shadow-violet-900/20"
                    >
                      {checkingUsername ? (
                        <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Link2 className="mr-2 h-3.5 w-3.5" />
                      )}

                      Verify
                    </Button>

                  </div>

                </div>
              )}

              {/* CONNECTED */}

              {leetcode?.valid && (
                <div className="flex flex-col gap-4 rounded-2xl border border-white/[0.06] bg-black/25 p-4 sm:flex-row sm:items-center sm:justify-between">

                  <div className="flex items-center gap-3">

                    <div className="h-12 w-12 overflow-hidden rounded-xl border border-white/10 bg-white/[0.04]">

                      {leetcode.avatar ? (
                        <img
                          src={leetcode.avatar}
                          alt={leetcode.username}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <User className="h-5 w-5 text-violet-400" />
                        </div>
                      )}

                    </div>

                    <div>

                      <div className="flex items-center gap-1.5">

                        <p className="text-sm font-semibold">
                          {leetcode.realName ||
                            leetcode.username}
                        </p>

                        <Check className="h-3.5 w-3.5 text-emerald-400" />

                      </div>

                      <p className="mt-0.5 text-[10px] text-muted-foreground">
                        @{leetcode.username}
                      </p>

                    </div>

                  </div>

                  <div className="flex flex-wrap gap-2">

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        window.open(
                          leetcode.profileUrl,
                          "_blank",
                          "noopener,noreferrer",
                        )
                      }
                      className="h-9 rounded-xl border-white/10 bg-white/[0.025] text-[10px] hover:bg-white/[0.06]"
                    >
                      <ExternalLink className="mr-1.5 h-3 w-3" />
                      Profile
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleSync}
                      disabled={checkingUsername}
                      className="h-9 rounded-xl border-white/10 bg-white/[0.025] text-[10px] hover:bg-white/[0.06]"
                    >
                      {checkingUsername ? (
                        <Loader2 className="mr-1.5 h-3 w-3 animate-spin" />
                      ) : (
                        <RefreshCw className="mr-1.5 h-3 w-3" />
                      )}
                      Refresh
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleDisconnect}
                      disabled={disconnecting}
                      className="h-9 rounded-xl text-[10px] text-muted-foreground hover:bg-red-500/10 hover:text-red-400"
                    >
                      {disconnecting ? (
                        <Loader2 className="mr-1.5 h-3 w-3 animate-spin" />
                      ) : (
                        <Unlink className="mr-1.5 h-3 w-3" />
                      )}
                      Disconnect
                    </Button>

                  </div>

                </div>
              )}

              {leetcode?.valid && !connection && (
                <div className="border-t border-white/[0.05] pt-4">

                  <Button
                    onClick={handleConnect}
                    disabled={connecting}
                    className="h-10 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-xs"
                  >
                    {connecting ? (
                      <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Link2 className="mr-2 h-3.5 w-3.5" />
                    )}

                    Connect LeetCode
                  </Button>

                </div>
              )}

            </div>

          </CardContent>

        </Card>

        {/* ====================================================
            LEETCODE DASHBOARD
        ==================================================== */}

        {leetcode?.valid && (
          <div className="animate-in fade-in slide-in-from-bottom-3 duration-700">

            {/* ==================================================
                MAIN STATS
            ================================================== */}

            <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">

              <StatCard
                icon={Code2}
                label="Problems Solved"
                value={stats?.totalSolved ?? 0}
                accent="violet"
              />

              <StatCard
                icon={Target}
                label="Easy"
                value={stats?.easySolved ?? 0}
                accent="emerald"
              />

              <StatCard
                icon={Flame}
                label="Medium"
                value={stats?.mediumSolved ?? 0}
                accent="orange"
              />

              <StatCard
                icon={Trophy}
                label="Hard"
                value={stats?.hardSolved ?? 0}
                accent="red"
              />

            </div>

            {/* ==================================================
                PROFILE + RATING
            ================================================== */}

            <div className="mb-6 grid grid-cols-1 gap-5 xl:grid-cols-[1.4fr_0.6fr]">

              {/* PROFILE */}

              <Card className="overflow-hidden border-white/[0.08] bg-white/[0.025] shadow-xl shadow-black/25">

                <CardContent className="p-6 md:p-7">

                  <div className="mb-6 flex items-center justify-between">

                    <div>

                      <div className="flex items-center gap-2">

                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/[0.09]">

                          <User className="h-4 w-4 text-violet-400" />

                        </div>

                        <div>

                          <h2 className="text-base font-semibold">
                            LeetCode Identity
                          </h2>

                          <p className="mt-0.5 text-[10px] text-muted-foreground">
                            Your public coding profile
                          </p>

                        </div>

                      </div>

                    </div>

                    <ShieldCheck className="h-5 w-5 text-emerald-400" />

                  </div>

                  <div className="grid grid-cols-2 gap-3 md:grid-cols-4">

                    <ProfileMetric
                      label="Username"
                      value={`@${leetcode.username}`}
                    />

                    <ProfileMetric
                      label="Ranking"
                      value={
                        leetcode.ranking
                          ? `#${leetcode.ranking.toLocaleString()}`
                          : "—"
                      }
                    />

                    <ProfileMetric
                      label="Reputation"
                      value={
                        leetcode.reputation ??
                        "—"
                      }
                    />

                    <ProfileMetric
                      label="Stars"
                      value={
                        leetcode.starRating ??
                        "—"
                      }
                    />

                  </div>

                </CardContent>

              </Card>

              {/* PERFORMANCE */}

              <Card className="overflow-hidden border-blue-400/[0.08] bg-gradient-to-br from-blue-500/[0.045] via-white/[0.02] to-transparent shadow-xl shadow-black/25">

                <CardContent className="p-6 md:p-7">

                  <div className="mb-6">

                    <div className="flex items-center gap-2">

                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/[0.09]">

                        <TrendingUp className="h-4 w-4 text-blue-400" />

                      </div>

                      <div>

                        <h2 className="text-base font-semibold">
                          Performance
                        </h2>

                        <p className="mt-0.5 text-[10px] text-muted-foreground">
                          Competitive profile
                        </p>

                      </div>

                    </div>

                  </div>

                  <div className="grid grid-cols-2 gap-3">

                    <PerformanceMetric
                      icon={Star}
                      label="Contest Rating"
                      value={
                        stats?.contestRating
                          ? Number(
                              stats.contestRating,
                            ).toFixed(0)
                          : "—"
                      }
                    />

                    <PerformanceMetric
                      icon={Zap}
                      label="Acceptance"
                      value={
                        stats?.acceptanceRate !==
                        undefined
                          ? `${Number(
                              stats.acceptanceRate,
                            ).toFixed(1)}%`
                          : "—"
                      }
                    />

                    <PerformanceMetric
                      icon={Activity}
                      label="Active Days"
                      value={
                        calendarStats.activeDays
                      }
                    />

                    <PerformanceMetric
                      icon={Flame}
                      label="Best Day"
                      value={
                        calendarStats.bestDay
                      }
                    />

                  </div>

                </CardContent>

              </Card>

            </div>

            {/* ==================================================
                SOLVING BREAKDOWN
            ================================================== */}

            <Card className="mb-6 overflow-hidden border-white/[0.08] bg-white/[0.025] shadow-xl shadow-black/25">

              <CardContent className="p-6 md:p-7">

                <div className="mb-7 flex items-center justify-between">

                  <div>

                    <div className="flex items-center gap-2">

                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/[0.08]">

                        <Target className="h-4 w-4 text-emerald-400" />

                      </div>

                      <div>

                        <h2 className="text-base font-semibold">
                          Solving Profile
                        </h2>

                        <p className="mt-0.5 text-[10px] text-muted-foreground">
                          How your solved problems are distributed
                        </p>

                      </div>

                    </div>

                  </div>

                  <span className="rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-1 text-[10px] text-muted-foreground">
                    {stats?.totalSolved ?? 0} total
                  </span>

                </div>

                <DifficultyRow
                  label="Easy"
                  value={stats?.easySolved ?? 0}
                  total={stats?.totalSolved ?? 0}
                  accent="emerald"
                />

                <DifficultyRow
                  label="Medium"
                  value={stats?.mediumSolved ?? 0}
                  total={stats?.totalSolved ?? 0}
                  accent="orange"
                />

                <DifficultyRow
                  label="Hard"
                  value={stats?.hardSolved ?? 0}
                  total={stats?.totalSolved ?? 0}
                  accent="red"
                />

              </CardContent>

            </Card>

            {/* ==================================================
                HEATMAP
            ================================================== */}

            <Card className="mb-6 overflow-hidden border-emerald-400/[0.08] bg-gradient-to-br from-emerald-500/[0.025] via-white/[0.018] to-transparent shadow-xl shadow-black/25">

              <CardContent className="p-6 md:p-7">

                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

                  <div>

                    <div className="flex items-center gap-2">

                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/[0.09]">

                        <Flame className="h-4 w-4 text-orange-400" />

                      </div>

                      <div>

                        <h2 className="text-base font-semibold">
                          Coding Activity
                        </h2>

                        <p className="mt-0.5 text-[10px] text-muted-foreground">
                          Your LeetCode activity across the year
                        </p>

                      </div>

                    </div>

                  </div>

                  <div className="flex items-center gap-4 text-[10px]">

                    <span className="text-muted-foreground">
                      <strong className="text-white">
                        {calendarStats.total}
                      </strong>{" "}
                      submissions
                    </span>

                    <span className="text-muted-foreground">
                      <strong className="text-white">
                        {calendarStats.activeDays}
                      </strong>{" "}
                      active days
                    </span>

                  </div>

                </div>

                <LeetCodeHeatmap
                  calendar={calendar}
                />

              </CardContent>

            </Card>

            {/* ==================================================
                BADGES
            ================================================== */}

            <Card className="mb-8 overflow-hidden border-yellow-400/[0.08] bg-gradient-to-br from-yellow-500/[0.025] via-white/[0.018] to-transparent shadow-xl shadow-black/25">

              <CardContent className="p-6 md:p-7">

                <div className="mb-7 flex items-center justify-between">

                  <div>

                    <div className="flex items-center gap-2">

                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-yellow-500/[0.08]">

                        <Award className="h-4 w-4 text-yellow-400" />

                      </div>

                      <div>

                        <h2 className="text-base font-semibold">
                          Achievements
                        </h2>

                        <p className="mt-0.5 text-[10px] text-muted-foreground">
                          Milestones earned on LeetCode
                        </p>

                      </div>

                    </div>

                  </div>

                  <span className="rounded-full border border-yellow-400/10 bg-yellow-500/[0.06] px-3 py-1 text-[10px] text-yellow-300/80">
                    {badges.length} badges
                  </span>

                </div>

                {badges.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">

                    {badges.map(
                      (badge, index) => (
                        <BadgeCard
                          key={`${badge.name}-${badge.earned_at}-${index}`}
                          badge={badge}
                          index={index}
                        />
                      ),
                    )}

                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed border-white/[0.08] py-14 text-center">

                    <Award className="mx-auto mb-3 h-7 w-7 text-muted-foreground/25" />

                    <p className="text-xs text-muted-foreground">
                      No badges found.
                    </p>

                  </div>
                )}

              </CardContent>

            </Card>

            {/* ==================================================
                FOOTER
            ================================================== */}

            <Card className="mb-10 overflow-hidden border-violet-400/[0.08] bg-gradient-to-r from-violet-500/[0.045] via-white/[0.018] to-blue-500/[0.035]">

              <CardContent className="p-6">

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                  <div className="flex items-start gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/[0.09]">

                      <Sparkles className="h-4 w-4 text-violet-400" />

                    </div>

                    <div>

                      <h3 className="text-sm font-semibold">
                        Dykstra × LeetCode
                      </h3>

                      <p className="mt-1 max-w-2xl text-[10px] leading-5 text-muted-foreground">
                        Your coding profile is connected and available
                        for progress analysis and future recommendations.
                      </p>

                    </div>

                  </div>

                  <Button
                    variant="outline"
                    onClick={() =>
                      navigate({
                        to: "/dashboard",
                      })
                    }
                    className="h-9 shrink-0 rounded-xl border-white/10 bg-white/[0.03] text-xs"
                  >
                    Dashboard
                    <ChevronRight className="ml-1.5 h-3.5 w-3.5" />
                  </Button>

                </div>

              </CardContent>

            </Card>

          </div>
        )}

        {/* ====================================================
            EMPTY
        ==================================================== */}

        {!leetcode?.valid && loaded && (
          <Card className="border-white/[0.08] bg-white/[0.025] shadow-xl shadow-black/30">

            <CardContent className="flex flex-col items-center justify-center px-6 py-24 text-center">

              <div className="relative mb-6">

                <div className="absolute inset-0 rounded-3xl bg-violet-500/10 blur-2xl" />

                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-400/10 bg-violet-500/[0.07]">

                  <Code2 className="h-7 w-7 text-violet-400" />

                </div>

              </div>

              <h2 className="text-lg font-semibold">
                Connect your LeetCode profile
              </h2>

              <p className="mt-2 max-w-md text-xs leading-6 text-muted-foreground">
                Bring your solving history, statistics,
                achievements and activity into Dykstra.
              </p>

            </CardContent>

          </Card>
        )}

      </div>
    </div>
  );
}

/* ============================================================
   MINI METRIC
============================================================ */

function MiniMetric({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="min-w-[78px] rounded-xl border border-white/[0.07] bg-black/20 px-3 py-2.5 text-center">

      <p className="text-[8px] uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold">
        {value}
      </p>

    </div>
  );
}

/* ============================================================
   STAT CARD
============================================================ */

function StatCard({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  accent: "violet" | "emerald" | "orange" | "red";
}) {
  const accents = {
    violet: {
      bg: "bg-violet-500/[0.08]",
      icon: "text-violet-400",
      glow: "group-hover:bg-violet-500/[0.13]",
      border: "group-hover:border-violet-400/20",
    },
    emerald: {
      bg: "bg-emerald-500/[0.08]",
      icon: "text-emerald-400",
      glow: "group-hover:bg-emerald-500/[0.13]",
      border: "group-hover:border-emerald-400/20",
    },
    orange: {
      bg: "bg-orange-500/[0.08]",
      icon: "text-orange-400",
      glow: "group-hover:bg-orange-500/[0.13]",
      border: "group-hover:border-orange-400/20",
    },
    red: {
      bg: "bg-red-500/[0.08]",
      icon: "text-red-400",
      glow: "group-hover:bg-red-500/[0.13]",
      border: "group-hover:border-red-400/20",
    },
  };

  const style = accents[accent];

  return (
    <Card
      className={`group relative overflow-hidden border-white/[0.08] bg-white/[0.025] transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.04] ${style.border}`}
    >

      <div
        className={`absolute -right-8 -top-8 h-24 w-24 rounded-full blur-2xl transition-all duration-500 ${style.glow}`}
      />

      <CardContent className="relative p-5 md:p-6">

        <div className="flex items-center justify-between gap-4">

          <div>

            <p className="text-[10px] text-muted-foreground">
              {label}
            </p>

            <p className="mt-1.5 text-2xl font-semibold tracking-tight md:text-3xl">
              {value}
            </p>

          </div>

          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${style.bg}`}
          >

            <Icon
              className={`h-5 w-5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 ${style.icon}`}
            />

          </div>

        </div>

      </CardContent>

    </Card>
  );
}

/* ============================================================
   PERFORMANCE
============================================================ */

function PerformanceMetric({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-black/20 p-3.5 transition-all duration-300 hover:border-blue-400/15 hover:bg-white/[0.025]">

      <div className="flex items-center gap-2">

        <Icon className="h-3.5 w-3.5 text-blue-400" />

        <span className="text-[9px] uppercase tracking-[0.1em] text-muted-foreground">
          {label}
        </span>

      </div>

      <p className="mt-2 text-lg font-semibold">
        {value}
      </p>

    </div>
  );
}

/* ============================================================
   PROFILE METRIC
============================================================ */

function ProfileMetric({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-xl border border-white/[0.055] bg-black/20 p-4 transition-all duration-300 hover:border-violet-400/[0.16] hover:bg-white/[0.025]">

      <p className="text-[8px] uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </p>

      <p className="mt-2 truncate text-xs font-semibold">
        {value}
      </p>

    </div>
  );
}

/* ============================================================
   DIFFICULTY
============================================================ */

function DifficultyRow({
  label,
  value,
  total,
  accent,
}: {
  label: string;
  value: number;
  total: number;
  accent: "emerald" | "orange" | "red";
}) {
  const percentage =
    total > 0
      ? Math.round((value / total) * 100)
      : 0;

  const colors = {
    emerald: {
      bar: "bg-emerald-400",
      text: "text-emerald-400",
    },
    orange: {
      bar: "bg-orange-400",
      text: "text-orange-400",
    },
    red: {
      bar: "bg-red-400",
      text: "text-red-400",
    },
  };

  const color = colors[accent];

  return (
    <div className="mb-6 last:mb-0">

      <div className="mb-2 flex items-center justify-between">

        <div className="flex items-center gap-2">

          <span
            className={`h-2 w-2 rounded-full ${color.bar}`}
          />

          <span className="text-xs text-muted-foreground">
            {label}
          </span>

        </div>

        <span className="text-xs font-medium">

          {value}

          <span
            className={`ml-2 ${color.text}`}
          >
            {percentage}%
          </span>

        </span>

      </div>

      <div className="h-2 overflow-hidden rounded-full bg-white/[0.055]">

        <div
          className={`h-full rounded-full transition-all duration-1000 ${color.bar}`}
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

    </div>
  );
}

/* ============================================================
   BADGE
============================================================ */

function BadgeCard({
  badge,
  index,
}: {
  badge: LeetCodeBadge;
  index: number;
}) {
  return (
    <div
      className="group relative min-h-[150px] overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.045] to-black/25 p-4 text-center transition-all duration-500 hover:-translate-y-1.5 hover:border-yellow-400/20 hover:shadow-xl hover:shadow-yellow-500/[0.07]"
      style={{
        animationDelay: `${index * 40}ms`,
      }}
    >

      <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-yellow-400/[0.08] blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent transition-transform duration-700 group-hover:translate-x-full" />

      <div className="relative flex h-full flex-col items-center justify-center">

        {badge.icon ? (
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.05] bg-black/20">

            <img
              src={badge.icon}
              alt={badge.name}
              className="h-11 w-11 object-contain drop-shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3"
            />

          </div>
        ) : (
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-500/[0.08]">

            <Award className="h-6 w-6 text-yellow-400 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12" />

          </div>
        )}

        <p className="line-clamp-2 text-[10px] font-medium leading-4">
          {badge.name}
        </p>

        {badge.earned_at && (
          <p className="mt-1.5 text-[8px] text-muted-foreground/60">
            {new Date(
              badge.earned_at,
            ).toLocaleDateString(undefined, {
              month: "short",
              year: "numeric",
            })}
          </p>
        )}

      </div>

    </div>
  );
}

/* ============================================================
   HEATMAP
============================================================ */

function LeetCodeHeatmap({
  calendar,
}: {
  calendar: LeetCodeCalendarEntry[];
}) {
  const map = useMemo(() => {
    const result = new Map<string, number>();

    calendar.forEach((entry) => {
      const rawDate = new Date(
        entry.activity_date,
      );

      if (Number.isNaN(rawDate.getTime())) {
        return;
      }

      const date = rawDate
        .toISOString()
        .split("T")[0];

      result.set(
        date,
        Number(entry.submission_count || 0),
      );
    });

    return result;
  }, [calendar]);

  const weeks = useMemo(() => {
    const today = new Date();

    const end = new Date(today);

    end.setDate(
      end.getDate() +
        (6 - end.getDay()),
    );

    const start = new Date(end);

    start.setDate(
      start.getDate() - 364,
    );

    start.setDate(
      start.getDate() -
        start.getDay(),
    );

    const result: {
      date: string;
      count: number;
    }[][] = [];

    let cursor = new Date(start);

    while (cursor <= end) {
      const week: {
        date: string;
        count: number;
      }[] = [];

      for (let day = 0; day < 7; day++) {
        const date = new Date(cursor);

        const key = date
          .toISOString()
          .split("T")[0];

        week.push({
          date: key,
          count: map.get(key) || 0,
        });

        cursor.setDate(
          cursor.getDate() + 1,
        );
      }

      result.push(week);
    }

    return result;
  }, [map]);

  const getLevel = (count: number) => {
    if (count === 0) return 0;
    if (count <= 1) return 1;
    if (count <= 3) return 2;
    if (count <= 6) return 3;
    return 4;
  };

  const getCellClass = (level: number) => {
    switch (level) {
      case 1:
        return "bg-emerald-500/20";
      case 2:
        return "bg-emerald-500/40";
      case 3:
        return "bg-emerald-500/65";
      case 4:
        return "bg-emerald-400";
      default:
        return "bg-white/[0.045]";
    }
  };

  const monthLabels = useMemo(() => {
    const labels: {
      label: string;
      week: number;
    }[] = [];

    let lastMonth = "";

    weeks.forEach((week, weekIndex) => {
      const first = new Date(
        week[0].date,
      );

      const month =
        first.toLocaleDateString(
          undefined,
          {
            month: "short",
          },
        );

      if (month !== lastMonth) {
        labels.push({
          label: month,
          week: weekIndex,
        });

        lastMonth = month;
      }
    });

    return labels;
  }, [weeks]);

  return (
    <div className="w-full">

      {/* ==================================================
          MONTHS
      ================================================== */}

      <div className="mb-2 grid grid-cols-[28px_1fr]">

        <div />

        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))`,
          }}
        >

          {weeks.map((_, index) => {

            const month = monthLabels.find(
              (item) =>
                item.week === index,
            );

            return (
              <div
                key={index}
                className="overflow-visible text-[8px] text-muted-foreground/60"
              >
                {month?.label || ""}
              </div>
            );
          })}

        </div>

      </div>

      {/* ==================================================
          GRID
      ================================================== */}

      <div className="grid grid-cols-[28px_1fr]">

        {/* weekdays */}

        <div className="mr-2 grid grid-rows-7 text-[8px] text-muted-foreground/40">

          <span />

          <span className="flex items-center">
            Mon
          </span>

          <span />

          <span className="flex items-center">
            Wed
          </span>

          <span />

          <span className="flex items-center">
            Fri
          </span>

          <span />

        </div>

        {/* HEATMAP */}

        <div
          className="grid w-full gap-[3px]"
          style={{
            gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))`,
          }}
        >

          {weeks.map(
            (week, weekIndex) => (
              <div
                key={weekIndex}
                className="grid grid-rows-7 gap-[3px]"
              >

                {week.map((day) => {

                  const level =
                    getLevel(
                      day.count,
                    );

                  return (
                    <div
                      key={day.date}
                      title={`${day.date} · ${day.count} submissions`}
                      className={`aspect-square w-full max-w-[14px] justify-self-center rounded-[3px] ${getCellClass(
                        level,
                      )} transition-all duration-150 hover:z-20 hover:scale-150 hover:ring-1 hover:ring-white/30`}
                    />
                  );
                })}

              </div>
            ),
          )}

        </div>

      </div>

      {/* ==================================================
          LEGEND
      ================================================== */}

      <div className="mt-5 flex items-center justify-end gap-1.5 text-[9px] text-muted-foreground/60">

        Less

        {[0, 1, 2, 3, 4].map(
          (level) => (
            <div
              key={level}
              className={`h-2.5 w-2.5 rounded-[2px] ${getCellClass(
                level,
              )}`}
            />
          ),
        )}

        More

      </div>

    </div>
  );
}