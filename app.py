from flask import Flask, render_template
from bson.json_util import dumps
from pymongo import MongoClient
from os import environ

app = Flask(__name__)
connection = 'mongodb+srv://user:pass@cluster0.tg9sg.mongodb.net/split_db?retryWrites=true&w=majority'
db = MongoClient(connection).split_db
api_key = environ.get('API_KEY')
test_string = environ.get('test_string')

@app.route("/")
def index():    
    return render_template("index.html")

@app.route('/api_key')
def api_key():
    return {'key': api_key}

@app.route('/test')
def test():
    return test_string

@app.route("/about_us")
def about():    
    return render_template("about.html")

@app.route("/methodology")
def method():    
    return render_template("methodology.html")

@app.route("/crime_rates")
def rates():    
    return render_template("crime_rates.html")

@app.route("/types_crime")
def types():    
    return render_template("crime_types.html")

@app.route('/<city>/<year>')
def route(city, year):
    collection = city+year
    return dumps(db[collection].find())

if __name__ == "__main__":
    app.run(debug=True,threaded=True)
