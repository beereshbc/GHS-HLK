import React, { useState } from "react";
import { Upload, FilePenLine } from "lucide-react";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

const classes = ["8", "9", "10"];
const subjects = ["Kannada", "English", "Math", "Science", "Social", "Hindi"];

const AddLinkImage = () => {
  const [quizLinks, setQuizLinks] = useState({});
  const [notesLinks, setNotesLinks] = useState({});
  const [timetables, setTimetables] = useState({});

  const { axios } = useAppContext();

  const handleInput = (setter, type, cls, subj, value) => {
    setter((prev) => ({
      ...prev,
      [`${cls}_${subj}`]: value,
    }));
  };

  const handleTimetableUpload = (cls, file) => {
    setTimetables((prev) => ({
      ...prev,
      [cls]: file,
    }));
  };

  const handleSubmit = async (data, label) => {
    try {
      if (label === "Quiz") {
        const payload = Object.entries(data).map(([cls, link]) => ({
          classLevel: parseInt(cls),
          link,
        }));
        await axios.post("/api/admin/update-quiz-links", { links: payload });
        toast.success("Quiz links updated successfully");
      }

      if (label === "Notes") {
        const payload = Object.entries(data).map(([key, link]) => {
          const [cls, subject] = key.split("_");
          return {
            classLevel: parseInt(cls),
            name: subject,
            driveLink: link,
          };
        });
        await axios.post("/api/admin/add-notes-link", { links: payload });
        toast.success("Notes links updated successfully");
      }

      if (label === "Timetables") {
        const formData = new FormData();
        Object.entries(data).forEach(([cls, file]) => {
          formData.append("files", file); // multiple file upload
          formData.append("classLevels", cls); // match order
        });

        await axios.post("/api/admin/update-timetable", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Timetables uploaded successfully");
      }
    } catch (err) {
      toast.error(`Failed to update ${label}.`);
      console.error(err);
    }
  };

  return (
    <div className="sm:max-w-7xl w-[80vw] mx-auto px-4 sm:px-6 py-6 bg-white text-gray-800 rounded-xl shadow-md space-y-12 mt-6 mb-10">
      {/* Quiz Links */}
      <section>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-[#8A0000]">
          <FilePenLine className="w-5 h-5" />
          Quiz Links
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-[400px] w-full text-base border border-gray-300">
            <thead>
              <tr className="bg-yellow-300">
                <th className="p-3 border text-left">Class</th>
                <th className="p-3 border text-left">Link</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((cls) => (
                <tr key={cls}>
                  <td className="p-3 border font-medium text-[#8A0000]">
                    Class {cls}
                  </td>
                  <td className="p-3 border">
                    <input
                      type="text"
                      placeholder="Paste quiz link"
                      className="w-full border border-gray-300 p-2 rounded text-base"
                      value={quizLinks[cls] || ""}
                      onChange={(e) =>
                        setQuizLinks((prev) => ({
                          ...prev,
                          [cls]: e.target.value,
                        }))
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-right">
          <button
            className="px-5 py-2 bg-[#8A0000] text-white rounded hover:bg-yellow-400 text-base transition"
            onClick={() => handleSubmit(quizLinks, "Quiz")}
          >
            Update Quiz Links
          </button>
        </div>
      </section>

      {/* Notes Links */}
      <section>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-[#8A0000]">
          <FilePenLine className="w-5 h-5" />
          Notes Links
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-[600px] w-full text-base border border-gray-300">
            <thead>
              <tr className="bg-yellow-300">
                <th className="p-3 border text-left">Subject</th>
                {classes.map((cls) => (
                  <th key={cls} className="p-3 border text-left">
                    Class {cls}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {subjects.map((subj) => (
                <tr key={subj}>
                  <td className="p-3 border font-medium text-[#8A0000]">
                    {subj}
                  </td>
                  {classes.map((cls) => (
                    <td key={cls} className="p-3 border">
                      <input
                        type="text"
                        placeholder="Paste link"
                        className="w-full border border-gray-300 p-2 rounded text-base"
                        value={notesLinks[`${cls}_${subj}`] || ""}
                        onChange={(e) =>
                          handleInput(
                            setNotesLinks,
                            "notes",
                            cls,
                            subj,
                            e.target.value
                          )
                        }
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-right">
          <button
            className="px-5 py-2 bg-[#8A0000] text-white rounded hover:bg-yellow-400 text-base transition"
            onClick={() => handleSubmit(notesLinks, "Notes")}
          >
            Update Notes Links
          </button>
        </div>
      </section>

      {/* Timetable Upload */}
      <section>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-[#8A0000]">
          <Upload className="w-5 h-5" />
          Timetable Upload
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-[400px] w-full text-base border border-gray-300">
            <thead>
              <tr className="bg-yellow-300">
                <th className="p-3 border text-left">Class</th>
                <th className="p-3 border text-left">Upload Image</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((cls) => (
                <tr key={cls}>
                  <td className="p-3 border font-medium text-[#8A0000]">
                    Class {cls}
                  </td>
                  <td className="p-3 border">
                    <input
                      type="file"
                      accept="image/*"
                      className="text-base"
                      onChange={(e) =>
                        handleTimetableUpload(cls, e.target.files[0])
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-right">
          <button
            className="px-5 py-2 bg-[#8A0000] text-white rounded hover:bg-yellow-400 text-base transition"
            onClick={() => handleSubmit(timetables, "Timetables")}
          >
            Upload Timetables
          </button>
        </div>
      </section>
    </div>
  );
};

export default AddLinkImage;
