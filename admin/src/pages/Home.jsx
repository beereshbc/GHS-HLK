import React from "react";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="min-h-screen  flex flex-col justify-center items-center p-6 overflow-hidden">
      {/* School Name */}
      <motion.h1
        className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-blue-800 text-center leading-tight"
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        ಸರ್ಕಾರಿ ಪ್ರೌಢಶಾಲೆ <br /> ಹುಲಿಕಟ್ಟಿ
      </motion.h1>

      {/* Admin Panel Title */}
      <motion.h2
        className="text-xl sm:text-2xl md:text-3xl mt-6 font-bold text-white bg-blue-600 px-6 py-3 rounded-full shadow-lg"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        🔐 Admin Panel
      </motion.h2>

      {/* Description */}
      <motion.p
        className="mt-6 text-center text-blue-900 max-w-xl text-base sm:text-lg leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        This admin panel empowers teachers to manage student data, upload
        results, and post announcements with ease. A smart digital step toward
        nurturing disciplined, bright minds!
      </motion.p>
    </div>
  );
};

export default Home;
