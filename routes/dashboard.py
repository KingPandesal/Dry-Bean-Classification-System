from collections import Counter
from datetime import datetime

from models.prediction import Prediction

def get_dashboard_data(user_id):

    predictions = Prediction.query.filter_by(
        user_id=user_id
    ).all()

    total_predictions = len(predictions)

    # ---------- Monthly Growth ----------
    now = datetime.now()

    current_month = now.month
    current_year = now.year

    if current_month == 1:
        previous_month = 12
        previous_year = current_year - 1
    else:
        previous_month = current_month - 1
        previous_year = current_year

    this_month_count = sum(
        1 for p in predictions
        if p.created_at.month == current_month
        and p.created_at.year == current_year
    )

    last_month_count = sum(
        1 for p in predictions
        if p.created_at.month == previous_month
        and p.created_at.year == previous_year
    )

    if last_month_count == 0:
        monthly_growth = 100 if this_month_count > 0 else 0
    else:
        monthly_growth = round(
            ((this_month_count - last_month_count) / last_month_count) * 100,
            1
        )

    # ---------- Empty State ----------
    if total_predictions == 0:
        return {
            "total_predictions": 0,
            "most_predicted": "-",
            "average_confidence": 0,
            "model_accuracy": 92,
            "monthly_growth": monthly_growth
        }

    # ---------- Most Predicted ----------
    classes = [p.prediction for p in predictions]
    most_predicted = Counter(classes).most_common(1)[0][0]

    # ---------- Average Confidence ----------
    average_confidence = round(
        sum(p.confidence for p in predictions) / total_predictions,
        2
    )

    return {
        "total_predictions": total_predictions,
        "most_predicted": most_predicted,
        "average_confidence": average_confidence,
        "model_accuracy": 92,
        "monthly_growth": monthly_growth
    }