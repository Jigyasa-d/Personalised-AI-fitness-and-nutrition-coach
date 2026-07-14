import { Bell, Search } from "lucide-react";

export default function Navbar() {

return(

<div className="glass h-20 rounded-3xl flex items-center justify-between px-8">

<div>

<h2 className="text-3xl font-bold">

Welcome Back 👋

</h2>

<p className="text-slate-400">

Let's build a healthier version of you.

</p>

</div>

<div className="flex gap-4 items-center">

<div className="glass rounded-2xl px-5 py-3 flex items-center gap-3">

<Search size={18}/>

<input

placeholder="Search..."

className="bg-transparent border-none outline-none w-48"

/>

</div>

<div className="glass p-4 rounded-2xl">

<Bell/>

</div>

<img

src="https://i.pravatar.cc/150?img=32"

className="w-12 h-12 rounded-full border-2 border-indigo-500"

/>

</div>

</div>

)

}