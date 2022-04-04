from urllib import request
from django.shortcuts import render
# import pyodbc
from .models import Login
import mysql.connector


# conn = pyodbc.connect('Driver={Devart ODBC Driver for MySQL};'
# 'Server = coms-319-g27.class.las.iastate.edu'
# 'Database = gp27;'
# 'UID = gp27;'
# 'PWD = Password@!1;'
# )

conn = mysql.connector.connect(
  host="coms-319-g27.class.las.iastate.edu",
  user="gp27",
  password="Password@!1",
  database= "gp27"
)


cursor = conn.cursor()

def index(request):
    # cursor.execute("select * from users")
    if request.method == "POST": 
        insert_value = Login()
        insert_value.username = request.POST["Email"]
        insert_value.phash = request.POST["psw"]
        insert_value.fname = request.POST["Name"]
        insert_value.lname = request.POST["Name"]
        cursor.exectute("insert into users values ('"+insert_value.username+"', '"+insert_value.phash+"', '"+insert_value.fname+"', '"+insert_value.lname+"')")
        conn.commit()        
    return render(request, 'login/index.html') 
