from flask import Blueprint, request, jsonify, session

from ml.model_loader import model, label_encoder

import pandas as pd
import numpy as np
import os

from models.prediction import Prediction
from models.user import User
from extensions import db

import json

# Path to the CSV dataset
CSV_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "instance", "Dry_Bean_Dataset.csv")

predict = Blueprint("predict", __name__)

FEATURE_NAMES = [
    "Area",
    "Perimeter",
    "MajorAxisLength",
    "MinorAxisLength",
    "AspectRation",
    "Eccentricity",
    "ConvexArea",
    "EquivDiameter",
    "Extent",
    "Solidity",
    "roundness",
    "Compactness",
    "ShapeFactor1",
    "ShapeFactor2",
    "ShapeFactor3",
    "ShapeFactor4"
]


@predict.route("/predict", methods=["POST"])
def predict_bean():

    data = request.get_json()

    try:
        # convert input into ordered list
        features = [
            float(data["area"]),
            float(data["perimeter"]),
            float(data["major_axis_length"]),
            float(data["minor_axis_length"]),
            float(data["aspect_ratio"]),
            float(data["eccentricity"]),
            float(data["convex_area"]),
            float(data["equiv_diameter"]),
            float(data["extent"]),
            float(data["solidity"]),
            float(data["roundness"]),
            float(data["compactness"]),
            float(data["shape_factor1"]),
            float(data["shape_factor2"]),
            float(data["shape_factor3"]),
            float(data["shape_factor4"]),
        ]

        features_df = pd.DataFrame([features], columns=FEATURE_NAMES)

        # prediction
        pred = model.predict(features_df)[0]

        # confidence
        proba = model.predict_proba(features_df)[0]
        confidence = float(np.max(proba) * 100)

        # decode label
        class_name = label_encoder.inverse_transform([pred])[0]

        # ============================
        # SAVE TO DATABASE
        # ============================

        username = session.get("username")

        if username:
            user = User.query.filter_by(username=username).first()

            if user:
                history = Prediction(
                    user_id=user.id,
                    prediction=class_name,
                    confidence=round(confidence, 2),
                    input_data=json.dumps(data)
                )

                db.session.add(history)
                db.session.commit()

        # ============================
        # SAVE TO CSV
        # ============================

        # Create row with features and predicted class
        new_row = features + [class_name]

        # Append to CSV
        try:
            new_df = pd.DataFrame([new_row], columns=FEATURE_NAMES + ["Class"])
            new_df.to_csv(CSV_PATH, mode="a", header=False, index=False)
        except Exception as e:
            # Log error but don't fail the prediction
            print(f"Error saving to CSV: {e}")

        # ============================

        return jsonify({
            "success": True,
            "prediction": class_name,
            "confidence": round(confidence, 2)
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "message": str(e)
        })