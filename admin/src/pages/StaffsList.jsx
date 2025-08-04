import React, { useState } from "react";
import { Trash2, Users } from "lucide-react";
import toast from "react-hot-toast";
import ghs18 from "../assets/ghs18.png"; // Replace with actual image path
import { useAppContext } from "../context/AppContext";
import { useEffect } from "react";

const StaffsList = () => {
  const [staffs, setStaffs] = useState([]);

  const { axios } = useAppContext();

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this staff?"
    );
    if (confirmed) {
      setStaffs(staffs.filter((staff) => staff._id !== id));
    }

    const { data } = await axios.post("/api/admin/dlt-staff", { id });
    if (data.success) {
      toast.success(data.message);
      fetchStaffs();
    } else {
      toast.error(data.error);
    }
  };

  const fetchStaffs = async () => {
    try {
      const { data } = await axios.get("/api/admin/staffs");
      if (data.success) {
        toast.success("Staff List");
        setStaffs(data.staffs);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchStaffs();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
          <Users className="w-6 h-6 text-blue-600" />
          Staff List
        </h2>
        <p className="text-gray-500 text-sm">Total Staffs: {staffs.length}</p>
      </div>

      {/* Staff Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {staffs.map((staff) => (
          <div
            key={staff._id}
            className="bg-white rounded-xl shadow hover:shadow-md transition p-4 flex flex-col items-center text-center"
          >
            <img
              src={staff.image}
              alt={staff.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-blue-100 mb-4"
            />
            <h3 className="text-lg font-medium text-gray-800">{staff.name}</h3>
            <p className="text-sm text-gray-500">{staff.designation}</p>
            <p className="text-xs text-gray-400 mt-1">
              {staff.experience} years experience
            </p>
            <button
              onClick={() => handleDelete(staff._id)}
              className="mt-4 px-4 py-2 text-red-600 border border-red-200 rounded-full text-sm hover:bg-red-50 flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffsList;
