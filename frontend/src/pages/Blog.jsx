import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Moment from "moment";
import ShareButtons from "../components/ShareButtons";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import StudentSkeleton from "../components/StudentSkeleton";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const Blog = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const { axios, blogs } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const fullUrl = window.location.href;

  const fetchBlogData = async () => {
    try {
      const { data } = await axios.get(`/api/admin/${id}`);
      if (data.success) {
        setData(data.blog);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchBlogData();
    window.scrollTo({ top: 0, behavior: "smooth" }); // Ensure scroll to top
  }, []);

  return data ? (
    <div className="relative bg-gradient-to-b  text-gray-800">
      {/* Back Button */}
      <div className="fixed top-5 left-5 z-50">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-all"
        >
          <ArrowLeft size={20} />
          <span className="font-medium text-sm">Back</span>
        </button>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mt-24 px-4"
      >
        <p className="text-primary font-semibold mb-4">
          Published on {Moment(data.createdAt).format("MMMM Do YYYY")}
        </p>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold max-w-4xl mx-auto mb-4">
          {data.title}
        </h1>
        <p className="text-md sm:text-lg text-gray-600 max-w-3xl mx-auto">
          {data.subTitle}
        </p>
      </motion.div>

      {/* Blog Image */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex justify-center items-center my-10 px-6"
      >
        <img
          src={data.image}
          className="w-full max-w-4xl rounded-3xl shadow-xl brightness-105 contrast-110"
          alt={data.title}
        />
      </motion.div>

      {/* Blog Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-3xl mx-auto px-6"
      >
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6 text-gray-800">
          {data.title}
        </h2>
        <div
          className="rich-text text-gray-700 leading-relaxed tracking-wide text-justify"
          dangerouslySetInnerHTML={{ __html: data.description }}
        />
      </motion.div>

      {/* Share Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mt-16 mb-10"
      >
        <p className="font-semibold text-lg text-gray-700 mb-4">
          Share this article on social media
        </p>
        <div className="flex justify-center">
          <ShareButtons title={data.title} key={data._id} url={fullUrl} />
        </div>
      </motion.div>

      {/* Footer */}
      <Footer />
    </div>
  ) : (
    <StudentSkeleton />
  );
};

export default Blog;
