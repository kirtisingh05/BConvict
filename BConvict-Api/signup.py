from conect import conection
import mysql.connector as mysql

from constant import Profile, Resopnse, deleteQuery_user, loginQuery, signup_Phone, signup_addres, signup_email, signupQuery_user
from login import login

def signup(data):
    try:
        data = eval(data)
        
        userName = data['username']
        password = data['password']
        Email = data['Email']
        Addhar_No = data['Addhar_No']
        Phone_No = data['Phone_No']
        Gender = data['Gender']
        address = data['Address']

        
        db = conection()
        myscursor = db.cursor()
        
        myscursor.execute(signupQuery_user(userName ,password ,Addhar_No ,Gender ))
        db.commit()
        db.close()

        db = conection()
        myscursor = db.cursor()
        
        myscursor.execute(loginQuery(userName = userName ,password = password))
        user_data = myscursor.fetchone()
        db.commit()
        db.close()
        
        db = conection()
        myscursor = db.cursor(buffered=True)
        myscursor.execute(signup_email( user_data[0] ,Email))
        
        # myscursor = db.cursor(buffered=True)
        myscursor.execute(signup_Phone( user_data[0] ,Phone_No))

        myscursor.execute(signup_addres( user_data[0] ,address))

        db.commit()
        db.close()
        info ={}

        info['username']  = userName
        info['password'] = password

        return login(str(data))
    
    except Exception as e:

        errorResp : Resopnse =  Resopnse()
        errorResp.status = str(e)
        return errorResp.__dict__

    

