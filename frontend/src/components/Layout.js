import React from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";
import { motion } from "framer-motion"; // ✅ Import motion from framer-motion

const Layout = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("token") !== null;

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear authentication
    localStorage.removeItem("userId");
    navigate("/login"); // Redirect to login
  };

  return (
    <div>
      {/* 🔹 Header with Motion Effects */}
      <motion.nav 
        className="bg-gray-900 shadow-md fixed w-full top-0 left-0 z-50 p-4 flex justify-between items-center px-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-white">FruitCheck</h1>

        {/* 🔹 Navigation Links */}
        <div className="space-x-6">
          <Link to="/" className="text-gray-300 hover:text-yellow-400 transition duration-300">Home</Link>
          <Link to="/about" className="text-gray-300 hover:text-yellow-400 transition duration-300">About Us</Link>
          <Link to="/contact" className="text-gray-300 hover:text-yellow-400 transition duration-300">Contact Us</Link>
          {isAuthenticated && (
            <Link to="/check-fruit" className="text-gray-300 hover:text-yellow-400 transition duration-300">
              Check Fruit
            </Link>
          )}
        </div>

        {/* 🔹 Authentication Buttons */}
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              {/* Dashboard Button */}
              <motion.button
                onClick={() => navigate("/dashboard")}
                className="bg-gray-700 p-2 rounded-full text-white shadow-md hover:bg-gray-600 transition duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <LayoutDashboard size={24} />
              </motion.button>

              {/* Logout Button */}
              <motion.button
                onClick={handleLogout}
                className="bg-red-500 px-5 py-2 rounded-lg text-white font-semibold shadow-lg hover:bg-red-600 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Logout
              </motion.button>
            </>
          ) : (
            <>
              <motion.button
                onClick={() => navigate("/login")}
                className="bg-yellow-500 px-5 py-2 rounded-lg text-white font-semibold shadow-lg hover:bg-yellow-600 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Login
              </motion.button>
              <Link
                to="/register"
                className="bg-blue-500 px-5 py-2 ml-2 rounded-lg text-white font-semibold shadow-lg hover:bg-blue-600 transition-all duration-300"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </motion.nav>

      {/* 🔹 Main Content (Avoids Overlapping with Fixed Header) */}
      <div className="pt-10">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
