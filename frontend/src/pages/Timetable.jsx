import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const cardEntry = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, type: "spring", stiffness: 60 },
  }),
};

const Timetable = () => {
  const [timetables, setTimetables] = useState([]);
  const { axios } = useAppContext();

  useEffect(() => {
    const fetchTimetables = async () => {
      try {
        const { data } = await axios.get("/api/admin/timetables");
        if (data.success) {
          setTimetables(data.timetables);
        }
      } catch (err) {
        toast.error("Error fetching timetables:", err.message);
      }
    };

    fetchTimetables();
  }, []);

  const handleDownload = (link, className) => {
    const linkEl = document.createElement("a");
    linkEl.href = link;
    linkEl.download = `${className}-timetable.png`;
    document.body.appendChild(linkEl);
    linkEl.click();
    document.body.removeChild(linkEl);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f7ff] via-white to-[#ffe6f0] py-16 px-6">
      <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-14 drop-shadow-md">
        ವೇಳಾಪಟ್ಟಿಗಳು
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
        {timetables.map((item, idx) => (
          <motion.div
            key={item._id}
            custom={idx}
            initial="hidden"
            animate="visible"
            variants={cardEntry}
            whileHover={{ scale: 1.02 }}
            className="bg-white/70 backdrop-blur-lg shadow-2xl rounded-3xl p-6 flex flex-col items-center transition-transform duration-300"
          >
            <img
              src={item.image}
              alt={`${item.classLevel} Timetable`}
              className="w-full h-[20rem] object-contain rounded-2xl border border-gray-200 shadow-inner"
            />
            <h2 className="text-2xl font-bold text-gray-800 mt-6 tracking-wide">
              {item.classLevel}ನೇ ತರಗತಿ
            </h2>
            <button
              onClick={() => handleDownload(item.link, item.className)}
              className="mt-5 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl shadow-md transition-colors duration-200"
            >
              <Download className="w-5 h-5" />
              Download PNG
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Timetable;
