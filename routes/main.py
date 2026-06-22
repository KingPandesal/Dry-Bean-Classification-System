from flask import (
    Blueprint,
    render_template,
    redirect,
    session,
    url_for
)

from models.user import User
from models.prediction import Prediction
from routes.dashboard import get_dashboard_data

main = Blueprint(
    "main",
    __name__
)

# Home / Landing Page Route
@main.route("/")
def home():

    if "username" in session or session.get("guest"):
        return redirect(
            url_for("main.dashboard")
        )

    return render_template(
        "index.html"
    )

# Dashboard Route
@main.route("/dashboard")
def dashboard():

    if "username" not in session and not session.get("guest"):
        return redirect(url_for("auth.login_page"))

    user = None

    if "username" in session:
        user = User.query.filter_by(
            username=session["username"]
        ).first()

        stats = get_dashboard_data(user.id)

    else:
        stats = {
            "total_predictions": 0,
            "most_predicted": "-",
            "average_confidence": 0,
            "model_accuracy": 92,
            "monthly_growth": 0,
            "class_labels": [],
            "class_counts": [],
            "confidence_dates": [],
            "confidence_values": []
        }

    return render_template(
        "main/dashboard.html",
        user=user,
        stats=stats
    )

# History Route
@main.route("/history")
def history():

    if "username" not in session and not session.get("guest"):
        return redirect(url_for("auth.login_page"))

    user = None

    if "username" in session:
        user = User.query.filter_by(
            username=session["username"]
        ).first()

        predictions = Prediction.query.filter_by(
            user_id=user.id
        ).order_by(
            Prediction.created_at.desc()
        ).all()

    else:
        predictions = []

    return render_template(
        "main/history.html",
        user=user,
        predictions=predictions
    )

# Settings Route
@main.route("/settings")
def settings():

    if session.get("guest"):
        return redirect(url_for("main.dashboard"))

    if "username" not in session:
        return redirect(url_for("auth.login_page"))

    user = User.query.filter_by(
        username=session["username"]
    ).first()

    return render_template(
        "main/settings.html",
        user=user
    )