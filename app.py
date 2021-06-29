from flask import Flask, render_template
from bson.json_util import dumps
from pymongo import MongoClient
from os import environ

app = Flask(__name__)
connection = 'mongodb+srv://user:pass@cluster0.tg9sg.mongodb.net/split_db?retryWrites=true&w=majority'
db = MongoClient(connection).split_db

@app.route("/")
def index():    
    return render_template("index.html")

@app.route('/<city>/<year>')
def route(city, year):
    collection = city+year
    return dumps(db[collection].find())

if __name__ == "__main__":
    app.run(debug=True,threaded=True)
