import React, { useState } from "react";
import { motion } from "framer-motion";
import { BadgeCheck, UploadCloud, CheckCircle2 } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const AddQuizStudent = () => {
  const [student, setStudent] = useState({
    name: "",
    class: "",
    week: "",
    obtainedMarks: "",
    maxMarks: "100",
    image: null,
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setStudent({ ...student, image: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      name,
      class: studentClass,
      week,
      obtainedMarks,
      maxMarks,
      image,
    } = student;

    if (
      !name ||
      !studentClass ||
      !week ||
      !obtainedMarks ||
      !maxMarks ||
      !image
    ) {
      toast.error("Please fill all fields.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("classLevel", studentClass);
      formData.append("week", week);
      formData.append("obtainedMarks", obtainedMarks);
      formData.append("maxMarks", maxMarks);
      formData.append("image", image);

      const { data } = await axios.post(
        "/api/admin/add-quiz-student",
        formData
      );
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }

      setStudent({
        name: "",
        class: "",
        week: "",
        obtainedMarks: "",
        maxMarks: "100",
        image: null,
      });
    } catch (err) {
      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-10">
      <motion.h2
        className="text-2xl font-semibold mb-6 flex items-center gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <BadgeCheck className="text-blue-600" />
        Add Highlighted Quiz Student
      </motion.h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Upload Photo
          </label>
          <div className="flex items-center gap-4 mt-2">
            <label className="cursor-pointer flex items-center gap-2 text-blue-600 hover:text-blue-800">
              <UploadCloud />
              Choose Image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            {student.image && (
              <img
                src={URL.createObjectURL(student.image)}
                alt="Preview"
                className="w-28 h-28 rounded-lg object-cover border-2 border-gray-300"
              />
            )}
          </div>
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={student.name}
            onChange={handleChange}
            placeholder="e.g. Vidwath Kumar MN"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Class */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Class
          </label>
          <input
            type="number"
            name="class"
            value={student.class}
            onChange={handleChange}
            placeholder="e.g. 8"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Week */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Week Number
          </label>
          <input
            type="number"
            name="week"
            value={student.week}
            onChange={handleChange}
            placeholder="e.g. 1"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Obtained Marks */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Obtained Marks
          </label>
          <input
            type="number"
            name="obtainedMarks"
            value={student.obtainedMarks}
            onChange={handleChange}
            placeholder="e.g. 96"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Max Marks */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Max Marks
          </label>
          <input
            type="number"
            name="maxMarks"
            value={student.maxMarks}
            onChange={handleChange}
            placeholder="e.g. 100"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-xl shadow hover:bg-blue-700 transition duration-200"
          >
            Add Student
          </button>
        </div>

        {/* Success Message */}
        {success && (
          <motion.div
            className="flex items-center gap-2 text-green-600 mt-4 font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <CheckCircle2 />
            Student added successfully!
          </motion.div>
        )}
      </form>
    </div>
  );
};

export default AddQuizStudent;
