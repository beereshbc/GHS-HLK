import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

const AddTopper = () => {
  const [formData, setFormData] = useState({
    name: "",
    passoutYear: "",
    subjectMarks: {
      Kannada: "",
      English: "",
      Hindi: "",
      Mathematics: "",
      Science: "",
      SocialScience: "",
    },
    image: null,
  });

  const { axios } = useAppContext();

  const [totals, setTotals] = useState({
    obtainedTotalMarks: "",
    maxTotalMarks: "",
    percentage: "",
  });

  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (Object.keys(formData.subjectMarks).includes(name)) {
      const updatedMarks = {
        ...formData.subjectMarks,
        [name]: value === "" ? "" : String(parseFloat(value)),
      };

      const numericMarks = Object.values(updatedMarks).map((val) =>
        isNaN(parseFloat(val)) ? 0 : parseFloat(val)
      );
      const sumOfSubjects = numericMarks.reduce((acc, val) => acc + val, 0);

      setFormData((prev) => ({
        ...prev,
        subjectMarks: updatedMarks,
      }));

      if (
        totals.obtainedTotalMarks &&
        parseFloat(totals.obtainedTotalMarks) !== sumOfSubjects
      ) {
        setError("Obtained total marks must equal the sum of subject marks.");
      } else {
        setError("");
      }
    } else if (name === "obtainedTotalMarks" || name === "maxTotalMarks") {
      const updatedTotals = {
        ...totals,
        [name]: value,
      };

      const obtained = parseFloat(updatedTotals.obtainedTotalMarks || 0);
      const max = parseFloat(updatedTotals.maxTotalMarks || 0);
      const percentage = max > 0 ? ((obtained / max) * 100).toFixed(2) : "";

      setTotals({
        ...updatedTotals,
        percentage,
      });

      const numericMarks = Object.values(formData.subjectMarks).map((val) =>
        isNaN(parseFloat(val)) ? 0 : parseFloat(val)
      );
      const sumOfSubjects = numericMarks.reduce((acc, val) => acc + val, 0);

      if (obtained !== sumOfSubjects) {
        setError("Obtained total marks must equal the sum of subject marks.");
      } else {
        setError("");
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (error) {
      toast.error("Fix errors before submitting.");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("passoutYear", formData.passoutYear);
    data.append("obtainedTotalMarks", totals.obtainedTotalMarks || 0);
    data.append("maxTotalMarks", totals.maxTotalMarks || 0);
    data.append("percentage", totals.percentage || 0);
    data.append("image", formData.image);

    const subjectMarksKeys = [
      "Kannada",
      "English",
      "Hindi",
      "Mathematics",
      "Science",
      "SocialScience",
    ];

    for (const subject of subjectMarksKeys) {
      const rawValue = formData.subjectMarks[subject];
      const number = parseFloat(rawValue);

      if (isNaN(number)) {
        toast.error(`Invalid number for ${subject}`);
        return;
      }

      // ✅ Use flat keys, not nested
      data.append(subject, number);
    }

    try {
      const response = await axios.post("/api/admin/add-toppers", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        toast.success("Topper added successfully!");
      } else {
        toast.error(response.data.error || "Something went wrong");
      }
    } catch (err) {
      toast.error(err.response?.data?.error || err.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg mt-8">
      <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">
        Add Topper
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Upload Photo
          </label>
          <div className="flex items-center gap-4 mt-2">
            <label className="cursor-pointer flex items-center gap-2 text-blue-600 hover:text-blue-800">
              Upload Image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                required
              />
            </label>
            {formData.image && (
              <img
                src={URL.createObjectURL(formData.image)}
                alt="Preview"
                className="w-40 h-40 rounded-lg object-cover border-2 border-gray-300"
              />
            )}
          </div>
        </div>

        {/* Name & Passout Year */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Student Name</label>
            <input
              type="text"
              name="name"
              className="w-full border rounded px-3 py-2"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Passout Year</label>
            <input
              type="number"
              name="passoutYear"
              className="w-full border rounded px-3 py-2"
              value={formData.passoutYear}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        {/* Subject Marks */}
        <div className="grid md:grid-cols-2 gap-4">
          {Object.keys(formData.subjectMarks).map((subject) => (
            <div key={subject}>
              <label className="block mb-1 font-medium">{subject} Marks</label>
              <input
                type="number"
                name={subject}
                className="w-full border rounded px-3 py-2"
                value={formData.subjectMarks[subject]}
                onChange={handleInputChange}
                required
              />
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-1 font-medium">
              Obtained Total Marks
            </label>
            <input
              type="number"
              name="obtainedTotalMarks"
              value={totals.obtainedTotalMarks}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Max Total Marks</label>
            <input
              type="number"
              name="maxTotalMarks"
              value={totals.maxTotalMarks}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Percentage</label>
            <input
              type="text"
              value={`${totals.percentage}%`}
              disabled
              className="w-full border bg-gray-100 rounded px-3 py-2"
            />
          </div>
        </div>

        {error && (
          <div className="text-red-600 font-medium text-sm">{error}</div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddTopper;
