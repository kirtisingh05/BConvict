
from conect import conection
from constant import Resopnse, loginQuery, profileQuery, signup_Phone, signup_addres, signup_email, signupQuery_user
from login import login


def profile_1(data) :
    try:
        data = eval(data)

        userName = data['username']
        Email = data['email']
        Addhar_No = data['addhar']
        Phone_No = data['phoneNo']
        Gender = data['gender']
        firstname = data['firstname']
        address = data['address']
        PAN_NO = data['PAN_NO']
        Date_of_Birth = data['Date_of_Birth']
        lastName = data['lastName']
        Father_Name = data['Father_Name']  
        Mother_Name = data['Mother_Name']

        db = conection()
        myscursor = db.cursor()
        myscursor.execute(profileQuery(userName = userName ,firstname= firstname,lastName = lastName,Addhar_No = Addhar_No ,Gender = Gender, PAN_NO = PAN_NO  ,Date_of_Birth = Date_of_Birth ,Father_Name = Father_Name ,Mother_Name =Mother_Name))
        db.commit()
        db.close()

        # return data

        db = conection()
        myscursor = db.cursor()
        myscursor.execute(profileQuery(userName = userName ,get = 11))
        user_data = myscursor.fetchone()

        # return data
        
        myscursor = db.cursor(buffered=True)
        myscursor.execute(profileQuery( id  = user_data[0] ,address = address))

        # return data
        
        myscursor = db.cursor(buffered=True)
        myscursor.execute(profileQuery( id  = user_data[0] ,Phone_No = Phone_No))

        myscursor = db.cursor(buffered=True)
        myscursor.execute(profileQuery( id  = user_data[0] ,Email = Email))


        db.commit()
        db.close()
        info ={}

        info['username']  = userName
        info['password'] = user_data[2]
        print(user_data[2],"me rids")

        return login(str(info))

    except Exception as e:
        errorResp : Resopnse =  Resopnse()
        errorResp.status = str(e)
        return errorResp.__dict__
