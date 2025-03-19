import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col items-center py-12 px-6">
      
      {/* Animated Header */}
      <motion.h1
        className="text-5xl font-bold text-white drop-shadow-lg mb-6"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        About Us 🍏
      </motion.h1>

      {/* Introduction Section */}
      <motion.p
        className="text-lg text-gray-300 max-w-2xl text-center mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Welcome to FruitCheck – your AI-powered companion for fruit ripeness detection. 
        Our goal is to help users enjoy fresh and perfectly ripe fruits with the power of AI.
      </motion.p>

     
      {/* Features Section */}
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
        {/* Feature 1 */}
        <motion.div
          className="bg-gray-700 p-6 rounded-lg shadow-lg text-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h3 className="text-2xl font-semibold text-green-400 mb-3">🌿 AI-Powered Analysis</h3>
          <p className="text-gray-300">We use advanced AI and machine learning to determine fruit ripeness with high accuracy.</p>
        </motion.div>

        {/* Feature 2 */}
        <motion.div
          className="bg-gray-700 p-6 rounded-lg shadow-lg text-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="text-2xl font-semibold text-yellow-400 mb-3">🍎 Freshness Detection</h3>
          <p className="text-gray-300">We help users avoid **unripe or overripe fruits, ensuring the best taste and nutritional value.</p>
        </motion.div>

        {/* Feature 3 */}
        <motion.div
          className="bg-gray-700 p-6 rounded-lg shadow-lg text-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-2xl font-semibold text-red-400 mb-3">📊 Confidence Scores</h3>
          <p className="text-gray-300">Our AI model provides confidence scores to show how sure it is about the ripeness level.</p>
        </motion.div>

        {/* Feature 4 */}
        <motion.div
          className="bg-gray-700 p-6 rounded-lg shadow-lg text-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h3 className="text-2xl font-semibold text-blue-400 mb-3">📱 Easy to Use</h3>
          <p className="text-gray-300">Simply upload an image of a fruit, and our AI will analyze it in seconds!</p>
        </motion.div>
      </div>

      {/* Call to Action */}
      <motion.div
        className="mt-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <a
          href="/check-fruit"
          className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg text-xl font-semibold shadow-lg transition-all"
        >
          🍊 Check a Fruit Now
        </a>
      </motion.div>

    </div>
  );
};

export default About;
