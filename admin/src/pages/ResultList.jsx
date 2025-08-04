import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

const ResultList = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchResults = async () => {
    try {
      const { data } = await axios.get("/api/admin/all-results");
      setResults(data.results || []);
    } catch (err) {
      toast.error("Error fetching results:", err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteAllResults = async () => {
    if (!window.confirm("Are you sure you want to delete all results? 💀"))
      return;

    try {
      await axios.delete("/api/admin/dlt-results");
      setResults([]);
    } catch (err) {
      toast.error("Error deleting results:", err);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gray-100">
      <motion.h2
        className="text-2xl sm:text-3xl font-bold mb-6 text-center text-green-700"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Student Result List
      </motion.h2>

      {loading ? (
        <p className="text-center">Loading results...</p>
      ) : results.length === 0 ? (
        <p className="text-center text-gray-500">No results found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden text-sm sm:text-base">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="py-2 px-3 hidden sm:table-cell">#</th>
                <th className="py-2 px-3">Name</th>
                <th className="py-2 px-3 hidden sm:table-cell">Roll No</th>
                <th className="py-2 px-3 hidden md:table-cell">Class</th>
                <th className="py-2 px-3 hidden md:table-cell">Year</th>
                <th className="py-2 px-3 hidden lg:table-cell">Exam</th>
                <th className="py-2 px-3">Total</th>
                <th className="py-2 px-3 hidden sm:table-cell">Max</th>
                <th className="py-2 px-3">%</th>
                <th className="py-2 px-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr
                  key={result._id}
                  className="text-center border-b hover:bg-gray-50"
                >
                  <td className="py-2 px-3 hidden sm:table-cell">
                    {index + 1}
                  </td>
                  <td className="py-2 px-3">{result.name}</td>
                  <td className="py-2 px-3 hidden sm:table-cell">
                    {result.rollNumber}
                  </td>
                  <td className="py-2 px-3 hidden md:table-cell">
                    {result.class}
                  </td>
                  <td className="py-2 px-3 hidden md:table-cell">
                    {result.year}
                  </td>
                  <td className="py-2 px-3 hidden lg:table-cell">
                    {result.examType}
                  </td>
                  <td className="py-2 px-3">{result.total}</td>
                  <td className="py-2 px-3 hidden sm:table-cell">
                    {result.maxTotal}
                  </td>
                  <td className="py-2 px-3">{result.percentage.toFixed(2)}%</td>
                  <td className="py-2 px-3">{result.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex justify-center mt-6">
        <button
          onClick={deleteAllResults}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          <Trash2 size={18} />
          Delete All Results
        </button>
      </div>
    </div>
  );
};

export default ResultList;
