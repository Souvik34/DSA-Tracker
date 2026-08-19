/* eslint-disable prettier/prettier */

import { createFileRoute } from "@tanstack/react-router";
import LandingPage from "@/features/landing/LandingPage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Dykstra — Become Interview Ready",
      },
      {
        name: "description",
        content:
          "Practice DSA, revise intelligently and prepare for technical interviews with Dykstra.",
      },
    ],
  }),

  component: LandingPage,
});