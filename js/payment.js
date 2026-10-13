document.addEventListener('DOMContentLoaded', function () {
  window.KALAM.ensureDemoData();
  renderPaymentSummary();

  const paymentForm = document.getElementById('paymentForm');
  if (paymentForm) {
    paymentForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const statusBox = document.getElementById('paymentStatus');
      if (statusBox) {
        statusBox.style.display = 'block';
        statusBox.textContent = 'Processing Payment...';
      }

      setTimeout(function () {
        const cart = window.KALAM.readStorage(STORAGE_KEYS.cart, []);
        const subtotal = cart.reduce(function (sum, item) { return sum + Number(item.price || item.salePrice || 0) * Number(item.quantity || 1); }, 0);
        const discount = Math.round(subtotal * 0.1);
        const tax = Math.round(subtotal * 0.04);
        const total = subtotal - discount + tax;
        const orderId = 'ORD-' + Date.now().toString().slice(-6);
        const transactionId = 'TXN-' + Date.now().toString().slice(-8);
        const method = document.getElementById('paymentMethod').value;
        const currentUser = window.KALAM.getCurrentUser();
        const orders = window.KALAM.readStorage(STORAGE_KEYS.orders, []);
        orders.unshift({
          id: orderId,
          studentId: currentUser ? currentUser.id : '',
          date: new Date().toISOString().slice(0, 10),
          books: cart.map(function (item) { return item.title + ' (' + item.quantity + ')'; }).join(', '),
          quantity: cart.reduce(function (sum, item) { return sum + Number(item.quantity || 1); }, 0),
          amount: total,
          paymentStatus: 'Payment Successful',
          orderStatus: 'Order Confirmed',
          method: method,
          transactionId: transactionId
        });
        window.KALAM.writeStorage(STORAGE_KEYS.orders, orders);
        window.KALAM.writeStorage(STORAGE_KEYS.cart, []);
        window.KALAM.seedNotif('Payment successful! Order placed successfully.');

        if (statusBox) {
          statusBox.textContent = 'Payment Successful | Transaction ID: ' + transactionId + ' | Order ID: ' + orderId;
        }

        const receipt = document.getElementById('receiptBox');
        if (receipt) {
          receipt.innerHTML = '<h4>Demo Payment – No real money is involved.</h4><p>Order ID: ' + orderId + '</p><p>Transaction ID: ' + transactionId + '</p><p>Date: ' + new Date().toLocaleDateString() + '</p><p>Amount: ₹' + total + '</p><p>Payment Method: ' + method + '</p><button type="button" class="btn-primary" onclick="window.print()">Print Receipt</button>';
        }
      }, 2200);
    });
  }
});

function renderPaymentSummary() {
  const cart = window.KALAM.readStorage(STORAGE_KEYS.cart, []);
  const subtotal = cart.reduce(function (sum, item) { return sum + Number(item.price || item.salePrice || 0) * Number(item.quantity || 1); }, 0);
  const discount = Math.round(subtotal * 0.1);
  const tax = Math.round(subtotal * 0.04);
  const total = subtotal - discount + tax;
  const summary = document.getElementById('paymentSummary');
  if (summary) {
    summary.innerHTML = '<div class="summary-row"><span>Books</span><strong>' + (cart.map(function (item) { return item.title || item.name; }).join(', ') || 'No items') + '</strong></div><div class="summary-row"><span>Quantity</span><strong>' + cart.reduce(function (sum, item) { return sum + Number(item.quantity || 1); }, 0) + '</strong></div><div class="summary-row"><span>Subtotal</span><strong>₹' + subtotal + '</strong></div><div class="summary-row"><span>Discount</span><strong>-₹' + discount + '</strong></div><div class="summary-row"><span>Tax</span><strong>₹' + tax + '</strong></div><div class="summary-row total"><span>Total</span><strong>₹' + total + '</strong></div>';
  }
  const amount = document.getElementById('paymentAmount');
  if (amount) amount.value = total;
}
