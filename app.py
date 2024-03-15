from flask import Flask, request, jsonify
from keras.models import load_model
import numpy as np
import cv2
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/predict": {"origins": "http://127.0.0.1:3000"}})
model = load_model('tea_sickness_model.keras')

@app.route('/predict', methods=['POST'])
def predict():
    print("Predict function called")
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    images = request.files.getlist('image')
    predictions = []

    for image_file in images:
        image = cv2.imdecode(np.frombuffer(image_file.read(), np.uint8), cv2.IMREAD_COLOR)
        image = cv2.resize(image, (150, 150))
        image = image / 255.0  # Normalize
        image = np.expand_dims(image, axis=0)

        prediction = model.predict(image)
        disease_labels = ['Algal leaf', 'Healthy', 'Bird eye spot', 'Gray light', 'Brown blight', 'Anthracnose', 'Red leaf spot', 'White spot']
        predicted_disease = disease_labels[np.argmax(prediction)]
        predictions.append(predicted_disease)

    if len(predictions) == 0:
        return jsonify({'result': 'No diseases found in the images you have uploaded. You\'re all clear!'})
    elif len(predictions) == 1:
        return jsonify({'result': 'Disease Found', 'disease': predictions[0]})
    else:
        return jsonify({'result': 'Diseases Found', 'diseases': predictions})

if __name__ == '__main__':
    app.run(debug=True)
