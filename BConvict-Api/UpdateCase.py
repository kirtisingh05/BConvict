from conect import conection
from constant import Resopnse, updateCaseQuery


def Updatecasee(data):
    
    try:
        data = eval(data)
        dashResp : Resopnse =  Resopnse()


        for cas in data:
            case(data[cas])

        dashResp.status = "success"

        return dashResp.__dict__

    except Exception as e:
        errorResp : Resopnse =  Resopnse()
        errorResp.status = str(e)
        return errorResp.__dict__
    
def case(data:any):

    Case_id  = data['Case_id']
    Case_Title = data['Case_Title']
    Case_Description = data['Case_Description']
    Status_case = data['Case_Status']
    Arrest_Information = data['Arrest_Information']
    Charge_Information = data['Charge_Information']
    Bail_Information = data['Bail_Information']
    Court_Information = data['Court_Information']

    db = conection()
    myscursor = db.cursor()
    myscursor.execute(updateCaseQuery(Case_id  , Case_Title ,Case_Description , Status_case , Arrest_Information , Charge_Information , Bail_Information , Court_Information))
    db.commit()
    db.close()
    return