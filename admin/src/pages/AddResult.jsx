import React, { useState } from "react";
import * as XLSX from "xlsx";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import { UploadCloud, FileDown, Info } from "lucide-react";

const AddResult = () => {
  const [excelFile, setExcelFile] = useState(null);
  const { axios } = useAppContext();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setExcelFile(file);
  };

  const handleUpload = async () => {
    if (!excelFile) return toast.error("Please select an Excel file");

    // Confirm before proceeding
    const confirmed = window.confirm(
      "⚠️ Please ensure previous results are deleted before uploading.\n\nHave you deleted old results?"
    );

    if (!confirmed) {
      toast.error("Upload cancelled! Please delete old results first.");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);

      try {
        const res = await axios.post("/api/admin/upload-results", parsedData);
        toast.success(res.data.message || "Results uploaded successfully!");
      } catch (err) {
        toast.error(err?.response?.data?.message || "Upload failed!");
      }
    };

    reader.readAsArrayBuffer(excelFile);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen px-6 py-10 bg-gradient-to-br from-blue-50 to-pink-100 flex flex-col items-center"
    >
      <motion.h2
        className="text-3xl sm:text-4xl font-bold text-green-700 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        📊 Upload Student Results
      </motion.h2>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-2xl w-full bg-white shadow-lg rounded-2xl p-6 mb-6 text-gray-800"
      >
        <div className="flex items-center gap-3 mb-4">
          <Info className="text-blue-600 w-6 h-6" />
          <h3 className="text-xl font-semibold">Instructions</h3>
        </div>
        <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base">
          <li>Download the sample Excel template below.</li>
          <li>Do not change or rename the column headers (key names).</li>
          <li>Fill in the student result data exactly under the given keys.</li>
          <li>Once filled, upload the Excel file using the section below.</li>
        </ul>

        <motion.a
          href="/sample_student_results.xlsx"
          download
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition cursor-pointer"
        >
          <FileDown className="w-5 h-5" />
          Download Sample Excel
        </motion.a>
      </motion.div>

      {/* Upload section */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="w-full max-w-md bg-white rounded-2xl p-6 shadow-xl flex flex-col items-center"
      >
        <h3 className="text-lg font-semibold mb-4 text-center text-gray-800">
          Upload Completed Excel File
        </h3>

        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileChange}
          className="block w-full mb-4 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
        />

        <motion.button
          onClick={handleUpload}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-200"
        >
          <UploadCloud className="w-5 h-5" />
          Upload Results
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default AddResult;
