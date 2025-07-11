/**
 * Calls the Groq API directly using fetch from the frontend
 */
export async function analyzeScanData(alerts, prompt, maxTokens = 1500) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY; // ✅ Use your Groq API key

  const body = {
    model: "llama3-70b-8192", // ✅ Recommended Groq model
    messages: [
      {
        role: "system",
        content: "You are a helpful security analyst AI. Analyze the vulnerabilities clearly.",
      },
      {
        role: "user",
        content: `${prompt}\n\n${JSON.stringify(alerts, null, 2)}`,
      },
    ],
    max_tokens: maxTokens,
  };

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Groq API Error:", errorText);
      throw new Error(`Groq API error: ${errorText}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "⚠️ No response from Groq API.";
  } catch (error) {
    console.error("Groq API call failed:", error);
    return `❌ AI Analysis failed: ${error.message}`;
  }
}
