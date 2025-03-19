from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from inference_sdk import InferenceHTTPClient
from PIL import Image
import io
import base64

app = FastAPI(title="Fruit Ripeness Detection API")

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Roboflow API Client
CLIENT = InferenceHTTPClient(
    api_url="https://detect.roboflow.com",
    api_key="iSuIjMTjQPpwMUrrQYwB"  # Replace with actual API key
)

@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    try:
        # Read uploaded image
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")

        # Convert image to base64
        buffered = io.BytesIO()
        image.save(buffered, format="JPEG")
        img_base64 = base64.b64encode(buffered.getvalue()).decode("utf-8")

        # Call Roboflow API (expects base64 image string)
        result = CLIENT.infer(img_base64, model_id="fruit-ripeness-unjex/2")

        print("Roboflow API Response:", result)  # Debugging API response

        # Extract best prediction
        if not result.get("predictions"):
            return {"error": "No fruit detected"}

        best_prediction = max(result["predictions"], key=lambda x: x["confidence"])
        fruit_class = best_prediction.get("class", "Unknown")

        # Splitting to extract fruit name and ripeness correctly
        fruit_parts = fruit_class.split("-")
        fruit_name = fruit_parts[0] if len(fruit_parts) > 0 else "Unknown"
        ripeness = fruit_parts[1] if len(fruit_parts) > 1 else "Unknown"

        response_data = {
            "filename": file.filename,
            "fruit": fruit_name,
            "ripeness": ripeness,
            "confidence": round(best_prediction.get("confidence", 2) * 100, 2),
        }

        print("Processed Response:", response_data)  # Debugging processed response

        return response_data

    except Exception as e:
        return {"error": str(e)}
