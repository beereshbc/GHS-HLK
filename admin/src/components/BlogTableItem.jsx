import React from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";
import { Trash2, UploadCloud, DownloadCloud } from "lucide-react";

const BlogTableItem = ({ blog, index, fetchBlogs }) => {
  const { createdAt, title, isPublished, _id } = blog;
  const blogDate = new Date(createdAt);
  const { axios } = useAppContext();

  const deleteBlog = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this blog 💀"
    );
    if (!confirm) return;

    try {
      const { data } = await axios.post("/api/admin/delete", { id: _id });
      if (data.success) {
        toast.success(data.message);
        fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  const togglePublish = async () => {
    try {
      const { data } = await axios.post("/api/admin/toggle-publish", {
        id: _id,
      });
      if (data.success) {
        toast.success(data.message);
        fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Toggle failed.");
    }
  };

  return (
    <>
      {/* Desktop Row */}
      <tr className="border-b border-gray-300 text-sm hidden sm:table-row">
        <td className="px-3 py-2 text-center">{index + 1}</td>
        <td className="px-3 py-2 max-w-[160px] truncate" title={title}>
          {title}
        </td>
        <td className="px-3 py-2">{blogDate.toDateString()}</td>
        <td className="px-3 py-2">
          <span className={isPublished ? "text-green-600" : "text-orange-600"}>
            {isPublished ? "Published" : "Unpublished"}
          </span>
        </td>
        <td className="px-3 py-2">
          <div className="flex items-center gap-2">
            <button
              onClick={togglePublish}
              className="border px-2 py-1 rounded hover:bg-gray-100 transition text-xs"
            >
              {isPublished ? (
                <span className="flex items-center gap-1">
                  <DownloadCloud size={14} /> Unpublish
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <UploadCloud size={14} /> Publish
                </span>
              )}
            </button>

            <Trash2
              size={18}
              className="text-red-500 cursor-pointer hover:scale-110 transition"
              onClick={deleteBlog}
              title="Delete Blog"
            />
          </div>
        </td>
      </tr>

      {/* Mobile Card View */}
      <tr className="sm:hidden">
        <td colSpan="5" className="py-3">
          <div className="bg-white border rounded-md p-3 shadow-sm text-xs space-y-2">
            <div className="font-semibold text-base truncate" title={title}>
              {title.length > 40 ? title.slice(0, 40) + "..." : title}
            </div>
            <div className="flex justify-between text-gray-600">
              <span>#{index + 1}</span>
              <span>{blogDate.toDateString()}</span>
            </div>
            <div className="hidden md:block">
              Status:{" "}
              <span
                className={isPublished ? "text-green-600" : "text-orange-600"}
              >
                {isPublished ? "Published" : "Unpublished"}
              </span>
            </div>
            <div className="flex justify-between items-center gap-2">
              <button
                onClick={togglePublish}
                className="flex items-center gap-1 border px-2 py-1 rounded hover:bg-gray-100 transition text-xs"
              >
                {isPublished ? (
                  <>
                    <DownloadCloud size={14} /> Unpublish
                  </>
                ) : (
                  <>
                    <UploadCloud size={14} /> Publish
                  </>
                )}
              </button>

              <Trash2
                size={18}
                className="text-red-500 cursor-pointer hover:scale-110 transition"
                onClick={deleteBlog}
                title="Delete Blog"
              />
            </div>
          </div>
        </td>
      </tr>
    </>
  );
};

export default BlogTableItem;
