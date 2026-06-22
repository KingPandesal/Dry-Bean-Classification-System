from flask import Flask
from extensions import db

import os

app = Flask(__name__)

app.secret_key = "your_secret_key"

app.config["UPLOAD_FOLDER"] = "static/uploads"
app.config["MAX_CONTENT_LENGTH"] = 2 * 1024 * 1024

# Configure SQL Alchemy
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///users.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

# Import blueprints
from models.user import User  # imported so SQLAlchemy registers model
from routes.auth import auth
from routes.main import main
from routes.account import account
from routes.predict import predict
from routes.history import history

# Register blueprints
app.register_blueprint(auth)
app.register_blueprint(main)
app.register_blueprint(account)
app.register_blueprint(predict)
app.register_blueprint(history)

from flask import render_template

@app.errorhandler(404)
def page_not_found(error):
    return render_template(
        "errors/404.html"
    ), 404

@app.after_request
def add_header(response):
    response.headers["Cache-Control"] = "no-store, no-cache, must-revalidate, max-age=0"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "0"
    return response

if __name__ ==   "__main__":
    with app.app_context():
        db.create_all()
    
    host = os.environ.get("HOST", "0.0.0.0")
    port = int(os.environ.get("PORT", 5000))
    app.run(host=host, port=port, debug=True)