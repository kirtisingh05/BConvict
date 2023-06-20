
from datetime import date

def loginQuery(userName=None ,password=None ,user_sys_id=None ,Table=None ):
    
    if user_sys_id != None:
        return "SELECT * FROM "+Table+" WHERE sys_user_id ="+ str(user_sys_id)
    else:
        return "SELECT * FROM sys_user WHERE User_Name ='"+userName+"' and Password='"+password+"';"
        
def Last_Login(userName , Last_Login = str(date.today()) ):
    return"UPDATE sys_user SET Last_Login = '"+Last_Login+"'WHERE User_Name ='"+userName+"';"



def signupQuery_user(userName ,password ,Addhar_No ,Gender , Date_Created = str(date.today()) ):
    return "INSERT INTO sys_user (User_Name, Password,Date_Created, Addhar_No ,Gender) VALUES ('" + userName + "','" + password + "','" +Date_Created+"','"+ Addhar_No + "','" + Gender + "');"

def signup_email(user_sys_id,email):
    return "INSERT INTO email_sys_user (sys_user_id, Email) VALUES ('"+ str(user_sys_id) +"','" +email + "');"

def signup_Phone(user_sys_id,Phone_No):
    return "INSERT INTO phone_sys_user (sys_user_id, Phone_No) VALUES ("+ str(user_sys_id)+",'" +str( Phone_No ) + "');"

def signup_addres(user_sys_id,Address):
    return "INSERT INTO address_sys_user (sys_user_id, Address) VALUES ("+ str(user_sys_id)+",'" + Address + "');"



def deleteQuery_user(userName = None ,password = None):
    return "DELETE FROM sys_user WHERE User_Name = '"+ userName+"' and Password='"+password+"';"


def evidence(FIR_id = None , Evidence_ID = None):
    
    if FIR_id != None:
        return "SELECT DISTINCT Evidence_ID FROM  evidence_fir  WHERE sys_FIR_id ="+str(FIR_id)+";"
    else:
        return "SELECT * FROM  evidence_sys  WHERE Evidence_ID  ="+str(Evidence_ID)+";"

def case(FIR_id = None , Case_id = None):
    
    if FIR_id != None:
        return "SELECT DISTINCT Case_id FROM  crime_sys  WHERE FIR_id  ="+str(FIR_id)+";"
    else:
        return "SELECT * FROM  sys_case  WHERE Case_id  ="+str(Case_id)+";"


def mydashQuery(user_id = None, FIR_id = None , field = None , val = None ):
    if user_id != None:
        return "SELECT DISTINCT sys_FIR_id  FROM fir_user WHERE sys_user_id ="+ str(user_id)+";"
    if val != None and field != None:
        return "SELECT * FROM  sys_fir  WHERE "+field+" = '"+val+"' and sys_FIR_id ="+str(FIR_id)+";"
    else:
        return "SELECT * FROM  sys_fir  WHERE sys_FIR_id ="+str(FIR_id)+";"



def getid(table , colom ):
    return"SELECT MAX("+colom+") FROM "+table+";"


def adduserfir(user_id = None ,sys_FIR_id = None , type = None ):
    return "INSERT INTO `fir_user`(`sys_user_id`, `sys_FIR_id`, `type_user`) VALUES ("+str(user_id) +"," + str(sys_FIR_id) +",'" +type+"');"

def addfirQuery( offence ,offence_date , police_station , status , description , created_at = str(date.today()) , updated_at = str(date.today())):
    
    return "INSERT INTO `sys_fir`(`offence`, `offence_date`, `police_station`, `status`, `description`, `created_at`, `updated_at`) VALUES ('"+ offence+"','" +offence_date  +"','" +police_station  +"','" +status +"','" + description +"','" + created_at +"','" + updated_at+"');"



def adduserCase(Case_id ,FIR_id):
    return "INSERT INTO `crime_sys`(`Case_id`, `FIR_id`) VALUES ("+str(Case_id)+"," + str(FIR_id) +");"

def addCaseQuery( Case_Title , Case_Description , Status_case , Arrest_Information , Charge_Information , Bail_Information , Court_Information):
    
    return "INSERT INTO `sys_case`( `Case_Title`, `Case_Description`, `Status_case`, `Arrest_Information`, `Charge_Information`, `Bail_Information`, `Court_Information`) VALUES ('" + Case_Title+"','" +Case_Description  +"','" +Status_case  +"','" +Arrest_Information  +"','" +Charge_Information  +"','" +Bail_Information  +"','" +Court_Information+"') ;"



def adduserEvidence(Evidence_ID , FIR_id):
    return"INSERT INTO `evidence_fir`(`Evidence_ID`, `sys_FIR_id`) VALUES ("+str(Evidence_ID)+"," +str(FIR_id)+");"

def addEvidenceQuery( Evidence_Type ,Description , Custody , Date_Collected , Condition , Analysis_Results , Disposition):
    
    return "INSERT INTO `evidence_sys`( `Evidence_Type`, `Description`, `Custody`, `Date_Collected`, `Condition`, `Analysis_Results`, `Disposition`) VALUES ('" + Evidence_Type+"','" +Description +"','" +Custody +"','" +Date_Collected  +"','" +Condition +"','" +Analysis_Results +"','" +Disposition +"');"



def updatefirQuery(sys_FIR_id , offence ,offence_date , police_station , status , description , updated_at = str(date.today())):
    
    return "UPDATE sys_fir SET offence = '" + offence  + "' , offence_date  = '"+ offence_date  +"', police_station = '" + police_station + "' , status = '" + status  +"', description = '"+ description  +"',	updated_at = '"+ updated_at  +"' WHERE sys_FIR_id  = '"+ str(sys_FIR_id) + "' ;"


def updateCaseQuery(Case_id  , Case_Title ,Case_Description , Status_case , Arrest_Information , Charge_Information , Bail_Information , Court_Information):
    
    return "UPDATE sys_case SET Case_Title = '" + Case_Title  + "' , Case_Description  = '"+ Case_Description  +"', Status_case = '" + Status_case + "' , Arrest_Information = '" + Arrest_Information  +"', Charge_Information = '"+ Charge_Information  +"' ,Bail_Information = '"+ Bail_Information + "' , Court_Information = '" + Court_Information + "' WHERE Case_id   = '"+ str(Case_id ) + "' ;"


def updateEvidenceQuery(Evidence_ID   , Evidence_Type ,Description , Custody , Date_Collected , Condition , Analysis_Results , Disposition):
    
    return "UPDATE `evidence_sys` SET `Evidence_Type`='" + Evidence_Type  + "',`Description`='"+ Description  +"',`Custody`='" + Custody + "',`Date_Collected`='" + Date_Collected  +"',`Condition`='"+ Condition  +"',`Analysis_Results`='"+ Analysis_Results + "',`Disposition`='" + Disposition + "' WHERE `Evidence_ID`= "+ str(Evidence_ID) + ";"
    #return "UPDATE evidence_sys SET Evidence_Type = '" + Evidence_Type  + "' , Description  = '"+ Description  +"', Custody = '" + Custody + "' , Date_Collected = '" + Date_Collected  +"', Condition = '"+ Condition  +"' ,Analysis_Results = '"+ Analysis_Results + "' , Disposition = '" + Disposition + "' WHERE Evidence_ID    = '"+ str(Evidence_ID) + "' ;"




def profileQuery(id = None ,address = None, Email =None ,Phone_No = None,userName  = None ,firstname = None  ,lastName = None ,Addhar_No  = None ,Gender = None, PAN_NO = None ,Date_of_Birth = None,Father_Name = None ,Mother_Name = None  , get =None):
    
    if firstname != None:
        return "UPDATE sys_user SET firstname = '" + firstname  + "' , lastName  = '"+ lastName  +"', Addhar_No = '" + Addhar_No + "' , Gender = '" + Gender  +"', PAN_NO = '"+ PAN_NO  +"' ,Date_of_Birth = '"+ Date_of_Birth + "' , Father_Name = '" + Father_Name + "', Mother_Name = '" + Mother_Name + "' WHERE User_Name = '"+ userName+ "' ;"
    if address != None:
        # return "INSERT INTO address_sys_user (sys_user_id , Address) values ((select sys_id  from sys_user where User_Name = '" +userName+ "'), '"+address+"');"
        return "UPDATE  address_sys_user SET  Address ='"+address+"' WHERE sys_user_id = "+str(id)+";"
    if Phone_No != None:
        return "UPDATE  phone_sys_user SET  Phone_No ='"+ str(Phone_No) +"' WHERE sys_user_id = "+str(id)+";"
    if Email != None:
        return "UPDATE  email_sys_user SET  Email ='"+Email+"' WHERE sys_user_id = "+str(id)+";"
    if get != None:
        return "SELECT * FROM sys_user WHERE User_Name ='"+userName+"'"




class Profile:
    def __init__(self) -> None:
        self.sys_id = None
        self.username = None
        self.name = None
        self.email = None
        self.firstname = None
        self.lastName = None
        self.phoneNo = None
        self.address = None
        self.addhar = None
        self.gender = None
        self.PAN_NO = None
        self.Date_of_Birth = None
        self.Date_Created = None
        self.Last_Login = None
        self.Father_Name = None  
        self.Mother_Name = None 
        self.role = None 

class FirRecord:
    def __init__(self) -> None:
        self.sys_FIR_id = None
        self.offence = None
        self.offence_date = None
        self.police_station = None
        self.status = None
        self.description = None
        self.created_at = None
        self.updated_at = None

class EvidenceRecord:
    def _init_(self) -> None:
        self.Evidence_ID = None
        self.Evidence_Type = None
        self.Description = None
        self.Custody = None
        self.Date_Collected = None
        self.Condition = None
        self.Analysis_Results = None
        self.Disposition = None

class CaseRecord:
    def _init_(self) -> None:
        self.Case_id  = None
        self.Case_Title = None
        self.Case_Description = None
        self.Status_case = None
        self.Arrest_Information = None
        self.Charge_Information = None
        self.Bail_Information = None
        self.Court_Information = None

class Resopnse:
    def __init__(self) -> None:
        self.status = None
        self.profile:Profile = None
        self.firRecord:list[FirRecord] = []
        self.evidenceRecord:list[EvidenceRecord] = []
        self.caseRecord:list[CaseRecord] = []


