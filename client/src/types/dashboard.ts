/* eslint-disable prettier/prettier */
export interface DashboardData {

    stats: {
        solved: number;
        easy: number;
        medium: number;
        hard: number;

        revisionPending: number;

        streak: number;
        longestStreak: number;
    };

    readiness: {
        score: number;
        level: string;
    };

    revision: {
        dueCount: number;
        items: any[];
    };

    weakTopic: string;

    recommendedProblems: any[];

    strongTopics: {
        topic: string;
        solved: number;
    }[];

    analytics: {

        dailySolve: {
            date: string;
            count: string;
        }[];

        topicDistribution: {
            topic: string;
            count: string;
        }[];

        difficultyDistribution: {
            difficulty: string;
            count: string;
        }[];
    };

}