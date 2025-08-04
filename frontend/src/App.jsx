import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import GHS_AI from "./pages/GHS_AI";
import Staff from "./pages/Staff";
import About from "./pages/About";
import Gallary from "./pages/Gallary";
import SSLC from "./pages/SSLC";
import Parliament from "./pages/Parliament";
import Result from "./pages/Result";
import Notes from "./pages/Notes";
import Quiz from "./pages/Quiz";
import Timetable from "./pages/Timetable";

import { Toaster } from "react-hot-toast";
import Blog from "./pages/Blog";
import BlogHome from "./pages/BlogHome";
import Contact from "./pages/Contact";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  return (
    <div>
      <Toaster />
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/ghs-ai" element={<GHS_AI />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallary />} />
        <Route path="/sslc" element={<SSLC />} />
        <Route path="/parliament" element={<Parliament />} />
        <Route path="/results" element={<Result />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/timetable" element={<Timetable />} />
        <Route path="/blogs" element={<BlogHome />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
};

export default App;
