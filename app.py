from flask import Flask, render_template
from bson.json_util import dumps
from pymongo import MongoClient

app = Flask(__name__)

db = MongoClient('mongodb+srv://user:pass@bootcamp-project-2.tg9sg.mongodb.net/bootcamp_project_2?retryWrites=true&w=majority').bootcamp_project_2.data

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
