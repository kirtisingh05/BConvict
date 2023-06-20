from conect import conection
from constant import Resopnse, updateEvidenceQuery


def Updateevidencee(data):
    
    try:
        data = eval(data)
        dashResp : Resopnse =  Resopnse()

        for evd in data:
            Evidence(data[evd])

        dashResp.status = "success"

        return dashResp.__dict__


    except Exception as e:
        errorResp : Resopnse =  Resopnse()
        errorResp.status = str(e)
        return errorResp.__dict__
    
def Evidence(data:any):
    
    Evidence_ID = data['Evidence_id']
    Evidence_Type = data['Evidence_Type']
    Description = data['Evidence_Description']
    Custody = data['Custody']
    Date_Collected = data['Date_Collected']
    Condition = data['Condition']
    Analysis_Results = data['Analysis_Results']
    Disposition = data['Disposition']

    db = conection()
    myscursor = db.cursor()
    myscursor.execute(updateEvidenceQuery(Evidence_ID   , Evidence_Type ,Description , Custody , Date_Collected , Condition , Analysis_Results , Disposition))
    db.commit()
    db.close()

    return