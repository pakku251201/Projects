from flask import Flask, redirect, url_for, render_template,request, flash, session
import ibm_db
from werkzeug.utils import secure_filename
import inference
import os
# import ibm_boto3
# from ibm_botocore.client import Config, ClientError

app = Flask(__name__)
app.secret_key = 'something'
UPLOAD_FOLDER = 'C:/Users/PRATHEEK/Desktop/Cloud app/Pixel Perfection/static/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

conn =  ibm_db.connect("database = bludb; hostname = 6667d8e9-9d4d-4ccb-ba32-21da3bb5aafc.c1ogj3sd0tgtu0lqde00.databases.appdomain.cloud; port = 30376; uid = kqg83324; password = NFJerH1K3rLgsQVR; security = SSL; sslcertificate = DigiCertGlobalRootCA.crt", " ", " ")
print("connection succesfull")
@app.route("/")
def index():
    return render_template("index.html")

# @app.route("/course")
# def course():
#     return render_template("courses.html")

@app.route("/home")
def home():
    return render_template("home.html")

@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/login", methods = ['POST', 'GET'])
def login():
    global user_email
    if request.method == 'POST':
        l_email = request.form['uemail']
        l_pass = request.form['upass']
        print("The login username and password is ", l_email, l_pass)
        sql = "SELECT * from register where emailid = ? and password = ?"
        stmt =  ibm_db.prepare(conn, sql)
        ibm_db.bind_param(stmt, 1, l_email)
        ibm_db.bind_param(stmt, 2,l_pass )
        ibm_db.execute(stmt)
        acc = ibm_db.fetch_assoc(stmt)
        print("Details fetch from the DB based on the sql : " ,acc)
        if acc:
            session['Loggedin'] = True
            session['email'] = acc['EMAILID']
            user_email = acc['EMAILID']
            # return redirect(url_for("home"))
            return render_template("index1.html")
        else:
            msg = "Please check the emailid or password you have entered"
            return render_template("login.html", msg = msg)
    return render_template("login.html")

@app.route("/register", methods=['POST', 'GET'])
def uregister():
    if request.method == 'POST':
        u_name = request.form['uname']
        u_email = request.form['uemail']
        u_pno = request.form['pnumber']
        u_pass = request.form['upass']
        details = [u_name, u_email, u_pno, u_pass]
        print(details)
        sql = "SELECT * from register where emailid = ?"
        stmt =  ibm_db.prepare(conn, sql)
        ibm_db.bind_param(stmt, 1, u_email)
        ibm_db.execute(stmt)
        acc = ibm_db.fetch_assoc(stmt)
        if acc:
            msg = "Email is already Registered, Please LogIn"
            return render_template("login.html", msg = msg)
        else:
            sql = "INSERT into register values (?, ?, ?, ?)"
            stmt = ibm_db.prepare(conn, sql)
            ibm_db.bind_param(stmt, 1, u_name)
            ibm_db.bind_param(stmt, 2, u_email)
            ibm_db.bind_param(stmt, 3, u_pno)
            ibm_db.bind_param(stmt, 4, u_pass)
            ibm_db.execute(stmt)
            msg = "Account Successfully Registered, Please LogIn"
            return render_template("login.html", msg = msg)
    return render_template("login.html")


# @app.route("/contact", methods = ['POST', 'GET'])
# def contact():
#     if request.method == 'POST':
#         u_name = request.form['fullname']
#         u_email = request.form['email']
#         u_pnumber = request.form['pnumber']
#         u_course = request.form['course']
#         enquiry_list = [u_name, u_email, u_course, u_pnumber]
#         print(enquiry_list)
#         sql = "INSERT into contact_b1 values (?, ?,?,?)"
#         stmt = ibm_db.prepare(conn, sql)
#         ibm_db.bind_param(stmt, 1, u_name)
#         ibm_db.bind_param(stmt , 2, u_email)
#         ibm_db.bind_param(stmt,3, u_pnumber)
#         ibm_db.bind_param(stmt, 4, u_course)
#         ibm_db.execute(stmt)
#         msg = "Thankyou for filling the details, SOON our technical team will get in contact with you"
#         return render_template("contact.html", msg = msg)
#     return render_template("contact.html")


# @app.route("/contact_file", methods = ['POST', 'GET'])
# def file():
    
#     f = request.files['details_file']
#     fname = f.filename
#     f.save(fname)
#     COS_ENDPOINT = "<enter your endpoint>"
#     COS_API_KEY_ID = "<enter your api key>"
#     COS_INSTANCE_CRN = "<enter your bucket crn>"
#     # cos = ibm_boto3.client("s3", ibm_api_key_id = COS_API_KEY_ID, ibm_service_instance_id = COS_INSTANCE_CRN, endpoint_url = COS_ENDPOINT, config = Config(signature_version='oauth') )
#     cos.upload_file(Filename = fname, Bucket = "course-b1", Key = fname )
#     return "file uplaod successfull"

@app.route('/uploader', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        f = request.files['file']
        # create a secure filename
        filename = secure_filename(f.filename)
        print("**************************")
        print(filename)
        # save file to /static/uploads
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        print(filepath)
        f.save(filepath)
        inference.predict(filepath)
        return render_template("uploaded.html", display_detection=filename, fname=filename)

@app.route('/display/<filename>')
def display_image(filename):
	#print('display_image filename: ' + filename)
	return redirect(url_for('static', filename='uploads/' + filename), code=301)

# No caching at all for API endpoints.
@app.after_request
def add_header(response):
    # response.cache_control.no_store = True
    response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0, max-age=0'
    response.headers['Pragma'] = 'no-cache'
    response.headers['Expires'] = '-1'
    return response

@app.route("/logout")
def logout():
    session.pop("Loggedin", None)
    session.pop("email", None)
    return render_template('index.html')


if __name__ == "__main__":
    app.run(host= "0.0.0.0", debug=True)