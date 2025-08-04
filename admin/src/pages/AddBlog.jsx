import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { parse } from "marked";
import { useAppContext } from "../context/AppContext";
import StudentSkeleton from "../components/StudentSkeleton";
// Lucide Icons
import { Image, Type, AlignLeft, FileText, Upload } from "lucide-react";
import { assets } from "../assets/assets";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [image, setImage] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isLoding, setIsLoding] = useState(false);

  const { axios } = useAppContext();

  const editerRef = useRef(null);
  const quillRef = useRef(null);

  const genarateContent = async () => {
    if (!title) return toast.error("Please must enter the title");

    try {
      setIsLoding(true);
      const { data } = await axios.post("/api/admin/generate", {
        prompt: title,
      });
      if (data.success) {
        quillRef.current.root.innerHTML = parse(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoding(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setIsAdding(true);
      const blog = {
        title,
        subTitle,
        description: quillRef.current.root.innerHTML,
        isPublished,
      };

      const formdata = new FormData();
      formdata.append("blog", JSON.stringify(blog));
      formdata.append("image", image);

      const { data } = await axios.post("/api/admin/add", formdata);
      if (data.success) {
        toast.success(data.message);
        setImage(false);
        setTitle("");
        setSubTitle("");
        quillRef.current.root.innerHTML = "";
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsAdding(false);
    }
  };

  useEffect(() => {
    if (!quillRef.current && editerRef.current) {
      quillRef.current = new Quill(editerRef.current, { theme: "snow" });
    }
  }, []);

  return (
    <form
      onSubmit={submitHandler}
      className="flex-1  pt-5 px-4 sm:px-10 h-full overflow-y-scroll pb-16"
    >
      <div className="bg-white max-w-3xl mx-auto rounded-lg p-4 sm:p-8 shadow-md">
        {/* Thumbnail Upload */}
        <label htmlFor="image" className="block mb-4 cursor-pointer">
          <p className="flex items-center text-gray-600 font-semibold mb-2 gap-2">
            <Image className="w-5 h-5" />
            Upload thumbnail
          </p>
          <img
            className="cursor-pointer max-w-xs h-40 w-64 rounded-lg border"
            src={image ? URL.createObjectURL(image) : ""}
            alt="Upload Thumbnail"
          />
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            hidden
            required
            id="image"
          />
        </label>

        {/* Title */}
        <label className="block mt-5">
          <p className="flex items-center gap-2 text-gray-600 font-semibold text-lg">
            <Type className="w-5 h-5" />
            Blog Title
          </p>
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className="outline-none border border-gray-300 rounded-md mt-1 px-3 py-2 w-full"
            type="text"
            placeholder="Enter blog title to Generate with AI"
          />
        </label>

        {/* Subtitle */}
        <label className="block mt-5">
          <p className="flex items-center gap-2 text-gray-600 font-semibold text-lg">
            <AlignLeft className="w-5 h-5" />
            Sub Title
          </p>
          <input
            onChange={(e) => setSubTitle(e.target.value)}
            value={subTitle}
            className="outline-none border border-gray-300 rounded-md mt-1 px-3 py-2 w-full"
            type="text"
            placeholder="Enter subtitle"
          />
        </label>

        {/* Quill Editor */}
        <label className="block mt-5">
          <p className="flex items-center gap-2 text-gray-600 font-semibold text-lg">
            <FileText className="w-5 h-5" />
            Blog Description
          </p>
          <div className="relative border border-gray-300 rounded-md mt-2 h-[500px] overflow-hidden">
            <div ref={editerRef} className="h-full" />
            {isLoding && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/60">
                <StudentSkeleton />
              </div>
            )}
            <button
              disabled={isLoding}
              type="button"
              onClick={genarateContent}
              className="absolute bottom-1 right-2 text-sm bg-indigo-100 border border-indigo-200 px-3 py-1 rounded hover:bg-indigo-200 transition"
            >
              Generate with AI
            </button>
          </div>
        </label>

        {/* Publish toggle */}
        <div className="flex items-center gap-3 mt-6">
          <label className="text-gray-600 font-semibold text-lg">
            Publish Now
          </label>
          <input
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
            className="accent-blue-500 w-5 h-5"
          />
        </div>

        {/* Submit button */}
        <motion.button
          disabled={isAdding}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="mt-8 w-full flex justify-center items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          type="submit"
        >
          <Upload className="w-4 h-4" />
          {isAdding ? "Adding..." : "Add Blog"}
        </motion.button>
      </div>
    </form>
  );
};

export default AddBlog;
