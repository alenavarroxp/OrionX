import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";

let genAI: GoogleGenerativeAI;
let model: GenerativeModel;

export function setGeminiAPI() {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  console.log(apiKey);
  genAI = new GoogleGenerativeAI(apiKey);
  model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
}

export async function geminiAPI(input: string) {
  const result = await model.generateContent(input);
  const response = await result.response;
  const text = response.text()
  console.log(text);
  return text;
}
