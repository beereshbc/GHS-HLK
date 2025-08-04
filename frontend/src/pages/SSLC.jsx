import React from "react";
import { sslcToppers } from "../assets/assets";
import { Award, Star, Smile, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { useState } from "react";

const subjectNamesInKannada = {
  Kannada: "ಕನ್ನಡ",
  English: "ಇಂಗ್ಲಿಷ್",
  Hindi: "ಹಿಂದಿ",
  Mathematics: "ಗಣಿತ",
  Science: "ವಿಜ್ಞಾನ",
  SocialScience: "ಸಮಾಜಶಾಸ್ತ್ರ",
};

// Framer Motion slide-up animation
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const SSLC = () => {
  const { axios } = useAppContext();
  const [toppers, setToppers] = useState([]);

  useEffect(() => {
    fetchToppers();
  }, []);

  const fetchToppers = async () => {
    try {
      const { data } = await axios.get("/api/admin/get-toppers");
      if (data.success) {
        setToppers(data.toppers);
        toast.success("SSLC Toppers list");
      } else {
        toast.error(data.message);
      }

      setLoading(false);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="bg-white py-10 px-4 min-h-screen overflow-x-hidden">
      {/* Title */}
      <h1 className="text-4xl font-bold text-center text-[#8A0000] mb-10 underline decoration-yellow-400">
        ನಮ್ಮ ಶಾಲೆಯ SSLC ಟಾಪರ್ ವಿದ್ಯಾರ್ಥಿಗಳು
      </h1>

      {/* Scrollable Card List */}
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-10 pb-20">
        {toppers.map((student, index) => (
          <motion.div
            key={student.id}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardVariants}
            className="group shadow-xl rounded-2xl overflow-hidden flex flex-col lg:flex-row transition-transform duration-500 ease-in-out hover:scale-[1.01] border bg-white"
          >
            {/* Image Section */}
            <div className="lg:w-1/3 w-full bg-yellow-300 p-4 flex flex-col items-center justify-center">
              <img
                src={student.image}
                alt={student.name}
                className="w-full h-72 object-cover rounded-md shadow-md transition-transform duration-500 group-hover:rotate-1"
              />
              <p className="mt-4 text-center text-lg font-semibold text-blue-500 flex items-center gap-2">
                ಧನ್ಯವಾದಗಳು <Smile className="w-5 h-5" />
              </p>
            </div>

            {/* Details Section */}
            <div className="lg:w-2/3 w-full p-6 sm:p-8 z-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#8A0000] mb-2 flex items-center gap-2">
                <Award className="w-6 h-6 text-yellow-500" />
                {student.name}
              </h2>

              {/* Passout Year */}
              <p className="mb-4 text-gray-600 text-sm flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                ವರ್ಷ:{" "}
                <span className="font-semibold text-[#8A0000]">
                  {student.passoutYear}
                </span>
              </p>

              {/* Marks */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                {Object.entries(student.subjectMarks).map(([subject, mark]) => (
                  <div key={subject}>
                    <p className="text-blue-500 font-medium">
                      {subjectNamesInKannada[subject]}
                    </p>
                    <p className="text-[#8A0000] font-bold">{mark} ಅಂಕ</p>
                  </div>
                ))}
              </div>

              {/* Totals and Percentage */}
              <div className="text-base sm:text-lg text-gray-700 space-y-1">
                <p>
                  <span className="font-semibold text-[#8A0000]">
                    ಒಟ್ಟು ಅಂಕಗಳು:
                  </span>{" "}
                  {student.obtainedTotalMarks}
                </p>
                <p>
                  <span className="font-semibold text-[#8A0000]">
                    ಗರಿಷ್ಠ ಅಂಕಗಳು:
                  </span>{" "}
                  {student.maxTotalMarks}
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-semibold text-[#8A0000]">
                    ಶೇಕಡಾವಾರು:
                  </span>{" "}
                  {student.percentage}%{" "}
                  <Star className="w-5 h-5 text-yellow-500" />
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SSLC;
