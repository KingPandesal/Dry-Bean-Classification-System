# 🫘 Dry Bean Classifier (ML Web App)

A Flask-based web application that uses a Machine Learning model to classify dry beans based on geometric and shape features. The system also includes user authentication and a prediction history tracker for logged-in users.

---

## ⭐ Table of Contents

- [Quick Start](#quick-start)
- [Features](#features)
- [Machine Learning Model](#machine-learning-model)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)

---

## 🚀 Quick Start

### Clone the Repository

```bash
git clone https://github.com/your-username/dry-bean-classifier.git
cd dry-bean-classifier
```

### Set Up Virtual Environment

**On Windows (PowerShell):**
```bash
python -m venv venv
.\venv\Scripts\Activate.ps1
```

**On macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Run the Application

```bash
python app.py
```

The application will be available at `http://localhost:5000`

---

## 🚀 Features

- 🔐 User Authentication (Login / Register / Session-based)
- 🤖 Machine Learning Prediction (Dry Bean Classification)
- 📊 Prediction Confidence Score
- 🧾 Saved Prediction History (per user)
- 🔎 Search, Filter, Sort, and Pagination in History
- 👤 User Profile Management
- 🖼️ Avatar Upload Support
- 🌐 Guest Mode (for trying before signing up)

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

---

## 📦 Prerequisites

Before cloning and running this project, ensure you have:

- **Python 3.8+** installed on your system
- **Git** installed
- **pip** (Python package manager)
- About **500MB** of disk space for dependencies and the ML model

---

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/dry-bean-classifier.git
cd dry-bean-classifier
```

### 2. Create and Activate Virtual Environment

**Windows (PowerShell):**
```bash
python -m venv venv
Set-ExecutionPolicy -Scope Process -ExecutionPolicy RemoteSigned
.\venv\Scripts\Activate.ps1
```

**Windows (Command Prompt):**
```bash
python -m venv venv
venv\Scripts\activate.bat
```

**macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

### 3. Install Required Dependencies

```bash
pip install -r requirements.txt
```

### 4. Database Setup

The application uses SQLite. On first run, the database will be automatically initialized:

```bash
python app.py
```

A `instance/` directory will be created with the database file.

---

## ▶️ Running the Application

### Start the Flask Development Server

```bash
python app.py
```

The application will start at:
- **Local URL:** `http://localhost:5000`
- **Network URL:** `http://your-ip:5000`

### Stop the Server

Press `Ctrl + C` in your terminal to stop the server.

---

## 📁 Project Structure

```
dry-bean-classifier/
├── app.py                 # Main Flask application entry point
├── extensions.py          # Flask extensions configuration
├── requirements.txt       # Python dependencies
├── README.md             # This file
│
├── ml/
│   └── model_loader.py   # ML model loading utilities
│
├── models/
│   ├── __init__.py
│   ├── user.py           # User database model
│   └── prediction.py     # Prediction database model
│
├── routes/
│   ├── __init__.py
│   ├── main.py           # Main routes (dashboard, history, settings)
│   ├── auth.py           # Authentication routes (login, register, logout)
│   ├── predict.py        # Prediction routes
│   ├── account.py        # Account management routes
│   └── dashboard.py      # Dashboard data utilities
│
├── templates/
│   ├── index.html        # Landing page
│   ├── auth/
│   │   ├── login.html
│   │   └── register.html
│   ├── main/
│   │   ├── base.html     # Base template
│   │   ├── dashboard.html
│   │   ├── history.html
│   │   └── settings.html
│   ├── components/
│   │   └── modal.html
│   ├── errors/
│   │   └── 404.html
│   └── partials/
│       └── toasts.html
│
├── static/
│   ├── css/
│   │   ├── landing-page-animation.css
│   │   └── components/
│   │       ├── fonts.css
│   │       └── scrollbar.css
│   ├── js/
│   │   ├── predict.js
│   │   ├── scroll-restoration.js
│   │   ├── toasts.js
│   │   ├── components/
│   │   │   ├── modal.js
│   │   │   └── sidebar.js
│   │   └── main/
│   │       ├── dashboard.js
│   │       ├── history.js
│   │       └── settings.js
│   └── uploads/          # User avatar storage
│
├── utils/
│   └── validators.py     # Input validation utilities
│
└── instance/             # Instance-specific data (created on first run)
    └── app.db            # SQLite database
```

---

## 🔒 Environment Configuration

Create a `.env` file in the root directory for sensitive configuration (optional):

```env
SECRET_KEY=your_secret_key_here
UPLOAD_FOLDER=static/uploads
MAX_CONTENT_LENGTH=16777216
```

---

## 🐛 Troubleshooting

### Issue: "ModuleNotFoundError" when running the app

**Solution:** Make sure your virtual environment is activated and all dependencies are installed:
```bash
pip install -r requirements.txt
```

### Issue: Port 5000 already in use

**Solution:** The app will automatically use a different port, or you can specify one:
```bash
python app.py --port 5001
```

### Issue: Database errors on startup

**Solution:** Delete the `instance/` folder and restart the app:
```bash
rm -r instance/  # macOS/Linux
rmdir /s instance  # Windows
python app.py
```

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📧 Support

For issues or questions, please open an issue on GitHub.
