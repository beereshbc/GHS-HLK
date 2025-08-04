import React, { useState } from "react";
import { UploadCloud, CheckCircle2, ImagePlus } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const AddGallary = () => {
  const [form, setForm] = useState({
    title: "",
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
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.image) {
      toast.error("Title and image are required.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("image", form.image);

      const { data } = await axios.post("/api/admin/add-gallery", formData);
      if (data.success) {
        toast.success(data.message);
        setSuccess(true);
      } else {
        toast.error(data.message);
      }
      setForm({ title: "", image: null, preview: null });
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-md mt-10">
      <h2 className="text-2xl font-semibold text-blue-800 mb-6 flex items-center gap-2">
        <ImagePlus className="text-blue-500" />
        Add Gallery Image
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image Preview */}
        {form.preview && (
          <div className="w-full flex justify-center">
            <img
              src={form.preview}
              alt="Preview"
              className="w-64 h-40 object-cover rounded-xl border"
            />
          </div>
        )}

        {/* Image Upload */}
        <div>
          <label className="flex items-center gap-2 text-blue-600 cursor-pointer hover:text-blue-800">
            <UploadCloud />
            Choose Image
            <input
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Title */}
        <div>
          <input
            type="text"
            name="title"
            placeholder="Image Title (e.g. Annual Day 2024)"
            value={form.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Upload Image
          </button>
        </div>

        {/* Success Message */}
        {success && (
          <div className="flex items-center gap-2 text-green-600 font-semibold">
            <CheckCircle2 />
            Image uploaded successfully!
          </div>
        )}
      </form>
    </div>
  );
};

export default AddGallary;
