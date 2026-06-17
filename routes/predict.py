@main.route("/predict", methods=["POST"])
def predict():

    data = request.get_json()

    # convert inputs into model format
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

    prediction = model.predict([features])[0]

    return jsonify({
        "success": True,
        "prediction": prediction,
        "confidence": 92.5  # optional later
    })