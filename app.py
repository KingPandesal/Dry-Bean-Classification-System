from flask import Flask, render_template, request, redirect, session, url_for

# PBKDF2 (Password-Based Key Derivation Function 2)
from werkzeug.security import generate_password_hash, check_password_hash 

from flask_sqlalchemy import SQLAlchemy





app = Flask(__name__)
app.secret_key = "your_secret_key"





# Configure SQL Alchemy
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///users.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)





# Database Model ~ Single Row
class User(db.Model):
    # Class Variables
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(25), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)





# Routes
@app.route("/")
def home():
    # if naka-log in daan kay ditso na sa dashboard
    if "username" in session:
        return redirect(url_for('dashboard'))

    #if wla pa nag log in, sa landing page pa lang
    return render_template("index.html")

# Login Route
@app.route("/login", methods=["POST"])
def login():
    # Collect info from form
    username = request.form["username"]
    password = request.form["password"]

    # Chek if naa ba sa DB

    # else: show homepage
    

    user = User.query.filter_by(username=username).first()

    if user and user.check_password(password):
        session["username"] = user.username
        return redirect(url_for('dashboard'))
    
    return redirect(url_for('home'))

# Register Route

# Dashboard Route

# Logout Route



if __name__ ==   "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)