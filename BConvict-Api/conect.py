import mysql.connector as mysql

def conection( hostt = 'localhost' , userr = 'root' , passw ='' , databasee = 'bbcr') :

    db = mysql.connect(host = hostt , user = userr , passwd = passw , database = databasee )

    return db
