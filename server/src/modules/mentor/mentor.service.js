import {
    getTopicStrengthRepo,
    getStrongTopicsRepo,
    getDifficultyDistributionRepo,
    getTopicDistributionRepo,
    getRecentActivityRepo
} from "../dashboard/dashboard.repository.js";

import {
    generateMentorAdvice
} from "./mentor.ai.service.js";

import {
    findFocusTopic
} from "./topicScore.js";



export const getMentorRecommendation =
async(userId)=>{


const [

topicStrength,

strongTopics,

difficulty,

topics,

recentActivity

]=await Promise.all([


getTopicStrengthRepo(userId),

getStrongTopicsRepo(userId),

getDifficultyDistributionRepo(userId),

getTopicDistributionRepo(userId),

getRecentActivityRepo(userId)


]);



const focusTopic =
findFocusTopic(topicStrength);


const aiProfile = {

focusTopic,

strongTopics:
strongTopics.slice(0,3),

difficulty,

recentProblems:
recentActivity.slice(0,5),

topics:
topics.slice(0,5)

};
const aiAdvice =
await generateMentorAdvice(aiProfile);
let recommendation;



if(!focusTopic){


recommendation={

title:"Start your DSA journey",

summary:
"Begin solving problems to unlock personalized guidance.",

priority:"Getting Started",

actions:[

"Practice arrays and strings",

"Build daily solving habit"

]

};


}



else{


if(focusTopic.type==="coverage_gap"){


recommendation={

title:`Explore ${focusTopic.topic}`,

summary:
`You have limited practice in ${focusTopic.topic}. Build more exposure before evaluating mastery.`,

priority:focusTopic.topic,

confidence:focusTopic.confidence,

actions:[

`Solve beginner ${focusTopic.topic} problems`,

`Learn common ${focusTopic.topic} patterns`,

`Add this topic to your revision cycle`

]

};


}


else if(focusTopic.type==="weakness"){


recommendation={

title:`Improve ${focusTopic.topic}`,

summary:
`You have practiced ${focusTopic.topic}, but your performance needs improvement.`,

priority:focusTopic.topic,

confidence:focusTopic.confidence,

actions:[

`Review mistakes`,

`Solve medium level problems`,

`Attempt timed practice`

]

};


}

}




return {


recommendation,

aiAdvice,

profile:{


focusTopic,

strongTopics,

difficulty,

topics,

recentActivity


}


};


};