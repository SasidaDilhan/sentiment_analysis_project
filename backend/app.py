from flask import Flask, jsonify

app = Flask(__name__)

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
