from flask import Blueprint, request, redirect, url_for, flash, session
from models.user import User
from extensions import db
from utils.validators import validate_password

account = Blueprint("account", __name__)


@account.route("/change-password", methods=["POST"])
def change_password():

    # you are using username session, so we stick with it
    username = session.get("username")

    if not username:
        flash("Please login first.", "error")
        return redirect(url_for("auth.login_page"))

    user = User.query.filter_by(username=username).first()

    if not user:
        flash("User not found.", "error")
        return redirect(url_for("auth.login_page"))

    current_password = request.form.get("current_password")
    new_password = request.form.get("new_password")
    confirm_password = request.form.get("confirm_password")

    # 1. Check current password
    if not user.check_password(current_password):
        flash("Current password is incorrect.", "error")
        return redirect(url_for("main.settings"))

    # 2. Validate new password rules
    error = validate_password(new_password)
    if error:
        flash(error, "error")
        return redirect(url_for("main.settings"))

    # 3. Confirm match
    if new_password != confirm_password:
        flash("Passwords do not match.", "error")
        return redirect(url_for("main.settings"))

    # 4. Update password properly (IMPORTANT)
    user.set_password(new_password)
    db.session.commit()

    flash("Password updated successfully!", "success")

    return redirect(url_for("main.settings"))