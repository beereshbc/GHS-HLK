import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import BlogTableItem from "../components/BlogTableItem";
import { useAppContext } from "../context/AppContext";

const ListBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const { axios } = useAppContext();

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get("/api/admin/blog");
      if (data.success) {
        setBlogs(data.blogs);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || "Failed to fetch blogs.");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="px-3 sm:px-6 md:px-10 mt-20">
      <p className="mb-4 font-semibold text-lg">All Blogs</p>

      <div className="w-[80vw] overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-[600px] w-full text-sm text-gray-600">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Blog Title</th>
              <th className="px-4 py-3 text-left hidden md:table-cell">Date</th>
              <th className="px-4 py-3 text-left hidden md:table-cell">
                Status
              </th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {blogs.length > 0 ? (
              blogs.map((blog, index) => (
                <BlogTableItem
                  key={blog._id}
                  blog={blog}
                  index={index}
                  fetchBlogs={fetchBlogs}
                />
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No blogs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListBlog;
