import {
    getMentorRecommendation
} from "./mentor.service.js";


import {
    completeMentorProblem
} from "./mentor.service.js";


export const getMentor =
async(req,res)=>{


try{


const {
userId
}=req.params;



const data =
await getMentorRecommendation(userId);



res.json({

success:true,

data

});


}

catch(err){

console.log(err);


res.status(500).json({

success:false,

message:"Mentor generation failed"

});


}


};

export const completeMentorProblemController = async (
    req,
    res
) => {

    try {

        const userId = req.user.id;

        const { problemId } = req.body;

        if (!problemId) {
            return res.status(400).json({
                success: false,
                message: "problemId is required"
            });
        }

        const mentorPlan =
            await completeMentorProblem(
                userId,
                Number(problemId)
            );

        return res.json({
            success: true,
            mentorPlan
        });

    } catch (err) {

        console.error(
            "COMPLETE MENTOR PROBLEM ERROR:",
            err
        );

        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};