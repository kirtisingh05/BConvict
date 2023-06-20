from conect import conection
from constant import Resopnse, updatefirQuery


def updatefir(data):
    
    try:
        data = eval(data)

        dashResp : Resopnse =  Resopnse()
        sys_FIR_id = data['fir_id']
        offence = data['Offence'] 
        offence_date = data['Offence_Date']
        police_station = data['Police_Station']
        status = data['Status']
        description = data['Description']


        db = conection()
        myscursor = db.cursor()
        
        myscursor.execute(updatefirQuery(sys_FIR_id , offence ,offence_date , police_station , status , description ))
        db.commit()
        db.close()

        dashResp.status = "success"

        return dashResp.__dict__

    except Exception as e:
        errorResp : Resopnse =  Resopnse()
        errorResp.status = str(e)
        return errorResp.__dict__