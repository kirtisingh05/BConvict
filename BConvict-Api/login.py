from conect import conection
import mysql.connector as mysql

from constant import Last_Login, Resopnse, Profile, loginQuery


def login(data):
    try:
        data = eval(data)

        username = data['username']
        password = data['password']

        loginResp : Resopnse =  Resopnse()
        profile : Profile = Profile()
        
        db = conection()
        myscursor = db.cursor()

        myscursor.execute(loginQuery(userName=username,password=password))
        user_data = myscursor.fetchone()
        
        
        if user_data is not None:
            loginResp.status = "success"
            loginResp.profile = profile
            profile.sys_id = user_data[0]
            profile.username = user_data[1]
            profile.firstname = user_data[3]
            profile.lastName = user_data[4]
            profile.Date_Created = user_data[6]
            profile.Last_Login = user_data[7]
            profile.Date_of_Birth = user_data[5]
            profile.PAN_NO = user_data[8]
            profile.addhar = user_data[9]
            profile.gender = user_data[10]
            # profile.name = user_data[12]
            profile.Father_Name = user_data[13]  
            profile.Mother_Name = user_data[14]  
           
            id  = user_data[0]

            myscursor = db.cursor(buffered=True)
            myscursor.execute(loginQuery(user_sys_id=id,Table='email_sys_user'))
            user_data = myscursor.fetchone()
            if user_data != None:
                profile.email = user_data[1]

            myscursor = db.cursor(buffered=True)
            myscursor.execute(loginQuery(user_sys_id=id,Table='phone_sys_user'))
            user_data = myscursor.fetchone()
            if user_data != None:
                profile.phoneNo = user_data[1]

            myscursor = db.cursor(buffered=True)
            myscursor.execute(loginQuery(user_sys_id=id,Table='address_sys_user'))
            user_data = myscursor.fetchone()
            if user_data != None:
                profile.address = user_data[1]

            myscursor = db.cursor(buffered=True)
            myscursor.execute(loginQuery(user_sys_id=id,Table='role_sys_user'))
            user_data = myscursor.fetchone()
            if user_data != None:
                profile.role = user_data[1]

            loginResp.__dict__['profile'] = loginResp.__dict__['profile'].__dict__

            # db = conection()
            # myscursor1 = db.cursor()

            # myscursor1.execute(Last_Login( user_data[1] ))
        else:
            loginResp.status = "fail"

        db.commit()
        db.close()
        return loginResp.__dict__
    
    except Exception as e:
        errorResp : Resopnse =  Resopnse()
        errorResp.status = str(e)
        return errorResp.__dict__
 
