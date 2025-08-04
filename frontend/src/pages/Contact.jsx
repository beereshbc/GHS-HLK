import React from "react";
import { assets, teachersContact } from "../assets/assets";
import { Mail, Phone, Users2 } from "lucide-react";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-blue-50 py-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        <img
          src={assets.ghs8}
          alt="School"
          className="w-full h-64 object-cover rounded-t-3xl brightness-110 contrast-125"
        />
        <div className="p-6 sm:p-10 text-gray-800">
          <motion.h1
            className="text-3xl font-bold text-center text-blue-700 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            ಸಂಪರ್ಕ ಮಾಹಿತಿ
          </motion.h1>

          <motion.p
            className="text-lg font-medium text-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            ಸರ್ಕಾರಿ ಪ್ರೌಢಶಾಲೆ ಹುಲಿಕಟ್ಟಿಯ ಶಿಕ್ಷಕರ ಸಂಪರ್ಕ ವಿವರಗಳು.
          </motion.p>

          <div className="grid sm:grid-cols-2 gap-6">
            {/* Email Box */}
            <motion.div
              className="bg-yellow-100 p-5 rounded-xl shadow-md flex items-center gap-4"
              whileHover={{ scale: 1.02 }}
            >
              <Mail className="text-blue-700 w-8 h-8" />
              <div>
                <p className="font-semibold text-blue-900">ಇಮೇಲ್:</p>
                <p className="text-gray-700">ghshulikatte@gmail.com</p>
              </div>
            </motion.div>

            {/* Mobile Box */}
            <motion.div
              className="bg-blue-100 p-5 rounded-xl shadow-md flex items-start gap-4"
              whileHover={{ scale: 1.02 }}
            >
              <Phone className="text-blue-700 w-8 h-8 mt-1" />
              <div>
                <p className="font-semibold text-blue-900">ಮೊಬೈಲ್ ಸಂಖ್ಯೆ:</p>
                <ul className="mt-1 text-gray-700 list-disc ml-4">
                  {teachersContact.map((t, i) => (
                    <li key={i}>
                      {t.name} ({t.subject}): {t.phone}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
          {/* Embedded Map Card */}
          <motion.div
            className="mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <div className="bg-yellow-50 p-4 rounded-xl shadow-md">
              <h2 className="text-lg font-semibold text-blue-800 mb-2 text-center">
                ಶಾಲೆಯ ನಕ್ಷೆ
              </h2>
              <div className="rounded-lg overflow-hidden border border-blue-200">
                <iframe
                  title="GHS Hulikatti Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3892.1120078162226!2d75.775951!3d14.549268!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bba2b2dd9de50b9%3A0x2041a4a36ae29d55!2sGovt%20High%20School%20Hulikatti!5e0!3m2!1sen!2sin!4v1690486874015!5m2!1sen!2sin"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="mt-10 text-center text-sm text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Users2 className="w-6 h-6 mx-auto mb-2 text-blue-600" />
            ಯಾವುದೇ ಪ್ರಶ್ನೆಗಳಿಗೆ ಮೇಲಿನ ಸಂಖ್ಯೆಗಳ ಮೂಲಕ ಸಂಪರ್ಕಿಸಿ.
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
