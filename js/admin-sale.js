document.addEventListener('DOMContentLoaded', function () {
  window.KALAM.ensureDemoData();
  const admin = window.KALAM.getCurrentAdmin();
  if (!admin || admin.role !== 'sale') {
    window.location.href = 'admin-login.html';
    return;
  }
  renderSaleAdminDashboard();

  const form = document.getElementById('saleBookForm');
  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const book = {
        id: document.getElementById('saleBookId').value.trim(),
        title: document.getElementById('saleBookName').value.trim(),
        author: document.getElementById('saleBookAuthor').value.trim(),
        isbn: document.getElementById('saleBookIsbn').value.trim(),
        category: document.getElementById('saleBookCategory').value,
        description: document.getElementById('saleBookDescription').value.trim(),
        price: Number(document.getElementById('saleBookPrice').value || 0),
        discount: Number(document.getElementById('saleBookDiscount').value || 0),
        stock: Number(document.getElementById('saleBookStock').value || 0),
        image: document.getElementById('saleBookImage').value.trim() || 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=500&q=80',
        rating: 4.5
      };
      const books = window.KALAM.readStorage(STORAGE_KEYS.saleBooks, []);
      const index = books.findIndex(function (item) { return item.id === book.id; });
      if (index >= 0) books[index] = Object.assign({}, books[index], book);
      else books.push(book);
      window.KALAM.writeStorage(STORAGE_KEYS.saleBooks, books);
      form.reset();
      renderSaleAdminDashboard();
    });
  }

  document.addEventListener('click', function (event) {
    const deleteBtn = event.target.closest('[data-delete-sale-book]');
    const editBtn = event.target.closest('[data-edit-sale-book]');
    const updateBtn = event.target.closest('[data-update-order]');
    const logoutBtn = event.target.id === 'logoutAdminBtn';
    if (logoutBtn) {
      localStorage.removeItem(STORAGE_KEYS.currentAdmin);
      window.location.href = 'admin-login.html';
    }
    if (deleteBtn) {
      const id = deleteBtn.getAttribute('data-delete-sale-book');
      const books = window.KALAM.readStorage(STORAGE_KEYS.saleBooks, []).filter(function (item) { return item.id !== id; });
      window.KALAM.writeStorage(STORAGE_KEYS.saleBooks, books);
      renderSaleAdminDashboard();
    }
    if (editBtn) {
      const id = editBtn.getAttribute('data-edit-sale-book');
      const book = window.KALAM.readStorage(STORAGE_KEYS.saleBooks, []).find(function (item) { return item.id === id; });
      if (!book) return;
      document.getElementById('saleBookId').value = book.id;
      document.getElementById('saleBookName').value = book.title;
      document.getElementById('saleBookAuthor').value = book.author;
      document.getElementById('saleBookIsbn').value = book.isbn || '';
      document.getElementById('saleBookCategory').value = book.category;
      document.getElementById('saleBookDescription').value = book.description || '';
      document.getElementById('saleBookPrice').value = book.price;
      document.getElementById('saleBookDiscount').value = book.discount || 0;
      document.getElementById('saleBookStock').value = book.stock || 0;
      document.getElementById('saleBookImage').value = book.image || '';
    }
    if (updateBtn) {
      const id = updateBtn.getAttribute('data-update-order');
      const orders = window.KALAM.readStorage(STORAGE_KEYS.orders, []);
      const order = orders.find(function (item) { return item.id === id; });
      if (!order) return;
      const statuses = ['Order Confirmed', 'Processing', 'Shipped', 'Delivered'];
      const currentIndex = statuses.indexOf(order.orderStatus);
      order.orderStatus = statuses[(currentIndex + 1) % statuses.length];
      window.KALAM.writeStorage(STORAGE_KEYS.orders, orders);
      renderSaleAdminDashboard();
    }
  });
});

function renderSaleAdminDashboard() {
  const books = window.KALAM.readStorage(STORAGE_KEYS.saleBooks, []);
  const orders = window.KALAM.readStorage(STORAGE_KEYS.orders, []);
  const statBox = document.getElementById('saleStats');
  if (statBox) {
    statBox.innerHTML = '<div class="dashboard-stat"><span>Total Sale Books</span><strong>' + books.length + '</strong></div><div class="dashboard-stat"><span>Books in Stock</span><strong>' + books.reduce(function (sum, item) { return sum + Number(item.stock || 0); }, 0) + '</strong></div><div class="dashboard-stat"><span>Books Sold</span><strong>' + orders.reduce(function (sum, item) { return sum + Number(item.quantity || 0); }, 0) + '</strong></div><div class="dashboard-stat"><span>Total Sales</span><strong>' + orders.length + '</strong></div><div class="dashboard-stat"><span>Revenue</span><strong>₹' + orders.reduce(function (sum, item) { return sum + Number(item.amount || 0); }, 0) + '</strong></div><div class="dashboard-stat"><span>Pending Orders</span><strong>' + orders.filter(function (order) { return order.orderStatus !== 'Delivered'; }).length + '</strong></div>';
  }

  const bookTable = document.getElementById('saleBooksTable');
  if (bookTable) {
    bookTable.innerHTML = books.map(function (book) {
      const finalPrice = Math.round(Number(book.price) * (1 - Number(book.discount || 0) / 100));
      return '<tr><td>' + book.id + '</td><td>' + book.title + '</td><td>' + book.author + '</td><td>' + book.category + '</td><td>₹' + finalPrice + '</td><td>' + (book.discount || 0) + '%</td><td>' + (book.stock || 0) + '</td><td>' + Math.max(0, Number(book.stock || 0) - 5) + '</td><td>' + (book.stock > 0 ? 'Available' : 'Out of stock') + '</td><td><button class="btn-ghost" data-edit-sale-book="' + book.id + '">Edit</button> <button class="btn-danger" data-delete-sale-book="' + book.id + '">Delete</button></td></tr>';
    }).join('');
  }

  const orderTable = document.getElementById('saleOrdersTable');
  if (orderTable) {
    orderTable.innerHTML = orders.map(function (order) {
      return '<tr><td>' + order.id + '</td><td>' + order.books + '</td><td>₹' + order.amount + '</td><td>' + order.paymentStatus + '</td><td>' + order.orderStatus + '</td><td>' + order.date + '</td><td><button class="btn-primary" data-update-order="' + order.id + '">Update Status</button></td></tr>';
    }).join('');
  }
}
