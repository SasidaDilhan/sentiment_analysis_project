from flask import Flask, jsonify, request
from flask_cors import CORS
from helper import preprocessing, vectorizer, get_prediction, tokens

app = Flask(__name__)
CORS(app)

# Start with empty or correctly counted data
reviews = []
positive = 0
negative = 0

@app.route("/data")
def get_data():
    data = {
        'reviews': reviews,
        'positive': positive,
        'negative': negative
    }
    return jsonify(data)

@app.route("/", methods=["POST"])
def my_post():
    global positive, negative
    
    text = request.form.get("text")
    preprocessed_text = preprocessing(text)
    vectorized_text = vectorizer(preprocessed_text, tokens)
    prediction = get_prediction(vectorized_text)
    
    # Add debug logging
    print(f"Text: {text}")
    print(f"Prediction: {prediction}")

    if prediction == 'negative':
        negative += 1
    else:
        positive += 1

    reviews.insert(0, text)
    
    return jsonify({
        'success': True, 
        'prediction': prediction,
        'positive': positive,
        'negative': negative
    })

if __name__ == "__main__":
    app.run(debug=True)