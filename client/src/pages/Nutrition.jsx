import { useState } from "react";
import api from "../services/api";

export default function Nutrition(){

    const [plan,setPlan]=useState(null);

    async function generate(){

        try{

            const res=await api.post("/nutrition/generate");

            setPlan(res.data.data);

        }

        catch(err){

            alert(err.response?.data?.message);

        }

    }

    return(

        <div style={{padding:40}}>

            <h1>

                Nutrition Generator

            </h1>

            <button onClick={generate}>

                Generate Nutrition

            </button>

            <pre>

{JSON.stringify(plan,null,2)}

            </pre>

        </div>

    );

}