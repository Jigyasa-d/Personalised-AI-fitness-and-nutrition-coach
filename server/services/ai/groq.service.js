import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

console.log("Groq Key:", process.env.GROQ_API_KEY);

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export default groq;