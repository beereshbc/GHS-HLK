import React, { useState, useEffect } from "react";
import Hero from "../components/Hero";
import WeeklyResult from "../components/WeeklyResult";
import Testimonials from "../components/Testimonials";
import StudentSkeleton from "../components/StudentSkeleton";
import Footer from "../components/Footer";

const Home = () => {
  const [loading, setLoading] = useState(true);

  // simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds fake load
    return () => clearTimeout(timer);
  }, []);

  return !loading ? (
    <div className="">
      <Hero />
      <WeeklyResult />
      <Testimonials />
      <Footer />
    </div>
  ) : (
    <StudentSkeleton />
  );
};

export default Home;
