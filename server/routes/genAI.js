import { Router } from "express"
import { GoogleGenerativeAI } from "@google/generative-ai"

const router = Router();
const genai = new GoogleGenerativeAI(process.env.GENAI_KEY);

router.post("/generate-content", async (req, res) => {
   const { input, history } = req.body;
   try {
      const model = genai.getGenerativeModel({
         model: 'gemini-1.5-flash',
         systemInstruction: 'Your name is AutoGenie. Reply with your name when user calls you for the very first time.',
      });
      const chat = model.startChat({
         history,
         generationConfig: {
            // maxOutputTokens: 100,
         },
      });
      const result = await chat.sendMessage(input);
      const text = result.response.text();
      res.status(200).json({ text, chat });
   } catch (error) {
      console.error('Error generating content:', error);
      res.status(500).json({ error: 'Failed to generate content' });
   }
});

export default router