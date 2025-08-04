import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { useEffect } from "react";
// import axios from "axios";

const ParliamentList = () => {
  const [members, setMembers] = useState([]);
  const { axios } = useAppContext();

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure to delete?");
    if (!confirmDelete) return;

    try {
      const { data } = await axios.post("/api/admin/dlt-member", { id });
      if (data.success) {
        fetchMembers();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
      setMembers(members.filter((member) => member.id !== id));
    } catch (err) {
      toast.error(err.message);
    }
  };

  const fetchMembers = async () => {
    try {
      const { data } = await axios.get("/api/admin/get-members");
      if (data.success) {
        setMembers(data.members);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-800 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        School Parliament Members
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {members.map((member) => (
          <div
            key={member._id}
            className="bg-gray-100 shadow-md rounded-2xl p-4 flex flex-col items-center relative group"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-28 h-28 object-cover rounded-full border-4 border-white shadow"
            />
            <h2 className="text-xl font-semibold mt-3">{member.name}</h2>
            <p className="text-gray-600 mt-1">{member.role}</p>
            <p className="text-sm text-gray-500">{member.year}</p>

            <button
              onClick={() => handleDelete(member._id)}
              className="absolute top-3 right-3 p-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParliamentList;
