from flask import Blueprint, request, session, jsonify
from models.user import User
from extensions import db
from utils.validators import validate_password

account = Blueprint("account", __name__)


@account.route("/change-password", methods=["POST"])
def change_password():

    username = session.get("username")

    if not username:
        return jsonify({"success": False, "message": "Please login first."})

    user = User.query.filter_by(username=username).first()

    if not user:
        return jsonify({"success": False, "message": "User not found."})

    data = request.get_json()

    current_password = data.get("current_password")
    new_password = data.get("new_password")
    confirm_password = data.get("confirm_password")

    if not user.check_password(current_password):
        return jsonify({"success": False, "message": "Current password is incorrect."})

    error = validate_password(new_password)
    if error:
        return jsonify({"success": False, "message": error})

    if new_password != confirm_password:
        return jsonify({"success": False, "message": "Passwords do not match."})

    user.set_password(new_password)
    db.session.commit()

    return jsonify({"success": True, "message": "Password updated successfully!"})