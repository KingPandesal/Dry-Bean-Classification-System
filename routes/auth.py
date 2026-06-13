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

# FOR GUEST MODE
@auth.route("/guest")
def guest():

    session.clear()

    session["guest"] = True

    return redirect(
        url_for("main.dashboard")
    )

# Login Page Route 
@auth.route("/login")
def login_page():

    if "username" in session or session.get("guest"):
        return redirect(
            url_for("main.dashboard")
        )

    return render_template(
        "auth/login.html"
    )

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

    if "username" in session or session.get("guest"):
        return redirect(
            url_for("main.dashboard")
        )

    return render_template(
        "auth/register.html"
    )

@auth.route("/register", methods=["POST"])
def register():

    name = request.form["name"]
    username = request.form["username"]
    email = request.form["email"]
    password = request.form["password"]
    confirm_password = request.form["confirm-password"]

    # Check if match ba ang passwords
    if password != confirm_password:
        return render_template(
            "auth/register.html",
            error="Passwords do not match. Please try again."
        )
    
    # Check Username and Email Uniqueness
    if User.query.filter_by(username=username).first():
        return render_template(
            "auth/register.html",
            error="Username already exists"
        )

    if User.query.filter_by(email=email).first():
        return render_template(
            "auth/register.html",
            error="Email already exists"
        )

    # Create new user
    new_user = User(
        name=name,
        username=username,
        email=email
    )

    new_user.set_password(password)

    db.session.add(new_user)
    db.session.commit()

    session["username"] = username

    return redirect(
        url_for("main.dashboard")
    )

# Logout Route
@auth.route("/logout")
def logout():

    session.clear()

    return redirect(
        url_for("main.home")
    )