import React, { useEffect, useState } from "react";
import { sslcToppers } from "../assets/assets";
import { Trash2 } from "lucide-react"; // lucid icon
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const SSLCList = () => {
  const [toppers, setToppers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { axios } = useAppContext();

  useEffect(() => {
    fetchToppers();
  }, []);

  const fetchToppers = async () => {
    try {
      const { data } = await axios.get("/api/admin/get-toppers");
      if (data.success) {
        setToppers(data.toppers);
        toast.success("SSLC Toppers list");
      } else {
        toast.error(data.message);
      }

      setLoading(false);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const deleteTopper = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this topper?"
    );
    if (!confirm) return;

    try {
      const { data } = await axios.post(`/api/admin/dlt-topper/${id}`);

      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
      fetchToppers();
      setToppers(toppers.filter((topper) => topper._id !== id));
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading)
    return <div className="p-6 text-center text-gray-600">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        SSLC Topper Dashboard
      </h2>

      {toppers.map((topper) => (
        <div
          key={topper._id}
          className="bg-white w-full max-w-4xl rounded-3xl shadow-lg border border-gray-200 p-6 mb-8 hover:shadow-xl transition-all duration-300"
        >
          <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
            <img
              src={topper.image}
              alt={topper.name}
              className="w-28 h-28 rounded-full object-cover border-4 border-gray-200"
            />
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-semibold text-gray-800">
                {topper.name}
              </h3>
              <p className="text-gray-600">
                Passout Year: {topper.passoutYear}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-gray-700 mb-4">
            {Object.entries(topper.subjectMarks).map(([subject, mark]) => (
              <div key={subject}>
                <strong>{subject}:</strong> {mark}
              </div>
            ))}
          </div>

          <div className="text-gray-700 text-sm mb-2">
            <strong>Total:</strong> {topper.obtainedTotalMarks} /{" "}
            {topper.maxTotalMarks}
          </div>
          <div className="text-gray-700 text-sm mb-4">
            <strong>Percentage:</strong> {topper.percentage}%
          </div>

          <button
            onClick={() => deleteTopper(topper._id)}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-xl transition"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default SSLCList;
