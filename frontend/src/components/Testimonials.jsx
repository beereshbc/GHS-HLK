import React from "react";
import { assets } from "../assets/assets";

const Testimonials = () => {
  return (
    <div className="w-full  py-12 px-4">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-12">
        {/* Vision */}
        <div className="relative w-full">
          <p className="bg-[#8A0000] absolute -top-4 -left-4 text-white w-28 text-center px-2 py-2 rounded-lg shadow-md text-lg font-medium">
            ದೃಷ್ಟಿಕೋನ
          </p>
          <div className="bg-blue-600 text-white px-8 py-6 rounded-2xl shadow-lg border border-blue-700 text-center">
            <p className="text-xl md:text-2xl font-semibold leading-relaxed">
              "ಪ್ರತಿಯೊಬ್ಬ ವಿದ್ಯಾರ್ಥಿಗೆ ಸಮಾನ ಶಿಕ್ಷಣದ ಅವಕಾಶ ನೀಡಿ, ಸಾರ್ಥಕ ಹಾಗೂ
              <br className="hidden sm:block" />
              ಸಂಪೂರ್ಣ ವ್ಯಕ್ತಿತ್ವದ ಬೆಳವಣಿಗೆಗೆ ಮಾರ್ಗದರ್ಶನ ಮಾಡುವುದು."
            </p>
          </div>
        </div>

        {/* Mission */}
        <div className="relative w-full">
          <p className="bg-blue-600 absolute -top-4 -right-4 text-white w-24 text-center px-2 py-2 rounded-lg shadow-md text-lg font-medium">
            ಉದ್ದೇಶ
          </p>
          <div className="bg-[#8A0000] text-white px-8 py-6 rounded-2xl shadow-lg border border-[#8A0000] text-center">
            <p className="text-xl md:text-2xl font-semibold leading-relaxed">
              “ನೈತಿಕ ಮೌಲ್ಯಗಳು, ತಂತ್ರಜ್ಞಾನ ಅರಿವು ಮತ್ತು ಜೀವನ ಕೌಶಲ್ಯಗಳನ್ನು
              ಮಕ್ಕಳಲ್ಲಿ ಬೆಳೆಸುವುದು."
            </p>
          </div>
        </div>

        {/* Image with Caption */}
        <div className="w-full relative max-w-4xl rounded-2xl overflow-hidden shadow-2xl">
          <img
            src={assets.ghs4}
            alt="School Image"
            className="w-full h-[250px] object-cover brightness-[0.8] contrast-[1.2]"
          />
          <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent px-4 py-2 text-center">
            <p className="text-white text-base md:text-2xl font-semibold drop-shadow">
              "ನಮ್ಮ ಶಾಲೆ, ನಮ್ಮ ಹೆಮ್ಮೆ!"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
