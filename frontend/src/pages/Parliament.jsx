import React from "react";
import { schoolParliament } from "../assets/assets";
import { motion } from "framer-motion";
import { useAppContext } from "../context/AppContext";
import { useState } from "react";
import { useEffect } from "react";

const Parliament = () => {
  const { axios } = useAppContext();
  const [members, setMembers] = useState([]);
  const fetchMembers = async () => {
    try {
      const { data } = await axios.get("/api/admin/get-members");
      if (data.success) {
        setMembers(data.members);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-white to-gray-100 py-16 px-4 overflow-hidden">
      {/* Decorative SVG */}
      <div className="absolute top-[-50px] left-[-50px] w-[300px] h-[300px] bg-indigo-100 rounded-full blur-3xl opacity-30 z-0"></div>

      <div className="max-w-6xl mx-auto text-center z-10 relative">
        <h1 className="text-5xl font-bold text-gray-800 pb-4 border-b-4 border-indigo-500 inline-block">
          ಶಾಲಾ ಸಂಸತ್ (School Parliament)
        </h1>
        <p className="text-gray-600 text-lg mt-3 font-medium">
          2024-25 ನೇ ಸಾಲಿನ ವಿದ್ಯಾರ್ಥಿ ಪ್ರತಿನಿಧಿಗಳು
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-16 max-w-6xl mx-auto z-10 relative">
        {members.map((minister, index) => (
          <motion.div
            key={minister._id}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group bg-white rounded-3xl shadow-xl border border-gray-200 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 p-6 relative overflow-hidden"
          >
            {/* Gradient Border Circle */}
            <div className="absolute -top-5 -right-5 w-20 h-20 bg-gradient-to-br from-indigo-300 to-purple-400 rounded-full blur-2xl opacity-40 group-hover:opacity-70 transition-all duration-500"></div>

            <img
              src={minister.image}
              alt={minister.name}
              className="w-full h-56 object-cover rounded-2xl mb-4 border-2 border-indigo-100"
            />

            <h2 className="text-2xl font-bold text-gray-800">
              {minister.name}
            </h2>

            {/* Role Badge */}
            <div className="inline-block mt-2 bg-indigo-100 text-indigo-700 text-sm font-semibold px-3 py-1 rounded-full shadow-sm">
              {minister.role}
            </div>

            <p className="text-sm text-gray-500 mt-3 italic">{minister.year}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Parliament;
