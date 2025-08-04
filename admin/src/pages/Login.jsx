import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { axios, token, setToken } = useAppContext();

  const togglePassword = () => setShowPassword((prev) => !prev);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "/api/admin/admin-login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (data.success) {
        toast.success("Login successful");
        setToken(data.token);
        localStorage.setItem("GHS-Token", data.token);
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md bg-white text-gray-800 rounded-2xl shadow-xl p-8"
      >
        <div className="flex items-center gap-2 mb-6 justify-center">
          <ShieldCheck className="text-[#8A0000]" size={28} />
          <h2 className="text-2xl font-bold text-[#8A0000]">Admin Login</h2>
        </div>

        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="flex items-center bg-gray-100 px-3 py-2 rounded-lg border border-gray-300">
              <Mail className="text-gray-500 mr-2" size={18} />
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="admin@example.com"
                className="bg-transparent focus:outline-none text-sm w-full text-gray-800 placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="flex items-center bg-gray-100 px-3 py-2 rounded-lg border border-gray-300">
              <Lock className="text-gray-500 mr-2" size={18} />
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="bg-transparent focus:outline-none text-sm w-full text-gray-800 placeholder:text-gray-400"
              />
              <button
                type="button"
                onClick={togglePassword}
                className="text-gray-500 ml-2"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-2 bg-[#8A0000] hover:bg-red-800 transition-all rounded-lg text-white font-semibold"
          >
            Login
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
