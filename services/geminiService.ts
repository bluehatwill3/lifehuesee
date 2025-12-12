import { GoogleGenAI, Type } from "@google/genai";
import { Palette } from '../types';

// Ensure the API key is available
const apiKey = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey });

export const generatePalettesFromKeyword = async (keyword: string): Promise<Palette[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate 4 distinct, harmonious color palettes based on the theme or keyword: "${keyword}". 
      Each palette should have a creative name, a brief 1-sentence description explaining the mood, and exactly 5 hex color codes.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              description: { type: Type.STRING },
              colors: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            required: ["name", "description", "colors"]
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as Palette[];
    }
    return [];
  } catch (error) {
    console.error("Error generating palettes:", error);
    return [];
  }
};
