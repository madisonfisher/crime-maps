from flask import Flask, render_template, jsonify
from bson import json_util
#import dumps
from pymongo import MongoClient
from os import environ
import ssl

app = Flask(__name__)
connection = 'mongodb+srv://user:pass@cluster0.tg9sg.mongodb.net/all_crime?retryWrites=true&w=majority'
db = MongoClient(connection, ssl_cert_reqs=ssl.CERT_NONE).all_crime

@app.route("/")
def index():    
    return render_template("index.html")

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

@app.route('/key')
def api_key():
    return environ.get('API_KEY')

@app.route('/<city>/<year>')
def route(city, year):
    query = dict(year=int(year))
    return json_util.dumps(db[city].find(query))
  

if __name__ == "__main__":
    app.run(debug=True,threaded=True)
