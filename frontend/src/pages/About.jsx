import React from "react";
import { assets } from "../assets/assets";
import {
  MapPin,
  Landmark,
  Vote,
  School,
  Building2,
  Tag,
  Home,
  Users,
  Languages,
  UserCheck,
  Layers,
  BookOpen,
  ClipboardCheck,
  Star,
  PlusCircle,
  Soup,
  Mic,
  Stethoscope,
  Leaf,
  Trash2,
} from "lucide-react";
import Footer from "../components/Footer";

const About = () => {
  return (
    <div className="bg-gradient-to-b from-gray-100 to-white min-h-screen py-10 px-4 md:px-8">
      <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl p-10 border border-gray-200">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6 tracking-wide border-b-2 border-gray-300 pb-4">
          ಸರ್ಕಾರಿ ಪ್ರೌಢಶಾಲೆ ಹುಲಿಕಟ್ಟಿ ಬಗ್ಗೆ ಮಾಹಿತಿ
        </h1>

        <div className="overflow-hidden rounded-2xl shadow-lg mb-8">
          <img
            src={assets.ghs1}
            alt="Government High School Hulikatti"
            className="w-full h-96 object-cover brightness-90 contrast-125 saturate-150 transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* School Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg text-gray-700 font-medium leading-relaxed">
          <div className="flex gap-3 items-center">
            <MapPin size={20} className="text-blue-600" />
            <p>
              <span className="font-semibold">ಜಿಲ್ಲೆ:</span> ಹಾವೇರಿ (2911)
            </p>
          </div>

          <div className="flex gap-3 items-center">
            <Landmark size={20} className="text-green-600" />
            <p>
              <span className="font-semibold">ತಾಲೂಕು (ಬ್ಲಾಕ್):</span>{" "}
              ರಾಣೆಬೆನ್ನೂರು (291114)
            </p>
          </div>

          <div className="flex gap-3 items-center">
            <Vote size={20} className="text-purple-600" />
            <p>
              <span className="font-semibold">ಮತಕ್ಷೇತ್ರದ ಹೆಸರು:</span>{" "}
              ರಾಣೆಬೆನ್ನೂರು
            </p>
          </div>

          <div className="flex gap-3 items-center">
            <School size={20} className="text-orange-600" />
            <p>
              <span className="font-semibold">ಶಾಲೆ ಹೆಸರು:</span> ಸರ್ಕಾರಿ
              ಪ್ರೌಢಶಾಲೆ ಹುಲಿಕಟ್ಟಿ
            </p>
          </div>

          <div className="flex gap-3 items-center">
            <Building2 size={20} className="text-rose-600" />
            <p>
              <span className="font-semibold">ಶಾಲೆಯ ನಿರ್ವಹಣೆ:</span> ಶಿಕ್ಷಣ
              ಇಲಾಖೆ
            </p>
          </div>

          <div className="flex gap-3 items-center">
            <Tag size={20} className="text-gray-600" />
            <p>
              <span className="font-semibold">ಶಾಲೆ ಐಡಿ:</span> 29111405103
            </p>
          </div>

          <div className="flex gap-3 items-center">
            <Home size={20} className="text-indigo-600" />
            <p>
              <span className="font-semibold">ಸ್ಥಳೀಯತೆ:</span> ಗ್ರಾಮೀಣ
            </p>
          </div>

          <div className="flex gap-3 items-center">
            <Users size={20} className="text-cyan-600" />
            <p>
              <span className="font-semibold">ಶಾಲೆಯ ಪ್ರಕಾರ:</span> ಸಹಶಿಕ್ಷಣ
              (Co-Education)
            </p>
          </div>

          <div className="flex gap-3 items-center">
            <Languages size={20} className="text-pink-600" />
            <p>
              <span className="font-semibold">ಕಲಿಕೆಯ ಮಾಧ್ಯಮ:</span> ಕನ್ನಡ
            </p>
          </div>

          <div className="flex gap-3 items-center">
            <UserCheck size={20} className="text-lime-600" />
            <p>
              <span className="font-semibold">ಒಟ್ಟು ದಾಖಲಾತಿ:</span> 106
              ವಿದ್ಯಾರ್ಥಿಗಳು
            </p>
          </div>
        </div>

        {/* School Facilities */}
        <div className="mt-10 text-gray-800 space-y-6">
          <h2 className="text-2xl font-bold border-b pb-2 flex items-center gap-2">
            <Layers size={22} /> ಶಾಲೆಯ ಮೂಲಭೂತ ಸೌಕರ್ಯಗಳು
          </h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>ಆಧುನಿಕ ಕಟ್ಟಡದ ಸೌಲಭ್ಯಗಳು ಮತ್ತು ವಾಯುಸಂಚಾರಿತ ತರಗತಿಗೋಡೆಗಳು</li>
            <li>ವಿಶಾಲವಾದ ಆಟದ ಮೈದಾನ</li>
            <li>ಸಮೃದ್ಧ ಗ್ರಂಥಾಲಯ ಹಾಗೂ ವಿಜ್ಞಾನ ಪ್ರಯೋಗಾಲಯ</li>
            <li>ಶೌಚಾಲಯ, ಕುಡಿಯುವ ನೀರಿನ ವ್ಯವಸ್ಥೆ, ಕೈತೊಳೆಯುವ ವ್ಯವಸ್ಥೆ</li>
            <li>ಸಿಇಸಿ ಬೋರ್ಡ್ ಅಳವಡಿಸಿರುವ ಡಿಜಿಟಲ್ ಕ್ಲಾಸ್‌ರೂಮ್‌ಗಳು</li>
          </ul>

          {/* Teacher Info */}
          <h2 className="text-2xl font-bold border-b pb-2 flex items-center gap-2">
            <BookOpen size={22} /> ಶಿಕ್ಷಕರ ಬಗ್ಗೆ ಮಾಹಿತಿ
          </h2>
          <ul className="list-disc list-inside">
            <li>8 ಮಂದಿ ಅರ್ಹ ಶಿಕ್ಷಕರು ವಿವಿಧ ವಿಷಯಗಳಲ್ಲಿ ಪರಿಣತರು</li>
            <li>ವಿದ್ಯಾರ್ಥಿ-ಶಿಕ್ಷಕ ಅನುಪಾತ: 13:1</li>
            <li>ಕಲ್ಪನೆಗನುಗುಣವಾಗಿ ಬೋಧನೆ ಮತ್ತು ಮನೋರಂಜನೆಯ ಮೂಲಕ ಕಲಿಕೆ</li>
          </ul>

          {/* Achievements */}
          <h2 className="text-2xl font-bold border-b pb-2 flex items-center gap-2">
            <ClipboardCheck size={22} /> ಶೈಕ್ಷಣಿಕ ಸಾಧನೆಗಳು
          </h2>
          <ul className="list-disc list-inside">
            <li>ಹಾಲಿ ಎಸ್ಸೆಸ್ಸೆಲ್ಸಿ ಫಲಿತಾಂಶ ಶೇಕಡಾ 94%</li>
            <li>ಪ್ರತಿವರ್ಷ ಶಾಲಾ ಮಟ್ಟದ ವಿಜ್ಞಾನ ಪ್ರಾಜೆಕ್ಟ್‌ಗಳಲ್ಲಿ ಪುರಸ್ಕಾರ</li>
            <li>
              ಕರ್ನಾಟಕ ರಾಜ್ಯ ಸ್ಕೌಟ್ಸ್ ಮತ್ತು ಗೈಡ್ಸ್‌ನಲ್ಲಿ ವಿದ್ಯಾರ್ಥಿಗಳ ಸಕ್ರಿಯ
              ಪಾಲ್ಗೊಳ್ಳುವುದು
            </li>
            <li>
              ಸಾಂಸ್ಕೃತಿಕ ಸ್ಪರ್ಧೆಗಳಲ್ಲಿ ತಾಲ್ಲೂಕು ಹಾಗೂ ಜಿಲ್ಲಾ ಮಟ್ಟದ ಬಹುಮಾನಗಳು
            </li>
          </ul>

          {/* Additional Info */}
          <h2 className="text-2xl font-bold border-b pb-2 flex items-center gap-2">
            <PlusCircle size={22} /> ಹೆಚ್ಚುವರಿ ಮಾಹಿತಿ
          </h2>
          <ul className="list-disc list-inside">
            <li>ವಿದ್ಯಾರ್ಥಿಗಳ ಮಧ್ಯಾಹ್ನದ ಬಿಸಿಯೂಟ ಯೋಜನೆ ನಿರಂತರ</li>
            <li>ನಿತ್ಯ ಪ್ರಾರ್ಥನೆ ಹಾಗೂ ಪ್ರೇರಣಾತ್ಮಕ ಭಾಷಣಗಳು</li>
            <li>ಆರೋಗ್ಯ ತಪಾಸಣೆ ಶಿಬಿರ, ಪರಿಸರ ದಿನಾಚರಣೆ, ಸ್ವಚ್ಛತಾ ಅಭಿಯಾನ</li>
          </ul>
        </div>

        <div className="mt-12 text-center text-gray-600 italic text-lg">
          ಈ ಶಾಲೆಯು ಹಾವೇರಿ ಜಿಲ್ಲೆಯ ಗ್ರಾಮೀಣ ಭಾಗದಲ್ಲಿ ಇದ್ದರೂ, ಅದರ ಶೈಕ್ಷಣಿಕ ಮಟ್ಟ,
          ಶಿಕ್ಷಕರ ಶ್ರದ್ಧೆ ಹಾಗೂ ವಿದ್ಯಾರ್ಥಿಗಳ ಸಾಧನೆಗಳಿಂದ ವಿಭಿನ್ನ ಸ್ಥಾನ ಹೊಂದಿದೆ.
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
