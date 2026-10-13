document.addEventListener('DOMContentLoaded', function () {
  window.KALAM.ensureDemoData();
  const admin = window.KALAM.getCurrentAdmin();
  if (!admin || admin.role !== 'rental') {
    window.location.href = 'admin-login.html';
    return;
  }
  renderRentalAdminDashboard();

  const form = document.getElementById('rentalBookForm');
  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const book = {
        id: document.getElementById('rentalBookId').value.trim(),
        name: document.getElementById('rentalBookName').value.trim(),
        author: document.getElementById('rentalBookAuthor').value.trim(),
        isbn: document.getElementById('rentalBookIsbn').value.trim(),
        category: document.getElementById('rentalBookCategory').value,
        description: document.getElementById('rentalBookDescription').value.trim(),
        rentalPrice: Number(document.getElementById('rentalBookPrice').value || 0),
        securityDeposit: Number(document.getElementById('rentalSecurityDeposit').value || 0),
        totalCopies: Number(document.getElementById('rentalTotalCopies').value || 0),
        availableCopies: Number(document.getElementById('rentalAvailableCopies').value || 0),
        image: document.getElementById('rentalBookImage').value.trim() || 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=500&q=80',
        rating: 4.5
      };
      const books = window.KALAM.readStorage(STORAGE_KEYS.rentalBooks, []);
      const index = books.findIndex(function (item) { return item.id === book.id; });
      if (index >= 0) {
        books[index] = Object.assign({}, books[index], book);
      } else {
        books.push(book);
      }
      window.KALAM.writeStorage(STORAGE_KEYS.rentalBooks, books);
      form.reset();
      renderRentalAdminDashboard();
    });
  }

  document.addEventListener('click', function (event) {
    const deleteBtn = event.target.closest('[data-delete-rental-book]');
    const editBtn = event.target.closest('[data-edit-rental-book]');
    const logoutBtn = event.target.id === 'logoutAdminBtn';
    if (logoutBtn) {
      localStorage.removeItem(STORAGE_KEYS.currentAdmin);
      window.location.href = 'admin-login.html';
    }
    if (deleteBtn) {
      const id = deleteBtn.getAttribute('data-delete-rental-book');
      const books = window.KALAM.readStorage(STORAGE_KEYS.rentalBooks, []).filter(function (item) { return item.id !== id; });
      window.KALAM.writeStorage(STORAGE_KEYS.rentalBooks, books);
      renderRentalAdminDashboard();
    }
    if (editBtn) {
      const id = editBtn.getAttribute('data-edit-rental-book');
      const books = window.KALAM.readStorage(STORAGE_KEYS.rentalBooks, []);
      const book = books.find(function (item) { return item.id === id; });
      if (!book) return;
      document.getElementById('rentalBookId').value = book.id;
      document.getElementById('rentalBookName').value = book.name;
      document.getElementById('rentalBookAuthor').value = book.author;
      document.getElementById('rentalBookIsbn').value = book.isbn || '';
      document.getElementById('rentalBookCategory').value = book.category;
      document.getElementById('rentalBookDescription').value = book.description || '';
      document.getElementById('rentalBookPrice').value = book.rentalPrice;
      document.getElementById('rentalSecurityDeposit').value = book.securityDeposit || 0;
      document.getElementById('rentalTotalCopies').value = book.totalCopies || 0;
      document.getElementById('rentalAvailableCopies').value = book.availableCopies || 0;
      document.getElementById('rentalBookImage').value = book.image || '';
    }
  });
});

function renderRentalAdminDashboard() {
  const books = window.KALAM.readStorage(STORAGE_KEYS.rentalBooks, []);
  const rentals = window.KALAM.readStorage(STORAGE_KEYS.rentals, []);
  const overdue = rentals.filter(function (r) { return r.status === 'OVERDUE'; });
  const stats = document.getElementById('rentalStats');
  if (stats) {
    stats.innerHTML = '<div class="dashboard-stat"><span>Total Rental Books</span><strong>' + books.length + '</strong></div><div class="dashboard-stat"><span>Available Books</span><strong>' + books.reduce(function (sum, book) { return sum + Number(book.availableCopies || 0); }, 0) + '</strong></div><div class="dashboard-stat"><span>Currently Rented</span><strong>' + rentals.filter(function (r) { return r.status !== 'RETURNED'; }).length + '</strong></div><div class="dashboard-stat"><span>Overdue Books</span><strong>' + overdue.length + '</strong></div><div class="dashboard-stat"><span>Returned Books</span><strong>' + rentals.filter(function (r) { return r.status === 'RETURNED'; }).length + '</strong></div><div class="dashboard-stat"><span>Total Rental Revenue</span><strong>₹' + rentals.reduce(function (sum, r) { return sum + Number(r.rentalFee || 0); }, 0) + '</strong></div>';
  }

  const bookTable = document.getElementById('rentalBooksTable');
  if (bookTable) {
    bookTable.innerHTML = books.map(function (book) {
      return '<tr><td>' + book.id + '</td><td>' + book.name + '</td><td>' + book.author + '</td><td>' + book.category + '</td><td>₹' + book.rentalPrice + '</td><td>' + (book.totalCopies || 0) + '</td><td>' + (book.availableCopies || 0) + '</td><td>' + (book.availableCopies > 0 ? 'Available' : 'Unavailable') + '</td><td><button class="btn-ghost" data-edit-rental-book="' + book.id + '">Edit</button> <button class="btn-danger" data-delete-rental-book="' + book.id + '">Delete</button></td></tr>';
    }).join('');
  }

  const recordTable = document.getElementById('rentalRecordsTable');
  if (recordTable) {
    recordTable.innerHTML = rentals.map(function (r) {
      return '<tr><td>' + r.id + '</td><td>' + r.studentName + '</td><td>' + r.studentId + '</td><td>' + r.bookName + '</td><td>' + r.rentalDate + '</td><td>' + r.dueDate + '</td><td>' + (r.returnDate || '—') + '</td><td>₹' + (r.fine || 0) + '</td><td>' + r.status + '</td></tr>';
    }).join('');
  }
}
