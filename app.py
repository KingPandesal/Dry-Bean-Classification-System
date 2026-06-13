from flask import Flask
from extensions import db

app = Flask(__name__)

app.secret_key = "your_secret_key"

# Configure SQL Alchemy
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///users.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

# Import blueprints
from models.user import User  # imported so SQLAlchemy registers model
from routes.auth import auth
from routes.main import main

# Register blueprints
app.register_blueprint(auth)
app.register_blueprint(main)

from flask import render_template

@app.errorhandler(404)
def page_not_found(error):
    return render_template(
        "errors/404.html"
    ), 404

if __name__ ==   "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)