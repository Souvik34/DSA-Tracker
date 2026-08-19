/* eslint-disable prettier/prettier */

import { useState } from "react";

import {
    Check,
    ChevronDown,
    Copy,
    LogOut,
    UserRound,
} from "lucide-react";

import { useNavigate } from "@tanstack/react-router";

import { SidebarTrigger } from "@/components/ui/sidebar";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";

import { useAuthStore } from "@/store/auth-store";

export function Topbar() {
    const user = useAuthStore((s) => s.user);
    const logout = useAuthStore((s) => s.logout);

    const navigate = useNavigate();

    const [copied, setCopied] = useState(false);

    /*
    ============================================================
    USER INITIALS
    ============================================================
    */

    const initials =
        user?.name
            ?.trim()
            .split(/\s+/)
            .filter(Boolean)
            .map((part) => part.charAt(0))
            .slice(0, 2)
            .join("")
            .toUpperCase() || "U";

    /*
    ============================================================
    LEETCODE PROFILE IMAGE

    We intentionally don't use DiceBear or a static avatar.

    The profile image is taken from the LeetCode data already
    available on the authenticated user object.

    Multiple possible property shapes are supported so this
    component doesn't force a particular backend structure.
    ============================================================
    */

    const leetcodeProfile = (
        user as
            | {
                  leetcode?: {
                      avatar?: string | null;
                      avatarUrl?: string | null;
                      profile?: {
                          avatar?: string | null;
                          avatarUrl?: string | null;
                      } | null;
                  } | null;
                  leetcodeProfile?: {
                      avatar?: string | null;
                      avatarUrl?: string | null;
                  } | null;
                  leetcode_profile?: {
                      avatar?: string | null;
                      avatar_url?: string | null;
                  } | null;
              }
            | null
    );

    const leetcodeAvatar =
        leetcodeProfile?.leetcode?.avatar ??
        leetcodeProfile?.leetcode?.avatarUrl ??
        leetcodeProfile?.leetcode?.profile?.avatar ??
        leetcodeProfile?.leetcode?.profile?.avatarUrl ??
        leetcodeProfile?.leetcodeProfile?.avatar ??
        leetcodeProfile?.leetcodeProfile?.avatarUrl ??
        leetcodeProfile?.leetcode_profile?.avatar ??
        leetcodeProfile?.leetcode_profile?.avatar_url ??
        null;

    /*
    ============================================================
    COPY EMAIL
    ============================================================
    */

    const copyEmail = async () => {
        if (!user?.email) return;

        try {
            await navigator.clipboard.writeText(user.email);

            setCopied(true);

            window.setTimeout(() => {
                setCopied(false);
            }, 1500);
        } catch (error) {
            console.error("Failed to copy email:", error);
        }
    };

    /*
    ============================================================
    LOGOUT
    ============================================================
    */

    const handleLogout = () => {
        logout();

        navigate({
            to: "/login",
        });
    };

    return (
        <header
            className="
                sticky
                top-0
                z-40

                h-14
                w-full

                border-b
                border-white/[0.10]

                bg-background/80

                backdrop-blur-2xl

                supports-[backdrop-filter]:bg-background/65
            "
        >
            {/* =====================================================
                TOPBAR INNER
            ===================================================== */}

            <div
                className="
                    flex
                    h-full
                    w-full
                    items-center
                    px-4
                    sm:px-6
                "
            >
                {/* =================================================
                    SIDEBAR
                ================================================= */}

                <SidebarTrigger
                    className="
                        h-9
                        w-9

                        rounded-xl

                        text-zinc-300

                        transition-all
                        duration-200

                        hover:bg-white/[0.07]
                        hover:text-white

                        active:scale-95
                    "
                />

                {/* =================================================
                    RIGHT ACTIONS
                ================================================= */}

                <div
                    className="
                        ml-auto
                        flex
                        items-center
                        gap-3
                    "
                >
                    {/* =================================================
                        SEPARATOR
                    ================================================= */}

                    <div
                        className="
                            hidden
                            h-6
                            w-px
                            bg-white/[0.14]
                            sm:block
                        "
                    />

                    {/* =================================================
                        PROFILE
                    ================================================= */}

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button
                                type="button"
                                className="
                                    group

                                    flex
                                    items-center
                                    gap-2

                                    rounded-full

                                    border
                                    border-white/[0.10]

                                    bg-white/[0.035]

                                    py-1
                                    pl-1
                                    pr-2.5

                                    shadow-[0_4px_20px_rgba(0,0,0,0.18)]

                                    backdrop-blur-xl

                                    outline-none

                                    transition-all
                                    duration-300

                                    hover:border-white/[0.18]
                                    hover:bg-white/[0.065]

                                    focus-visible:ring-2
                                    focus-visible:ring-white/[0.18]

                                    active:scale-[0.98]
                                "
                            >
                                {/* =====================================
                                    LEETCODE AVATAR
                                ===================================== */}

                                <Avatar
                                    className="
                                        h-8
                                        w-8

                                        overflow-hidden

                                        rounded-full

                                        border
                                        border-white/[0.14]

                                        bg-zinc-900

                                        shadow-[0_0_18px_rgba(255,255,255,0.06)]

                                        transition-all
                                        duration-300

                                        group-hover:border-white/[0.24]
                                        group-hover:shadow-[0_0_22px_rgba(255,255,255,0.10)]
                                    "
                                >
                                    {leetcodeAvatar && (
                                        <AvatarImage
                                            src={leetcodeAvatar}
                                            alt={
                                                user?.name
                                                    ? `${user.name} profile`
                                                    : "Profile"
                                            }
                                            className="
                                                object-cover

                                                transition-transform
                                                duration-500

                                                group-hover:scale-105
                                            "
                                        />
                                    )}

                                    <AvatarFallback
                                        className="
                                            bg-white/[0.07]

                                            text-xs
                                            font-semibold

                                            text-white
                                        "
                                    >
                                        {initials}
                                    </AvatarFallback>
                                </Avatar>

                                {/* =====================================
                                    CHEVRON
                                ===================================== */}

                                <ChevronDown
                                    className="
                                        h-3.5
                                        w-3.5

                                        text-zinc-400

                                        transition-all
                                        duration-300

                                        group-hover:text-white

                                        group-data-[state=open]:rotate-180
                                        group-data-[state=open]:text-white
                                    "
                                />
                            </button>
                        </DropdownMenuTrigger>

                        {/* =================================================
                            DROPDOWN
                        ================================================= */}

                        <DropdownMenuContent
                            align="end"
                            sideOffset={10}
                            className="
                                w-72

                                overflow-hidden

                                rounded-2xl

                                border
                                border-white/[0.11]

                                bg-zinc-950/[0.97]

                                p-1.5

                                shadow-[0_24px_70px_rgba(0,0,0,0.60)]

                                backdrop-blur-2xl

                                data-[state=open]:animate-in
                                data-[state=open]:fade-in-0
                                data-[state=open]:zoom-in-95

                                data-[state=closed]:animate-out
                                data-[state=closed]:fade-out-0
                                data-[state=closed]:zoom-out-95
                            "
                        >
                            {/* =============================================
                                PROFILE HEADER
                            ============================================= */}

                            <div
                                className="
                                    rounded-xl
                                    px-3
                                    py-3.5

                                    transition-colors

                                    hover:bg-white/[0.025]
                                "
                            >
                                <div
                                    className="
                                        flex
                                        items-center
                                        gap-3
                                    "
                                >
                                    {/* Avatar */}

                                    <Avatar
                                        className="
                                            h-11
                                            w-11

                                            shrink-0

                                            border
                                            border-white/[0.13]

                                            bg-zinc-900

                                            shadow-[0_0_22px_rgba(255,255,255,0.06)]
                                        "
                                    >
                                        {leetcodeAvatar && (
                                            <AvatarImage
                                                src={leetcodeAvatar}
                                                alt={
                                                    user?.name
                                                        ? `${user.name} profile`
                                                        : "Profile"
                                                }
                                                className="object-cover"
                                            />
                                        )}

                                        <AvatarFallback
                                            className="
                                                bg-white/[0.07]

                                                font-semibold
                                                text-white
                                            "
                                        >
                                            {initials}
                                        </AvatarFallback>
                                    </Avatar>

                                    {/* User information */}

                                    <div className="min-w-0 flex-1">
                                        <p
                                            className="
                                                truncate

                                                text-sm
                                                font-semibold
                                                tracking-tight

                                                text-white
                                            "
                                        >
                                            {user?.name}
                                        </p>

                                        <p
                                            className="
                                                mt-1

                                                truncate

                                                text-xs

                                                text-zinc-400
                                            "
                                        >
                                            {user?.email}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <DropdownMenuSeparator
                                className="
                                    mx-1
                                    bg-white/[0.09]
                                "
                            />

                            {/* =============================================
                                VIEW PROFILE
                            ============================================= */}

                            <DropdownMenuItem
                                onClick={() => {
                                    navigate({
                                        to: "/profile",
                                    });
                                }}
                                className="
                                    mt-1

                                    cursor-pointer

                                    rounded-xl

                                    px-3
                                    py-2.5

                                    text-sm
                                    font-medium

                                    text-zinc-300

                                    outline-none

                                    transition-all
                                    duration-200

                                    hover:bg-white/[0.06]
                                    hover:text-white

                                    focus:bg-white/[0.06]
                                    focus:text-white
                                "
                            >
                                <UserRound
                                    className="
                                        mr-2.5
                                        h-4
                                        w-4
                                    "
                                />

                                View Profile
                            </DropdownMenuItem>

                            {/* =============================================
                                COPY EMAIL
                            ============================================= */}

                            <DropdownMenuItem
                                onClick={copyEmail}
                                className="
                                    mt-0.5

                                    cursor-pointer

                                    rounded-xl

                                    px-3
                                    py-2.5

                                    text-sm
                                    font-medium

                                    text-zinc-300

                                    outline-none

                                    transition-all
                                    duration-200

                                    hover:bg-white/[0.06]
                                    hover:text-white

                                    focus:bg-white/[0.06]
                                    focus:text-white
                                "
                            >
                                {copied ? (
                                    <Check
                                        className="
                                            mr-2.5
                                            h-4
                                            w-4

                                            text-emerald-400
                                        "
                                    />
                                ) : (
                                    <Copy
                                        className="
                                            mr-2.5
                                            h-4
                                            w-4
                                        "
                                    />
                                )}

                                {copied ? "Email copied" : "Copy email"}
                            </DropdownMenuItem>

                            <DropdownMenuSeparator
                                className="
                                    mx-1
                                    my-1
                                    bg-white/[0.09]
                                "
                            />

                            {/* =============================================
                                LOGOUT
                            ============================================= */}

                            <DropdownMenuItem
                                onClick={handleLogout}
                                className="
                                    cursor-pointer

                                    rounded-xl

                                    px-3
                                    py-2.5

                                    text-sm
                                    font-medium

                                    text-red-400

                                    outline-none

                                    transition-all
                                    duration-200

                                    hover:bg-red-500/[0.08]
                                    hover:text-red-300

                                    focus:bg-red-500/[0.08]
                                    focus:text-red-300
                                "
                            >
                                <LogOut
                                    className="
                                        mr-2.5
                                        h-4
                                        w-4
                                    "
                                />

                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* =========================================================
                SUBTLE BOTTOM LIGHT
            ========================================================= */}

            <div
                className="
                    pointer-events-none
                    absolute
                    bottom-0
                    left-0
                    h-px
                    w-full
                    bg-gradient-to-r
                    from-transparent
                    via-white/[0.12]
                    to-transparent
                "
            />
        </header>
    );
}