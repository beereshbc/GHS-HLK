import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#8A0000] text-white px-6 py-10 md:px-16 mt-10 rounded-t-3xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo & Address */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <img
            src={assets.ghs_logo}
            alt="School Logo"
            className="w-24 h-24 object-contain mb-4"
          />
          <p className="text-lg font-semibold">ಸರ್ಕಾರಿ ಪ್ರೌಢಶಾಲೆ ಹುಲಿಕಟ್ಟಿ</p>
          <p>ತಾ|| ರಾಣೆಬೆನ್ನೂರು</p>
          <p>ಪೋಸ್ಟ್|| ಕರೂರು - 581145</p>
        </div>

        {/* Navigation Links */}
        <div className="text-center md:text-left">
          <p className="text-lg font-bold mb-4">ಪರಿವಿಡಿ</p>
          <div className="flex flex-col gap-2">
            {/* Replace "#" with your actual routes */}
            <Link to="/" className="hover:text-yellow-300 transition">
              ಮುಖಪುಟ
            </Link>
            <Link to="/about" className="hover:text-yellow-300 transition">
              ನಮ್ಮ ಬಗ್ಗೆ
            </Link>
            <Link to="/blogs" className="hover:text-yellow-300 transition">
              ಬ್ಲಾಗ್
            </Link>
            <Link to="/gallery" className="hover:text-yellow-300 transition">
              ಗ್ಯಾಲರಿ
            </Link>
            <Link to="/contact" className="hover:text-yellow-300 transition">
              ಸಂಪರ್ಕಿಸಿ
            </Link>
          </div>
        </div>

        <div className="text-center md:text-left">
          <p className="text-lg font-bold mb-4">ಉಪಯುಕ್ತ ಲಿಂಕುಗಳು</p>
          <div className="flex flex-col gap-2">
            <a
              href="https://kseab.karnataka.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-300 transition"
            >
              ಕೆಎಸ್‌ಇಎಎಬಿ (SSLC ಬೋರ್ಡ್)
            </a>
            <a
              href="https://chat.openai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-300 transition"
            >
              ಚಾಟ್‌ಜಿಪಿಟಿ
            </a>
            <a
              href="https://gemini.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-300 transition"
            >
              ಜೆಮಿನಿ
            </a>
            <a
              href="https://www.deepseek.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-300 transition"
            >
              ಡೀಪ್‌ಸೀಕ್
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-300 transition"
            >
              ಯೂಟ್ಯೂಬ್
            </a>
            <a
              href="https://kseeb.karnataka.gov.in/sslc2025modelqp/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-300 transition"
            >
              ಮಾದರಿ ಪ್ರಶ್ನೆಪತ್ರಿಕೆಗಳು
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="mt-10 text-center text-sm text-gray-300">
        © {new Date().getFullYear()} ಸರ್ಕಾರಿ ಪ್ರೌಢಶಾಲೆ ಹುಲಿಕಟ್ಟಿ. ಎಲ್ಲಾ
        ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.
      </div>
    </footer>
  );
};

export default Footer;
