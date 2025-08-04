import React from "react";
import { galleryData } from "../assets/assets";
import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useEffect } from "react";
import toast from "react-hot-toast";

const Gallary = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const { axios } = useAppContext();

  const fetchGallery = async () => {
    try {
      const { data } = await axios.get("/api/admin/get-gallery");
      if (data.success) {
        setGalleryItems(data.galleryItems);

        toast.success("Gallery Items");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white py-10 px-4">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
        📸 Our Premium Gallery
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {galleryItems.map((img, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-2xl shadow-xl group transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <img
              src={img.image}
              alt={`Gallery ${index + 1}`}
              className="w-full h-64 object-cover transition-all duration-500 group-hover:brightness-90 contrast-125 group-hover:scale-110"
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent text-white p-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {img.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallary;
