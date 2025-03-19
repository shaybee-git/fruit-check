import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Dashboard = () => {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [ripePercentage, setRipePercentage] = useState(0);
  const navigate = useNavigate(); // Initialize useNavigate

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please log in.");

      const response = await fetch("http://localhost:5000/api/fruit/history", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) throw new Error("Unauthorized: Please log in again.");

      const data = await response.json();
      setHistory(data);
      calculateRipePercentage(data);
    } catch (error) {
      console.error("Error fetching history:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const calculateRipePercentage = (data) => {
    const totalFruits = data.length;
    if (totalFruits === 0) {
      setRipePercentage(0);
      return;
    }

    const ripeFruits = data.filter((item) => item.ripeness.toLowerCase() === "ripe").length;
    const percentage = (ripeFruits / totalFruits) * 100;
    setRipePercentage(Math.round(percentage));
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center py-12 px-6">
      <motion.h1
        className="text-5xl font-bold text-white drop-shadow-lg mb-8"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        Fruit History 🍇
      </motion.h1>

      {/* ✅ Ripe vs. Unripe Meter */}
      {history.length > 0 && (
        <motion.div
          className="w-full max-w-2xl bg-gray-700/60 shadow-lg rounded-lg p-6 mb-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-lg font-semibold text-white mb-2">Ripe vs. Unripe Percentage</p>
          <div className="relative w-full bg-gray-300 rounded-full h-6 overflow-hidden shadow-inner">
            <motion.div
              className="absolute left-0 top-0 h-full bg-green-500 transition-all duration-500"
              style={{ width: `${ripePercentage}%` }}
              initial={{ width: "0%" }}
              animate={{ width: `${ripePercentage}%` }}
            ></motion.div>
            <motion.div
              className="absolute right-0 top-0 h-full bg-red-500 transition-all duration-500"
              style={{ width: `${100 - ripePercentage}%` }}
              initial={{ width: "0%" }}
              animate={{ width: `${100 - ripePercentage}%` }}
            ></motion.div>
          </div>
          <p className="text-white mt-2">
            <span className="text-green-400 font-bold">{ripePercentage}% Ripe</span> |{" "}
            <span className="text-red-400 font-bold">{100 - ripePercentage}% Unripe</span>
          </p>
        </motion.div>
      )}

      {loading ? (
        <motion.div
          className="h-12 w-12 border-t-4 border-white border-solid rounded-full animate-spin"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
        ></motion.div>
      ) : error ? (
        <motion.div
          className="bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg text-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.div>
      ) : history.length === 0 ? (
        <motion.p
          className="text-gray-100 text-lg font-medium bg-gray-700/60 px-6 py-4 rounded-lg shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          No fruit history found.
        </motion.p>
      ) : (
        <motion.div
          className="w-full max-w-4xl bg-gray-800/70 shadow-lg rounded-lg overflow-hidden mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <table className="w-full border-collapse text-lg">
            <thead className="bg-gray-700 text-white text-xl font-bold">
              <tr>
                {["Fruit Name", "Ripeness", "Confidence (%)", "Checked On"].map((header, idx) => (
                  <th key={idx} className="py-4 px-6 text-left font-semibold border-b-2 border-gray-600">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {history.map((item, index) => (
                <motion.tr
                  key={index}
                  className="border-b border-gray-600 hover:bg-gray-700 transition-all duration-300 text-white font-medium"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <td className="py-4 px-6">{item.name}</td>
                  <td
                    className={`py-4 px-6 font-bold ${
                      item.ripeness.toLowerCase() === "ripe" ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {item.ripeness}
                  </td>
                  <td className="py-4 px-6">{item.confidence}%</td>
                  <td className="py-4 px-6">{new Date(item.checkedOn).toLocaleString()}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}

      {/* ✅ Check New Fruit Button */}
      <motion.button
        className="bg-yellow-500 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-lg hover:bg-yellow-600 transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/check-fruit")}
      >
        Check New Fruit 🍏
      </motion.button>
    </div>
  );
};

export default Dashboard;
