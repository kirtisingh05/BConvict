from conect import conection
from constant import Resopnse, addCaseQuery, adduserCase, getid


def addcase(data):
    
    try:
        data = eval(data)
        dashResp : Resopnse =  Resopnse()
        # return data
    
        data = data['0']
        # Case_id  = data['Case_id']
        Case_Title = data['Case_Title']
        Case_Description = data['Case_Description']
        Status_case = data['Case_Status']
        Arrest_Information = data['Arrest_Information']
        Charge_Information = data['Charge_Information']
        Bail_Information = data['Bail_Information']
        Court_Information = data['Court_Information']
        FIR_id = data['fir_id']
        

        db = conection()
        myscursor = db.cursor()
        myscursor.execute(addCaseQuery( Case_Title ,Case_Description , Status_case , Arrest_Information , Charge_Information , Bail_Information , Court_Information))
        db.commit()
        db.close()
        # return data

        db = conection()
        myscursor = db.cursor()

        myscursor.execute(getid(table = "sys_case" , colom = "Case_id "))
        data1 = myscursor.fetchone()
        Case_id = data1[0]
        db.commit()
        db.close()

        db = conection()
        myscursor = db.cursor()
        myscursor.execute(adduserCase(Case_id ,FIR_id))
        db.commit()
        db.close()


        dashResp.status = "success"

        return dashResp.__dict__

    except Exception as e:
        errorResp : Resopnse =  Resopnse()
        errorResp.status = str(e)
        return errorResp.__dict__