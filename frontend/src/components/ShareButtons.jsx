import React from "react";
import { motion } from "framer-motion"; // Corrected import

const ShareButtons = ({ title, url }) => {
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  return (
    <div className="flex gap-4 justify-center text-center text-primary">
      <motion.a
        whileHover={{ scale: 1.1, color: "#000" }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="px-4 py-1 border border-blue-400 rounded-lg my-2 mx-2 bg-blue-100 hover:bg-blue-200"
        target="_blank"
        rel="noopener noreferrer"
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`}
      >
        ಲಿಂಕ್ಡ್‌ಇನ್‌ನಲ್ಲಿ ಹಂಚಿ
      </motion.a>

      <motion.a
        whileHover={{ scale: 1.1, color: "#000" }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="px-4 py-1 border border-yellow-400 rounded-lg my-2 mx-2 bg-yellow-100 hover:bg-yellow-200"
        target="_blank"
        rel="noopener noreferrer"
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
      >
        ಟ್ವಿಟ್ಟರ್‌ನಲ್ಲಿ ಹಂಚಿ
      </motion.a>

      <motion.a
        whileHover={{ scale: 1.1, color: "#000" }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="px-4 py-1 border border-green-400 rounded-lg my-2 mx-2 bg-green-100 hover:bg-green-200"
        target="_blank"
        rel="noopener noreferrer"
        href={`https://wa.me/?text=*${encodedTitle}*%20${encodedUrl}`}
      >
        ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಹಂಚಿ
      </motion.a>
    </div>
  );
};

export default ShareButtons;
