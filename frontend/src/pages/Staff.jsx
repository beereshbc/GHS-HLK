import React from "react";
import { staffData } from "../assets/assets";
import { UserCircle, Briefcase } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

import { useEffect } from "react";
import { useAppContext } from "../context/AppContext";

const Staff = () => {
  const [staffs, setStaffs] = useState([]);
  const { axios } = useAppContext();

  const fetchStaffData = async () => {
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
    fetchStaffData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white text-gray-900 px-4 pb-20 pt-10">
      {/* Header */}
      <header className="text-center mb-14">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-600 drop-shadow-xl tracking-wide">
          ಸರ್ಕಾರಿ ಪ್ರೌಢಶಾಲೆ ಹುಲಿಕಟ್ಟಿಯ ಸಿಬ್ಬಂದಿಗಳು
        </h1>
        <p className="text-sm md:text-base text-[#8A0000] mt-2 font-medium">
          ನಮ್ಮ ಶಾಲೆಯ ನಿಷ್ಠಾವಂತ ಮತ್ತು ಅನುಭವಸಂಪನ್ನ ಸಿಬ್ಬಂದಿ ಪರಿಚಯ
        </p>
      </header>

      {/* Staff Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {staffs.map((staff) => (
          <div
            key={staff._id}
            className="group bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 ease-in-out"
          >
            <img
              src={staff.image}
              alt={staff.name}
              className="w-full h-64 object-cover transition-all duration-300 group-hover:brightness-105 group-hover:contrast-110"
            />
            <div className="p-6 text-center">
              <h2 className="text-xl font-bold text-blue-800 mb-1 tracking-wide">
                {staff.name}
              </h2>

              <p className="flex items-center justify-center text-gray-700 gap-1 ">
                <UserCircle className="w-4 flex items-center h-4 text-[#8A0000] text-center " />
                <span className="text-sm font-medium">{staff.designation}</span>
              </p>

              <p className="mt-2 flex items-center justify-center text-gray-700 gap-1">
                <Briefcase className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium">
                  {staff.experience} years
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Staff;
