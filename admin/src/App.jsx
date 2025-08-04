import React, { useState } from "react";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AddStaffs from "./pages/AddStaffs";
import StaffsList from "./pages/StaffsList";
import AddLinkImage from "./pages/AddLinkImage";
import AddParliament from "./pages/AddParliament";
import ParliamentList from "./pages/ParliamentList";
import AddGallary from "./pages/AddGallary";
import GalleryList from "./pages/GalleryList";
import AddTopper from "./pages/AddTopper";
import SSLCList from "./pages/SSLCList";
import AddBlog from "./pages/AddBlog";
import ListBlog from "./pages/ListBlog";
import AddQuizStudent from "./pages/AddQuizStudent";
import StudentList from "./pages/StudentLsit";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import AddResult from "./pages/AddResult";
import ResultList from "./pages/ResultList";
import { useAppContext } from "./context/AppContext";

const App = () => {
  const { token } = useAppContext();

  return (
    <div>
      {token ? (
        <div>
          <Toaster />
          <Navbar />
          <div className="flex">
            <Sidebar />
            <main className="flex-1 p-4 ml-10">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add-staff" element={<AddStaffs />} />
                <Route path="/staff-list" element={<StaffsList />} />
                <Route path="/add-link-image" element={<AddLinkImage />} />
                <Route path="/add-parliament" element={<AddParliament />} />
                <Route path="/parliament-list" element={<ParliamentList />} />
                <Route path="/add-gallery" element={<AddGallary />} />
                <Route path="/gallery-list" element={<GalleryList />} />
                <Route path="/add-topper" element={<AddTopper />} />
                <Route path="/sslc-list" element={<SSLCList />} />
                <Route path="/add-blog" element={<AddBlog />} />
                <Route path="/blog-list" element={<ListBlog />} />
                <Route path="/blog-list" element={<ListBlog />} />
                <Route path="/add-student" element={<AddQuizStudent />} />
                <Route path="/student-list" element={<StudentList />} />
                <Route path="/add-result" element={<AddResult />} />
                <Route path="//result-list" element={<ResultList />} />
              </Routes>
            </main>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;
