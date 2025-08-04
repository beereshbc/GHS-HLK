import React, { useState, useRef, useEffect, useContext } from "react";
import StudentSkeleton from "../components/StudentSkeleton";
import { GeminiContext } from "../context/GeminiContext";
import { motion } from "framer-motion";

const GHS_AI = () => {
  const targetRef = useRef(null);
  const resTarget = useRef(null);
  const [showFull, setShowFull] = useState(false);

  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(GeminiContext);

  useEffect(() => {
    targetRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    resTarget.current?.scrollIntoView({ behavior: "smooth" });
  }, [resultData]);

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900 relative overflow-x-hidden">
      {/* Header */}
      <header className="py-6 px-4 md:px-8 mb-6 shadow-md">
        <h1 className="text-3xl font-bold text-blue-400 drop-shadow-md">
          GHS-HULIKATTI-AI
        </h1>
        <p className="text-sm text-[#8A0000] mt-1">
          ಸರ್ಕಾರಿ ಪ್ರೌಢಶಾಲೆ ಹುಲಿಕಟ್ಟಿ - ವಿದ್ಯಾರ್ಥಿಗಳ ಉಚಿತ ಸಹಾಯಕರಾಗಿ
        </p>
      </header>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center flex-grow text-center px-4 pb-36"
      >
        {!showResult ? (
          <div className="flex min-h-28 items-center justify-center text-center gap-y-3 flex-col py-10">
            <h2 className="text-5xl md:text-6xl font-bold leading-snug  text-blue-800 drop-shadow-sm">
              ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ <br />
              <span className="text-yellow-400 mt-1">GHS-AI ಮಿತ್ರ</span>
            </h2>
            <p className="text-md md:text-lg text-gray-700 max-w-lg mt-3">
              ಯಾವುದೇ ವಿಷಯದ ಬಗ್ಗೆ ಪ್ರಶ್ನೆ ಕೇಳಿ — ನಾನು ಸರಳವಾಗಿ ಉತ್ತರಿಸುತ್ತೇನೆ!
            </p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0.2, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="sm:px-4 px-2 min-h-96 rounded-2xl w-full sm:max-w-[60vw] md:max-w-5xl mx-auto text-left overflow-y-auto max-h-[70vh] mb-10 gap-y-10 bg-white text-gray-800 p-4 shadow-xl"
          >
            <div className="font-semibold text-lg border-b pb-2 border-[#8A0000] mb-4">
              <p className="mt-2 text-sm px-2 md:px-10">
                {showFull ? recentPrompt : recentPrompt.substring(0, 200)}{" "}
                <span
                  className="cursor-pointer text-blue-700 font-light"
                  onClick={() => setShowFull(!showFull)}
                >
                  ...{showFull ? "ಕಡಿಮೆ ತೋರಿಸು" : "ಇನ್ನಷ್ಟು ಓದಿ"}
                </span>
              </p>
            </div>

            <div className="pt-4 text-base leading-relaxed space-y-2">
              {loading ? (
                <div className="flex items-center justify-center">
                  <StudentSkeleton />
                </div>
              ) : (
                <div
                  ref={resTarget}
                  dangerouslySetInnerHTML={{ __html: resultData }}
                />
              )}
            </div>
          </motion.div>
        )}

        {/* Input Area (not absolute anymore) */}
        <div className="w-full max-w-5xl mt-8 px-4">
          <div className="relative">
            <textarea
              ref={targetRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full h-20 px-6 pr-24 rounded-2xl bg-blue-100 py-3 min-h-36 text-gray-900 text-lg outline-none placeholder-gray-500 shadow-lg resize-none"
              placeholder="ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಇಲ್ಲಿ ಟೈಪ್ ಮಾಡಿ..."
            />
            {input && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSent()}
                className="absolute right-4 bottom-4 md:bottom-5 bg-[#8A0000] hover:bg-yellow-500 text-white hover:text-black px-6 py-2 rounded-xl text-sm font-semibold shadow-lg transition-colors"
              >
                ಕಳುಹಿಸು
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Footer Note */}
      <footer className="text-xs text-center text-gray-500 pb-6 px-4">
        GHS-AI ಒಂದು ಸಹಾಯಕ ಸಾಧನವಾಗಿದೆ. ದಯವಿಟ್ಟು ಉತ್ತರಗಳ ಖಚಿತತೆ ಪರಿಶೀಲಿಸಿ.
      </footer>
    </div>
  );
};

export default GHS_AI;
