import React from "react";
import BlogList from "../components/BlogList";
import Header from "../components/Header";
import Footer from "../components/Footer";

const BlogHome = () => {
  return (
    <div>
      <Header />
      <BlogList />
      <Footer />
    </div>
  );
};

export default BlogHome;
