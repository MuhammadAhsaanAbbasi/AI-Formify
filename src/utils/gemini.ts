import { HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import {GoogleGenAI } from "@google/genai"

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY as string;
const genAI = new GoogleGenAI({
    apiKey:apiKey
});

const model = 'gemini-2.5-flash-preview-05-20';

const generationConfig = {
    responseMimeType: "application/json",
};


const safetySettings = [
    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
];


export async function chatSession(input: string) {
  const response = await genAI.models.generateContent({
    model: model,
    contents: input,
    config: {
      ...generationConfig,
      safetySettings,
    },
  });
  
  return response.text;
}