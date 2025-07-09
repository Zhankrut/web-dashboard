import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export async function analyzeScanData(scanData, context = "ZAP scan results") {
  try {
    const prompt = `
You are an expert cybersecurity analyst. Analyze the following ${context}. Provide:
- A summary of key findings.
- Potential risks and impacts.
- Recommended fixes and mitigation steps.
- Risk prioritization (Critical, High, Medium, Low).
- Short bullet points.

Data:
${JSON.stringify(scanData, null, 2)}
    `;

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o",
        messages: [
          { role: "system", content: "You are an expert in vulnerability analysis." },
          { role: "user", content: prompt },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (err) {
    console.error("OpenAI Analysis Error:", err.message);
    return "❌ Failed to generate analysis. Check your API key or network.";
  }
}
