from flask import Flask

app = Flask(__name__)

@app.route("/")
def login():
    return """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Login Page</title>
        <style>
            body {
                margin: 0;
                font-family: Arial, sans-serif;
                background: linear-gradient(135deg, #4facfe, #00f2fe);
                height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .login-box {
                background: white;
                padding: 40px;
                border-radius: 12px;
                width: 320px;
                box-shadow: 0 10px 25px rgba(0,0,0,0.2);
                text-align: center;
            }

            .login-box h2 {
                margin-bottom: 20px;
            }

            .login-box input {
                width: 100%;
                padding: 10px;
                margin: 10px 0;
                border: 1px solid #ccc;
                border-radius: 6px;
            }

            .login-box button {
                width: 100%;
                padding: 10px;
                background: #4facfe;
                border: none;
                color: white;
                border-radius: 6px;
                cursor: pointer;
                margin-top: 10px;
            }

            .login-box button:hover {
                background: #00c6ff;
            }

            .note {
                font-size: 12px;
                color: gray;
                margin-top: 10px;
            }
        </style>
    </head>

    <body>
        <div class="login-box">
            <h2>Login</h2>

            <input type="text" placeholder="Username">
            <input type="password" placeholder="Password">

            <button>Sign In</button>

            <div class="note">
                UI only (no backend logic)
            </div>
        </div>
    </body>
    </html>
    """

if __name__ == "__main__":
    app.run(debug=True)