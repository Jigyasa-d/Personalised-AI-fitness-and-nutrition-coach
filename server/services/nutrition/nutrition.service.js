import groq from "../ai/groq.service.js";

export const generateNutritionAI = async (prompt) => {

const response =
await groq.chat.completions.create({

model: process.env.AI_MODEL,

messages:[
{
role:"system",
content:
"You are a professional nutrition coach. Return only JSON."
},
{
role:"user",
content:prompt
}
],

temperature:0.7

});


return response.choices[0].message.content;

};