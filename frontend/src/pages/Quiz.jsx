import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PencilLine, BookOpen, GraduationCap } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const iconMap = {
  8: <BookOpen className="w-8 h-8" />,
  9: <PencilLine className="w-8 h-8" />,
  10: <GraduationCap className="w-8 h-8" />,
};

const cardVariants = {
  hover: {
    scale: 1.05,
    rotateY: 8,
    transition: {
      type: "spring",
      stiffness: 180,
      damping: 12,
    },
  },
};

const Quiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const { axios } = useAppContext();

  useEffect(() => {
    const fetchQuizLinks = async () => {
      try {
        const { data } = await axios.get("/api/admin/quizzes");
        if (data.success) {
          setQuizzes(data.quizzes);
          console.log(data.quizzes);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error("Failed to load quiz links", error);
      }
    };

    fetchQuizLinks();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-6">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
        📝 ರಸಪ್ರಶ್ನೆ
      </h1>

      <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 justify-items-center">
        {quizzes.map((form, index) => (
          <motion.div
            key={index}
            whileHover="hover"
            variants={cardVariants}
            onClick={() => window.open(form.image, "_blank")}
            className={`w-72 h-48 bg-gradient-to-br ${
              form.gradient || "from-purple-500 to-indigo-500"
            } rounded-2xl shadow-xl text-white cursor-pointer flex flex-col justify-center items-center gap-4 hover:shadow-2xl transition duration-300 ease-in-out`}
          >
            {iconMap[form.class] || <BookOpen className="w-8 h-8" />}
            <div className="text-2xl font-semibold">
              Class {form.classLevel}
            </div>
            <div className="text-sm opacity-90">Click to attempt quiz</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Quiz;
