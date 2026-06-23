from flask import Blueprint, request, jsonify, session

from ml.model_loader import model, label_encoder

import pandas as pd
import numpy as np
import os
from datetime import datetime

from models.prediction import Prediction
from models.user import User
from extensions import db

import json

predict = Blueprint("predict", __name__)

# Paths
BASE_DIR = os.path.dirname(os.path.dirname(__file__))
CSV_PATH = os.path.join(BASE_DIR, "instance", "Dry_Bean_Dataset.csv")
HISTORY_CSV_PATH = os.path.join(BASE_DIR, "instance", "prediction_history.csv")

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

HISTORY_COLUMNS = [
    "Timestamp",
    "Input_Source",
    *FEATURE_NAMES,
    "Actual_Class",
    "Predicted_Class",
    "Prediction_Status"
]


def find_matching_row(features, dataset_df):
    """
    Find if the input features match any row in the original dataset.
    Returns the matched row's Class if found, None otherwise.
    """
    for idx, row in dataset_df.iterrows():
        match = True
        for i, feat_name in enumerate(FEATURE_NAMES):
            if abs(row[feat_name] - features[i]) > 0.001:  # tolerance for float comparison
                match = False
                break
        if match:
            return row["Class"]
    return None


def save_to_history(features, actual_class, predicted_class, input_source):
    """
    Append prediction to prediction_history.csv
    """
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    # Determine prediction status
    if actual_class is None:
        prediction_status = "N/A"
    elif actual_class == predicted_class:
        prediction_status = "Correct"
    else:
        prediction_status = "Incorrect"

    row_data = [
        timestamp,
        input_source,
        *features,
        actual_class if actual_class else "",
        predicted_class,
        prediction_status
    ]

    # Create CSV if not exists
    if not os.path.exists(HISTORY_CSV_PATH):
        df = pd.DataFrame([row_data], columns=HISTORY_COLUMNS)
        df.to_csv(HISTORY_CSV_PATH, index=False)
    else:
        df = pd.DataFrame([row_data], columns=HISTORY_COLUMNS)
        df.to_csv(HISTORY_CSV_PATH, mode="a", header=False, index=False)


# Load original dataset once at module level for fast matching
_dataset_cache = None


def get_dataset():
    """Load and cache the original dataset"""
    global _dataset_cache
    if _dataset_cache is None:
        _dataset_cache = pd.read_csv(CSV_PATH)
    return _dataset_cache


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
        # PREDICTION HISTORY LOGIC
        # ============================

        # Check if input matches original dataset
        dataset_df = get_dataset()
        matched_class = find_matching_row(features, dataset_df)

        if matched_class:
            # CASE 1: Dataset match found
            save_to_history(features, matched_class, class_name, "Dataset")
        else:
            # CASE 2: New user input
            save_to_history(features, None, class_name, "Manual")

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