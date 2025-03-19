# 🍏 Fruit Ripeness Detector

A **Fruit Ripeness Detector** using AI to analyze fruit images and determine their ripeness level. The application features a **React.js frontend** and a **Flask backend** with a machine learning model for image classification.

## 🚀 Features

- 📸 Upload fruit images for analysis.
- 🔍 AI-powered ripeness detection.
- 📊 View historical fruit checks.
- 🌎 Beautiful, animated UI with smooth transitions.
- 🔐 Secure authentication using JWT.
- 💾 History storage in a **MongoDB** database.

---

## 🛠️ Installation & Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/yourusername/fruit-ripeness-detector.git
cd fruit-ripeness-detector
```

---

## 🔥 Backend Setup (Flask + Machine Learning)

### 2️⃣ Install Python & Virtual Environment  
Make sure you have **Python 3.8+** installed.
```sh
python -m venv venv
source venv/bin/activate  # For macOS/Linux
venv\Scripts\activate     # For Windows
```

### 3️⃣ Install Dependencies  
```sh
pip install -r backend/requirements.txt
```

### 4️⃣ Start the Flask Backend  
```sh
cd backend
python main.py
```
This will start the API at **http://localhost:8000**.

---

## ⚛️ Frontend Setup (React.js + Tailwind CSS)

### 5️⃣ Install Node.js & Dependencies  
Make sure you have **Node.js 16+** installed.
```sh
cd frontend
npm install
```

### 6️⃣ Start the React App  
```sh
npm start
```
The app will be running at **http://localhost:3000**.

---

## 🗄️ Database Setup (MongoDB)

### 7️⃣ Install MongoDB (if not already installed)  
Follow the official [MongoDB installation guide](https://www.mongodb.com/docs/manual/installation/).

### 8️⃣ Start MongoDB  
```sh
mongod --dbpath=data/db
```
The database will be accessible at **mongodb://localhost:27017**.

---

## 📝 API Endpoints

### 🔹 Fruit Detection
- `POST /predict` → Upload an image & receive ripeness analysis.

### 🔹 Save History
- `POST /api/fruit/save` → Save detection results in MongoDB.

### 🔹 Get History
- `GET /api/fruit/history` → Retrieve all fruit check history.

---

## 🔐 Authentication

- Users need to log in to save their fruit history.
- JWT tokens are used for authentication.
- Token is stored in **localStorage**.

---

## 👨‍💻 Technologies Used

### 🎨 Frontend
- **React.js**
- **Tailwind CSS**
- **Framer Motion (for animations)**

### ⚙️ Backend
- **Flask**
- **TensorFlow/Keras (for AI model)**
- **OpenCV (for image processing)**
- **MongoDB (for database)**

---

## 📜 License
This project is **open-source** under the MIT License.

---

## 🙌 Contributing
Feel free to **fork** the repository and contribute by submitting a Pull Request! 🎉
