
import { GoogleGenAI, Type } from "@google/genai";

// Strictly follow SDK initialization guidelines by using process.env.API_KEY directly
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getTrendAnalysis = async (currentStyles: any[]) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze these fashion styles and provide 3 smart business recommendations: ${JSON.stringify(currentStyles)}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              impact: { type: Type.STRING, description: "High, Medium, or Low" }
            },
            required: ["title", "description", "impact"]
          }
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Error:", error);
    return [
      { title: "Increase Production of FW24", description: "Holiday demand is projected to spike by 25%.", impact: "High" },
      { title: "Liquidate SS24 Surplus", description: "Discount seasonal items to free up warehouse space.", impact: "Medium" }
    ];
  }
};

export const getTrendForecast = async (currentStyles: any[]) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Based on the following collection: ${JSON.stringify(currentStyles)}, forecast 3 upcoming fashion trends for the next season. Include a confidence score (0-100) and an estimated time frame.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              trendName: { type: Type.STRING },
              explanation: { type: Type.STRING },
              popularity: { type: Type.STRING },
              suggestion: { type: Type.STRING },
              confidenceScore: { type: Type.NUMBER },
              timeFrame: { type: Type.STRING }
            },
            required: ["trendName", "explanation", "popularity", "suggestion", "confidenceScore", "timeFrame"]
          }
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Forecast Error:", error);
    return null;
  }
};

export const getMarketSentiment = async (currentStyles: any[]) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Perform a market sentiment analysis for these fashion items: ${JSON.stringify(currentStyles)}. Predict how 4 different consumer demographics will react.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              segment: { type: Type.STRING, description: "Demographic segment (e.g., Gen Z, Luxury, Eco-Conscious)" },
              sentimentScore: { type: Type.NUMBER, description: "0-100 score of positive reception" },
              momentum: { type: Type.STRING, description: "Rising, Stable, or Declining" },
              strategicPivot: { type: Type.STRING, description: "Actionable advice for this segment" }
            },
            required: ["segment", "sentimentScore", "momentum", "strategicPivot"]
          }
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Sentiment Error:", error);
    return null;
  }
};

export const generateDesignNotes = async (styleName: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate professional design and manufacturing notes for a fashion piece named "${styleName}". Include fabric suggestions and key aesthetic features.`,
    });
    return response.text;
  } catch (error) {
    return "Failed to generate AI notes.";
  }
};
