import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Notes = () => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { axios } = useAppContext();

  // Fetch data from server on mount
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const { data } = await axios.get("/api/admin/notes"); // Change to your server URL
        if (data.success) {
          setSubjects(data.notes);
          setLoading(false);
        } else {
          toast.error(data.message);
        }
      } catch (err) {
        setError("Failed to load notes 😓");
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  const filteredSubjects = subjects.filter(
    (subject) => subject.classLevel === selectedClass
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-white px-4 py-10">
      <h1 className="text-4xl font-bold text-center text-[#8A0000] mb-8 tracking-wide">
        📘 ಅಧ್ಯಯನ ಟಿಪ್ಪಣಿಗಳು (Study Notes)
      </h1>

      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* CLASS ಆಯ್ಕೆ */}
      {!selectedClass && !loading && (
        <div className="flex justify-center gap-6 mb-12">
          {[8, 9, 10].map((cls) => (
            <button
              key={cls}
              onClick={() => setSelectedClass(cls)}
              className="px-6 py-3 text-xl font-bold rounded-full border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-100 transition-all duration-300"
            >
              ತರಗತಿ {cls}
            </button>
          ))}
        </div>
      )}

      {/* ಹಿಂತಿರುಗಿ ಬಟನ್ */}
      {selectedClass && (
        <div className="text-center mb-6">
          <button
            onClick={() => setSelectedClass(null)}
            className="text-sm text-blue-600 underline hover:text-yellow-500 transition"
          >
            ← ತರಗತಿ ಬದಲಾಯಿಸಿ
          </button>
        </div>
      )}

      {/* ಟಿಪ್ಪಣಿ ಕಾರ್ಡುಗಳು */}
      {selectedClass && (
        <div className="grid gap-8 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 max-w-6xl mx-auto">
          {filteredSubjects.map((subject, index) => (
            <motion.div
              key={index}
              whileHover={{
                scale: 1.05,
                rotateZ: 1,
              }}
              transition={{ duration: 0.3 }}
              onClick={() => window.open(subject.driveLink, "_blank")}
              className="relative group cursor-pointer rounded-2xl border-2 border-yellow-400 hover:border-blue-600 transition-all duration-300 p-6 text-center text-lg font-semibold text-gray-800 shadow-md hover:shadow-2xl bg-white overflow-hidden"
            >
              {/* Hover border animation */}
              <div className="absolute inset-0 z-0 rounded-2xl border-2 border-blue-600 opacity-0 group-hover:opacity-100 animate-borderMove pointer-events-none" />
              <div className="relative z-10">
                <div className="text-3xl mb-2">{subject.icon}</div>
                <div>{subject.name}</div>
                <p className="text-sm text-gray-500 mt-1">
                  ತರಗತಿ {subject.classLevel}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notes;
