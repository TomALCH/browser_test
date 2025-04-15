
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests are allowed." });
  }

  const { prompt } = req.body;

  if (!prompt || prompt.trim() === "") {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });

    const imageUrl = response.data[0]?.url;

    if (!imageUrl) {
      return res.status(500).json({ error: "No image returned from OpenAI." });
    }

    return res.status(200).json({ imageUrl });
  } catch (error) {
    console.error("OpenAI error:", error);
    return res.status(500).json({ error: error.message || "Image generation failed" });
  }
}
