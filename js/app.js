document.addEventListener('DOMContentLoaded', function () {
  window.KALAM.ensureDemoData();
  renderHomeStats();
  renderNotifications();
  bindNavState();

  const searchInput = document.getElementById('globalSearch');
  if (searchInput) {
    searchInput.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        const q = searchInput.value.trim();
        if (q) window.location.href = 'books.html?search=' + encodeURIComponent(q);
      }
    });
  }

});

function bindNavState() {
  const currentUser = window.KALAM.getCurrentUser();
  const loginLinks = document.querySelectorAll('.nav-link');
  for (const link of loginLinks) {
    if (link.textContent.trim() === 'Login') {
      if (currentUser) {
        link.textContent = currentUser.name.split(' ')[0];
        link.href = 'my-books.html';
      } else {
        link.textContent = 'Login';
        link.href = 'login.html';
      }
    }
  }
}

function renderHomeStats() {
  const stats = document.getElementById('homeStats');
  if (!stats) return;
  const totalBooks = window.KALAM.readStorage(STORAGE_KEYS.books, []).length;
  const available = window.KALAM.readStorage(STORAGE_KEYS.rentalBooks, []).reduce(function (sum, item) { return sum + Number(item.availableCopies || 0); }, 0);
  const rented = window.KALAM.readStorage(STORAGE_KEYS.rentals, []).length;
  const sold = window.KALAM.readStorage(STORAGE_KEYS.orders, []).reduce(function (sum, item) { return sum + Number(item.quantity || 0); }, 0);
  stats.innerHTML = `<div class="stat-card"><span>Total Books</span><strong>${totalBooks}</strong></div>` +
    `<div class="stat-card"><span>Available Books</span><strong>${available}</strong></div>` +
    `<div class="stat-card"><span>Books Rented</span><strong>${rented}</strong></div>` +
    `<div class="stat-card"><span>Books Sold</span><strong>${sold}</strong></div>`;
}

function renderNotifications() {
  const panel = document.getElementById('notificationPanel');
  if (!panel) return;
  const notifications = window.KALAM.readStorage(STORAGE_KEYS.notifications, []);
  panel.innerHTML = notifications.slice(0, 5).map(function (item) {
    const time = item && item.time ? new Date(item.time).toLocaleString() : 'Just now';
    return '<div class="notification-item"><strong>' + (item.message || 'Kalam Arivalayam update') + '</strong><br><small>' + time + '</small></div>';
  }).join('');
}
