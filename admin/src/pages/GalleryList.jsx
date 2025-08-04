import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { galleryData } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const GalleryList = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const { axios } = useAppContext();

  const fetchGallery = async () => {
    try {
      const { data } = await axios.get("/api/admin/get-gallery");
      if (data.success) {
        setGalleryItems(data.galleryItems);
        console.log(data.galleryItems);

        toast.success("Gallery Items");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.post(`/api/admin/dlt-item`, { id });
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
      fetchGallery();
      setGalleryItems((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      toasterror(error.message);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  return (
    <div className="p-4 min-h-screen bg-white text-gray-800">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        📷 Gallery Dashboard
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {
          // galleryItems
          galleryItems.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="relative group bg-white rounded-2xl shadow-md overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="p-3">
                <p className="font-medium text-center truncate">{item.title}</p>
              </div>
              <button
                onClick={() => handleDelete(item._id)}
                className="absolute top-2 right-2 p-1 bg-red-500 hover:bg-red-600 text-white rounded-full transition"
                title="Delete"
              >
                <Trash2 size={18} />
              </button>
            </motion.div>
          ))
        }
      </div>
    </div>
  );
};

export default GalleryList;
