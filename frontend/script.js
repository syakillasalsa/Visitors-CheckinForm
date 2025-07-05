document.addEventListener('DOMContentLoaded', () => {
    const guestForm = document.getElementById('guestForm');
    const guestTableBody = document.getElementById('guestTableBody');
    const guestTable = document.getElementById('guestTable');
    const loadingMessage = document.getElementById('loadingMessage');
    const noGuestsMessage = document.getElementById('noGuestsMessage');
    const responseMessageDiv = document.getElementById('responseMessage');

    const API_URL = 'http://127.0.0.1:5000/api/guests'; // Pastikan ini sesuai dengan port Flask Anda

    // Fungsi untuk menampilkan pesan respons
    function showResponseMessage(message, type) {
        responseMessageDiv.textContent = message;
        responseMessageDiv.classList.remove('hidden', 'success', 'error');
        responseMessageDiv.classList.add(type);
        responseMessageDiv.classList.remove('hidden');

        // Sembunyikan pesan setelah beberapa detik
        setTimeout(() => {
            responseMessageDiv.classList.add('hidden');
        }, 3000);
    }

    // Fungsi untuk mengambil dan menampilkan daftar tamu
    async function fetchGuests() {
        loadingMessage.classList.remove('hidden');
        guestTable.classList.add('hidden');
        noGuestsMessage.classList.add('hidden');
        guestTableBody.innerHTML = ''; // Bersihkan daftar yang ada

        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const guests = await response.json();

            loadingMessage.classList.add('hidden');

            if (guests.length === 0) {
                noGuestsMessage.classList.remove('hidden');
            } else {
                guestTable.classList.remove('hidden');
                guests.forEach(guest => {
                    const row = guestTableBody.insertRow();
                    row.classList.add('hover:bg-gray-50'); // Efek hover pada baris
                    const nameCell = row.insertCell();
                    const contactCell = row.insertCell();
                    const messageCell = row.insertCell();

                    nameCell.textContent = guest.name;
                    contactCell.textContent = guest.contact;
                    messageCell.textContent = guest.message;

                    // Tambahkan padding dan text alignment untuk sel
                    nameCell.classList.add('px-4', 'py-2', 'text-sm', 'text-gray-900', 'whitespace-nowrap', 'text-left');
                    contactCell.classList.add('px-4', 'py-2', 'text-sm', 'text-gray-900', 'whitespace-nowrap', 'text-left');
                    messageCell.classList.add('px-4', 'py-2', 'text-sm', 'text-gray-900', 'text-left');
                });
            }
        } catch (error) {
            console.error('Gagal mengambil tamu:', error);
            loadingMessage.textContent = 'Gagal memuat tamu. Silakan coba lagi.';
            loadingMessage.classList.remove('hidden');
            showResponseMessage('Gagal memuat daftar tamu. Pastikan backend berjalan!', 'error');
        }
    }

    // Event listener untuk pengiriman formulir
    guestForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Mencegah pengiriman formulir default

        const name = document.getElementById('name').value;
        const contact = document.getElementById('contact').value;
        const message = document.getElementById('message').value;

        const newGuest = { name, contact, message };

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newGuest),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            showResponseMessage(result.message, 'success');
            guestForm.reset(); // Bersihkan formulir
            fetchGuests(); // Muat ulang daftar tamu
        } catch (error) {
            console.error('Gagal menambahkan tamu:', error);
            showResponseMessage('Gagal menambahkan tamu. Silakan coba lagi.', 'error');
        }
    });

    // Muat tamu saat halaman pertama kali dimuat
    fetchGuests();
});
