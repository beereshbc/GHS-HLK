import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  return (
    <nav className="bg-[#8A0000] text-white font-sans z-50 relative backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div onClick={() => navigate("/")} className="w-36">
          <img src={assets.ghs_logo} alt="Logo" className="h-14 w-auto" />
        </div>

        {/* Centered Nav Links (Desktop) */}
        <div className="hidden md:flex gap-10 items-center justify-center flex-1">
          {[
            {
              label: "ಶಾಲೆ",
              id: 1,
              links: [
                { to: "/", label: "ಮುಖಪುಟ" },
                { to: "/staff", label: "ಸಿಬ್ಬಂದಿಗಳು" },
                { to: "/about", label: "ನಮ್ಮ ಬಗ್ಗೆ" },
                { to: "/contact", label: "ಸಂಪರ್ಕಿಸಿ" },
              ],
            },
            {
              label: "ವಿದ್ಯಾರ್ಥಿ",
              id: 2,
              links: [
                { to: "/results", label: "ಫಲಿತಾಂಶ" },
                { to: "/notes", label: "ನೋಟ್ಸ್" },
                { to: "/quiz", label: "ರಸಪ್ರಶ್ನೆ" },
                { to: "/timetable", label: "ವೇಳಾಪಟ್ಟಿಗಳು" },
              ],
            },
            {
              label: "ಶೈಕ್ಷಣಿಕ",
              id: 3,
              links: [
                { to: "/blogs", label: "ಬ್ಲಾಗ್" },
                { to: "/parliament", label: "ಶಾಲಾ ಸಂಸತ್ತು" },
                { to: "/sslc", label: "ಎಸ್.ಎಸ್.ಎಲ್.ಸಿ" },
                { to: "/gallery", label: "ಗ್ಯಾಲರಿ" },
              ],
            },
          ].map(({ label, links }, i) => (
            <div key={i} className="group relative">
              <div className="flex items-center gap-1 cursor-pointer">
                <span className="text-lg font-semibold hover:text-yellow-300 transition">
                  {label}
                </span>
                <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
              </div>
              <div className="absolute left-0 mt-2 hidden group-hover:block transition-all duration-300 ease-in-out bg-white text-black rounded-xl shadow-xl py-2 px-4 z-20 w-56">
                {links.map(({ to, label }, idx) => (
                  <NavLink
                    key={idx}
                    to={to}
                    className="block px-2 py-2 rounded-md hover:bg-[#f0f0f0] transition-colors"
                  >
                    {label}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* GHS-AI Desktop */}
        <div className="hidden md:block mx-2">
          <NavLink
            to="/ghs-ai"
            className="text-sm font-medium  hover:text-[#8A0000] border border-ellow-300 px-6 py-1.5 rounded-lg hover:bg-yellow-300 transition"
          >
            GHS-AI
          </NavLink>
        </div>

        {/* Admin Login (Desktop) */}
        <div className="hidden md:block">
          <NavLink
            to="http://localhost:5174/"
            className="text-sm font-medium border border-white px-6 py-1.5 rounded-lg hover:text-yellow-300 transition"
          >
            Admin Login
          </NavLink>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 pt-2 bg-[#8A0000]/95 text-white space-y-4 rounded-b-xl">
          {[
            {
              id: 1,
              label: "ಶಾಲೆ",
              links: [
                { to: "/", label: "ಮುಖಪುಟ" },
                { to: "/staff", label: "ಸಿಬ್ಬಂದಿಗಳು" },
                { to: "/about", label: "ನಮ್ಮ ಬಗ್ಗೆ" },
                { to: "/contact", label: "ಸಂಪರ್ಕಿಸಿ" },
              ],
            },
            {
              id: 2,
              label: "ವಿದ್ಯಾರ್ಥಿ",
              links: [
                { to: "/results", label: "ಫಲಿತಾಂಶ" },
                { to: "/notes", label: "ನೋಟ್ಸ್" },
                { to: "/quiz", label: "ರಸಪ್ರಶ್ನೆ" },
                { to: "/timetable", label: "ವೇಳಾಪಟ್ಟಿಗಳು" },
              ],
            },
            {
              id: 3,
              label: "ಶೈಕ್ಷಣಿಕ",
              links: [
                { to: "/blogs", label: "ಬ್ಲಾಗ್" },
                { to: "/parliament", label: "ಶಾಲಾ ಸಂಸತ್ತು" },
                { to: "/sslc", label: "ಎಸ್.ಎಸ್.ಎಲ್.ಸಿ" },
                { to: "/gallery", label: "ಗ್ಯಾಲರಿ" },
              ],
            },
          ].map(({ id, label, links }) => (
            <div key={id}>
              <button
                onClick={() => toggleDropdown(id)}
                className="w-full flex justify-between items-center py-2 text-lg font-semibold text-yellow-200"
              >
                {label} {openDropdown === id ? <ChevronUp /> : <ChevronDown />}
              </button>
              {openDropdown === id && (
                <div className="pl-4 mt-1 space-y-1">
                  {links.map(({ to, label }, idx) => (
                    <NavLink
                      key={idx}
                      to={to}
                      className="block py-1 text-sm text-white hover:text-yellow-200"
                    >
                      {label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
          {/* GHS-AI */}
          <div>
            <NavLink
              to="/ghs-ai"
              className="block text-sm mt-3 font-medium  text-white hover:text-yellow-300"
            >
              GHS-AI
            </NavLink>
          </div>

          {/* Admin Login */}
          <div>
            <NavLink
              to="http://localhost:5174/"
              className="block text-sm mt-3 font-medium  text-white hover:text-yellow-300"
            >
              Admin Login
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
