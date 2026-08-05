import {
    getMentorRecommendation
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