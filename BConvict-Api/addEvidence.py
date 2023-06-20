from conect import conection
from constant import Resopnse, addEvidenceQuery, adduserEvidence, getid


def addEvidencee(data):
    
    try:
        data = eval(data)
        dashResp : Resopnse =  Resopnse()

        data = data['0']

        # Evidence_ID = data['Evidence_id']
        Evidence_Type = data['Evidence_Type']
        Description = data['Evidence_Description']
        Custody = data['Custody']
        Date_Collected = data['Date_Collected']
        Condition = data['Condition']
        Analysis_Results = data['Analysis_Results']
        Disposition = data['Disposition']
        FIR_id = data['fir_id']

        db = conection()
        myscursor = db.cursor()
        myscursor.execute(addEvidenceQuery( Evidence_Type ,Description , Custody , Date_Collected , Condition , Analysis_Results , Disposition))
        db.commit()
        db.close()

        db = conection()
        myscursor = db.cursor()

        myscursor.execute(getid(table = "evidence_sys" , colom = "Evidence_ID  "))
        data1 = myscursor.fetchone()
        Evidence_ID = data1[0]
        db.commit()
        db.close()

        db = conection()
        myscursor = db.cursor()
        myscursor.execute(adduserEvidence(Evidence_ID , FIR_id ))
        db.commit()
        db.close()

        dashResp.status = "success"

        return dashResp.__dict__


    except Exception as e:
        errorResp : Resopnse =  Resopnse()
        errorResp.status = str(e)
        return errorResp.__dict__