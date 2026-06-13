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
import re

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

    # ----------------------------
    # Username validation
    # ----------------------------
    if len(username) < 8:
        return render_template(
            "auth/register.html",
            error="Username must be at least 8 characters long.",
            form=request.form
        )

    # ----------------------------
    # Email validation (basic regex)
    # ----------------------------
    email_pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    if not re.match(email_pattern, email):
        return render_template(
            "auth/register.html",
            error="Please enter a valid email address.",
            form=request.form
        )

    # ----------------------------
    # Password validations
    # ----------------------------
    if len(password) < 8:
        return render_template(
            "auth/register.html",
            error="Password must be at least 8 characters long.",
            form=request.form
        )

    if not re.search(r"[A-Z]", password):
        return render_template(
            "auth/register.html",
            error="Password must contain at least 1 uppercase letter.",
            form=request.form
        )

    if not re.search(r"[a-zA-Z]", password):
        return render_template(
            "auth/register.html",
            error="Password must contain letters.",
            form=request.form
        )

    if not re.search(r"\d", password):
        return render_template(
            "auth/register.html",
            error="Password must contain at least 1 number.",
            form=request.form
        )

    if not re.search(r"[!@#$%^&*(),.?\":{}|<>_\-\\/]", password):
        return render_template(
            "auth/register.html",
            error="Password must contain at least 1 special character.",
            form=request.form
        )

    # Confirm password check
    if password != confirm_password:
        return render_template(
            "auth/register.html",
            error="Passwords do not match. Please try again.",
            form=request.form
        )

    # ----------------------------
    # Uniqueness checks
    # ----------------------------
    if User.query.filter_by(username=username).first():
        return render_template(
            "auth/register.html",
            error="Username already exists",
            form=request.form
        )

    if User.query.filter_by(email=email).first():
        return render_template(
            "auth/register.html",
            error="Email already exists",
            form=request.form
        )

    # ----------------------------
    # Create user
    # ----------------------------
    new_user = User(
        name=name,
        username=username,
        email=email
    )

    new_user.set_password(password)

    db.session.add(new_user)
    db.session.commit()

    session["username"] = username

    return redirect(url_for("main.dashboard"))

# Logout Route
@auth.route("/logout")
def logout():

    session.clear()

    return redirect(
        url_for("auth.login")
    )