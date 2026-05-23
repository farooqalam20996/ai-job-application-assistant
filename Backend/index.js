import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// import OpenAI from "openai";
import Groq from "groq-sdk";


dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.use(cors());
app.use(express.json());

app.post("/generate", async (req, res) => {
  try {
    const { jobDescription, userData } = req.body;

    const prompt = `
You are an AI Job Application Assistant.

Your task is to carefully analyze both the job information and the candidate information,
then generate the following fields in **valid JSON only** (no extra commentary):

{
  "summary": string,
  "resume": string,
  "coverLetter": string,
  "motivationLetter": string,
  "skillMatch": number (0–100),
  "category": string ("Bad", "Fair", "Good", "Excellent", or "Top Candidate")
}

Instructions for skill matching:
- Extract all skills required from the job description.
- Extract all skills listed by the candidate.
- Compare them and calculate skillMatch as:
  (number of overlapping / total required) × 100.
- Round to the nearest whole number.
- Classify into category:
  0–25% → "Bad"
  26–50% → "Fair"
  51–70% → "Good"
  71–85% → "Excellent"
  86–100% → "Top Candidate"

Then create a tailored summary, resume, cover letter, and motivation letter
that align the candidate’s strengths with the job’s requirements.

JOB DETAILS:
${JSON.stringify(jobDescription, null, 2)}

USER DETAILS:
${JSON.stringify(userData, null, 2)}

Respond with **only valid JSON** following the above schema.
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: "You are an expert AI job application assistant." },
        { role: "user", content: prompt },
      ],
    });

    let text = completion.choices[0].message.content.trim();

    // Safely parse JSON
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      data = jsonMatch ? JSON.parse(jsonMatch[0]) : { rawText: text };
    }

    res.json({ success: true, data });
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(port, () => console.log(`🚀 Server running on http://localhost:${port}`));
