from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
app = Flask(__name__)
# Mengaktifkan CORS untuk mengizinkan permintaan dari frontend
CORS(app) 

# Path ke file JSON untuk menyimpan data tamu
GUESTS_FILE = 'guests.json'

# Memastikan file guests.json ada
if not os.path.exists(GUESTS_FILE):
    with open(GUESTS_FILE, 'w') as f:
        json.dump([], f) # Inisialisasi dengan list kosong

def read_guests():
    """Membaca data tamu dari file JSON."""
    with open(GUESTS_FILE, 'r') as f:
        return json.load(f)

def write_guests(guests):
    """Menulis data tamu ke file JSON."""
    with open(GUESTS_FILE, 'w') as f:
        json.dump(guests, f, indent=4) # Menyimpan dengan indentasi untuk keterbacaan

@app.route('/')
def home():
    """Halaman beranda backend."""
    return "Backend Buku Tamu berjalan! Akses API di /api/guests"

@app.route('/api/guests', methods=['GET'])
def get_guests():
    """Mengembalikan daftar semua tamu."""
    guests = read_guests()
    return jsonify(guests)

@app.route('/api/guests', methods=['POST'])
def add_guest():
    """Menambahkan tamu baru ke daftar."""
    new_guest = request.json
    guests = read_guests()
    
    # Menambahkan ID unik sederhana
    new_guest['id'] = len(guests) + 1 
    
    guests.append(new_guest)
    write_guests(guests)
    return jsonify({"message": "Tamu berhasil ditambahkan", "guest": new_guest}), 201

if __name__ == '__main__':
    # Menjalankan aplikasi Flask di semua antarmuka dan port 5000
    app.run(debug=True, host='0.0.0.0', port=5000)
