/* eslint-disable prettier/prettier */

import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "@/services/dashboardService";
import { useAuthStore } from "@/store/auth-store";

export const useDashboard = () => {

    const user = useAuthStore((state) => state.user);

    return useQuery({

        queryKey: ["dashboard", user?.id],

        queryFn: () =>
            dashboardService.getDashboard(user!.id),

        enabled: !!user?.id,

        staleTime: 1000 * 60 * 5,

    });

};