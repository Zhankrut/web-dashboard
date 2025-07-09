import axios from "axios";

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

    const response = await axios.post("http://localhost:5000/api/analyze", {
      messages: [
        { role: "system", content: "You are an expert in vulnerability analysis." },
        { role: "user", content: prompt },
      ],
    });

    return response.data.choices[0].message.content;
  } catch (err) {
    console.error("OpenRouter Analysis Error:", err.message);
    return "❌ Failed to generate analysis. Check your API key or network.";
  }
}
