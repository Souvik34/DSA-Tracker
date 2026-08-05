/* eslint-disable prettier/prettier */

import {
    CheckCircle2,
    Clock3,
    ArrowRight,
    Flame,
} from "lucide-react";

import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";


interface Props {
    dashboard:any;
}



const difficultyColor = (difficulty:string)=>{

    switch(difficulty?.toLowerCase()){

        case "easy":
            return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";

        case "medium":
            return "text-amber-400 bg-amber-400/10 border-amber-400/20";

        case "hard":
            return "text-rose-400 bg-rose-400/10 border-rose-400/20";

        default:
            return "text-zinc-400 bg-zinc-800 border-zinc-700";

    }

};




export function RecentActivity({dashboard}:Props){


    if(!dashboard) return null;



    const activities =
        dashboard.recentActivity ?? [];



    const visibleActivities =
        activities.slice(0,8);




return (

<div
className="
rounded-3xl
border
border-zinc-800
bg-zinc-950
p-6
relative
overflow-hidden
"
>



{/* subtle background */}

<div
className="
absolute
right-[-80px]
top-[-80px]
h-72
w-72
rounded-full
bg-violet-500/5
blur-3xl
"
/>





<div className="relative">





{/* Header */}

<div
className="
flex
items-start
justify-between
"
>


<div>


<h2
className="
text-xl
font-semibold
text-white
"
>

Recent Activity

</h2>


<p
className="
mt-1
text-sm
text-zinc-500
"
>

Your coding journey

</p>



</div>






<div
className="
flex
items-center
gap-2
rounded-full
border
border-zinc-800
bg-zinc-900
px-3
py-2
text-xs
text-zinc-400
"
>

<Clock3 size={14}/>

{activities.length}

</div>



</div>








{/* Streak Banner */}

<div
className="
mt-6
flex
items-center
justify-between
rounded-2xl
border
border-zinc-800
bg-zinc-900/50
px-4
py-3
"
>


<div
className="
flex
items-center
gap-3
"
>

<div
className="
h-9
w-9
rounded-xl
bg-orange-500/10
border
border-orange-500/20
flex
items-center
justify-center
"
>

<Flame
size={18}
className="text-orange-400"
/>

</div>


<div>

<p
className="
text-sm
font-medium
text-white
"
>
Keep the momentum
</p>


<p
className="
text-xs
text-zinc-500
"
>
Solve consistently to improve
</p>


</div>


</div>


</div>









{/* Activity */}

<div
className="
mt-6
max-h-[390px]
overflow-y-auto
space-y-3
pr-1
"
>



{
visibleActivities.length===0 ?


<div
className="
py-10
text-center
text-sm
text-zinc-500
"
>

No problems solved yet

</div>


:


visibleActivities.map(
(item:any,index:number)=>(


<motion.div


key={index}


initial={{
opacity:0,
y:12
}}


animate={{
opacity:1,
y:0
}}


transition={{
delay:index*0.05
}}


className="
group
rounded-2xl
border
border-zinc-800
bg-zinc-900/30
p-4
hover:border-zinc-700
hover:bg-zinc-900
transition-all
"



>



<div
className="
flex
items-center
gap-4
"
>






{/* Check */}

<div
className="
h-10
w-10
rounded-xl
bg-emerald-500/10
border
border-emerald-500/20
flex
items-center
justify-center
shrink-0
"
>

<CheckCircle2
size={18}
className="
text-emerald-400
"
/>


</div>








{/* Details */}

<div
className="
flex-1
min-w-0
"
>


<div
className="
flex
items-center
justify-between
gap-3
"
>



<div
className="
min-w-0
"
>

<h3
className="
text-sm
font-medium
text-white
truncate
group-hover:text-violet-300
transition
"
>

{item.title}

</h3>


<p
className="
mt-1
text-xs
text-zinc-500
"
>

{item.topic}

</p>


</div>






<span
className={`
shrink-0
rounded-full
border
px-2.5
py-1
text-[11px]
font-medium
${difficultyColor(item.difficulty)}
`}
>

{item.difficulty}

</span>



</div>







<div
className="
mt-3
flex
items-center
justify-between
text-xs
text-zinc-500
"
>


<span>

Solved {

formatDistanceToNow(
new Date(item.solved_at),
{
addSuffix:true
}
)

}

</span>



<ArrowRight
size={14}
className="
opacity-0
group-hover:opacity-100
transition
text-violet-400
"
/>


</div>




</div>







</div>



</motion.div>



))

}



</div>









{/* Footer */}

{
activities.length > 8 &&


<button
className="
mt-5
flex
items-center
gap-2
text-sm
text-zinc-400
hover:text-violet-400
transition
"
>

View complete journey

<ArrowRight size={15}/>

</button>


}




</div>


</div>


);

}