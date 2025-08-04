import React from "react";
import { LogOut } from "lucide-react";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const { token, setToken } = useAppContext();

  const handleLogout = (e) => {
    e.preventDefault();
    setToken("");
    localStorage.setItem("GHS-Token", null);
  };

  return (
    <nav className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Logo Section */}
      <div className="text-[#8A0000] font-bold text-xl tracking-wide">
        GHS Hulikatti
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 bg-[#8A0000] text-white px-4 py-2 rounded-lg hover:bg-red-800 transition"
      >
        <LogOut size={18} />
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
