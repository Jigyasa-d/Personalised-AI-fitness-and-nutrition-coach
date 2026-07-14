export default function MacroChart({macros}){


const data=[

{
name:"Protein",
value:macros.protein,
width:"55%",
color:"bg-cyan-400"
},

{
name:"Carbs",
value:macros.carbs,
width:"80%",
color:"bg-blue-400"
},


{
name:"Fats",
value:macros.fats,
width:"40%",
color:"bg-purple-400"
}

]


return (

<div className="
glass-card
rounded-3xl
p-7
">

<h2 className="
text-xl
font-bold
mb-6
">

Macros

</h2>


{

data.map((item)=>(

<div
key={item.name}
className="mb-5"
>


<div className="
flex
justify-between
text-slate-300
mb-2
">

<span>
{item.name}
</span>

<span>
{item.value}
</span>


</div>



<div className="
h-3
rounded-full
bg-slate-800
overflow-hidden
">


<div

className={`
h-full
${item.color}
rounded-full
`}

style={{
width:item.width
}}

>


</div>


</div>


</div>

))


}



</div>

)


}