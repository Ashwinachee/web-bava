document.addEventListener('DOMContentLoaded', function () {
  window.KALAM.ensureDemoData();
  renderCart();

  document.getElementById('checkoutBtn').addEventListener('click', function () {
    window.location.href = 'payment.html';
  });

  document.addEventListener('click', function (event) {
    const remove = event.target.closest('[data-remove-item]');
    const increase = event.target.closest('[data-increase-item]');
    const decrease = event.target.closest('[data-decrease-item]');

    if (remove) {
      const id = remove.getAttribute('data-remove-item');
      const cart = window.KALAM.readStorage(STORAGE_KEYS.cart, []);
      const updated = cart.filter(function (item) { return item.id !== id; });
      window.KALAM.writeStorage(STORAGE_KEYS.cart, updated);
      renderCart();
    }

    if (increase) {
      const id = increase.getAttribute('data-increase-item');
      const cart = window.KALAM.readStorage(STORAGE_KEYS.cart, []);
      const item = cart.find(function (entry) { return entry.id === id; });
      if (item) item.quantity += 1;
      window.KALAM.writeStorage(STORAGE_KEYS.cart, cart);
      renderCart();
    }

    if (decrease) {
      const id = decrease.getAttribute('data-decrease-item');
      const cart = window.KALAM.readStorage(STORAGE_KEYS.cart, []);
      const item = cart.find(function (entry) { return entry.id === id; });
      if (!item) return;
      item.quantity -= 1;
      if (item.quantity <= 0) {
        const updated = cart.filter(function (entry) { return entry.id !== id; });
        window.KALAM.writeStorage(STORAGE_KEYS.cart, updated);
      } else {
        window.KALAM.writeStorage(STORAGE_KEYS.cart, cart);
      }
      renderCart();
    }
  });
});

function renderCart() {
  const container = document.getElementById('cartItems');
  const summary = document.getElementById('cartSummary');
  if (!container) return;
  const cart = window.KALAM.readStorage(STORAGE_KEYS.cart, []);

  if (!cart.length) {
    container.innerHTML = '<p>Your cart is empty. Browse the bookstore to add titles.</p>';
    if (summary) summary.innerHTML = '<div class="summary-row"><span>Subtotal</span><strong>₹0</strong></div><div class="summary-row"><span>Discount</span><strong>₹0</strong></div><div class="summary-row"><span>Tax</span><strong>₹0</strong></div><div class="summary-row total"><span>Total</span><strong>₹0</strong></div>';
    return;
  }

  container.innerHTML = cart.map(function (item) {
    const price = Number(item.price || item.salePrice || 0);
    const totalPrice = price * Number(item.quantity || 1);
    return '<div class="cart-item"><img src="' + (item.image || 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=500&q=80') + '" alt="' + (item.title || item.name) + '"><div style="flex:1;"><h4>' + (item.title || item.name) + '</h4><small>' + (item.author || 'Kalam Library') + '</small></div><div class="qty-controls"><button type="button" data-decrease-item="' + item.id + '">-</button><span>' + item.quantity + '</span><button type="button" data-increase-item="' + item.id + '">+</button></div><strong>₹' + totalPrice + '</strong><button type="button" class="btn-danger" data-remove-item="' + item.id + '">Remove</button></div>';
  }).join('');

  const subtotal = cart.reduce(function (sum, item) {
    return sum + Number(item.price || item.salePrice || 0) * Number(item.quantity || 1);
  }, 0);
  const discount = Math.round(subtotal * 0.1);
  const tax = Math.round(subtotal * 0.04);
  const total = subtotal - discount + tax;

  if (summary) {
    summary.innerHTML = '<div class="summary-row"><span>Subtotal</span><strong>₹' + subtotal + '</strong></div><div class="summary-row"><span>Discount</span><strong>-₹' + discount + '</strong></div><div class="summary-row"><span>Tax</span><strong>₹' + tax + '</strong></div><div class="summary-row total"><span>Total</span><strong>₹' + total + '</strong></div>';
  }
}
