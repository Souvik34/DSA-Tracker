/* eslint-disable prettier/prettier */
import { redirect } from "@tanstack/react-router";
import { getRevisionState } from "./revision-state";

export const requireRevisionCheck = async (
  location: { pathname: string }
) => {
  const res = await getRevisionState();

  // Dashboard is always allowed
  if (location.pathname === "/dashboard") {
    return;
  }

  // Revision page will also be allowed
  if (location.pathname.startsWith("/revisions")) {
    return;
  }

  if (res.blocked) {
    throw redirect({
      to: "/dashboard",
    });
  }
};