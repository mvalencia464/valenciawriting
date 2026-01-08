
import { GoogleGenAI, Type } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function analyzeComposition(text: string) {
  if (!text.trim()) return null;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Please analyze this writing passage against the IEW checklist criteria:\n\n${text}`,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            items: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  status: { type: Type.STRING },
                  currentOccurrences: { type: Type.NUMBER },
                  feedback: { type: Type.STRING }
                },
                required: ["id", "status", "currentOccurrences"]
              }
            },
            bannedWordsFound: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            suggestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["score", "items", "bannedWordsFound", "suggestions"]
        }
      }
    });

    const result = JSON.parse(response.text.trim());
    return result;
  } catch (error) {
    console.error("AI Analysis Error:", error);
    return null;
  }
}
