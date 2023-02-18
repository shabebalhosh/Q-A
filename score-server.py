from flask import Flask, request

app = Flask(__name__)

SCORES_FILE = 'LeaderBoard.txt'

@app.route('/score', methods=['POST'])
def receive_score():
    score = request.form['score']
    name = request.form['name']

    # write the score and name to the file
    with open(SCORES_FILE, 'a') as f:
        f.write(f'{name} {score}\n')

    return 'Data Recieved'

if __name__ == '__main__':
    app.run()
