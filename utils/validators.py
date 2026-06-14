import re

def validate_password(password):

    if len(password) < 8:
        return "Password must be at least 8 characters long."

    if not re.search(r"[A-Z]", password):
        return "Password must contain at least 1 uppercase letter."

    if not re.search(r"[a-zA-Z]", password):
        return "Password must contain letters."

    if not re.search(r"\d", password):
        return "Password must contain at least 1 number."

    if not re.search(r"[!@#$%^&*(),.?\":{}|<>_\-\\/]", password):
        return "Password must contain at least 1 special character."

    return None