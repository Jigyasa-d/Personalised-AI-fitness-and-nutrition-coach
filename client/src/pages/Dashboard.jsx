import Layout from "../components/layout/Layout";

export default function Dashboard(){

return(

<Layout>

<h1 className="text-5xl font-black gradient">

AI Fitness Dashboard

</h1>

<div className="grid grid-cols-4 gap-6 mt-10">

<div className="glass rounded-3xl p-8">

<h2 className="text-slate-400">

Confidence

</h2>

<p className="text-5xl font-black mt-4">

92%

</p>

</div>

<div className="glass rounded-3xl p-8">

<h2 className="text-slate-400">

Calories

</h2>

<p className="text-5xl font-black mt-4">

2520

</p>

</div>

<div className="glass rounded-3xl p-8">

<h2 className="text-slate-400">

Workout

</h2>

<p className="text-5xl font-black mt-4">

45m

</p>

</div>

<div className="glass rounded-3xl p-8">

<h2 className="text-slate-400">

Water

</h2>

<p className="text-5xl font-black mt-4">

3.2L

</p>

</div>

</div>

</Layout>

)

}