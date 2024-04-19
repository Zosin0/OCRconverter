from flask import Flask, request, jsonify
import cv2
import pytesseract
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/ocr', methods=['POST'])
def ocr():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    image = request.files['image']
    language = request.form.get('language') 

    print(language)

    if image.filename == '':
        return jsonify({'error': 'No image selected'}), 400

    try:

        # Ler a imagem e converter para um array numpy
        img_np = np.frombuffer(image.read(), np.uint8)
        img = cv2.imdecode(img_np, cv2.IMREAD_COLOR)

        # Converter a imagem para escala de cinza
        gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

        text = pytesseract.image_to_string(gray_img, lang=language)
        print(text)
        
        if not text:
            return jsonify({'error': 'No text detected'}), 400

        return jsonify({'text': text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')