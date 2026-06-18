# 🫘 Dry Bean Classifier (ML Web App)

A Flask-based web application that uses a Machine Learning model to classify dry beans based on geometric and shape features. The system also includes user authentication and a prediction history tracker for logged-in users.

---

## 🚀 Features

- 🔐 User Authentication (Login / Register / Session-based)
- 🤖 Machine Learning Prediction (Dry Bean Classification)
- 📊 Prediction Confidence Score
- 🧾 Saved Prediction History (per user)
- 🔎 Search, Filter, Sort, and Pagination in History

---

## 🧠 Machine Learning Model

The system uses a trained classification model to predict one of the following bean types:

- BARBUNYA  
- BOMBAY  
- CALI  
- DERMASON  
- HOROZ  
- SEKER  
- SIRA  

### Input Features:

- Area  
- Perimeter  
- Major Axis Length  
- Minor Axis Length  
- Aspect Ratio  
- Eccentricity  
- Convex Area  
- Equiv Diameter  
- Extent  
- Solidity  
- Roundness  
- Compactness  
- Shape Factor 1–4  

---

## 🏗️ Tech Stack

- **Backend:** Flask (Python)
- **Database:** SQLite / SQLAlchemy
- **ML:** scikit-learn, pandas, numpy
- **Frontend:** HTML, TailwindCSS, JavaScript
- **Templating:** Jinja2
