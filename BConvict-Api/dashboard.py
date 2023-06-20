from conect import conection
from constant import FirRecord, Resopnse, mydashQuery


def myDashboard(data):
    try:
        data = eval(data)

        id = data['sys_user_id']

        if checkIfAll(data):
            return noFilter(id)
        else:
            filter = data['filter']
            return withFilter(id,filter)
    
    except Exception as e:
        errorResp : Resopnse =  Resopnse()
        errorResp.status = str(e)
        return errorResp.__dict__
    
def checkIfAll(data):
    if 'filter' not in data:
        return True
    filter = data['filter']
    if filter == None:
        return True
    if filter == 'null':
        return True
    if 'field_name' in filter and filter['field_name'] == '':
        return True
    if len(filter) == 0:
        return True
    return False
    

def noFilter(id):
    
    dashResp : Resopnse =  Resopnse()
    dashResp.firRecord = []
    
    user_data = getUserFir(id)
    # return user_data
    for data in user_data:

        # print(data)
        if data:
            db1 = conection()
            myscursor1 = db1.cursor()

            myscursor1.execute(mydashQuery( FIR_id = data[0] ))
            user_data1 = myscursor1.fetchone()
        
            firRecord = FirRecord()
            firRecord.sys_FIR_id = user_data1[0]
            firRecord.offence = user_data1[1]
            firRecord.offence_date = user_data1[2]
            firRecord.police_station = user_data1[3]
            firRecord.status = user_data1[4]
            firRecord.description = user_data1[5]
            firRecord.created_at = user_data1[6]
            firRecord.updated_at = user_data1[7]
            dashResp.firRecord.append(firRecord.__dict__)
    dashResp.status = "success"

    return dashResp.__dict__

def withFilter(id,filter):
    
    dashResp : Resopnse =  Resopnse()
    dashResp.firRecord = []
    field = filter['field_name']
    val = filter['value']
    user_data = getUserFir(id)

    for data in user_data:
        if data:
            db = conection()
            myscursor = db.cursor()

            myscursor.execute(mydashQuery(field = field , val = val, FIR_id =  data[0] ))
            user_data = myscursor.fetchone()
            if user_data:
                firRecord = FirRecord()
                firRecord.sys_FIR_id = user_data[0]
                firRecord.offence = user_data[1]
                firRecord.offence_date = user_data[2]
                firRecord.police_station = user_data[3]
                firRecord.status = user_data[4]
                firRecord.description = user_data[5]
                firRecord.created_at = user_data[6]
                firRecord.updated_at = user_data[7]
                dashResp.firRecord.append(firRecord.__dict__)
    dashResp.status = "success"

    return dashResp.__dict__


def getUserFir(id):
    
    db = conection()
    myscursor = db.cursor()

    myscursor.execute(mydashQuery(user_id=id))
    user_data = myscursor.fetchall()
    return user_data
