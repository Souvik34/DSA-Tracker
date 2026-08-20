import {
    getInterviewLimitService
} from "./interviewLimit.service.js";


export const getInterviewLimit = async (
    req,
    res
) => {

    try {

        const userId =
            req.user.id;

        const data =
            await getInterviewLimitService(
                userId
            );

        return res.status(200).json({
            success: true,
            data
        });

    } catch (error) {

        console.error(
            "Get interview limit error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Failed to fetch interview limit"
        });
    }
};