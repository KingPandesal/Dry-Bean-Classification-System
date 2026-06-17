from flask import Blueprint, request, jsonify
from ml.model_loader import model, label_encoder
import pandas as pd
import numpy as np

predict = Blueprint("predict", __name__)

# MUST MATCH TRAINING FEATURE ORDER
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

        # ✅ convert to DataFrame (THIS FIXES WARNING)
        features_df = pd.DataFrame([features], columns=FEATURE_NAMES)

        # prediction
        pred = model.predict(features_df)[0]

        # confidence
        proba = model.predict_proba(features_df)[0]
        confidence = float(np.max(proba) * 100)

        # decode label
        class_name = label_encoder.inverse_transform([pred])[0]

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