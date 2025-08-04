import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import BlogCard from "../components/BlogCard";
import { useAppContext } from "../context/AppContext";

const BlogList = () => {
  const [menu, setMenu] = useState("All");

  const { blogs, input } = useAppContext();

  const filteredBlogs = () => {
    if (input === "") {
      return blogs;
    }
    return blogs.filter((blog) =>
      blog.title.toLowerCase().includes(input.toLowerCase())
    );
  };

  useEffect(() => {
    filteredBlogs();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 sm:mx-16 xl:mx-40 mx-8">
        {filteredBlogs()
          .filter((blog) => (menu === "All" ? true : blog.category === menu))
          .map((blog) => (
            <BlogCard blog={blog} key={blog._id} />
          ))}
      </div>
    </div>
  );
};

export default BlogList;
3;
