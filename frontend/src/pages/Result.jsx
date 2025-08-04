import React, { useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

const Result = () => {
  const resultRef = useRef();
  const [selectedClass, setSelectedClass] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [student, setStudent] = useState(null);
  const [error, setError] = useState("");
  const { axios } = useAppContext();

  const handleSearch = async () => {
    try {
      const { data } = await axios.get("/api/admin/results", {
        params: {
          class: selectedClass,
          rollNumber,
        },
      });

      if (data?.result) {
        setStudent(data.result);
        setError("");
      } else {
        setStudent(null);
        toast.error(data.message);
        setError("ಫಲಿತಾಂಶ ಸಿಕ್ಕಿಲ್ಲ. ದಯವಿಟ್ಟು ಶ್ರೇಣಿ ಮತ್ತು ರೋಲ್ ನಂ ಪರಿಶೀಲಿಸಿ.");
      }
    } catch (err) {
      setStudent(null);
      toast.error(err.message);
      setError("ಫಲಿತಾಂಶ ಪಡೆಯುವಲ್ಲಿ ದೋಷವಿದೆ.");
    }
  };

  const handleBack = () => {
    setStudent(null);
    setSelectedClass("");
    setRollNumber("");
    setError("");
  };

  const downloadPDF = () => {
    const input = resultRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = 210;
      pdf.addImage(
        imgData,
        "PNG",
        0,
        0,
        pdfWidth,
        (canvas.height * pdfWidth) / canvas.width
      );
      pdf.save("Marks_Card.pdf");
    });
  };

  const getCompliment = (percentage) => {
    if (percentage >= 85) return "ಅಭಿನಂದನೆಗಳು! ಉತ್ತಮ ಸಾಧನೆ.";
    if (percentage >= 60) return "ಚೆನ್ನಾಗಿದೆ! ಇನ್ನಷ್ಟು ಬೆಳೆವ ಪ್ರಯತ್ನ ಮಾಡಿ.";
    return "ಸಾಧಾರಣವಾದ ಫಲಿತಾಂಶ. ಹೆಚ್ಚು ಪರಿಶ್ರಮಿಸಿ.";
  };

  const maxTotal = student ? student.maxTotal : 0;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {!student && (
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4">
          <h1 className="text-xl font-bold text-center text-gray-800">
            ವಿದ್ಯಾರ್ಥಿಯ ಮಾಹಿತಿ ಹಾಕಿ
          </h1>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ಶ್ರೇಣಿ ಆಯ್ಕೆಮಾಡಿ:
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="">-- ಆಯ್ಕೆಮಾಡಿ --</option>
              <option value="8">8 ನೇ ತರಗತಿ</option>
              <option value="9">9 ನೇ ತರಗತಿ</option>
              <option value="10">10 ನೇ ತರಗತಿ</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ರೋಲ್ ನಂಬರ್ ಹಾಕಿ:
            </label>
            <input
              type="text"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="ಉದಾ: 16"
            />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            onClick={handleSearch}
            className="bg-blue-700 text-white w-full py-2 rounded hover:bg-blue-800"
          >
            ಫಲಿತಾಂಶ ವೀಕ್ಷಿಸಿ
          </button>
        </div>
      )}

      {student && (
        <div className="w-full max-w-4xl mt-6 px-2">
          {/* Outside Header */}
          <div className="text-center mb-4 space-y-1">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              ಸರ್ಕಾರಿ ಪ್ರೌಢಶಾಲೆ ಹುಲಿಕಟ್ಟಿ
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              ಶೈಕ್ಷಣಿಕ ವರ್ಷ: {student.year}
            </p>
          </div>

          {/* Compliment */}
          <div className="text-center mb-4">
            <p className="text-green-700 font-medium text-base md:text-lg">
              {getCompliment(student.percentage)}
            </p>
          </div>

          {/* Marks Card */}
          <div
            ref={resultRef}
            className="bg-white shadow-2xl rounded-lg border border-gray-300 p-4 sm:p-6 md:p-8 relative overflow-hidden"
          >
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none z-0 select-none">
              <h1 className="text-[2.5rem] md:text-[5rem] font-extrabold text-gray-600 rotate-45 text-center">
                ಸರ್ಕಾರಿ ಪ್ರೌಢಶಾಲೆ ಹುಲಿಕಟ್ಟಿ
              </h1>
            </div>

            {/* Content */}
            <div className="relative z-10 text-sm md:text-base flex flex-col gap-y-3">
              <div className="text-center border-b pb-2">
                <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                  ಅಂಕಪಟ್ಟಿ
                </h1>
                <h2 className="text-md md:text-lg font-semibold text-gray-700">
                  Government High School, Hulikatti
                </h2>
                <p className="text-xs text-gray-600 italic">
                  ಸರ್ಕಾರಿ ಪ್ರೌಢಶಾಲೆ ಹುಲಿಕಟ್ಟಿ
                </p>
              </div>

              {/* Student Info */}
              <div className="text-gray-800">
                <p>
                  <strong>ಹೆಸರು:</strong> {student.name}
                </p>
                <p>
                  <strong>ರೋಲ್ ನಂ.:</strong> {student.rollNumber}
                </p>
                <p>
                  <strong>ವರ್ಗ:</strong> {student.class}ನೇ ತರಗತಿ
                </p>
                <p>
                  <strong>ಪರೀಕ್ಷೆ:</strong> {student.examType}
                </p>
                <p>
                  <strong>ಶೈಕ್ಷಣಿಕ ವರ್ಷ:</strong> {student.year}
                </p>
              </div>

              {/* Subject Table */}
              <div>
                <h3 className="font-semibold mb-1">ವಿಷಯ ಆಧಾರಿತ ಅಂಕಗಳು:</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border border-collapse border-gray-300 text-xs md:text-sm">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="border p-2 text-left">ವಿಷಯ</th>
                        <th className="border p-2 text-left">ಅಂಕಗಳು</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(student.subjects).map(
                        ([subject, marks]) => (
                          <tr key={subject}>
                            <td className="border p-2">{subject}</td>
                            <td
                              className={`border p-2 ${
                                marks < 35 ? "text-red-600 font-semibold" : ""
                              }`}
                            >
                              {marks}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Summary */}
              <div className="pt-2 text-sm md:text-base">
                <p>
                  <strong>ಒಟ್ಟು ಅಂಕಗಳು:</strong> {student.total} / {maxTotal}
                </p>
                <p>
                  <strong>ಶೇಕಡಾವಾರು:</strong> {student.percentage}%
                </p>
                <p>
                  <strong>ಸ್ಥಿತಿ:</strong>{" "}
                  <span
                    className={`font-semibold ${
                      student.status === "Pass"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {student.status === "Pass" ? "ಉತ್ತೀರ್ಣ" : "ಅನುತ್ತೀರ್ಣ"}
                  </span>
                </p>
              </div>

              {/* Footer */}
              <div className="flex justify-between text-xs pt-2 border-t mt-2">
                <div>
                  <p>ದಿನಾಂಕ: {new Date().toLocaleDateString("kn-IN")}</p>
                  <p className="text-gray-600">ಸ್ಥಳ: ಹುಲಿಕಟ್ಟಿ</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">ಮುಖ್ಯೋಪಾಧ್ಯಾಯರು</p>
                  <p className="text-gray-600 italic">
                    ಸಾ. ಪ್ರೌ. ಶಾ., ಹುಲಿಕಟ್ಟಿ
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-between mt-4 gap-3">
            <button
              onClick={handleBack}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-700 transition text-sm"
            >
              ಹಿಂದಿರುಗಿ
            </button>
            <button
              onClick={downloadPDF}
              className="bg-blue-700 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-800 transition text-sm"
            >
              PDF ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Result;
