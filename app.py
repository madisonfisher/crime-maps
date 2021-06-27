from flask import Flask, render_template
from bson.json_util import dumps
from pymongo import MongoClient
from os import environ

app = Flask(__name__)
connection = environ.get('MONGODB_URI', 'mongodb://localhost:27017/bootcamp_project_2')
db = MongoClient(connection).bootcamp_project_2.data

key = {
    'la': 'Los Angeles',
    'atl': 'Atlanta',
    'buf': 'Buffalo',
    'phi': 'Philadelphia'
}

def query(city, year):
    query = dict(city=key[city], year=int(year))
    return dumps(db.find(query))

@app.route("/")
def index():    
    return render_template("index.html")

@app.route('/<city>/<year>')
def route(city, year):
    return query(city, year)

if __name__ == "__main__":
    app.run(debug=True,threaded=True)
