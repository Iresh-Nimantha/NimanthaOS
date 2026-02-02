import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

// Initialize Gemini Client
// Note: API Key must be in process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const SYSTEM_INSTRUCTION = `
You are an AI assistant for Nimantha S.I.'s portfolio website. 
Nimantha is a Software Engineering Undergraduate at the University of Colombo (2022-2027).
He has expertise in:
- Full Stack: MERN, Next.js, Laravel
- Mobile: Java, Kotlin
- AI/Automation: Gemini API, n8n
- Projects: Workshop Job Tracker, Eco-Tourism QR Explorer, Automated LinkedIn Job Finder.

Your goal is to answer questions about Nimantha professionally.
If asked about his contact, provide his email: ireshnimantha608@gmail.com.
Keep answers concise and helpful.
`;

let chatSession: Chat | null = null;

export const getChatSession = (): Chat => {
  if (!chatSession) {
    chatSession = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
  }
  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const chat = getChatSession();
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "I didn't receive a text response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I'm having trouble connecting to the AI service right now. Please check the API Key configuration.";
  }
};
