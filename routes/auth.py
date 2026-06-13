from flask import (
    Blueprint,
    render_template,
    request,
    redirect,
    session,
    url_for
)

from extensions import db
from models.user import User

auth = Blueprint(
    "auth",
    __name__,
    url_prefix="/auth"
)

# Login Page Route 
@auth.route("/login")
def login_page():
    return render_template("auth/login.html")

@auth.route("/login", methods=["POST"])
def login():
    username = request.form["username"]
    password = request.form["password"]

    user = User.query.filter_by(
        username=username
    ).first()

    if user and user.check_password(password):

        session["username"] = username

        return redirect(
            url_for("main.dashboard")
        )

    return redirect(
        url_for("auth.login_page")
    )

# Register Page Route
@auth.route("/register")
def register_page():
    return render_template("auth/register.html")

@auth.route("/register", methods=["POST"])
def register():
    username = request.form["username"]
    password = request.form["password"]

    if User.query.filter_by(
        username=username
    ).first():

        return render_template(
            "auth/register.html",
            error="User already exists"
        )

    new_user = User(
        username=username
    )

    new_user.set_password(password)

    db.session.add(new_user)
    db.session.commit()

    session["username"] = username

    return redirect(
        url_for("main.dashboard")
    )