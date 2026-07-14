import {
  LayoutDashboard,
  Dumbbell,
  Utensils,
  Activity,
  User,
  History,
  Sparkles,
  LogOut,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Workout",
    path: "/workout",
    icon: Dumbbell,
  },
  {
    name: "Nutrition",
    path: "/nutrition",
    icon: Utensils,
  },
  {
    name: "Analytics",
    path: "/analytics",
    icon: Activity,
  },
  {
    name: "History",
    path: "/history",
    icon: History,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: User,
  },
];


export default function Sidebar() {

  return (

    <motion.aside

      initial={{
        x:-100,
        opacity:0
      }}

      animate={{
        x:0,
        opacity:1
      }}

      transition={{
        duration:.5
      }}

      className="
      fixed
      left-0
      top-0
      h-screen
      w-72
      p-6
      z-50
      glass
      border-r
      border-white/10
      "

    >


      {/* Logo */}

      <div className="mb-10">


        <div className="
        flex
        items-center
        gap-3
        ">


          <div className="
          w-12
          h-12
          rounded-2xl
          bg-gradient-to-br
          from-indigo-500
          to-purple-600
          flex
          items-center
          justify-center
          shadow-lg
          shadow-indigo-500/30
          ">

            <Sparkles size={25}/>

          </div>


          <div>

            <h1 className="
            text-2xl
            font-black
            gradient
            ">
              Momentum
            </h1>

            <p className="
            text-xs
            text-slate-400
            ">
              AI Fitness Coach
            </p>

          </div>


        </div>


      </div>



      {/* Navigation */}


      <nav className="space-y-3">


        {
          menuItems.map((item)=>{


            const Icon=item.icon;


            return (

              <NavLink

              key={item.path}

              to={item.path}

              className={({isActive})=>

              `relative flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group

              ${
                isActive
                ?
                "bg-gradient-to-r from-indigo-600/80 to-purple-600/80 shadow-lg shadow-indigo-500/20"
                :
                "hover:bg-white/10"
              }

              `
              
              }

              >


                <Icon 
                size={22}
                className="
                group-hover:scale-110
                transition
                "
                />


                <span className="
                font-semibold
                ">
                  {item.name}
                </span>


              </NavLink>


            )

          })
        }


      </nav>



      {/* Bottom AI Card */}


      <div className="
      absolute
      bottom-6
      left-6
      right-6
      glass
      rounded-3xl
      p-5
      ">


        <div className="
        flex
        items-center
        gap-3
        mb-3
        ">


          <Sparkles
          className="text-purple-400"
          size={20}
          />


          <h3 className="
          font-bold
          ">
            AI Coach
          </h3>


        </div>



        <p className="
        text-sm
        text-slate-400
        mb-4
        ">

        Your personalized fitness journey powered by AI.

        </p>



        <button
        className="
        w-full
        py-3
        rounded-xl
        bg-gradient-to-r
        from-indigo-500
        to-purple-600
        font-semibold
        "
        >

          Upgrade

        </button>


      </div>



    </motion.aside>


  );

}