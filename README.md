
# 📋 Visitors Check-In Form

A responsive and modern web-based guestbook application that allows visitors to fill out their name, contact, and message. Built with HTML, Tailwind CSS, JavaScript, and Flask for the backend.

---

## 🚀 Features

- ✍️ Form input for name, contact, and message
- 📜 Visitor list display in real-time (fetched from backend)
- 🎨 Responsive UI using Tailwind CSS
- ⚡ Simple backend API with Flask
- 💾 Stores visitor data temporarily (or you can expand with a database)

---

## 🖥️ Tech Stack

- **Frontend**: HTML5, Tailwind CSS, JavaScript
- **Backend**: Python 3 + Flask
- **Dev Tools**: Python HTTP Server, JSON file or optional DB

---

## 📂 Project Structure

```bash
Visitors-CheckinForm/
├── backend/
│   ├── app.py              # Flask backend server
│   └── requirements.txt    # Dependencies (Flask, etc.)
├── frontend/
│   ├── index.html          # Main guestbook form UI
│   ├── style.css           # Custom styling
│   └── script.js           # Handles form and data fetching
└── README.md
````

---

## ▶️ Getting Started

### 🔧 1. Clone the Repository

```bash
git clone https://github.com/syakillasalsa/Visitors-CheckinForm.git
cd Visitors-CheckinForm
```

---

### 🐍 2. Run the Backend with Flask

```bash
cd backend
pip install -r requirements.txt
python app.py
```

> Flask will run at: `http://127.0.0.1:5000`

Make sure CORS is enabled in `app.py` if accessing from a different port.

---

### 🌐 3. Open the Frontend

In another terminal:

```bash
cd frontend
python -m http.server 8000
```

Open your browser and go to:

```
http://127.0.0.1:8000
```

---

## 🧪 Optional Improvements

* Add a database (SQLite, PostgreSQL)
* Save data permanently
* Add admin login
* Export guest list to CSV

---

## 📄 License

This project is open-source and licensed under the [MIT License](LICENSE).

```


