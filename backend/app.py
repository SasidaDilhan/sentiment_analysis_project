from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # allow React frontend to fetch data

reviews = ['Good product', 'Bad Product', 'I like it']
positive = 2
negative = 1

@app.route("/data")
def get_data():
    data = {
        'reviews': reviews,
        'positive': positive,
        'negative': negative
    }
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)
