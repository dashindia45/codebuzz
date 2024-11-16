import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

type AiSuggestionsProps = {
    userCode: string | undefined;
  };

const AiSuggestions = ({ userCode }: AiSuggestionsProps) => {
  const [aiSuggestions, setAiSuggestions] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const AI_API_KEY = process.env.NEXT_PUBLIC_AI_API_KEY as string;
  const genAI = new GoogleGenerativeAI(AI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const getAiSuggestions = async () => {

    //const sourceCode = "qwerty";

    if (!userCode) {
      alert("Please write some code before requesting AI suggestions.");
      return;
    }

    try {
      setIsLoading(true);
      const prompt = `Provide suggestions for optimization, improvements, and error identification for the following code:\n\n${userCode}`;
      const result = await model.generateContent(prompt);

      setAiSuggestions(result.response.text());
    } catch (error) {
      console.error("Error fetching AI suggestions:", error);
      alert("Failed to fetch AI suggestions. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: "16px", backgroundColor: "#282c34", color: "#fff", borderRadius: "8px" }}>
      <button
        onClick={getAiSuggestions}
        style={{
          padding: "8px 16px",
          backgroundColor: "#61dafb",
          color: "#000",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginBottom: "16px",
        }}
        disabled={isLoading}
      >
        {isLoading ? "Generating Suggestions..." : "Generate AI Suggestions"}
      </button>
      <div
        style={{
          marginTop: "8px",
          whiteSpace: "pre-wrap",
          backgroundColor: "#1c1f26",
          padding: "8px",
          borderRadius: "4px",
          maxHeight: "200px",
          overflowY: "auto",
        }}
      >
        {aiSuggestions || "No suggestions yet. Click the button to fetch suggestions."}
      </div>
    </div>
  );
};

export default AiSuggestions;
