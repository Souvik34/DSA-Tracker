/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "@tanstack/react-router";

import ScoreCard from "@/components/ui/scoreCard";

import { interviewService } from "@/services/interviewService";



interface Report {

    correctness:number;

    communication:number;

    optimization:number;


    strengths:string[];

    improvements:string[];


    recommendation:string;

}




export default function InterviewReport(){

const navigate = useNavigate();
const { sessionId } = useParams({
    from:"/interview/$sessionId/report"
});


const [report,setReport]=
useState<Report | null>(null);



const [loading,setLoading]=
useState(true);




useEffect(()=>{

loadReport();

},[]);





const loadReport = async()=>{


try{


const res =
await interviewService.getInterviewReport(
sessionId!
);



setReport(
res.data
);



}
catch(err){

console.log(err);

}
finally{

setLoading(false);

}


};






if(loading){

return (

<div className="
h-screen
bg-black
text-white
flex
items-center
justify-center
">

Generating Report...

</div>

);

}





if(!report){

return (

<div className="
h-screen
bg-black
text-white
flex
items-center
justify-center
">

Report not found

</div>

);

}





return (

<div className="
min-h-screen
bg-black
text-white
p-8
">


<h1 className="
text-3xl
font-bold
">

🎉 Interview Completed

</h1>



<p className="
text-gray-400
mt-2
">

AI generated performance analysis

</p>





{/* Scores */}

<div className="
grid
grid-cols-3
gap-5
mt-8
">


<ScoreCard

title="Problem Solving"

score={
report.correctness
}

/>



<ScoreCard

title="Communication"

score={
report.communication
}

/>




<ScoreCard

title="Optimization"

score={
report.optimization
}

/>



</div>







{/* Feedback */}


<div className="
grid
grid-cols-2
gap-6
mt-10
">



<div className="
bg-gray-900
rounded-xl
p-5
">


<h2 className="
text-xl
font-semibold
mb-4
">

Strengths

</h2>



{
report.strengths.map(
(item,index)=>(

<p
key={index}
className="
text-green-400
mb-2
"
>

✓ {item}

</p>

))
}



</div>








<div className="
bg-gray-900
rounded-xl
p-5
">


<h2 className="
text-xl
font-semibold
mb-4
">

Improvements

</h2>



{
report.improvements.map(
(item,index)=>(

<p
key={index}
className="
text-yellow-400
mb-2
"
>

→ {item}

</p>

))
}



</div>



</div>







{/* Recommendation */}


<div className="
mt-8
bg-violet-900
rounded-xl
p-6
">


<h2 className="
text-xl
font-semibold
">

AI Recommendation

</h2>


<p className="
text-2xl
mt-3
font-bold
">

{report.recommendation}

</p>


</div>





</div>

);


}