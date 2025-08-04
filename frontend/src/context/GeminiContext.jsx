import { createContext, useState } from "react";
import run from "../config/gemini";
import React from "react";

export const GeminiContext = createContext();

const GeminiContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);

    const finalPrompt = prompt !== undefined ? prompt : input;
    setRecentPrompt(finalPrompt);
    setPrevPrompts((prev) => [...prev, finalPrompt]);

    const response = await run(finalPrompt);

    // Format response
    const responseArray = response.split("**");
    let newResponse = "";

    for (let i = 0; i < responseArray.length; i++) {
      newResponse +=
        i === 0 || i % 2 !== 1
          ? responseArray[i]
          : `<br><b>${responseArray[i]}</b>`;
    }

    // Replace * with line breaks
    const newResponse2 = newResponse.split("*").join("</br>");

    // Display word by word with delay
    const newResponseArray = newResponse2.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      delayPara(i, newResponseArray[i] + " ");
    }
    setLoading(false);
    setInput("");
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
  };

  return (
    <GeminiContext.Provider value={contextValue}>
      {props.children}
    </GeminiContext.Provider>
  );
};

export default GeminiContextProvider;
