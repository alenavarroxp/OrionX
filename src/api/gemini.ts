import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";

let genAI: GoogleGenerativeAI;
let model: GenerativeModel;

export function setGeminiAPI() {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  genAI = new GoogleGenerativeAI(apiKey);
  model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
}

export async function geminiAPI(input: string) {
  try {
    const result = await model.generateContent(input);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    if (error)
      return "The AI model is not available to respond that prompt. Please try again with a different prompt.";
  }
}
