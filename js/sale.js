document.addEventListener('DOMContentLoaded', function () {
  window.KALAM.ensureDemoData();
  renderSaleCatalog();
});

function renderSaleCatalog() {
  const container = document.getElementById('saleCatalog');
  if (!container) return;
  const books = window.KALAM.readStorage(STORAGE_KEYS.saleBooks, []);
  container.innerHTML = books.map(function (book) {
    const finalPrice = Math.round(Number(book.price) * (1 - Number(book.discount || 0) / 100));
    return '<article class="book-card"><img src="' + (book.image || 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=500&q=80') + '" alt="' + book.title + '"><div class="book-body"><div class="book-meta"><span>' + book.category + '</span><span>' + (book.rating || 4.5) + ' ★</span></div><h3>' + book.title + '</h3><p>' + book.author + '</p><div class="price-row"><span class="price">₹' + finalPrice + '</span><span class="muted"><strike>₹' + book.price + '</strike> (' + (book.discount || 0) + '% off)</span></div><div class="book-actions"><button type="button" class="btn-secondary" data-buy-book="' + book.id + '">Add to Cart</button></div></div></article>';
  }).join('');
}
