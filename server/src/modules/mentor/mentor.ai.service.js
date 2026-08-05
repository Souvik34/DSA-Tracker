import {
    generateAI
} from "../ai/aiProvider.js";


export const generateMentorAdvice =
async(profile)=>{


const prompt = `

You are an expert DSA interview mentor.

Analyze this candidate profile.

Your job:
- identify the next best learning direction
- explain the reason
- create a practical 7 day plan
- give interview preparation advice


Candidate profile:

${JSON.stringify(profile,null,2)}



Return JSON only:

{
 "summary":"",
 "priority":"",
 "reason":"",
 "sevenDayPlan":[
    "",
    "",
    ""
 ],
 "interviewAdvice":""
}

`;



const response =
await generateAI(prompt);



try{


return JSON.parse(response);


}

catch(error){


console.log(
"Mentor AI JSON parse failed"
);


return {

summary:
response,

priority:
profile.focusTopic?.topic || "General",

reason:
"AI generated recommendation",

sevenDayPlan:[],

interviewAdvice:"Keep practicing consistently"

};


}


};