/* eslint-disable prettier/prettier */
interface Props {
    title:string;
    score:number;
    description?:string;
}


export default function ScoreCard({
    title,
    score,
    description
}:Props){


return (

<div
className="
bg-gray-900
border
border-gray-800
rounded-xl
p-5
"
>


<h3 className="
text-gray-400
text-sm
">

{title}

</h3>



<div className="
text-3xl
font-bold
mt-2
text-white
">

{score}/10

</div>



{
description &&

<p className="
text-sm
text-gray-400
mt-2
">

{description}

</p>

}


</div>

);

}