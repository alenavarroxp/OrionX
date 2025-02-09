import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";

let genAI: GoogleGenerativeAI;
let model: GenerativeModel;

export function setGeminiAPI() {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  genAI = new GoogleGenerativeAI(apiKey);
  model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
}

export async function geminiAPI(input: string) {
  const context = `You are a virtual assistant named OrionX, created by [alenavarroxp](https://github.com/alenavarroxp). Your purpose is to assist users with technical questions and provide guidance.`;

  const fullPrompt = `${context}\n\nUser input: ${input}`;


  try {
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    if (error)
      return "The AI model is not available to respond to that prompt. Please try again with a different prompt.";
  }
}
