import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUpload } from "react-icons/fa";

const CheckFruit = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      sendToBackend(file);
    }
  };

  const sendToBackend = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setResult(data);

      // ✅ Save to database if prediction is successful
      if (data.fruit) {
        const token = localStorage.getItem("token"); // Retrieve token

        const saveResponse = await fetch("http://localhost:5000/api/fruit/save", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: data.fruit.split(" ")[0] || "Unknown",
            ripeness: data.fruit.split(" ")[1] || "Unknown",
            confidence: data.confidence,
            checkedOn: new Date().toISOString(),
          }),
        });

        if (!saveResponse.ok) {
          throw new Error("Failed to save fruit data");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setResult({ error: "Failed to analyze image" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center px-6 py-12">
      <motion.h1
        className="text-5xl font-bold text-white drop-shadow-lg mb-8"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        Check Fruit Ripeness 🍏
      </motion.h1>

      {/* File Upload Button */}
      <motion.label
        className="relative cursor-pointer bg-green-600 text-white py-3 px-6 text-lg font-semibold rounded-lg shadow-md transition-all duration-300 hover:bg-green-700 hover:shadow-lg flex items-center gap-2"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
      >
        <FaUpload className="text-xl" />
        Upload Fruit Image
        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
      </motion.label>

      {/* Image Preview */}
      {image && (
        <motion.div
          className="mt-6 p-3 bg-gray-800/70 shadow-md rounded-lg overflow-hidden"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img src={image} alt="Selected Fruit" className="w-40 h-40 object-cover rounded-lg" />
        </motion.div>
      )}

      {/* Loader */}
      {loading && (
        <motion.div
          className="mt-6 h-12 w-12 border-t-4 border-white border-solid rounded-full animate-spin"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
        ></motion.div>
      )}

      {/* Results Section */}
      {result && (
        <motion.div
          className="mt-6 w-full max-w-lg bg-gray-800/80 shadow-lg rounded-lg p-6 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {result.error ? (
            <p className="text-red-500 font-semibold">{result.error}</p>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-white">Result</h2>
              <p className="text-lg text-gray-300 mt-2">
                <span className="text-green-400 font-semibold">{result.fruit?.split(" ")[0] || "Unknown"}</span>
              </p>
              <p className="text-lg text-gray-300">
                Ripeness:{" "}
                <span
                  className={`font-semibold ${
                    result.fruit?.split(" ")[1]?.toLowerCase() === "ripe" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {result.fruit?.split(" ")[1] || "Unknown"}
                </span>
              </p>
              <p className="text-lg text-gray-300">
                Confidence:{" "}
                <span className="text-blue-400 font-semibold">
                  {result.confidence ? `${result.confidence}%` : "N/A"}
                </span>
              </p>
            </>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default CheckFruit;
