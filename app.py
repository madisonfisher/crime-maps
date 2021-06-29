from flask import Flask, render_template
from bson.json_util import dumps
from pymongo import MongoClient
from os import environ

app = Flask(__name__)
connection = environ.get('MONGODB_URI', 'mongodb://localhost:27017/split_db')
db = MongoClient(connection).split_db

@app.route("/")
def index():    
    return render_template("index.html")

@app.route('/<city>/<year>')
def route(city, year):
    collection = f'{city}+{year}'
    return dumps(db[collection].find())

if __name__ == "__main__":
    app.run(debug=True,threaded=True)
