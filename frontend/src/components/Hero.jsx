import React from "react";
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <div className="relative w-full h-[90vh]">
      {/* Background Image */}
      <img
        src={assets.ghs8}
        alt="Hero Banner"
        className="w-full h-full object-cover brightness-110 contrast-125"
      />

      {/* Dark Gradient Overlay on left */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>

      {/* Text Content */}
      <div className="absolute inset-0 flex flex-col justify-center px-4 md:px-16 text-white z-10">
        <div className="max-w-2xl space-y-4">
          <h1 className="text-3xl md:text-6xl text-center font-bold leading-tight">
            ಸರ್ಕಾರಿ ಪ್ರೌಢಶಾಲೆ ಹುಲಿಕಟ್ಟಿ
          </h1>
          <div className="flex gap-6 text-lg justify-between md:text-xl font-medium">
            <p>ಜಿ||ಹಾವೇರಿ</p>
            <p>ತಾ||ರಾಣೆಬೆನ್ನೂರು</p>
          </div>
        </div>

        {/* Sanskrit Subtext */}
        <div className="mt-12 max-w-2xl">
          <p className="text-bd md:text-2xl italic text-center font-light leading-relaxed">
            ವಿದ್ಯಾ ದದಾತಿ ವಿನಯಂ, ವಿನಯಾದ್ ಯಾತಿ ಪಾತ್ರತಾಮ್। <br />
            ಪಾತ್ರತ್ವಾತ್ ಧನಮಾಪ್ನೋತಿ, ಧನಾತ್ ಧರ್ಮಂ ತತಃ ಸುಖಮ್॥
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
