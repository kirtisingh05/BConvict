from conect import conection
from constant import CaseRecord, EvidenceRecord, FirRecord, Resopnse, case, evidence, mydashQuery


def showforms(data):
    try:

        data = eval(data)

        id = int(data)
        dashResp : Resopnse =  Resopnse()
        dashResp.firRecord = []
        dashResp.evidenceRecord = []
        dashResp.caseRecord = []


        firRecord =  getfir(id)   
        dashResp.firRecord.append(firRecord.__dict__)
        

        caseRecord = getCase(id)
        dashResp.__dict__['caseRecord'] = caseRecord

        evidenceRecord = getEvidence(id)
        dashResp.__dict__['evidenceRecord'] = evidenceRecord        
        

        dashResp.status = "success"
        return dashResp.__dict__
    
    except Exception as e:
        errorResp : Resopnse =  Resopnse()
        errorResp.status = str(e)
        return errorResp.__dict__

def getfir(id :any):
    
    db = conection()
    myscursor = db.cursor()

    myscursor.execute(mydashQuery(FIR_id  = int(id) ))
    user_data1 = myscursor.fetchone()

    if user_data1:

        firRecord = FirRecord()
        firRecord.sys_FIR_id = user_data1[0]
        firRecord.offence = user_data1[1]
        firRecord.offence_date = user_data1[2]
        firRecord.police_station = user_data1[3]
        firRecord.status = user_data1[4]
        firRecord.description = user_data1[5]
        firRecord.created_at = user_data1[6]
        firRecord.updated_at = user_data1[7]
    
    db.commit()
    db.close()
    
    return firRecord

def getEvidence(id:any):
    
    db = conection()
    myscursor = db.cursor()
    
    array = []

    myscursor.execute(evidence(FIR_id = int(id) ))
    user_data1 = myscursor.fetchall()

    if user_data1:

        for data in user_data1:

            if data:

                myscursor.execute(evidence(Evidence_ID = data[0] ))
                user_data = myscursor.fetchone()
                
                if user_data:

                    evidenceRecord = EvidenceRecord()
                    evidenceRecord.Evidence_ID = user_data[0]
                    evidenceRecord.Evidence_Type = user_data[1]
                    evidenceRecord.Description = user_data[2]
                    evidenceRecord.Custody = user_data[3]
                    evidenceRecord.Date_Collected = user_data[4]
                    evidenceRecord.Condition = user_data[5]
                    evidenceRecord.Analysis_Results = user_data[6]
                    evidenceRecord.Disposition = user_data[7]
                    
                    array.append(evidenceRecord.__dict__)

    db.commit()
    db.close()
    return array

def getCase(id:any):
    
    db = conection()
    myscursor = db.cursor()

    array = []

    myscursor.execute(case(FIR_id = int(id)))
    user_data1 = myscursor.fetchall()

    if user_data1:

        for data in user_data1:

            if data:

                myscursor.execute(case(Case_id = data[0]))
                user_data = myscursor.fetchone()
                
                if user_data:

                    caseRecord = CaseRecord()
                    caseRecord.Case_id = user_data[0]
                    caseRecord.Case_Title = user_data[1]
                    caseRecord.Case_Description = user_data[2]
                    caseRecord.Status_case = user_data[3]
                    caseRecord.Arrest_Information = user_data[4]
                    caseRecord.Charge_Information = user_data[5]
                    caseRecord.Bail_Information = user_data[6]
                    caseRecord.Court_Information = user_data[7]

                    array.append(caseRecord.__dict__)

    db.commit()
    db.close()
    return array
  