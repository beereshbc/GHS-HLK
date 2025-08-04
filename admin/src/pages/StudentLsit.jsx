import React, { useState } from "react";
import { assets, weeklyResult } from "../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";
import { useEffect } from "react";

const StudentList = () => {
  const [students, setStudents] = useState([]);

  // Delete function
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure to delete this student?"
    );
    if (confirmDelete) {
      const updatedList = students.filter((s) => s.id !== id);
      setStudents(updatedList);
    }
    try {
      const { data } = await axios.post("/api/admin/dlt-quiz-student", { id });
      if (data.success) {
        toast.success(data.message);
        fetchStudentList();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchStudentList = async () => {
    try {
      const { data } = await axios.get("api/admin/quiz-student");
      if (data.success) {
        setStudents(data.students);
        console.log(data.students);

        toast.success("Student List");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchStudentList();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-green-700">
        🏆 Weekly Quiz Recognized Students
      </h1>

      {students.length === 0 ? (
        <p className="text-center text-gray-500">No students found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {students.map((student) => (
            <div
              key={student.id}
              className="bg-white shadow-lg rounded-2xl p-4 flex flex-col items-center space-y-4"
            >
              <img
                src={student.image || assets.ghs_student}
                alt={student.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-green-400"
              />
              <div className="text-center">
                <h2 className="text-lg font-semibold text-gray-800">
                  {student.name}
                </h2>
                <p className="text-sm text-gray-500">
                  Class: {student.classLevel}
                </p>
                <p className="text-sm text-gray-500">Week: {student.week}</p>
                <p className="text-md font-bold text-green-600">
                  Score: {student.obtainedMarks}/{student.maxMarks}
                </p>
              </div>
              <button
                onClick={() => handleDelete(student._id)}
                className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-full"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentList;
