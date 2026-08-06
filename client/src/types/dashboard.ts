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
 recommendation?: {
    title:string;
    summary:string;
    priority:string;
    confidence?:number;
};

aiAdvice?: {
    headline:string;
    insight:string;
    reason:string;
};

profile?: {
    focusTopic?: {
        topic:string;
        confidence:number;
        type:string;
    };
};

mentorProblems?: {
    id:number;
    title:string;
    difficulty:string;
    topic:string;
    question_link:string;
}[];
}