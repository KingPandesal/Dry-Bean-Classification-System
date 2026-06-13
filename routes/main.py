from flask import (
    Blueprint,
    render_template,
    redirect,
    session,
    url_for
)

from models.user import User

main = Blueprint(
    "main",
    __name__
)

# Home / Landing Page Route
@main.route("/")
def home():

    if "username" in session:
        return redirect(
            url_for("main.dashboard")
        )

    return render_template(
        "index.html"
    )

# Dashboard Route
@main.route("/dashboard")
def dashboard():

    if "username" not in session:
        return redirect(
            url_for("auth.login_page")
        )

    user = User.query.filter_by(
        username=session["username"]
    ).first()

    return render_template(
        "main/dashboard.html",
        user=user
    )