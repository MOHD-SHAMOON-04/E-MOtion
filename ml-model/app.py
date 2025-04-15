import os
from flask import Flask, request, jsonify, render_template
from werkzeug.utils import secure_filename
import warnings
from emotion_recognizer import EmotionRecognizer
from flask_cors import CORS

warnings.filterwarnings("ignore")

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})
app.config["UPLOAD_FOLDER"] = "uploads"
os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)

recognizer = EmotionRecognizer("model/model.h5")

# Serve index.html from the root route
@app.route('/')
def index():
    """Serve the index.html file."""
    return render_template('index.html')

# API route to detect emotion
@app.route('/api/emotion', methods=['POST'])
def detect_emotion():
    """API endpoint to receive an audio file and return emotion prediction."""
    if 'audio' not in request.files:
        return jsonify({"error": "No file provided"}), 400

    audio_file = request.files['audio']
    if audio_file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # Save file temporarily
    filename = secure_filename(audio_file.filename)
    file_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    audio_file.save(file_path)

    # Process audio file
    try:
        predicted_emotion, confidence, emotion_probabilities = recognizer.predict_emotion(file_path)
        os.remove(file_path)  # Clean up temp file

        if predicted_emotion is None:
            return jsonify({"error": "Failed to predict emotion"}), 500

        # Convert NumPy types to standard Python types
        confidence = float(confidence)  # Ensure it's a standard float
        emotion_probabilities = {key: float(value) for key, value in emotion_probabilities.items()}  # Convert dict values

        return jsonify({
            "emotion": predicted_emotion,
            "confidence": confidence,
            "probabilities": emotion_probabilities
        })

    except Exception as e:
        return jsonify({"error": "Failed to predict emotion"}), 500
    

if __name__ == "__main__":
    app.run(port=5000, debug=True)
