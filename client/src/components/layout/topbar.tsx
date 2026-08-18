/* eslint-disable prettier/prettier */

import { useState } from "react";
import {
  Check,
  ChevronDown,
  Copy,
  UserRound,
  LogOut,
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


  /* -------------------------------------------------------
     USER INITIALS
  ------------------------------------------------------- */

  const initials = (user?.name ?? "U")
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();


  /* -------------------------------------------------------
     CARTOON AVATAR
     
     Same user always gets the same avatar because
     the seed is based on their name.
  ------------------------------------------------------- */

  const avatarSeed = encodeURIComponent(
    user?.name ?? "AlgoForge User"
  );

  const avatarUrl =
    `https://api.dicebear.com/10.x/sprouts/svg?patternProbability=0&cheeksProbability=0&tags=animation&eyesVariant=angry,bigPupils,close,dots,happy,round,sideeye,sleepy,wide,wink&patternVariant=band,dots,ring,speckles,stripes&seed=Felix`;


  /* -------------------------------------------------------
     COPY EMAIL
  ------------------------------------------------------- */

  const copyEmail = async () => {

    if (!user?.email) return;

    try {

      await navigator.clipboard.writeText(user.email);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);

    } catch (error) {

      console.error("Failed to copy email:", error);

    }

  };


  return (

    <header
      className="
        sticky
        top-0
        z-30

        flex
        h-14
        items-center
        gap-3

        border-b
        border-white/[0.07]

        bg-background/75

        px-4

        backdrop-blur-xl
      "
    >

      {/* -------------------------------------------------
          SIDEBAR TOGGLE
      ------------------------------------------------- */}

      <SidebarTrigger
        className="
          text-muted-foreground

          transition-all
          duration-200

          hover:bg-white/[0.05]
          hover:text-white

          active:scale-95
        "
      />


      {/* -------------------------------------------------
          RIGHT SIDE
      ------------------------------------------------- */}

      <div
        className="
          ml-auto
          flex
          items-center
          gap-3
        "
      >

        {/* -------------------------------------------------
            SEPARATOR
        ------------------------------------------------- */}

        <div
          className="
            h-7
            w-[2px]
            rounded-full
            bg-white/[0.18]
          "
        />


        {/* -------------------------------------------------
            PROFILE DROPDOWN
        ------------------------------------------------- */}

        <DropdownMenu>

          <DropdownMenuTrigger asChild>

            <button
              className="
                group

                flex
                items-center
                gap-2

                rounded-full

                border
                border-white/[0.10]

                bg-white/[0.03]

                py-1
                pl-1
                pr-3

                shadow-[0_2px_12px_rgba(0,0,0,0.25)]

                backdrop-blur-xl

                transition-all
                duration-300
                ease-out

                hover:border-white/[0.18]
                hover:bg-white/[0.06]

                hover:shadow-[0_4px_22px_rgba(0,0,0,0.35)]

                active:scale-[0.98]
              "
            >

              {/* -------------------------------------------------
                  AVATAR
              ------------------------------------------------- */}

              <Avatar
                className="
                  h-8
                  w-8

                  overflow-hidden

                  bg-blue-500/[0.08]

                  ring-1
                  ring-white/[0.12]

                  shadow-[0_0_18px_rgba(59,130,246,0.15)]

                  transition-all
                  duration-300

                  group-hover:scale-105
                  group-hover:ring-blue-400/30

                  group-hover:shadow-[0_0_22px_rgba(59,130,246,0.25)]
                "
              >

                <AvatarImage
                  src={avatarUrl}
                  alt={`${user?.name ?? "User"} avatar`}
                  className="
                    scale-[1.15]

                    transition-transform
                    duration-500

                    group-hover:scale-[1.22]
                  "
                />

                <AvatarFallback
                  className="
                    bg-primary/[0.12]

                    text-xs
                    font-semibold

                    text-primary
                  "
                >
                  {initials}
                </AvatarFallback>

              </Avatar>


              {/* -------------------------------------------------
                  USER NAME
              ------------------------------------------------- */}

              <span
                className="
                  hidden

                  max-w-[140px]

                  truncate

                  text-sm
                  font-medium

                  text-foreground

                  sm:inline
                "
              >
                {user?.name ?? "Guest"}
              </span>


              {/* -------------------------------------------------
                  DROPDOWN ARROW
              ------------------------------------------------- */}

              <ChevronDown
                className="
                  h-3.5
                  w-3.5

                  text-muted-foreground

                  transition-transform
                  duration-300

                  group-data-[state=open]:rotate-180
                  group-data-[state=open]:text-blue-400
                "
              />

            </button>

          </DropdownMenuTrigger>


          {/* ---------------------------------------------------
              DROPDOWN
          --------------------------------------------------- */}

          <DropdownMenuContent
            align="end"
            sideOffset={10}
            className="
              w-64

              rounded-2xl

              border
              border-white/[0.10]

              bg-zinc-950/[0.96]

              p-2

              shadow-[0_20px_50px_rgba(0,0,0,0.55)]

              backdrop-blur-2xl

              data-[state=open]:animate-in
              data-[state=open]:fade-in-0
              data-[state=open]:zoom-in-95

              data-[state=closed]:animate-out
              data-[state=closed]:fade-out-0
              data-[state=closed]:zoom-out-95
            "
          >

            {/* -------------------------------------------------
                PROFILE HEADER
            ------------------------------------------------- */}

            <div className="px-3 py-3">

              <div className="flex items-center gap-3">

                <Avatar
                  className="
                    h-11
                    w-11

                    ring-1
                    ring-white/[0.12]

                    bg-blue-500/[0.08]

                    shadow-[0_0_20px_rgba(59,130,246,0.15)]
                  "
                >

                  <AvatarImage
                    src={avatarUrl}
                    alt={`${user?.name ?? "User"} avatar`}
                    className="scale-[1.15]"
                  />

                  <AvatarFallback
                    className="
                      bg-primary/[0.12]
                      font-semibold
                      text-primary
                    "
                  >
                    {initials}
                  </AvatarFallback>

                </Avatar>


                <div className="min-w-0">

                  <p
                    className="
                      truncate
                      text-sm
                      font-semibold
                      text-white
                    "
                  >
                    {user?.name ?? "Guest"}
                  </p>

                  <p
                    className="
                      mt-0.5
                      truncate
                      text-xs
                      text-zinc-500
                    "
                  >
                    {user?.email ?? "Not signed in"}
                  </p>

                </div>

              </div>

            </div>


            <DropdownMenuSeparator
              className="
                mx-1
                bg-white/[0.08]
              "
            />
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

    text-zinc-300

    transition-colors

    focus:bg-white/[0.06]
    focus:text-white
  "
>
  <UserRound
    className="
      mr-2
      h-4
      w-4
    "
  />

  View Profile

</DropdownMenuItem>


            {/* -------------------------------------------------
                COPY EMAIL
            ------------------------------------------------- */}

            <DropdownMenuItem
              onClick={copyEmail}
              className="
                mt-1

                cursor-pointer

                rounded-xl

                px-3
                py-2.5

                text-zinc-300

                transition-colors

                focus:bg-white/[0.06]
                focus:text-white
              "
            >

              {copied ? (

                <Check
                  className="
                    mr-2
                    h-4
                    w-4
                    text-emerald-400
                  "
                />

              ) : (

                <Copy
                  className="
                    mr-2
                    h-4
                    w-4
                  "
                />

              )}

              {copied
                ? "Email copied"
                : "Copy email"}

            </DropdownMenuItem>


            {/* -------------------------------------------------
                LOGOUT
            ------------------------------------------------- */}

            <DropdownMenuItem
              onClick={() => {

                logout();

                navigate({
                  to: "/login",
                });

              }}
              className="
                mt-1

                cursor-pointer

                rounded-xl

                px-3
                py-2.5

                text-red-400

                transition-colors

                focus:bg-red-500/[0.10]
                focus:text-red-400
              "
            >

              <LogOut
                className="
                  mr-2
                  h-4
                  w-4
                "
              />

              Log out

            </DropdownMenuItem>

          </DropdownMenuContent>

        </DropdownMenu>

      </div>

    </header>

  );
}