from flask import (
    Blueprint,
    render_template,
    redirect,
    session,
    url_for
)

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

    return render_template(
        "main/dashboard.html"
    )