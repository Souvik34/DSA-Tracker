/* eslint-disable prettier/prettier */

import {
    useCallback,
    useState,
} from "react";

const TOUR_STORAGE_KEY =
    "dykstra-dashboard-tour-completed";

export function useDykstraTour() {
    const [isTourOpen, setIsTourOpen] =
        useState(false);

    const [initialized, setInitialized] =
        useState(false);

    /*
     * Start automatically for first-time users.
     */
    const initializeTour = useCallback(() => {
        if (initialized) {
            return;
        }

        setInitialized(true);

        const completed =
            localStorage.getItem(
                TOUR_STORAGE_KEY
            );

        if (!completed) {
            /*
             * Small delay gives dashboard
             * components time to render.
             */
            setTimeout(() => {
                setIsTourOpen(true);
            }, 900);
        }
    }, [initialized]);

    /*
     * Close + remember completion.
     */
    const closeTour = useCallback(() => {
        setIsTourOpen(false);

        localStorage.setItem(
            TOUR_STORAGE_KEY,
            "true"
        );
    }, []);

    /*
     * Replay manually.
     */
    const replayTour = useCallback(() => {
        setIsTourOpen(true);
    }, []);

    return {
        isTourOpen,
        initializeTour,
        closeTour,
        replayTour,
    };
}