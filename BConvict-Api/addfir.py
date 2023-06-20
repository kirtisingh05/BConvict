from conect import conection
from constant import Resopnse, addfirQuery, adduserfir, getid


def addfir(data):
    try:
        data = eval(data)
        dashResp : Resopnse =  Resopnse()
        # return data

        user_id = data['User_ID']
        police_id = data['police_id']

        # sys_FIR_id = data['fir_id']
        offence = data['Offence'] 
        offence_date = data['Offence_Date']
        police_station = data['Police_Station']
        status = data['Status']
        description = data['Description']
    

        db = conection()
        myscursor = db.cursor()
        myscursor.execute(addfirQuery( offence ,offence_date , police_station , status , description ))
        db.commit()
        db.close()

        db = conection()
        myscursor = db.cursor()

        myscursor.execute(getid(table = "sys_fir" , colom = "sys_FIR_id"))
        data = myscursor.fetchone()
        FIR_id = data[0]
        db.commit()
        db.close()


        db = conection()
        myscursor = db.cursor()
        myscursor.execute(adduserfir(user_id = user_id , sys_FIR_id = FIR_id , type = ('user') ))
        
        # print(adduserfir(user_id = user_id , sys_FIR_id = FIR_id , type = ('user') ))
        # return data

        myscursor = db.cursor()
        myscursor.execute(adduserfir(user_id = police_id , sys_FIR_id = FIR_id, type = ('police') ))

        db.commit()
        db.close()

        dashResp.status = "success"

        return dashResp.__dict__
    
    except Exception as e:
        errorResp : Resopnse =  Resopnse()
        errorResp.status = str(e)
        return errorResp.__dict__
