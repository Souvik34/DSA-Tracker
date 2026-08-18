/* eslint-disable prettier/prettier */

import api from "@/lib/api";

const leetcodeService = {
  validateProfile: (username: string) => {
    return api.post("/leetcode/validate", {
      username,
    });
  },

  syncActivity: () => {
    return api.post("/leetcode/sync");
  },

  disconnectProfile: () => {
    return api.delete("/leetcode/disconnect");
  },
};

export default leetcodeService;