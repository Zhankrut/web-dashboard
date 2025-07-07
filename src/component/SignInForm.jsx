import React from "react";
import { motion as Motion } from "framer-motion";

const SigninForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <Motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-sky-300"
    >
      <Motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-xl p-10 w-[90%] max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-sky-600 mb-6">
          Login to Dashboard
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              name="email"
              type="email"
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              name="password"
              type="password"
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>
          <Motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full py-3 bg-sky-500 text-white rounded-md font-semibold hover:bg-sky-600 transition"
          >
            Login
          </Motion.button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <a href="/signup" className="text-sky-500 hover:underline">
            Sign up
          </a>
        </p>
      </Motion.div>
    </Motion.div>
  );
};

export default SigninForm;
