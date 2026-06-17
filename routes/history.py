from flask import Blueprint, render_template, session, redirect, url_for
from models.user import User
from models.prediction import Prediction

history = Blueprint("history", __name__)

@history.route("/history")
def history_page():

    print("🔥 HISTORY ROUTE HIT")

    username = session.get("username")

    user = User.query.filter_by(username=username).first()

    predictions = Prediction.query.filter_by(user_id=user.id).all()

    print("TOTAL PREDICTIONS:", len(predictions))

    return render_template("history.html", predictions=predictions)
    
    