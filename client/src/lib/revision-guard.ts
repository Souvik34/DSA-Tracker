/* eslint-disable prettier/prettier */
import { redirect } from "@tanstack/react-router";
import { getRevisionState } from "./revision-state";

type RouteLocation = {
  pathname: string;
};

export const requireRevisionCheck = async (
  location: RouteLocation
) => {
  const res = await getRevisionState();

  if (location.pathname.startsWith("/revisions")) {
    return;
  }

  if (res.blocked) {
    throw redirect({
      to: "/dashboard",
    });
  }
};