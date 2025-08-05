import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import toast from "react-hot-toast";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const WeeklyResult = () => {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const { data } = await axios.get("api/admin/quiz-student");
      if (data.success) {
        setStudents(data.students);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const settings = {
    dots: true,
    infinite: students.length > 1,
    speed: 700,
    slidesToShow: Math.min(3, students.length),
    slidesToScroll: students.length > 2 ? 2 : 1,
    autoplay: students.length > 1,
    autoplaySpeed: 3000, // ← your requested speed
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(2, students.length),
          slidesToScroll: 1,
          infinite: students.length > 1,
          autoplay: students.length > 1,
          autoplaySpeed: 3000,
          speed: 700,
          cssEase: "linear",
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: students.length > 1,
          autoplay: students.length > 1,
          autoplaySpeed: 3000,
          speed: 700,
          cssEase: "linear",
        },
      },
    ],
  };

  return (
    <div className="w-full py-10 px-4 mb-10">
      <h2 className="text-center text-2xl md:text-3xl font-bold text-blue-800 mb-8">
        ವಾರದ ರಸಪ್ರಶ್ನೆ / ಫಲಿತಾಂಶ
      </h2>

      {/* Set width to 75% and center it */}
      <div className="w-[85%]  mx-auto">
        <Slider {...settings}>
          {students.map((student) => (
            <div
              key={student.id}
              className="px-4 py-6 space-x-2 mx-2 bg-white rounded-2xl flex justify-center shadow-lg border border-blue-100 transition-transform hover:scale-105"
            >
              <div className="flex flex-col items-center">
                <img
                  src={student.image}
                  alt={student.name}
                  className="w-40 h-40 rounded-lg object-cover border-4 border-blue-500 mb-4"
                />
                <h3 className="text-lg font-semibold text-blue-700">
                  {student.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {student.classLevel}ನೇ ತರಗತಿ
                </p>
                <div className="mt-4 text-center">
                  <p className="text-xl font-bold text-green-600">
                    {student.obtainedMarks}/{student.maxMarks}
                  </p>
                  <p className="text-[#8A0000] text-sm ">ಅಭಿನಂದನೆಗಳು</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default WeeklyResult;
