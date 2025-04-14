
export default async function handler(req, res) {
  try {
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        prompt: "A cute cartoon cat sitting on a cloud",
        n: 1,
        size: "1024x1024",
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data?.error?.message || "OpenAI error" });
    }

    return res.status(200).json({ imageUrl: data.data[0].url });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
}
