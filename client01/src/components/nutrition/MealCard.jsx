export default function MealCard({meal}){


return (

<div

className="
glass-card
rounded-3xl
p-7
hover:-translate-y-2
transition
duration-300
"

>


<div className="
inline-block
px-4
py-1
rounded-full
bg-cyan-400/10
text-cyan-300
text-sm
font-semibold
">

{meal.time}

</div>



<h2 className="
text-xl
font-bold
mt-5
leading-snug
">

{meal.name}

</h2>




<div className="
mt-5
space-y-2
text-slate-300
">


<p>
🥩 Protein:
<span className="text-cyan-300 font-bold">
{" "}
{meal.nutrition.protein}
</span>

</p>


<p>

🔥 Calories:

<span className="text-cyan-300 font-bold">
{" "}
{meal.nutrition.calories}
</span>

</p>



</div>





<h3 className="
mt-6
font-bold
text-white
">

Ingredients

</h3>



<ul className="
mt-3
text-slate-400
space-y-2
">


{
meal.ingredients.map((item,i)=>(

<li key={i}>
• {item}
</li>

))
}


</ul>



</div>


)

}