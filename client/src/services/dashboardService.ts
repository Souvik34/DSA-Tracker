/* eslint-disable prettier/prettier */

import api from "@/lib/api";

export const dashboardService = {

    async getDashboard(userId: string) {

        const res = await api.get(
            `/dashboard/${userId}`
        );

        return res.data.data;
    },

};