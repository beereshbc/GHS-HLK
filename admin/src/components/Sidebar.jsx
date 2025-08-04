import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Newspaper,
  Users,
  Image as ImageIcon,
  Landmark,
  GalleryVertical,
  GraduationCap,
  Pencil,
  Shield,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [openSection, setOpenSection] = useState("");
  const [collapsed, setCollapsed] = useState(true);

  const sidebarData = [
    {
      title: "Blog",
      icon: <Newspaper size={20} />,
      children: [
        { name: "AddBlog", path: "/add-blog" },
        { name: "BlogList", path: "/blog-list" },
      ],
    },
    {
      title: "Quiz",
      icon: <Pencil size={20} />,
      children: [
        { name: "Add Student", path: "/add-student" },
        { name: "Student List", path: "/student-list" },
      ],
    },
    {
      title: "Result",
      icon: <Shield size={20} />,
      children: [
        { name: "Add Result", path: "/add-result" },
        { name: "Result List", path: "/result-list" },
      ],
    },
    {
      title: "Staffs",
      icon: <Users size={20} />,
      children: [
        { name: "Add Staff", path: "/add-staff" },
        { name: "StaffList", path: "/staff-list" },
      ],
    },
    {
      title: "Link/Images",
      icon: <ImageIcon size={20} />,
      children: [{ name: "Add Links/Images", path: "/add-link-image" }],
    },
    {
      title: "Parliament",
      icon: <Landmark size={20} />,
      children: [
        { name: "Add New", path: "/add-parliament" },
        { name: "Parliament List", path: "/parliament-list" },
      ],
    },
    {
      title: "Gallery",
      icon: <GalleryVertical size={20} />,
      children: [
        { name: "Add Image", path: "/add-gallery" },
        { name: "Gallery List", path: "/gallery-list" },
      ],
    },
    {
      title: "SSLC",
      icon: <GraduationCap size={20} />,
      children: [
        { name: "Add Topper", path: "/add-topper" },
        { name: "SSLC List", path: "/sslc-list" },
      ],
    },
  ];

  const toggleSection = (title) => {
    // Expand the sidebar when toggling a section
    setCollapsed(false);
    setOpenSection((prev) => (prev === title ? "" : title));
  };

  const handleLinkClick = () => {
    // Collapse after clicking a subsection
    setCollapsed(true);
    setOpenSection("");
  };

  return (
    <div
      className={`${
        collapsed ? "w-16" : "w-64"
      } fixed top-18 left-0 h-[calc(100vh-4rem)] bg-white  p-4  text-gray-800 z-40 transition-all duration-300 overflow-y-auto`}
    >
      {/* Sections */}
      {sidebarData.map((section) => (
        <div key={section.title} className="mb-2">
          <button
            onClick={() => toggleSection(section.title)}
            className="flex items-center justify-between w-full p-2 hover:bg-gray-100 rounded-md"
          >
            <div className="flex items-center gap-2">
              {section.icon}
              {!collapsed && <span>{section.title}</span>}
            </div>
            {!collapsed &&
              (openSection === section.title ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              ))}
          </button>

          {/* Subsections */}
          {openSection === section.title && !collapsed && (
            <ul className="mt-2 ml-8">
              {section.children.map((child) => (
                <li key={child.name}>
                  <NavLink
                    to={child.path}
                    onClick={handleLinkClick}
                    className={({ isActive }) =>
                      `block px-2 py-1 text-sm rounded ${
                        isActive
                          ? "text-blue-600 font-semibold"
                          : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                      }`
                    }
                  >
                    {child.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
