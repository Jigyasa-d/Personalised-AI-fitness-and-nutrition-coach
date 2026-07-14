import { useState } from "react";
import api from "../api/axios";
import MealCard from "../components/nutrition/MealCard";
import MacroChart from "../components/nutrition/MacroChart";


export default function Nutrition(){

const [nutrition,setNutrition] = useState(null);
const [activeDay,setActiveDay] = useState(0);
const [loading,setLoading] = useState(false);


const generateNutrition = async()=>{

try{

setLoading(true);

const res = await api.post("/nutrition/generate");

setNutrition(res.data.data);

}
catch(err){

console.log(err);

}
finally{

setLoading(false);

}

};



return (

<div className="min-h-screen bg-slate-50 p-8 text-slate-900">


<div className="flex justify-between items-center">


<div>

<h1 className="
text-5xl
font-black
tracking-tight
">
AI Nutrition Planner 🍎
</h1>


<p className="
text-slate-500
mt-3
text-lg
">
Your AI coach creates personalized nutrition strategies
</p>

</div>



<button

onClick={generateNutrition}

className="
bg-teal-600
hover:bg-teal-700
text-white
px-8
py-4
rounded-2xl
font-bold
shadow-lg
transition
"

>

{
loading
?
"Generating..."
:
"Generate Nutrition Plan"
}


</button>


</div>





{
nutrition &&

<>


<div className="
grid
grid-cols-4
gap-6
mt-10
">


<div className="nutrition-card">

<p>
Goal
</p>

<h2>
{nutrition.goal}
</h2>

</div>



<div className="nutrition-card">

<p>
Calories
</p>

<h2>
{nutrition.plan.dailyCalories}
</h2>

</div>



<div className="nutrition-card">

<p>
Protein
</p>

<h2>
{nutrition.plan.macros.protein}
</h2>

</div>



<MacroChart 
macros={nutrition.plan.macros}
/>



</div>





<div className="
mt-8
bg-teal-50
rounded-3xl
p-8
border
border-teal-100
">


<h2 className="
text-2xl
font-bold
">
🧠 AI Nutrition Intelligence
</h2>


<p className="
mt-3
text-slate-600
">

Your current plan is optimized for 
<b> {nutrition.goal}</b>.
Protein distribution and calorie targets
are aligned with your fitness objective.

</p>


</div>






<div className="
flex
gap-3
mt-10
overflow-x-auto
">


{
nutrition.plan.days.map((day,index)=>(


<button

key={day.day}

onClick={()=>setActiveDay(index)}

className={

`
px-6
py-3
rounded-xl
font-bold
transition

${
activeDay===index
?
"bg-teal-600 text-white"
:
"bg-white shadow text-slate-600"
}

`

}

>

{day.day}

</button>


))

}


</div>





<h2 className="
text-3xl
font-black
mt-10
mb-6
">

{nutrition.plan.days[activeDay].day}

</h2>




<div className="
grid
grid-cols-3
gap-8
">


{
nutrition.plan.days[activeDay].meals.map(
(meal,index)=>(

<MealCard

key={index}

meal={meal}

/>

)

)

}


</div>


</>


}



</div>

)

}
