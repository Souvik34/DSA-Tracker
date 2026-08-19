/* eslint-disable prettier/prettier */

import api from "@/lib/api";

const leetcodeService = {
  validateProfile: (username: string) => {
    return api.post("/leetcode/validate", {
      username,
    });
  },

  connectProfile: (username: string) => {
    return api.post("/leetcode/connect", {
      username,
    });
  },

  getProfile: () => {
    return api.get("/leetcode/profile");
  },

  syncActivity: (problems: unknown[]) => {
    return api.post("/leetcode/sync", {
      problems,
    });
  },

  disconnectProfile: () => {
    return api.delete("/leetcode/disconnect");
  },
};

export default leetcodeService;