document.addEventListener('DOMContentLoaded', function () {
  window.KALAM.ensureDemoData();

  if (document.getElementById('rentalBookList')) {
    renderRentalBookList();
  }

  if (document.getElementById('rentalForm')) {
    const params = new URLSearchParams(window.location.search);
    const bookId = params.get('bookId');
    const books = window.KALAM.readStorage(STORAGE_KEYS.rentalBooks, []);
    const selectedBook = books.find(function (item) { return item.id === bookId; }) || books[0];

    if (selectedBook) {
      document.getElementById('bookName').value = selectedBook.name;
      document.getElementById('bookId').value = selectedBook.id;
      document.getElementById('rentalFee').value = selectedBook.rentalPrice;
      document.getElementById('securityDeposit').value = selectedBook.securityDeposit || 0;
    }

    const currentUser = window.KALAM.getCurrentUser();
    if (currentUser) {
      document.getElementById('studentName').value = currentUser.name;
      document.getElementById('studentId').value = currentUser.id;
    }

    document.getElementById('rentalForm').addEventListener('submit', function (event) {
      event.preventDefault();
      const studentName = document.getElementById('studentName').value.trim();
      const studentId = document.getElementById('studentId').value.trim();
      const bookIdValue = document.getElementById('bookId').value.trim();
      const bookName = document.getElementById('bookName').value.trim();
      const duration = Number(document.getElementById('rentalDuration').value);

      if (!studentName || !studentId || !bookIdValue || !bookName || !duration) {
        window.alert('Please fill all rental form fields.');
        return;
      }

      const booksList = window.KALAM.readStorage(STORAGE_KEYS.rentalBooks, []);
      const book = booksList.find(function (item) { return item.id === bookIdValue; });
      if (!book) {
        window.alert('Selected book not found.');
        return;
      }
      if ((book.availableCopies || 0) <= 0) {
        window.alert('No copies available for this book.');
        return;
      }

      const rentalDate = new Date();
      const dueDate = new Date(rentalDate.getTime());
      dueDate.setDate(rentalDate.getDate() + duration);

      const rentalRecord = {
        id: 'REN-' + Date.now().toString().slice(-5),
        studentName: studentName,
        studentId: studentId,
        bookId: bookIdValue,
        bookName: bookName,
        rentalDate: formatDate(rentalDate),
        dueDate: formatDate(dueDate),
        returnDate: '',
        status: 'ACTIVE',
        fine: 0,
        rentalFee: Number(book.rentalPrice || 0),
        securityDeposit: Number(book.securityDeposit || 0),
        daysRemaining: daysBetween(rentalDate, dueDate),
        extended: false
      };

      const rentals = window.KALAM.readStorage(STORAGE_KEYS.rentals, []);
      rentals.unshift(rentalRecord);
      window.KALAM.writeStorage(STORAGE_KEYS.rentals, rentals);

      book.availableCopies = Math.max(0, Number(book.availableCopies || 0) - 1);
      window.KALAM.writeStorage(STORAGE_KEYS.rentalBooks, booksList);
      window.KALAM.seedNotif('Book rented successfully: ' + bookName + '. Due date: ' + rentalRecord.dueDate);
      window.alert('Book rented successfully!');
      window.location.href = 'my-books.html';
    });
  }

  if (document.getElementById('myBooksTable')) {
    renderMyBooksTable();
  }

  document.addEventListener('click', function (event) {
    const returnButton = event.target.closest('[data-return-book]');
    const extendButton = event.target.closest('[data-extend-book]');
    if (returnButton) {
      returnBook(returnButton.getAttribute('data-return-book'));
    }
    if (extendButton) {
      extendRental(extendButton.getAttribute('data-extend-book'));
    }
  });
});

function renderRentalBookList() {
  const list = document.getElementById('rentalBookList');
  if (!list) return;
  const books = window.KALAM.readStorage(STORAGE_KEYS.rentalBooks, []);
  list.innerHTML = books.map(function (book) {
    return '<article class="book-card"><img src="' + (book.image || 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=500&q=80') + '" alt="' + book.name + '"><div class="book-body"><div class="book-meta"><span>' + book.category + '</span><span>' + (book.rating || 4.5) + ' ★</span></div><h3>' + book.name + '</h3><p>' + book.author + '</p><div class="price-row"><span class="price">₹' + book.rentalPrice + '</span><span class="muted">' + (book.availableCopies || 0) + ' copies</span></div><div class="book-actions"><button type="button" class="btn-primary" data-rent-book="' + book.id + '">Rent Now</button></div></div></article>';
  }).join('');
}

function renderMyBooksTable() {
  const table = document.getElementById('myBooksTable');
  const currentUser = window.KALAM.getCurrentUser();
  const rentals = window.KALAM.readStorage(STORAGE_KEYS.rentals, []);
  const userRentals = currentUser ? rentals.filter(function (r) { return r.studentId === currentUser.id; }) : rentals;

  table.innerHTML = userRentals.map(function (rental) {
    let status = rental.status || 'ACTIVE';
    const dueDate = new Date(rental.dueDate.split('/').reverse().join('-'));
    const today = new Date();
    const difference = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));

    if (status === 'RETURNED') {
      status = 'RETURNED';
    } else if (difference <= 0) {
      status = 'OVERDUE';
    } else if (difference <= 3) {
      status = 'DUE SOON';
    }

    rental.status = status;
    const statusClass = status === 'OVERDUE' ? 'status-overdue' : status === 'DUE SOON' ? 'status-soon' : status === 'RETURNED' ? 'status-returned' : 'status-active';
    const daysLeft = Math.max(0, difference);
    const actionMarkup = status === 'RETURNED' ? '<span class="status-pill status-returned">Returned</span>' : '<button class="btn-secondary" data-return-book="' + rental.id + '">Return Book</button><button class="btn-ghost" data-extend-book="' + rental.id + '">Extend Rental</button>';

    return '<tr><td>' + rental.bookName + '</td><td>' + rental.id + '</td><td>' + rental.rentalDate + '</td><td>' + rental.dueDate + '</td><td>' + daysLeft + '</td><td><span class="status-pill ' + statusClass + '">' + status + '</span></td><td>' + actionMarkup + '</td></tr>';
  }).join('');
}

function returnBook(rentalId) {
  const rentals = window.KALAM.readStorage(STORAGE_KEYS.rentals, []);
  const rental = rentals.find(function (item) { return item.id === rentalId; });
  if (!rental) return;
  const dueDate = new Date(rental.dueDate.split('/').reverse().join('-'));
  const today = new Date();
  const lateDays = Math.max(0, Math.ceil((today - dueDate) / (1000 * 60 * 60 * 24)));
  const fine = lateDays * 5;

  rental.status = 'RETURNED';
  rental.returnDate = formatDate(today);
  rental.fine = fine;

  const books = window.KALAM.readStorage(STORAGE_KEYS.rentalBooks, []);
  const book = books.find(function (item) { return item.id === rental.bookId; });
  if (book) {
    book.availableCopies = Number(book.availableCopies || 0) + 1;
  }

  window.KALAM.writeStorage(STORAGE_KEYS.rentals, rentals);
  window.KALAM.writeStorage(STORAGE_KEYS.rentalBooks, books);
  window.KALAM.seedNotif('Book returned successfully. Fine: ₹' + fine + '.');
  window.location.reload();
}

function extendRental(rentalId) {
  const rentals = window.KALAM.readStorage(STORAGE_KEYS.rentals, []);
  const rental = rentals.find(function (item) { return item.id === rentalId; });
  if (!rental || rental.status === 'RETURNED') return;

  const dueDate = new Date(rental.dueDate.split('/').reverse().join('-'));
  dueDate.setDate(dueDate.getDate() + 7);
  rental.dueDate = formatDate(dueDate);
  rental.status = 'ACTIVE';
  rental.extended = true;
  window.KALAM.writeStorage(STORAGE_KEYS.rentals, rentals);
  window.KALAM.seedNotif('Rental extended successfully for ' + rental.bookName + '. New due date: ' + rental.dueDate);
  window.location.reload();
}

function daysBetween(startDate, endDate) {
  return Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
}

function formatDate(date) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return day + '/' + month + '/' + year;
}
