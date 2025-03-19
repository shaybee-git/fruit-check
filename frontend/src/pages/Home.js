import React, { useState, useEffect } from "react";
import { Link,  useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Login from "./Login"; // Import the Login component
import { LayoutDashboard } from "lucide-react";

const Home = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token") !== null);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("token") !== null);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-900 text-white">
      {/* Navbar */}
      <motion.nav
        className="bg-gray-800 shadow-lg fixed w-full top-0 left-0 z-50 p-4 flex justify-between items-center px-10"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-extrabold text-yellow-400 tracking-wide">FruitCheck</h1>
        <div className="space-x-6">
          <Link to="/" className="text-gray-300 hover:text-yellow-400 transition duration-300">Home</Link>
          <Link to="/about" className="text-gray-300 hover:text-yellow-400 transition duration-300">About Us</Link>
          <Link to="/contact" className="text-gray-300 hover:text-yellow-400 transition duration-300">Contact Us</Link>
          {isLoggedIn && (
            <Link to="/check-fruit" className="text-gray-300 hover:text-yellow-400 transition duration-300">
              Check Fruit
            </Link>
          )}
        </div>
        <div>
          {!isLoggedIn ? (
            <>
              <motion.button
                onClick={() => setIsLoginOpen(true)}
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
          ) : (
            <>
            <div className = "flex items-center space-x-4">
             <motion.button
                            onClick={() => navigate("/dashboard")}
                            className="bg-gray-700 p-2 rounded-full text-white shadow-md hover:bg-gray-600 transition duration-300"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <LayoutDashboard size={24} />
                          </motion.button>
            
            <motion.button
              onClick={handleLogout}
              className="bg-red-500 px-5 py-2 rounded-lg text-white font-semibold shadow-lg hover:bg-red-600 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Logout
            </motion.button>
            </div>
            </>
        
          )}
        </div>
      </motion.nav>

      {/* Hero Section */}
      <div className={`transition-all duration-300 ${isLoginOpen ? "blur-md" : ""}`}>
        <motion.div
        className="h-screen flex items-center justify-center text-center px-10 bg-cover bg-center relative"
        style={{ backgroundImage: `url('https://images.pexels.com/photos/6753523/pexels-photo-6753523.jpeg')` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-800 to-black opacity-80"></div>

          <div className="relative z-10">
            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-5xl font-extrabold text-yellow-400 drop-shadow-lg"
            >
              AI-Powered Fruit Ripeness Detection
            </motion.h1>
            <p className="text-gray-300 mt-4 text-lg max-w-2xl mx-auto">
              Upload an image and let AI determine the ripeness of your fruit.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-6"
            >
              <Link
                to="/check-fruit"
                className="bg-yellow-500 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-lg hover:bg-yellow-600 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                Check Fruit Now
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Features Section */}
        <section className="py-16 bg-gray-800">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-yellow-400 mb-10">Why Choose Our AI Fruit Detector?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Fast & Accurate", desc: "Get instant results with our high-precision AI model." },
                { title: "Multiple Fruit Detection", desc: "Analyze various fruits for ripeness in one scan." },
                { title: "Easy to Use", desc: "Just upload a photo and let AI do the rest." }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-700 p-6 shadow-lg rounded-lg text-white"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-semibold text-yellow-400">{feature.title}</h3>
                  <p className="text-gray-300 mt-2">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-400 text-center py-4">
          &copy; 2025 Fruit Detector | All Rights Reserved
        </footer>
      </div>

      {/* Login Modal */}
      <AnimatePresence>
        {isLoginOpen && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-lg bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onClick={() => setIsLoginOpen(false)}
          >
            <motion.div
              className="bg-gray-800 p-6 rounded-lg shadow-lg relative w-96 text-black"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <Login onClose={() => setIsLoginOpen(false)} onLoginSuccess={() => setIsLoggedIn(true)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
