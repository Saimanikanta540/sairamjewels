const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const generateDesignBrief = async (prompt) => {
  if (!prompt) return "";

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are an expert jewelry designer and consultant at a high-end luxury shop. 
      A client has provided a basic idea for a custom piece: "${prompt}".
      
      Your task is to:
      1. Refine this description into a professional design brief.
      2. Suggest specific materials (e.g., 18k Rose Gold, Platinum), gemstones (e.g., ethically sourced VS1 diamonds, Morganite), and setting styles (e.g., Pavé, Cathedral setting) that would elevate the design.
      3. Keep the tone elegant, sophisticated, and professional.
      
      Respond only with the refined description, about 2-3 paragraphs.`,
    });

    return response.text || "Unable to refine design at this time. Please try again or submit your basic idea.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Something went wrong with the AI consultant.");
  }
};

module.exports = { generateDesignBrief };