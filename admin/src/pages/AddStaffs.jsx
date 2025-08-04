import React, { useState } from "react";
import { motion } from "framer-motion";
import { UserPlus, UploadCloud, CheckCircle2 } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";

const AddStaffs = () => {
  const [staff, setStaff] = useState({
    name: "",
    designation: "",
    experience: "",
    image: null, // actual File
  });
  const [previewImage, setPreviewImage] = useState(null); // for showing preview
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStaff((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setStaff((prev) => ({ ...prev, image: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, designation, experience, image } = staff;

    if (!name || !designation || !experience || !image) {
      toast.error("Please fill all fields.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("designation", designation);
      formData.append("experience", experience);
      formData.append("image", image);

      const { data } = await axios.post("/api/admin/add-staff", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        toast.success(data.message);
        setSuccess(true);
      } else {
        toast.error(data.message);
      }

      setStaff({
        name: "",
        designation: "",
        experience: "",
        image: null,
      });
      setPreviewImage(null);
      document.getElementById("staff-image").value = "";
    } catch (error) {
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
        <UserPlus className="text-blue-600" />
        Add New Staff Member
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
                id="staff-image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="w-40 h-40 rounded-lg object-cover border-2 border-gray-300"
              />
            )}
          </div>
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <div className="relative mt-1">
            <input
              type="text"
              name="name"
              value={staff.name}
              onChange={handleChange}
              placeholder="e.g. Dr. Asha Rao"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
        </div>

        {/* Designation */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Designation
          </label>
          <div className="relative mt-1">
            <input
              type="text"
              name="designation"
              value={staff.designation}
              onChange={handleChange}
              placeholder="e.g. Science Teacher"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
        </div>

        {/* Experience */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Experience (in years)
          </label>
          <input
            type="number"
            name="experience"
            value={staff.experience}
            onChange={handleChange}
            placeholder="e.g. 5"
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
            Add Staff
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
            Staff member added successfully!
          </motion.div>
        )}
      </form>
    </div>
  );
};

export default AddStaffs;
