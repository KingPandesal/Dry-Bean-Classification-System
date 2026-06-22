from datetime import datetime
from extensions import db

class Prediction(db.Model):
    id = db.Column(
        db.Integer, 
        primary_key=True
    )

    user_id = db.Column(
        db.Integer, 
        db.ForeignKey("user.id"), 
        nullable=True
    )

    prediction = db.Column(
        db.String(50)
    )
    confidence = db.Column(
        db.Float
    )

    # optional: store inputs for transparency
    input_data = db.Column(
        db.Text
    )

    created_at = db.Column(
        db.DateTime, 
        default=datetime.now
    )