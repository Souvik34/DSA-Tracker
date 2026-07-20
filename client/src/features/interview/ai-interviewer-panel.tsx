/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import { interviewService } from "@/services/interviewService";
import {
    CodeEditor,
    SUPPORTED_LANGUAGES,
    STARTER_CODE,
    type SupportedLanguageId
} from "@/features/editor/code-editor";


interface Message {
    role: "INTERVIEWER" | "CANDIDATE";
    content: string;
}

interface Problem {

    title:string;

    description:string;

    examples:string;

    constraints:string;

}

interface AIResponse {

phase:
"INTRODUCTION" |
"CODING" |
"OPTIMIZATION" |
"FEEDBACK";


message:string;


score?:{

correctness:number;

communication:number;

optimization:number;

};

}

interface Props {
    sessionId: string;

    language: SupportedLanguageId;

    code: string;

    onSubmit: () => Promise<void>;

    onRun: () => Promise<void>;
}


export default function AIInterviewerPanel({
    sessionId,
    language,
    code,
    onSubmit,
    onRun
}: Props) {



   


const [running,setRunning] =
useState(false);

const [submitting,setSubmitting] =
    useState(false);

const [phase,setPhase] =
    useState<
    "INTRODUCTION" |
    "CODING" |
    "OPTIMIZATION" |
    "FEEDBACK"
    >("INTRODUCTION");


const [time,setTime] =
    useState(45 * 60);

const [score,setScore]=useState({
    correctness:0,
    communication:0,
    optimization:0
});
const [isSubmitted,setIsSubmitted] =
    useState(false);



const [typing,setTyping] =
    useState(false);

    const [interviewContext,setInterviewContext] =
useState({
    askedQuestion:false,
    explainedApproach:false,
    submittedCode:false,
    complexityAnswered:false
});

const [currentQuestion,setCurrentQuestion] =
    useState("");

    const [messages,setMessages] =
        useState<Message[]>([]);


    const [input,setInput] =
        useState("");


    const [loading,setLoading] =
        useState(false);

useEffect(()=>{

    const timer =
    setInterval(()=>{

        setTime(prev=>{

            if(prev<=0)
                return 0;

            return prev-1;

        });


    },1000);


    return ()=>clearInterval(timer);


},[]);


const formatTime=(seconds:number)=>{

    const min =
    Math.floor(seconds/60);


    const sec =
    seconds%60;


    return `${min}:${sec
    .toString()
    .padStart(2,"0")}`;

};
    // Load existing interview state

    useEffect(()=>{

        loadInterview();

    },[]);



    const loadInterview = async()=>{

        try{

            const res =
                await interviewService
                .getInterviewState(sessionId);


            setMessages(
                res.data.messages || []
            );


        }catch(err){

            console.log(err);

        }

    };





    // Start interview

const startInterview = async()=>{

try{


setLoading(true);


const res =
await interviewService
.startInterview(sessionId);



const aiResponse =
res.data;



setPhase(
aiResponse.phase
);



setProblem(
aiResponse.problem
);



await typeAIMessage(
aiResponse.message
);



}
catch(err){

console.log(err);

}
finally{

setLoading(false);

}

};


const typeAIMessage = async(
    text:string
)=>{


    setTyping(true);


    let output="";


    for(const char of text){

        output += char;


        setCurrentQuestion(output);


        await new Promise(
            resolve =>
            setTimeout(resolve,20)
        );

    }



    const aiResponse =
    res.data as AIResponse;



setPhase(
    aiResponse.phase
);



await typeAIMessage(
    aiResponse.message
);



    setCurrentQuestion("");

    setTyping(false);

};

    // Send candidate answer

    const sendMessage = async()=>{


        if(!input.trim())
            return;



        const userMessage = input;



        setMessages(prev=>[
            ...prev,
            {
                role:"CANDIDATE",
                content:userMessage
            }
        ]);



        setInput("");



        try{

            setLoading(true);

setInterviewContext(prev=>({

    ...prev,

    explainedApproach:true

}));
            const res =
                await interviewService
                .sendMessage(
                    sessionId,
                    {
                        message:userMessage
                    }
                );



         const aiResponse =
res.data as AIResponse;



setPhase(
    aiResponse.phase
);



await typeAIMessage(
    aiResponse.message
);



        }catch(err){

            console.log(err);

        }
        finally{

            setLoading(false);

        }

    };



return (

<div className="
h-full
grid
grid-cols-2
bg-black
text-white
">




{/* LEFT : CHAT */}

<div className="
flex
flex-col
border-r
border-gray-800
">


{/* Header */}

<div className="
p-4
border-b
border-gray-800
flex
justify-between
">


<div>

<h2 className="
text-xl
font-semibold
">

AI Interviewer

</h2>


<p className="
text-sm
text-gray-400
">

<div className="
px-3
py-1
rounded
bg-violet-900
text-violet-300
text-sm
">

{phase}

</div>

</p>

</div>



<div className="
bg-gray-900
px-4
py-2
rounded
">

⏱ {formatTime(time)}

</div>


</div>





{/* Question Card */}

{
currentQuestion &&

<div className="
m-4
p-4
rounded-xl
bg-gray-900
border
border-gray-700
">


<p className="
text-sm
text-violet-400
mb-2
">

Interviewer

</p>


<p>

{currentQuestion}

</p>


</div>

}





{/* Messages */}

<div className="
flex-1
overflow-y-auto
p-4
space-y-3
">


{
messages.map((msg,index)=>(


<div
key={index}

className={`
p-3
rounded-lg
max-w-[80%]

${
msg.role==="INTERVIEWER"

?

"bg-gray-800"

:

"bg-violet-600 ml-auto"

}

`}
>

{msg.content}


</div>


))

}


</div>

{
typing &&

<div className="
text-gray-400
italic
">

AI is typing...

</div>

}





{/* Input */}

<div className="
p-3
border-t
border-gray-800
flex
gap-2
">


<input

value={input}

onChange={
e=>setInput(e.target.value)
}

className="
flex-1
bg-gray-900
rounded
px-3
"

/>



<button

onClick={sendMessage}

className="
bg-blue-600
px-4
rounded
"

>

Send

</button>


</div>



</div>








</div>

);
}