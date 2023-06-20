from flask import Flask, jsonify
from UpdateEvidence import Updateevidencee
from UpdateCase import Updatecasee
from addCase import addcase
from addEvidence import addEvidencee
from addfir import addfir
from flask_cors import CORS, cross_origin
from dashboard import myDashboard
from login import login
from profile_1 import profile_1
from showforms import showforms
from signup import signup
from updatefir import updatefir


app = Flask(__name__)
cors = CORS(app)

@app.route('/login/<string:data>')
@cross_origin()
def Login(data : str):
    return jsonify(login(eval(data)))

@app.route('/singup/<string:data>')
@cross_origin()
def Signup(data : str):
    return jsonify(signup(eval(data)))

@app.route('/myDashboard/<string:data>')
@cross_origin()
def Dashboard(data : str):
    return jsonify(myDashboard(eval(data)))

@app.route('/profile/<string:data>')
@cross_origin()
def Profilee(data : str):
    return jsonify(profile_1(eval(data)))

@app.route('/showforms/<string:data>')
@cross_origin()
def Showforms(data : str):
    return jsonify(showforms(eval(data)))

@app.route('/addfir/<string:data>')
@cross_origin()
def Addfir(data : str):
    return jsonify(addfir(eval(data)))

@app.route('/addcase/<string:data>')
@cross_origin()
def Addcase(data : str):
    return jsonify(addcase(eval(data)))

@app.route('/addEvidence/<string:data>')
@cross_origin()
def AddEvidencee(data : str):
    return jsonify(addEvidencee(eval(data)))

@app.route('/updatefir/<string:data>')
@cross_origin()
def Updatefir(data : str):
    return jsonify(updatefir(eval(data)))

@app.route('/Updateevidencee/<string:data>')
@cross_origin()
def UpdatEevidencee(data : str):
    return jsonify(Updateevidencee(eval(data)))

@app.route('/Updatecasee/<string:data>')
@cross_origin()
def UpdateCasee(data : str):
    return jsonify(Updatecasee(eval(data)))

if __name__ =="__main__":
    app.run(debug=True)
    

    