from flask import Blueprint, request, session, jsonify, url_for
from models.user import User
from extensions import db
from utils.validators import validate_password

import os
import secrets
from werkzeug.utils import secure_filename
from flask import current_app

ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}

account = Blueprint(
    "account",
    __name__,
    url_prefix="/account"
)

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

@account.route("/update-profile", methods=["POST"])
def update_profile():

    username = session.get("username")

    if not username:
        return jsonify({"status": "error", "message": "Not logged in"})

    user = User.query.filter_by(username=username).first()

    data = request.get_json()

    new_name = data.get("name")
    new_username = data.get("username")
    new_email = data.get("email")

    # Username validation
    if len(new_username) < 8:
        return jsonify({
            "status": "error",
            "message": "Username must be at least 8 characters long."
        })

    # update fields
    user.name = new_name
    user.username = new_username
    user.email = new_email

    db.session.commit()

    # update session if username changed
    session["username"] = new_username

    return jsonify({"status": "success", "message": "Profile updated successfully"})

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

@account.route("/upload-avatar", methods=["POST"])
def upload_avatar():

    username = session.get("username")
    if not username:
        return jsonify({"error": "Not logged in"}), 401

    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({"error": "User not found"}), 404

    if "avatar" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["avatar"]

    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    if not allowed_file(file.filename):
        return jsonify({"error": "Invalid file type"}), 400

    extension = file.filename.rsplit(".", 1)[1].lower()

    random_string = secrets.token_hex(4)

    filename = (
        f"{user.username}_{random_string}.{extension}"
    )

    filename = secure_filename(filename)

    filepath = os.path.join(current_app.config["UPLOAD_FOLDER"], filename)
    
    if user.avatar:

        old_avatar_path = os.path.join(
            current_app.config["UPLOAD_FOLDER"],
            user.avatar
        )

        if os.path.exists(old_avatar_path):
            os.remove(old_avatar_path)

    file.save(filepath)

    user.avatar = filename

    db.session.commit()

    return jsonify({
        "status": "success",
        "message": "Avatar updated successfully",
        "avatar_url": url_for(
            "static",
            filename=f"uploads/{filename}"
        )
    })