document.addEventListener('DOMContentLoaded', function () {
  window.KALAM.ensureDemoData();
  renderHomeSectionBooks();
  renderCatalog();
  bindCatalogFilters();
});

function getCatalogBooks() {
  const books = window.KALAM.readStorage(STORAGE_KEYS.books, []);
  return books.map(function (book) {
    book.title = book.title || book.name;
    return book;
  });
}

function bindCatalogFilters() {
  const filterIds = ['categoryFilter', 'authorFilter', 'priceFilter', 'availabilityFilter', 'typeFilter', 'ratingFilter'];
  const filters = filterIds.map(function (id) { return document.getElementById(id); }).filter(Boolean);
  const books = getCatalogBooks();
  const authors = Array.from(new Set(books.map(function (book) { return book.author; }).filter(Boolean))).sort();
  const authorFilter = document.getElementById('authorFilter');
  if (authorFilter) {
    authorFilter.innerHTML = '<option value="">All</option>' + authors.map(function (author) {
      return '<option value="' + author + '">' + author + '</option>';
    }).join('');
  }

  filters.forEach(function (filter) {
    filter.addEventListener('change', renderCatalog);
  });
}

function getFilteredBooks() {
  const search = new URLSearchParams(window.location.search).get('search');
  let books = getCatalogBooks();
  const categoryFilter = document.getElementById('categoryFilter');
  const authorFilter = document.getElementById('authorFilter');
  const priceFilter = document.getElementById('priceFilter');
  const availabilityFilter = document.getElementById('availabilityFilter');
  const typeFilter = document.getElementById('typeFilter');
  const ratingFilter = document.getElementById('ratingFilter');

  if (search) {
    const s = search.toLowerCase();
    books = books.filter(function (book) {
      return (book.title || '').toLowerCase().includes(s) || (book.author || '').toLowerCase().includes(s);
    });
  }

  if (categoryFilter && categoryFilter.value) {
    books = books.filter(function (book) { return (book.category || '') === categoryFilter.value; });
  }

  if (authorFilter && authorFilter.value) {
    books = books.filter(function (book) { return (book.author || '') === authorFilter.value; });
  }

  if (priceFilter && priceFilter.value) {
    books = books.slice().sort(function (a, b) {
      const priceA = Number(a.price || a.rentalPrice || 0);
      const priceB = Number(b.price || b.rentalPrice || 0);
      return priceFilter.value === 'low' ? priceA - priceB : priceB - priceA;
    });
  }

  if (availabilityFilter && availabilityFilter.value) {
    books = books.filter(function (book) {
      const available = Number(book.availableCopies ?? book.stock ?? 0);
      return availabilityFilter.value === 'available' ? available > 0 : available <= 0;
    });
  }

  if (typeFilter && typeFilter.value) {
    books = books.filter(function (book) {
      if (typeFilter.value === 'rent') return book.availableCopies !== undefined;
      if (typeFilter.value === 'sale') return book.stock !== undefined || book.price !== undefined;
      return true;
    });
  }

  if (ratingFilter && ratingFilter.value) {
    books = books.filter(function (book) {
      return Number(book.rating || 0) >= Number(ratingFilter.value);
    });
  }

  return books;
}

function renderHomeSectionBooks() {
  const popular = document.getElementById('popularBooks');
  if (popular) {
    const books = getCatalogBooks().slice(0, 4);
    popular.innerHTML = books.map(renderBookMarkup).join('');
  }

  const recent = document.getElementById('recentBooks');
  if (recent) {
    const books = getCatalogBooks().slice(1, 5);
    recent.innerHTML = books.map(renderBookMarkup).join('');
  }

  const rentalSection = document.getElementById('rentBooks');
  if (rentalSection) {
    const books = window.KALAM.readStorage(STORAGE_KEYS.rentalBooks, []).slice(0, 4);
    rentalSection.innerHTML = books.map(renderRentalMarkup).join('');
  }

  const saleSection = document.getElementById('saleBooks');
  if (saleSection) {
    const books = window.KALAM.readStorage(STORAGE_KEYS.saleBooks, []).slice(0, 4);
    saleSection.innerHTML = books.map(renderSaleMarkup).join('');
  }
}

function renderCatalog() {
  const catalog = document.getElementById('bookCatalog');
  if (!catalog) return;
  const books = getFilteredBooks();
  catalog.innerHTML = books.map(renderBookMarkup).join('');
}

function renderBookMarkup(book) {
  const title = book.title || book.name;
  const price = Number(book.price || book.rentalPrice || 0);
  const stockLabel = book.availableCopies !== undefined ? 'Copies: ' + (book.availableCopies || 0) : 'In stock: ' + (book.stock || 0);
  const isRentalBook = book.availableCopies !== undefined && book.rentalPrice !== undefined;
  const rentButton = isRentalBook ? '<button type="button" class="btn-primary" data-rent-book="' + (book.id || '') + '">Rent</button>' : '';
  const buyButton = !isRentalBook ? '<button type="button" class="btn-secondary" data-buy-book="' + (book.id || '') + '">Buy</button>' : '';
  return '<article class="book-card">' +
    '<img src="' + (book.image || 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=500&q=80') + '" alt="' + title + '">' +
    '<div class="book-body">' +
    '<div class="book-meta"><span>' + (book.category || 'General') + '</span><span>' + (book.rating || 4.5) + ' ★</span></div>' +
    '<h3>' + title + '</h3>' +
    '<p>' + (book.author || 'Unknown Author') + '</p>' +
    '<div class="price-row"><span class="price">₹' + price + '</span><span class="muted">' + stockLabel + '</span></div>' +
    '<div class="book-actions">' + rentButton + buyButton + '</div>' +
    '</div>' +
    '</article>';
}

function renderRentalMarkup(book) {
  return '<article class="book-card">' +
    '<img src="' + (book.image || 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=500&q=80') + '" alt="' + book.name + '">' +
    '<div class="book-body"><div class="book-meta"><span>' + book.category + '</span><span>' + (book.rating || 4.5) + ' ★</span></div>' +
    '<h3>' + book.name + '</h3><p>' + book.author + '</p>' +
    '<div class="price-row"><span class="price">₹' + book.rentalPrice + '</span><span class="muted">' + (book.availableCopies || 0) + ' copies</span></div>' +
    '<div class="book-actions"><button type="button" class="btn-primary" data-rent-book="' + book.id + '">Rent Now</button></div></div></article>';
}

function renderSaleMarkup(book) {
  const finalPrice = Math.round(Number(book.price) * (1 - Number(book.discount || 0) / 100));
  return '<article class="book-card">' +
    '<img src="' + (book.image || 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=500&q=80') + '" alt="' + book.title + '">' +
    '<div class="book-body"><div class="book-meta"><span>' + book.category + '</span><span>' + (book.rating || 4.5) + ' ★</span></div>' +
    '<h3>' + book.title + '</h3><p>' + book.author + '</p>' +
    '<div class="price-row"><span class="price">₹' + finalPrice + '</span><span class="muted">' + (book.discount || 0) + '% off</span></div>' +
    '<div class="book-actions"><button type="button" class="btn-secondary" data-buy-book="' + book.id + '">Buy Now</button></div></div></article>';
}

document.addEventListener('click', function (event) {
  const rentButton = event.target.closest('[data-rent-book]');
  const buyButton = event.target.closest('[data-buy-book]');

  if (rentButton) {
    const id = rentButton.getAttribute('data-rent-book');
    window.location.href = 'rent.html?bookId=' + encodeURIComponent(id);
  }

  if (buyButton) {
    const id = buyButton.getAttribute('data-buy-book');
    const book = window.KALAM.readStorage(STORAGE_KEYS.saleBooks, []).find(function (item) { return item.id === id; });
    if (!book) return;
    const cart = window.KALAM.readStorage(STORAGE_KEYS.cart, []);
    const item = cart.find(function (entry) { return entry.id === book.id; });
    if (item) item.quantity += 1; else cart.push({ ...book, quantity: 1 });
    window.KALAM.writeStorage(STORAGE_KEYS.cart, cart);
    window.KALAM.seedNotif(book.title + ' added to cart.');
    window.location.href = 'cart.html';
  }
});
