from flask import Flask, request
import os

app = Flask(__name__)

@app.route('/store-score', methods=['POST'])
def store_score():
    data = request.get_json()
    name = data['name']
    score = data['score']

    with open('scores.txt', 'a') as f:
        f.write(json.dumps(data) + '\n')

    return 'Score stored successfully', 200

if __name__ == '__main__':
    app.run()
