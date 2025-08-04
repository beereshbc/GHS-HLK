import React, { useState } from "react";
import { motion } from "framer-motion";
import { UserPlus, UploadCloud, CheckCircle2 } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const AddParliament = () => {
  const [form, setForm] = useState({
    name: "",
    role: "",
    year: "2024-25",
    image: null,
    preview: null,
  });

  const [success, setSuccess] = useState(false);
  const { axios } = useAppContext();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      setForm({
        ...form,
        image: files[0],
        preview: URL.createObjectURL(files[0]),
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!form.name || !form.role || !form.image) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("role", form.role);
      formData.append("year", form.year);
      formData.append("image", form.image); // 👈 key should match `req.file`

      const { data } = await axios.post("/api/admin/add-member", formData);

      if (data.success) {
        setSuccess(true);
        toast.success(data.message);
        setForm({
          name: "",
          role: "",
          year: "2024-25",
          image: null,
          preview: null,
        });
        setTimeout(() => setSuccess(false), 3000);
      } else {
        toast.error(res.data.message || "Failed to add member");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Try again.");
    }
  };
  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-10">
      <motion.h2
        className="text-2xl font-semibold mb-6 flex items-center gap-2 text-blue-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <UserPlus className="text-blue-600" />
        Add Parliament Member
      </motion.h2>

      <form onSubmit={handleAdd} className="flex flex-col gap-4">
        {form.preview && (
          <img
            src={form.preview}
            alt="Preview"
            className="w-40 h-40 object-cover rounded-lg border-2 border-blue-400 mx-auto"
          />
        )}

        <label className="cursor-pointer flex items-center gap-2 text-blue-600 hover:text-blue-800">
          <UploadCloud />
          Upload Image
          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />
        </label>

        <input
          type="text"
          name="name"
          placeholder="Student Name"
          value={form.name}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="text"
          name="role"
          placeholder="Role (e.g., ಪ್ರಧಾನ ಮಂತ್ರಿ)"
          value={form.role}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="text"
          name="year"
          placeholder="Academic Year"
          value={form.year}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-xl shadow hover:bg-blue-700 transition duration-200"
        >
          ➕ Add Member
        </button>

        {success && (
          <motion.div
            className="flex items-center gap-2 text-green-600 mt-2 font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <CheckCircle2 />
            Member added successfully!
          </motion.div>
        )}
      </form>
    </div>
  );
};

export default AddParliament;
