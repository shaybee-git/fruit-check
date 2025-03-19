import React from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col items-center justify-center px-6 py-12">
      
      {/* Title Section */}
      <motion.h1
        className="text-5xl font-bold drop-shadow-lg text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Get in Touch 📩
      </motion.h1>

      <p className="mt-4 text-gray-400 text-lg text-center">
        Have questions? We're here to help! Reach out to us.
      </p>

      {/* Contact Details */}
      <motion.div
        className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Email */}
        <div className="bg-gray-800/80 p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <FaEnvelope className="text-green-400 text-4xl mx-auto" />
          <h3 className="mt-4 text-xl font-semibold">Email Us</h3>
          <p className="text-gray-300">support@fruitcheck.com</p>
        </div>

        {/* Phone */}
        <div className="bg-gray-800/80 p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <FaPhoneAlt className="text-green-400 text-4xl mx-auto" />
          <h3 className="mt-4 text-xl font-semibold">Call Us</h3>
          <p className="text-gray-300">+123 456 7890</p>
        </div>

        {/* Address */}
        <div className="bg-gray-800/80 p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <FaMapMarkerAlt className="text-green-400 text-4xl mx-auto" />
          <h3 className="mt-4 text-xl font-semibold">Visit Us</h3>
          <p className="text-gray-300">123 Fruit Street, NY</p>
        </div>
      </motion.div>

      {/* Contact Form */}
      <motion.div
        className="mt-10 bg-gray-800/80 p-8 rounded-lg shadow-lg w-full max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl font-bold text-center">Send a Message</h2>
        <form 
  action="https://formsubmit.co/shoaibnazir.contact@gmail.com" 
  method="POST" 
  className="mt-6 space-y-4"
>
  <input type="text" name="name" placeholder="Your Name" required className="w-full p-3 bg-gray-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-green-500" />
  <input type="email" name="email" placeholder="Your Email" required className="w-full p-3 bg-gray-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-green-500" />
  <textarea name="message" placeholder="Your Message" required className="w-full p-3 bg-gray-700 text-white rounded-lg outline-none h-32 focus:ring-2 focus:ring-green-500"></textarea>
  <motion.button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg text-lg font-semibold transition hover:bg-green-700" whileHover={{ scale: 1.05 }}>
    Send Message
  </motion.button>
</form>
      </motion.div>
    </div>
  );
};

export default Contact;
