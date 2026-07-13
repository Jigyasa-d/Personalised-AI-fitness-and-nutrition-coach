import dotenv from "dotenv";
dotenv.config();

import groq from "./services/ai/groq.service.js";

async function test() {
  try {
    const response = await groq.chat.completions.create({
      model: process.env.AI_MODEL,
      messages: [
        {
          role: "user",
          content: "Say hello in one sentence.",
        },
      ],
    });

    console.log(response.choices[0].message.content);

  } catch (err) {
    console.error(err);
  }
}

test();