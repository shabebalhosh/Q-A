from flask import Flask, request
import json

app = Flask(__name__)

@app.route('/submit-score', methods=['POST'])
def submit_score():
    data = request.get_json()
    with open('scores.txt', 'a') as f:
        f.write(json.dumps(data) + '\n')
    return 'Score submitted'

if __name__ == '__main__':
    app.run()
