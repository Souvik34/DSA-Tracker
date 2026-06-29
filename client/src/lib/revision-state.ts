/* eslint-disable prettier/prettier */
import revisionService from "@/services/revisionService";
import type { DueRevisionResponse } from "@/services/revisionService";

let cached: DueRevisionResponse | null = null;
let lastFetch = 0;

const CACHE_TIME = 30 * 1000; // 30 seconds

export const getRevisionState = async (): Promise<DueRevisionResponse> => {
  const now = Date.now();

  if (cached && now - lastFetch < CACHE_TIME) {
    return cached;
  }

  const res = await revisionService.getDueRevisions();

  cached = res;
  lastFetch = now;

  return res;
};

export const clearRevisionCache = () => {
  cached = null;
  lastFetch = 0;
};