// /* eslint-env node */
// import express from "express";
// import axios from "axios";
// import cors from "cors";
// import dotenv from "dotenv";

// dotenv.config(); // Load .env variables

// const app = express();
// app.use(cors());
// app.use(express.json({ limit: "5mb" })); // Increase payload limit if needed

// // Test route
// app.get("/api/test", (req, res) => {
//   res.json({ message: "Server is running!" });
// });

// // OpenRouter API proxy route
// app.post("/api/analyze", async (req, res) => {
//   try {
//     const response = await axios.post(
//       "https://openrouter.ai/api/v1/chat/completions",
//       {
//         model: "mistralai/mistral-7b-instruct", // or "openai/gpt-4-turbo" / "anthropic/claude-3-sonnet"
//         messages: req.body.messages,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     res.json(response.data);
//   } catch (error) {
//     console.error("OpenRouter API error:", error.response?.data || error.message);
//     res.status(500).json({ error: "OpenRouter API error" });
//   }
// });

// const PORT = 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


/* eslint-env node */
import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // Load .env variables

const app = express();
app.use(cors());
app.use(express.json({ limit: "5mb" })); // Increase payload limit if needed

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Server is running!" });
});

// Groq API proxy route
app.post("/api/analyze", async (req, res) => {
  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions", // ✅ Groq API
      {
        model: "llama3-70b-8192", // ✅ Recommended Groq model
        messages: req.body.messages,
        max_tokens: req.body.max_tokens || 1500,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`, // ✅ Updated environment variable
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Groq API error:", error.response?.data || error.message);
    res.status(500).json({ error: "Groq API error" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
