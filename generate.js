const fs = require('fs');
const path = require('path');

const root = __dirname;
const cssDir = path.join(root, 'css');
const jsDir = path.join(root, 'js');
const assetsDir = path.join(root, 'assets');
const bookAssetsDir = path.join(assetsDir, 'books');

fs.mkdirSync(cssDir, { recursive: true });
fs.mkdirSync(jsDir, { recursive: true });
fs.mkdirSync(assetsDir, { recursive: true });
fs.mkdirSync(bookAssetsDir, { recursive: true });

function navMarkup(active = 'home') {
  const navItems = [
    ['Home', 'index.html'],
    ['Books', 'books.html'],
    ['Rent a Book', 'rent.html'],
    ['Buy Books', 'sale.html'],
    ['My Books', 'my-books.html'],
    ['About', 'about.html'],
    ['Contact', 'contact.html'],
    ['Login', 'login.html']
  ];

  const items = navItems.map(([label, href]) => {
    const isActive = href === 'index.html' && active === 'home'
      ? 'class="nav-link active"'
      : href === 'books.html' && active === 'books'
        ? 'class="nav-link active"'
        : href === 'rent.html' && active === 'rent'
          ? 'class="nav-link active"'
          : href === 'sale.html' && active === 'sale'
            ? 'class="nav-link active"'
            : href === 'my-books.html' && active === 'my-books'
              ? 'class="nav-link active"'
              : href === 'about.html' && active === 'about'
                ? 'class="nav-link active"'
                : href === 'contact.html' && active === 'contact'
                  ? 'class="nav-link active"'
                  : 'class="nav-link"';
    return `<a ${isActive} href="${href}">${label}</a>`;
  }).join('');

  return `
    <header class="topbar">
      <div class="container nav-wrap">
        <a href="index.html" class="brand">
          <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=200&q=80" alt="Kalam Arivalayam" class="brand-logo">
          <div>
            <span class="brand-name">KALAM ARIVALAYAM</span>
            <small>Read. Learn. Grow.</small>
          </div>
        </a>
        <nav class="main-nav">
          ${items}
        </nav>
        <div class="nav-actions">
          <div class="search-box">
            <input type="text" id="globalSearch" placeholder="Search books..." aria-label="Search books">
            <button type="button" class="search-btn">Search</button>
          </div>
          <button class="mobile-menu-btn" aria-label="Toggle navigation">☰</button>
        </div>
      </div>
    </header>
  `;
}

function footerMarkup() {
  return `
    <footer class="site-footer">
      <div class="container footer-grid">
        <div>
          <h3>KALAM ARIVALAYAM</h3>
          <p>Read. Learn. Grow.</p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul>
            <li><a href="books.html">Books</a></li>
            <li><a href="rent.html">Rent</a></li>
            <li><a href="sale.html">Buy</a></li>
            <li><a href="my-books.html">My Books</a></li>
            <li><a href="my-orders.html">My Orders</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li>Email: library@kalam.edu</li>
            <li>Phone: +91 98765 43210</li>
            <li>Coimbatore, Tamil Nadu</li>
          </ul>
        </div>
      </div>
      <div class="copyright">© 2026 Kalam Arivalayam. All Rights Reserved.</div>
    </footer>
  `;
}

const files = {
  'css/style.css': `
    :root {
      --navy: #0f2347;
      --blue: #1f4e79;
      --sky: #dfeeff;
      --light: #f7f9fc;
      --white: #ffffff;
      --text: #1c2434;
      --muted: #5d6a7d;
      --gold: #c59d47;
      --green: #1d8f5f;
      --orange: #e39b33;
      --red: #d94a4a;
      --gray: #6c7a89;
      --border: #e5ebf2;
      --shadow: 0 10px 25px rgba(15, 35, 71, 0.08);
      --radius: 18px;
    }

    * { box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body {
      margin: 0;
      font-family: Arial, Helvetica, sans-serif;
      background: #f5f8fc;
      color: var(--text);
      line-height: 1.6;
    }
    a { text-decoration: none; color: inherit; }
    img { max-width: 100%; display: block; }
    button, input, select, textarea { font: inherit; }
    .container { width: min(1180px, calc(100% - 32px)); margin: auto; }
    .section { padding: 72px 0; }
    .section-header { margin-bottom: 28px; }
    .section-header h2 {
      margin: 0 0 8px; font-size: clamp(1.8rem, 2vw, 2.6rem); color: var(--navy);
    }
    .section-header p { margin: 0; color: var(--muted); }

    .topbar {
      position: sticky; top: 0; z-index: 50; background: rgba(255,255,255,0.96); backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(15,35,71,0.08);
    }
    .nav-wrap { display: flex; align-items: center; justify-content: space-between; gap: 20px; padding: 14px 0; }
    .brand { display: flex; align-items: center; gap: 12px; color: var(--navy); }
    .brand-logo { width: 52px; height: 52px; object-fit: cover; border-radius: 12px; }
    .brand-name { display: block; font-size: 1.2rem; font-weight: 800; letter-spacing: 0.04em; }
    .brand small { color: var(--muted); }
    .main-nav { display: flex; gap: 18px; align-items: center; flex-wrap: wrap; }
    .nav-link {
      color: var(--navy); font-weight: 600; padding: 8px 10px; border-radius: 10px; transition: all 0.2s ease;
    }
    .nav-link:hover, .nav-link.active { background: var(--sky); color: var(--navy); }
    .nav-actions { display: flex; align-items: center; gap: 14px; }
    .search-box { display: flex; align-items: center; background: #f2f6fc; border: 1px solid var(--border); border-radius: 14px; overflow: hidden; }
    .search-box input {
      border: none; background: transparent; padding: 10px 12px; min-width: 180px; outline: none;
    }
    .search-btn, .btn-primary, .btn-secondary, .btn-danger, .btn-ghost {
      border: none; border-radius: 10px; padding: 11px 18px; cursor: pointer; font-weight: 700; transition: all 0.2s ease;
    }
    .search-btn, .btn-primary { background: var(--navy); color: var(--white); }
    .btn-primary:hover { background: #102e59; }
    .btn-secondary { background: var(--sky); color: var(--navy); }
    .btn-ghost { background: #eef4ff; color: var(--navy); }
    .btn-danger { background: #ffe3e3; color: #aa3e3e; }
    .mobile-menu-btn { display: none; border: 1px solid var(--border); background: var(--white); border-radius: 10px; padding: 8px 12px; }

    .hero {
      background: linear-gradient(135deg, #edf4ff 0%, #f7fafc 100%); padding: 54px 0 38px;
    }
    .hero-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; align-items: center; gap: 32px; }
    .hero-badge {
      display: inline-flex; padding: 8px 12px; border-radius: 999px; background: rgba(24,78,121,0.09); color: var(--navy);
      font-size: 0.8rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
    }
    .hero h1 {
      font-size: clamp(2.3rem, 4vw, 4rem); line-height: 1.1; margin: 18px 0 12px; color: var(--navy);
    }
    .hero p { font-size: 1.06rem; color: var(--muted); max-width: 620px; }
    .hero-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 22px; }
    .hero-visual { position: relative; }
    .hero-photo {
      width: 100%; max-width: 560px; margin-left: auto; border-radius: 30px; box-shadow: var(--shadow); background: linear-gradient(180deg, #dfeeff, #ffffff);
      overflow: hidden; border: 8px solid rgba(255,255,255,0.7);
    }
    .hero-photo img { width: 100%; height: 100%; object-fit: cover; }

    .stats-grid, .feature-grid, .card-grid, .admin-grid { display: grid; gap: 22px; }
    .stats-grid { grid-template-columns: repeat(4, minmax(150px, 1fr)); margin-top: 40px; }
    .stat-card {
      background: var(--white); border: 1px solid var(--border); border-radius: var(--radius); padding: 26px 18px; box-shadow: var(--shadow);
    }
    .stat-card span { display: block; color: var(--muted); font-size: 0.85rem; }
    .stat-card strong { display: block; font-size: 2rem; color: var(--navy); margin-top: 6px; }

    .card-grid { grid-template-columns: repeat(4, minmax(230px, 1fr)); }
    .book-card, .feature-card, .info-card, .admin-card {
      background: var(--white); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; box-shadow: var(--shadow);
    }
    .book-card img { width: 100%; height: 240px; object-fit: cover; }
    .book-body { padding: 16px; }
    .book-meta { display: flex; justify-content: space-between; gap: 10px; color: var(--muted); font-size: 0.8rem; margin-bottom: 8px; }
    .book-body h3 { margin: 6px 0; font-size: 1.18rem; color: var(--navy); }
    .book-body p { margin: 8px 0; color: var(--muted); font-size: 0.9rem; }
    .rating-line { display: flex; justify-content: space-between; align-items: center; color: var(--gold); font-weight: 700; }
    .price-row { display: flex; align-items: center; justify-content: space-between; margin: 12px 0; }
    .price { font-weight: 800; font-size: 1.1rem; color: var(--navy); }
    .muted { color: var(--muted); }
    .book-actions { display: flex; gap: 8px; margin-top: 12px; }
    .book-actions button { flex: 1; }

    .feature-grid { grid-template-columns: repeat(3, 1fr); }
    .feature-card { padding: 24px; }
    .feature-card .icon { width: 52px; height: 52px; display: grid; place-items: center; border-radius: 14px; background: var(--sky); color: var(--navy); font-size: 1.5rem; margin-bottom: 12px; }

    .page-banner {
      background: linear-gradient(135deg, #102847, #1b3d6a); color: #fff; padding: 56px 0 34px;
    }
    .page-banner h1 { font-size: clamp(2rem, 3vw, 3rem); margin: 0 0 8px; }
    .page-banner p { margin: 0; color: #dfe8ff; }

    .panel {
      background: var(--white); border: 1px solid var(--border); border-radius: var(--radius); box-shadow: var(--shadow); padding: 24px;
    }
    .form-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; }
    .form-group { display: flex; flex-direction: column; gap: 7px; }
    .form-group label { font-weight: 700; color: var(--navy); }
    .form-group input, .form-group select, .form-group textarea {
      width: 100%; padding: 12px 14px; border-radius: 10px; border: 1px solid var(--border); background: #f9fbff;
      color: var(--text); transition: border-color 0.2s ease;
    }
    .form-group input:focus, .form-group select:focus, .form-group textarea:focus { border-color: var(--blue); outline: none; }
    .full { grid-column: 1 / -1; }
    .form-actions { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 16px; }
    .error-text { color: var(--red); font-size: 0.8rem; min-height: 18px; }
    .success-box {
      background: #ecfff4; border: 1px solid #cfead9; color: #0b6d46; padding: 12px 16px; border-radius: 10px; margin-bottom: 12px; display: none;
    }

    .catalog-toolbar { display: flex; flex-wrap: wrap; gap: 14px; align-items: end; justify-content: space-between; margin-bottom: 22px; }
    .filters { display: grid; grid-template-columns: repeat(6, minmax(140px, 1fr)); gap: 12px; flex: 1; }
    .filter-box { display: flex; flex-direction: column; }
    .filter-box label { font-size: 0.82rem; color: var(--muted); margin-bottom: 6px; }
    .filter-box select { padding: 10px 12px; border: 1px solid var(--border); border-radius: 10px; background: #fff; }
    .catalog-grid { display: grid; grid-template-columns: repeat(3, minmax(220px, 1fr)); gap: 22px; }

    .status-pill {
      display: inline-flex; align-items: center; gap: 8px; padding: 7px 10px; border-radius: 999px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em;
    }
    .status-active { background: rgba(38,164,84,0.1); color: var(--green); }
    .status-soon { background: rgba(227,155,51,0.12); color: var(--orange); }
    .status-overdue { background: rgba(217,74,74,0.11); color: var(--red); }
    .status-returned { background: rgba(104,118,135,0.12); color: var(--gray); }

    .table-wrap { overflow-x: auto; }
    table {
      width: 100%; border-collapse: collapse; min-width: 700px; background: var(--white); border-radius: 12px; overflow: hidden;
      border: 1px solid var(--border);
    }
    thead { background: #f0f5fb; }
    th, td {
      padding: 14px 12px; border-bottom: 1px solid var(--border); text-align: left;
    }
    td button { margin: 4px 6px 4px 0; }

    .dashboard-stats { display: grid; grid-template-columns: repeat(6, minmax(140px, 1fr)); gap: 16px; margin-bottom: 26px; }
    .dashboard-stat { background: var(--white); border: 1px solid var(--border); padding: 18px; border-radius: 15px; box-shadow: var(--shadow); }
    .dashboard-stat strong { font-size: 1.6rem; display: block; color: var(--navy); }

    .admin-layout { display: grid; grid-template-columns: 300px 1fr; gap: 24px; }
    .admin-sidebar { background: var(--navy); color: #fff; border-radius: 22px; padding: 24px; }
    .admin-sidebar h3 { margin-top: 0; }
    .admin-sidebar a { display: block; margin: 10px 0; padding: 10px 14px; border-radius: 10px; color: #dfe8ff; }
    .admin-sidebar a.active, .admin-sidebar a:hover { background: rgba(255,255,255,0.08); }
    .cart-wrap { display: grid; grid-template-columns: 1.5fr 0.8fr; gap: 24px; }
    .cart-item { display: flex; align-items: center; gap: 14px; padding: 14px; border: 1px solid var(--border); border-radius: 14px; margin-bottom: 12px; }
    .cart-item img { width: 70px; height: 90px; object-fit: cover; border-radius: 12px; }
    .qty-controls { display: inline-flex; align-items: center; border: 1px solid var(--border); border-radius: 10px; overflow: hidden; }
    .qty-controls button { width: 30px; height: 30px; border: none; background: #eef5ff; cursor: pointer; }
    .qty-controls span { width: 36px; text-align: center; font-weight: 700; }
    .summary-box { background: #f8fbff; border: 1px solid var(--border); border-radius: 18px; padding: 20px; }
    .summary-row { display: flex; justify-content: space-between; margin: 10px 0; }
    .total { border-top: 1px solid var(--border); padding-top: 16px; margin-top: 16px; font-size: 1.1rem; font-weight: 800; }

    .site-footer { background: var(--navy); color: #ebf4ff; padding-top: 40px; margin-top: 60px; }
    .footer-grid { display: grid; grid-template-columns: 1.2fr 1fr 1fr; gap: 24px; }
    .site-footer h3, .site-footer h4 { color: #fff; margin-top: 0; }
    .site-footer ul { list-style: none; padding: 0; margin: 0; }
    .site-footer li { margin-bottom: 10px; color: #dbeaff; }
    .copyright { border-top: 1px solid rgba(255,255,255,0.12); padding: 18px 0 28px; text-align: center; color: #dbeaff; }

    .toast { position: fixed; right: 20px; bottom: 20px; background: var(--navy); color: #fff; padding: 12px 18px; border-radius: 12px; box-shadow: var(--shadow); opacity: 0; transform: translateY(20px); pointer-events: none; transition: all 0.2s ease; }
    .toast.show { opacity: 1; transform: translateY(0); }

    @media (max-width: 980px) {
      .hero-grid, .cart-wrap, .admin-layout, .footer-grid { grid-template-columns: 1fr; }
      .card-grid { grid-template-columns: repeat(2, minmax(200px, 1fr)); }
      .catalog-grid { grid-template-columns: repeat(2, minmax(220px,1fr)); }
      .stats-grid { grid-template-columns: repeat(2, minmax(140px,1fr)); }
      .dashboard-stats { grid-template-columns: repeat(3, minmax(140px,1fr)); }
      .main-nav { display: none; }
      .mobile-menu-btn { display: block; }
      .nav-wrap { gap: 10px; }
      .search-box { display: none; }
    }
    @media (max-width: 640px) {
      .card-grid, .catalog-grid, .stats-grid, .dashboard-stats, .feature-grid, .form-grid, .filters { grid-template-columns: 1fr; }
      .hero-actions, .form-actions { flex-direction: column; }
      .nav-wrap { flex-wrap: wrap; }
      .site-footer { text-align: center; }
      .book-card img { height: 210px; }
      .table-wrap { overflow-x: auto; }
    }
  `,
  'css/admin.css': `
    .admin-shell { padding: 40px 0; }
    .admin-topbar {
      display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; background: #ffffff; border: 1px solid var(--border);
      border-radius: 18px; padding: 18px 22px; box-shadow: var(--shadow); margin-bottom: 22px;
    }
    .admin-topbar h2 { margin: 0; color: var(--navy); }
    .admin-actions { display: flex; gap: 10px; flex-wrap: wrap; }
    .admin-card { padding: 20px; }
    .admin-detail { display: flex; justify-content: space-between; align-items: center; gap: 18px; }
    .badge { padding: 8px 12px; background: var(--sky); color: var(--navy); border-radius: 999px; font-weight: 700; }
    .mini-table { min-width: 100%; }
  `,
  'css/responsive.css': `
    @media (max-width: 768px) {
      .topbar .container { padding: 10px 0; }
      .brand-name { font-size: 1rem; }
      .search-box { display: none; }
    }
  `,
  'js/storage.js': `
    const STORAGE_KEYS = {
      users: 'kalam_users',
      admins: 'kalam_admins',
      books: 'kalam_books',
      rentalBooks: 'kalam_rentalBooks',
      saleBooks: 'kalam_saleBooks',
      rentals: 'kalam_rentals',
      orders: 'kalam_orders',
      cart: 'kalam_cart',
      payments: 'kalam_payments',
      notifications: 'kalam_notifications',
      currentUser: 'kalam_current_user',
      currentAdmin: 'kalam_current_admin'
    };

    function readStorage(key, fallback = []) {
      try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : fallback;
      } catch (error) {
        return fallback;
      }
    }

    function writeStorage(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
      return value;
    }

    function getCurrentUser() {
      return readStorage(STORAGE_KEYS.currentUser, null);
    }

    function setCurrentUser(user) {
      if (!user) {
        localStorage.removeItem(STORAGE_KEYS.currentUser);
        return null;
      }
      writeStorage(STORAGE_KEYS.currentUser, user);
      return user;
    }

    function getCurrentAdmin() {
      return readStorage(STORAGE_KEYS.currentAdmin, null);
    }

    function setCurrentAdmin(admin) {
      if (!admin) {
        localStorage.removeItem(STORAGE_KEYS.currentAdmin);
        return null;
      }
      writeStorage(STORAGE_KEYS.currentAdmin, admin);
      return admin;
    }

    function seedNotif(message) {
      const notifications = readStorage(STORAGE_KEYS.notifications, []);
      notifications.unshift({
        id: Date.now() + Math.random(),
        message,
        time: new Date().toISOString()
      });
      writeStorage(STORAGE_KEYS.notifications, notifications.slice(0, 10));
    }

    function ensureDemoData() {
      if (!readStorage(STORAGE_KEYS.users, []).length) {
        writeStorage(STORAGE_KEYS.users, [
          {
            id: 'STU-2024-001',
            name: 'Asha Nair',
            email: 'asha@kalam.edu',
            phone: '9876543210',
            password: 'student123',
            department: 'Computer Science',
            year: 'III Year'
          }
        ]);
      }

      if (!readStorage(STORAGE_KEYS.admins, []).length) {
        writeStorage(STORAGE_KEYS.admins, [
          { username: 'rentaladmin', password: 'rental123', role: 'rental' },
          { username: 'saleadmin', password: 'sale123', role: 'sale' }
        ]);
      }

      if (!readStorage(STORAGE_KEYS.rentalBooks, []).length) {
        writeStorage(STORAGE_KEYS.rentalBooks, [
          { id: 'RB-101', name: 'Java Programming', author: 'Herbert Schildt', category: 'Programming', description: 'Core Java concepts for beginners and intermediate students.', rentalPrice: 120, securityDeposit: 200, totalCopies: 5, availableCopies: 3, image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=500&q=80', rating: 4.7, edition: '8th Edition' },
          { id: 'RB-102', name: 'Data Structures and Algorithms', author: 'Mark Allen Weiss', category: 'Computer Science', description: 'A reliable study guide for problem solving and programming practice.', rentalPrice: 140, securityDeposit: 220, totalCopies: 4, availableCopies: 2, image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=500&q=80', rating: 4.8, edition: '2nd Edition' },
          { id: 'RB-103', name: 'Web Technology', author: 'Achyut Godbole', category: 'Web Technology', description: 'Practical frontend and backend web application development concepts.', rentalPrice: 150, securityDeposit: 240, totalCopies: 6, availableCopies: 4, image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=500&q=80', rating: 4.6, edition: '3rd Edition' },
          { id: 'RB-104', name: 'Machine Learning Basics', author: 'Ethem Alpaydin', category: 'Artificial Intelligence', description: 'Understand practical machine learning methods and models.', rentalPrice: 180, securityDeposit: 260, totalCopies: 5, availableCopies: 5, image: 'https://images.unsplash.com/photo-1532012197267-da84d127bbf1?auto=format&fit=crop&w=500&q=80', rating: 4.9, edition: '1st Edition' }
        ]);
      }

      if (!readStorage(STORAGE_KEYS.saleBooks, []).length) {
        writeStorage(STORAGE_KEYS.saleBooks, [
          { id: 'SB-201', title: 'Python for Everybody', author: 'Charles Severance', category: 'Programming', description: 'Learning Python with clear examples and exercises.', price: 680, discount: 10, stock: 12, image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=500&q=80', rating: 4.8 },
          { id: 'SB-202', title: 'Artificial Intelligence', author: 'Stuart Russell', category: 'Artificial Intelligence', description: 'A foundation text covering AI principles and techniques.', price: 950, discount: 12, stock: 8, image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=500&q=80', rating: 4.7 },
          { id: 'SB-203', title: 'SQL and Database Design', author: 'M. L. Gillenson', category: 'Database', description: 'Designing practical database systems and normalized models.', price: 720, discount: 8, stock: 15, image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=500&q=80', rating: 4.5 },
          { id: 'SB-204', title: 'Computer Networks', author: 'Andrew S. Tanenbaum', category: 'Networking', description: 'A complete overview of network architecture and protocols.', price: 810, discount: 15, stock: 10, image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=500&q=80', rating: 4.6 }
        ]);
      }

      if (!readStorage(STORAGE_KEYS.books, []).length) {
        const allBooks = [
          ...readStorage(STORAGE_KEYS.rentalBooks, []),
          ...readStorage(STORAGE_KEYS.saleBooks, []).map(item => ({ ...item, title: item.title || item.name, rentalPrice: 0, availableCopies: 0, salePrice: item.price, type: 'sale' }))
        ];
        writeStorage(STORAGE_KEYS.books, allBooks);
      }

      if (!readStorage(STORAGE_KEYS.rentals, []).length) {
        writeStorage(STORAGE_KEYS.rentals, [
          {
            id: 'REN-1001',
            studentName: 'Asha Nair',
            studentId: 'STU-2024-001',
            bookId: 'RB-101',
            bookName: 'Java Programming',
            rentalDate: '2026-10-01',
            dueDate: '2026-10-15',
            returnDate: '',
            status: 'ACTIVE',
            fine: 0,
            rentalFee: 120,
            securityDeposit: 200,
            daysRemaining: 4,
            extended: false
          }
        ]);
      }

      if (!readStorage(STORAGE_KEYS.orders, []).length) {
        writeStorage(STORAGE_KEYS.orders, [
          {
            id: 'ORD-1001',
            date: '2026-10-02',
            books: 'Python for Everybody',
            quantity: 1,
            amount: 612,
            paymentStatus: 'Payment Successful',
            orderStatus: 'Delivered'
          }
        ]);
      }

      if (!readStorage(STORAGE_KEYS.cart, []).length) {
        writeStorage(STORAGE_KEYS.cart, []);
      }

      if (!readStorage(STORAGE_KEYS.payments, []).length) {
        writeStorage(STORAGE_KEYS.payments, []);
      }

      if (!readStorage(STORAGE_KEYS.notifications, []).length) {
        writeStorage(STORAGE_KEYS.notifications, [
          { id: 1, message: 'Welcome to Kalam Arivalayam!', time: new Date().toISOString() }
        ]);
      }
    }

    window.KALAM = {
      STORAGE_KEYS,
      readStorage,
      writeStorage,
      getCurrentUser,
      setCurrentUser,
      getCurrentAdmin,
      setCurrentAdmin,
      seedNotif,
      ensureDemoData
    };
  `,
  'js/app.js': `
    document.addEventListener('DOMContentLoaded', () => {
      window.KALAM.ensureDemoData();

      const searchInput = document.getElementById('globalSearch');
      if (searchInput) {
        searchInput.addEventListener('keydown', (event) => {
          if (event.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) window.location.href = 'books.html?search=' + encodeURIComponent(query);
          }
        });
      }

      const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
      if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
          const nav = document.querySelector('.main-nav');
          nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
          nav.style.flexDirection = 'column';
          nav.style.position = 'absolute';
          nav.style.top = '90px';
          nav.style.left = '20px';
          nav.style.right = '20px';
          nav.style.background = '#fff';
          nav.style.border = '1px solid #e5ebf2';
          nav.style.padding = '12px';
          nav.style.borderRadius = '12px';
        });
      }

      renderNotificationPanel();
      renderHomeStats();
      bindNavUserState();
      showToastNotice();
    });

    function renderNotificationPanel() {
      const panel = document.getElementById('notificationPanel');
      if (!panel) return;
      const notifications = window.KALAM.readStorage(window.KALAM.STORAGE_KEYS.notifications, []);
      panel.innerHTML = notifications.slice(0, 5).map(item => `
        <div class="notification-item">
          <strong>${item.message}</strong>
          <small>${new Date(item.time).toLocaleString()}</small>
        </div>
      `).join('');
    }

    function bindNavUserState() {
      const currentUser = window.KALAM.getCurrentUser();
      const loginLink = Array.from(document.querySelectorAll('.nav-link')).find(link => link.textContent.trim() === 'Login');
      if (loginLink) {
        if (currentUser) {
          loginLink.textContent = currentUser.name.split(' ')[0];
          loginLink.href = 'my-books.html';
        } else {
          loginLink.textContent = 'Login';
          loginLink.href = 'login.html';
        }
      }
    }

    function renderHomeStats() {
      const stats = document.getElementById('homeStats');
      if (!stats) return;
      const totalBooks = window.KALAM.readStorage(window.KALAM.STORAGE_KEYS.books, []).length;
      const inventory = window.KALAM.readStorage(window.KALAM.STORAGE_KEYS.rentalBooks, []).reduce((sum, book) => sum + Number(book.availableCopies || 0), 0);
      const rented = window.KALAM.readStorage(window.KALAM.STORAGE_KEYS.rentals, []).length;
      const sold = window.KALAM.readStorage(window.KALAM.STORAGE_KEYS.orders, []).reduce((sum, order) => sum + Number(order.quantity || 0), 0);
      stats.innerHTML = `
        <div class="stat-card"><span>Total Books</span><strong>${totalBooks}</strong></div>
        <div class="stat-card"><span>Available Books</span><strong>${inventory}</strong></div>
        <div class="stat-card"><span>Books Rented</span><strong>${rented}</strong></div>
        <div class="stat-card"><span>Books Sold</span><strong>${sold}</strong></div>
      `;
    }

    function showToastNotice() {
      const toast = document.getElementById('toast');
      if (!toast) return;
      const notifications = window.KALAM.readStorage(window.KALAM.STORAGE_KEYS.notifications, []);
      if (notifications.length) {
        toast.textContent = notifications[0].message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2800);
      }
    }
  `,
  'js/auth.js': `
    document.addEventListener('DOMContentLoaded', () => {
      window.KALAM.ensureDemoData();
      const currentUser = window.KALAM.getCurrentUser();
      const currentAdmin = window.KALAM.getCurrentAdmin();

      const loginForm = document.getElementById('loginForm');
      if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
          event.preventDefault();
          const id = document.getElementById('loginId').value.trim();
          const password = document.getElementById('loginPassword').value.trim();
          const users = window.KALAM.readStorage(window.KALAM.STORAGE_KEYS.users, []);
          const match = users.find(user => (user.email === id || user.id === id) && user.password === password);
          if (!match) {
            showAuthError('Invalid student credentials. Please try again.');
            return;
          }
          window.KALAM.setCurrentUser(match);
          window.location.href = 'my-books.html';
        });
      }

      const registerForm = document.getElementById('registerForm');
      if (registerForm) {
        registerForm.addEventListener('submit', function (event) {
          event.preventDefault();
          const formData = {
            name: document.getElementById('studentName').value.trim(),
            id: document.getElementById('studentId').value.trim(),
            email: document.getElementById('studentEmail').value.trim(),
            phone: document.getElementById('studentPhone').value.trim(),
            password: document.getElementById('studentPassword').value.trim(),
            department: document.getElementById('studentDepartment').value,
            year: document.getElementById('studentYear').value
          };

          if (!formData.name || !formData.id || !formData.email || !formData.phone || !formData.password || !formData.department || !formData.year) {
            showAuthError('All fields are required.');
            return;
          }
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            showAuthError('Please enter a valid email address.');
            return;
          }
          if (!/^\d{10}$/.test(formData.phone)) {
            showAuthError('Phone number must be 10 digits.');
            return;
          }
          if (formData.password.length < 6) {
            showAuthError('Password must be at least 6 characters.');
            return;
          }

          const users = window.KALAM.readStorage(window.KALAM.STORAGE_KEYS.users, []);
          if (users.some(u => u.email === formData.email || u.id === formData.id)) {
            showAuthError('A student with this ID or email already exists.');
            return;
          }

          users.push(formData);
          window.KALAM.writeStorage(window.KALAM.STORAGE_KEYS.users, users);
          document.getElementById('registerSuccess').style.display = 'block';
          registerForm.reset();
        });
      }

      const adminLoginForm = document.getElementById('adminLoginForm');
      if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', function (event) {
          event.preventDefault();
          const username = document.getElementById('adminUsername').value.trim();
          const password = document.getElementById('adminPassword').value.trim();
          const admins = window.KALAM.readStorage(window.KALAM.STORAGE_KEYS.admins, []);
          const match = admins.find(admin => admin.username === username && admin.password === password);
          if (!match) {
            showAuthError('Invalid admin credentials. Please try again.');
            return;
          }
          window.KALAM.setCurrentAdmin(match);
          if (match.role === 'rental') window.location.href = 'rental-admin.html';
          else window.location.href = 'sale-admin.html';
        });
      }

      [
        { buttonId: 'toggleAdminPassword', inputId: 'adminPassword' },
        { buttonId: 'toggleStudentPassword', inputId: 'loginPassword' }
      ].forEach(toggle => {
        const toggleButton = document.getElementById(toggle.buttonId);
        if (!toggleButton) return;
        toggleButton.addEventListener('click', function () {
          const passwordInput = document.getElementById(toggle.inputId);
          const isPasswordHidden = passwordInput.type === 'password';
          passwordInput.type = isPasswordHidden ? 'text' : 'password';
          toggleButton.textContent = isPasswordHidden ? 'Hide' : 'Show';
          toggleButton.setAttribute('aria-pressed', String(isPasswordHidden));
        });
      });

      const logoutBtn = document.getElementById('logoutBtn');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
          window.KALAM.setCurrentUser(null);
          window.location.href = 'login.html';
        });
      }

      if (currentUser && window.location.pathname.endsWith('login.html')) {
        window.location.href = 'my-books.html';
      }

      if (currentAdmin && (window.location.pathname.endsWith('admin-login.html') || window.location.pathname.endsWith('rental-admin.html') || window.location.pathname.endsWith('sale-admin.html'))) {
        if (window.location.pathname.endsWith('admin-login.html')) {
          const role = currentAdmin.role === 'rental' ? 'rental-admin.html' : 'sale-admin.html';
          window.location.href = role;
        }
      }
    });

    function showAuthError(message) {
      const alertBox = document.getElementById('authError');
      if (alertBox) {
        alertBox.textContent = message;
        alertBox.hidden = false;
        alertBox.style.display = 'block';
      } else {
        window.alert(message);
      }
    }
  `,
  'js/books.js': `
    document.addEventListener('DOMContentLoaded', () => {
      window.KALAM.ensureDemoData();
      renderHomeBooks();
      renderBookCatalog();
      bindBookActions();
    });

    function getAllBooks() {
      const books = window.KALAM.readStorage(window.KALAM.STORAGE_KEYS.books, []);
      return books.map(book => ({
        ...book,
        title: book.title || book.name,
        price: Number(book.price || book.rentalPrice || 0),
        rentalPrice: Number(book.rentalPrice || 0),
        salePrice: Number(book.salePrice || book.price || 0)
      }));
    }

    function renderHomeBooks() {
      const popular = document.getElementById('popularBooks');
      const recent = document.getElementById('recentBooks');
      const rentBooks = document.getElementById('rentBooks');
      const saleBooks = document.getElementById('saleBooks');
      const allBooks = getAllBooks();
      if (popular) popular.innerHTML = renderBookCards(allBooks.slice(0, 4), 'rent');
      if (recent) recent.innerHTML = renderBookCards(allBooks.slice(1, 5), 'sale');
      if (rentBooks) rentBooks.innerHTML = renderBookCards(window.KALAM.readStorage(window.KALAM.STORAGE_KEYS.rentalBooks, []).slice(0, 4), 'rent');
      if (saleBooks) saleBooks.innerHTML = renderBookCards(window.KALAM.readStorage(window.KALAM.STORAGE_KEYS.saleBooks, []).slice(0, 4), 'sale');
    }

    function renderBookCatalog() {
      const grid = document.getElementById('bookCatalog');
      if (!grid) return;
      const books = getAllBooks();
      const search = new URLSearchParams(window.location.search).get('search');
      const filtered = books.filter(book => {
        const q = (search || '').toLowerCase();
        if (q && !book.title.toLowerCase().includes(q) && !book.author.toLowerCase().includes(q)) return false;
        return true;
      });
      grid.innerHTML = renderBookCards(filtered, 'both');
    }

    function renderBookCards(items, mode) {
      if (!items || !items.length) {
        return '<div class="panel"><p>No books available at the moment.</p></div>';
      }
      return items.map(book => {
        const title = book.title || book.name;
        const priceText = mode === 'rent' ? `₹${Number(book.rentalPrice || 0)}/week` : `₹${Number(book.price || book.salePrice || 0)}`;
        const actionButtons = mode === 'rent'
          ? `<button type="button" class="btn-primary" data-rent-book="${book.id}">Rent Now</button>`
          : mode === 'sale'
            ? `<button type="button" class="btn-secondary" data-buy-book="${book.id}">Buy Now</button>`
            : `<button type="button" class="btn-primary" data-rent-book="${book.id}">Rent</button><button type="button" class="btn-secondary" data-buy-book="${book.id}">Buy</button>`;
        return `
          <article class="book-card">
            <img src="${book.image || 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=500&q=80'}" alt="${title}">
            <div class="book-body">
              <div class="book-meta"><span>${book.category || 'General'}</span><span>${book.rating || 4.5} ★</span></div>
              <h3>${title}</h3>
              <p>${book.author}</p>
              <div class="price-row">
                <span class="price">${priceText}</span>
                <span class="muted">${book.availableCopies != null ? `Copies: ${book.availableCopies}` : `${book.stock || 0} in stock`}</span>
              </div>
              <div class="book-actions">${actionButtons}</div>
            </div>
          </article>
        `;
      }).join('');
    }

    function bindBookActions() {
      document.addEventListener('click', (event) => {
        const rentButton = event.target.closest('[data-rent-book]');
        const buyButton = event.target.closest('[data-buy-book]');
        if (rentButton) {
          const bookId = rentButton.getAttribute('data-rent-book');
          window.location.href = `rent.html?bookId=${encodeURIComponent(bookId)}`;
        }
        if (buyButton) {
          const bookId = buyButton.getAttribute('data-buy-book');
          const saleBooks = window.KALAM.readStorage(window.KALAM.STORAGE_KEYS.saleBooks, []);
          const book = saleBooks.find(item => item.id === bookId) || window.KALAM.readStorage(window.KALAM.STORAGE_KEYS.books, []).find(item => (item.id === bookId || item.title === bookId));
          if (!book) return;
          addToCart(book);
          window.location.href = 'cart.html';
        }
      });
    }

    function addToCart(item) {
      const cart = window.KALAM.readStorage(window.KALAM.STORAGE_KEYS.cart, []);
      const match = cart.find(entry => entry.id === item.id);
      if (match) {
        match.quantity += 1;
      } else {
        cart.push({ ...item, quantity: 1, type: item.type || 'sale' });
      }
      window.KALAM.writeStorage(window.KALAM.STORAGE_KEYS.cart, cart);
      window.KALAM.seedNotif(`${item.title || item.name} added to cart.`);
    }
  `,
  'js/rental.js': `
    document.addEventListener('DOMContentLoaded', () => {
      const rentalForm = document.getElementById('rentalForm');
      const bookCatalog = document.getElementById('rentalBookList');
      const myBooksTable = document.getElementById('myBooksTable');
      window.KALAM.ensureDemoData();

      if (bookCatalog) {
        renderRentCatalog();
      }

      if (rentalForm) {
        const currentUser = window.KALAM.getCurrentUser();
        const params = new URLSearchParams(window.location.search);
        const selectedBookId = params.get('bookId');
        const bookList = window.KALAM.readStorage(window.KALAM.STORAGE_KEYS.rentalBooks, []);
        const selectedBook = bookList.find(book => book.id === selectedBookId) || bookList[0];

        if (currentUser) {
          document.getElementById('studentName').value = currentUser.name;
          document.getElementById('studentId').value = currentUser.id;
        }

        if (selectedBook) {
          document.getElementById('bookName').value = selectedBook.name;
          document.getElementById('bookId').value = selectedBook.id;
          document.getElementById('rentalFee').value = selectedBook.rentalPrice;
          document.getElementById('securityDeposit').value = selectedBook.securityDeposit || 0;
        }

        rentalForm.addEventListener('submit', function (event) {
          event.preventDefault();
          const studentName = document.getElementById('studentName').value.trim();
          const studentId = document.getElementById('studentId').value.trim();
          const bookId = document.getElementById('bookId').value.trim();
          const bookName = document.getElementById('bookName').value.trim();
          const duration = Number(document.getElementById('rentalDuration').value);

          if (!studentName || !studentId || !bookId || !bookName || !duration) {
            window.alert('Please fill all rental form fields.');
            return;
          }

          const books = window.KALAM.readStorage(window.KALAM.STORAGE_KEYS.rentalBooks, []);
          const book = books.find(item => item.id === bookId);
          if (!book) {
            window.alert('Selected book not found.');
            return;
          }
          if ((book.availableCopies || 0) <= 0) {
            window.alert('No copies available for this book right now.');
            return;
          }

          const rentalDate = new Date();
          const dueDate = new Date(rentalDate.getTime());
          dueDate.setDate(rentalDate.getDate() + duration);

          const rentalRecord = {
            id: `REN-${Date.now().toString().slice(-5)}`,
            studentName,
            studentId,
            bookId,
            bookName,
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

          const rentals = window.KALAM.readStorage(window.KALAM.STORAGE_KEYS.rentals, []);
          rentals.unshift(rentalRecord);
          window.KALAM.writeStorage(window.KALAM.STORAGE_KEYS.rentals, rentals);

          book.availableCopies = Math.max(0, Number(book.availableCopies || 0) - 1);
          window.KALAM.writeStorage(window.KALAM.STORAGE_KEYS.rentalBooks, books);

          window.KALAM.seedNotif(`Book rented successfully: ${bookName}. Due date: ${rentalRecord.dueDate}`);
          rentalForm.reset();
          window.alert('Book rented successfully!');
          window.location.href = 'my-books.html';
        });
      }

      if (myBooksTable) {
        renderMyBooksTable();
      }
    });

    function renderRentCatalog() {
      const list = document.getElementById('rentalBookList');
      if (!list) return;
      const books = window.KALAM.readStorage(window.KALAM.STORAGE_KEYS.rentalBooks, []);
      list.innerHTML = books.map(book => `
        <article class="book-card">
          <img src="${book.image}" alt="${book.name}">
          <div class="book-body">
            <div class="book-meta"><span>${book.category}</span><span>${book.rating} ★</span></div>
            <h3>${book.name}</h3>
            <p>${book.author}</p>
            <div class="price-row"><span class="price">₹${book.rentalPrice}/month</span><span class="muted">${book.availableCopies} copies</span></div>
            <div class="book-actions"><button type="button" class="btn-primary" data-rent-book="${book.id}">Rent Now</button></div>
          </div>
        </article>
      `).join('');
    }

    function renderMyBooksTable() {
      const myBooksTable = document.getElementById('myBooksTable');
      if (!myBooksTable) return;
      const currentUser = window.KALAM.getCurrentUser();
      const rentals = window.KALAM.readStorage(window.KALAM.STORAGE_KEYS.rentals, []);
      const userRentals = currentUser ? rentals.filter(r => r.studentId === currentUser.id) : rentals;
      myBooksTable.innerHTML = userRentals.map(rental => {
        const statusClass = rental.status === 'OVERDUE' ? 'status-overdue' : rental.status === 'DUE SOON' ? 'status-soon' : rental.status === 'RETURNED' ? 'status-returned' : 'status-active';
        const daysLeft = daysBetween(new Date(), new Date(rental.dueDate));
        const returnAction = rental.status === 'RETURNED'
          ? '<span class="status-pill status-returned">Returned</span>'
          : `<button type="button" class="btn-secondary" data-return-book="${rental.id}">Return Book</button><button type="button" class="btn-ghost" data-extend-book="${rental.id}">Extend Rental</button>`;
        return `
          <tr>
            <td>${rental.bookName}</td>
            <td>${rental.id}</td>
            <td>${rental.rentalDate}</td>
            <td>${rental.dueDate}</td>
            <td>${daysLeft >= 0 ? daysLeft : 0}</td>
            <td><span class="status-pill ${statusClass}">${rental.status}</span></td>
            <td>${returnAction}</td>
          </tr>
        `;
      }).join('');

      document.addEventListener('click', (event) => {
        const returnButton = event.target.closest('[data-return-book]');
        const extendButton = event.target.closest('[data-extend-book]');
        if (returnButton) {
          returnBook(returnButton.getAttribute('data-return-book'));
        }
        if (extendButton) {
          extendRental(extendButton.getAttribute('data-extend-book'));
        }
      });
    }

    function returnBook(rentalId) {
      const rentals = window.KALAM.readStorage(window.KALAM.STORAGE_KEYS.rentals, []);
      const rental = rentals.find(item => item.id === rentalId);
      if (!rental) return;
      const rentalDate = new Date(rental.dueDate);
      const today = new Date();
      const lateDays = Math.max(0, Math.ceil((today - rentalDate) / (1000 * 60 * 60 * 24)));
      const fine = lateDays * 5;
      rental.status = 'RETURNED';
      rental.returnDate = formatDate(today);
      rental.fine = fine;
      const books = window.KALAM.readStorage(window.KALAM.STORAGE_KEYS.rentalBooks, []);
      const book = books.find(item => item.id === rental.bookId);
      if (book) book.availableCopies = Number(book.availableCopies || 0) + 1;
      window.KALAM.writeStorage(window.KALAM.STORAGE_KEYS.rentals, rentals);
      window.KALAM.writeStorage(window.KALAM.STORAGE_KEYS.rentalBooks, books);
      window.KALAM.seedNotif(`Book returned successfully. Fine: ₹${fine}.`);
      window.location.reload();
    }

    function extendRental(rentalId) {
      const rentals = window.KALAM.readStorage(window.KALAM.STORAGE_KEYS.rentals, []);
      const rental = rentals.find(item => item.id === rentalId);
      if (!rental || rental.status === 'RETURNED') return;
      const currentDue = new Date(rental.dueDate);
      currentDue.setDate(currentDue.getDate() + 7);
      rental.dueDate = formatDate(currentDue);
      rental.daysRemaining = daysBetween(new Date(), currentDue);
      rental.status = 'ACTIVE';
      rental.extended = true;
      window.KALAM.writeStorage(window.KALAM.STORAGE_KEYS.rentals, rentals);
      window.KALAM.seedNotif(`Rental extended successfully for ${rental.bookName}. New due date: ${rental.dueDate}`);
      window.location.reload();
    }

    function daysBetween(start, end) {
      const msPerDay = 1000 * 60 * 60 * 24;
      return Math.ceil((end - start) / msPerDay);
    }

    function formatDate(date) {
      const value = new Date(date);
      const month = String(value.getMonth() + 1).padStart(2, '0');
      const day = String(value.getDate()).padStart(2, '0');
      const year = value.getFullYear();
      return `${day}/${month}/${year}`;
    }
  `,
  'js/sale.js': `
    document.addEventListener('DOMContentLoaded', () => {
      window.KALAM.ensureDemoData();
      renderSaleBooks();
    });

    function renderSaleBooks() {
      const saleGrid = document.getElementById('saleCatalog');
      if (!saleGrid) return;
      const books = window.KALAM.readStorage(window.KALAM.STORAGE_KEYS.saleBooks, []);
      saleGrid.innerHTML = books.map(book => {
        const discount = Number(book.discount || 0);
        const finalPrice = Math.round(Number(book.price) * (1 - discount / 100));
        return `
          <article class="book-card">
            <img src="${book.image}" alt="${book.title}">
            <div class="book-body">
              <div class="book-meta"><span>${book.category}</span><span>${book.rating} ★</span></div>
              <h3>${book.title}</h3>
              <p>${book.author}</p>
              <div class="price-row">
                <span class="price">₹${finalPrice}</span>
                <span class="muted"><strike>₹${book.price}</strike> (${discount}% off)</span>
              </div>
              <div class="book-actions"><button type="button" class="btn-secondary" data-buy-book="${book.id}">Add to Cart</button></div>
            </div>
          </article>
        `;
      }).join('');
    }
  `,
  'js/cart.js': `
    document.addEventListener('DOMContentLoaded', () => {
      window.KALAM.ensureDemoData();
      renderCart();
      const checkoutButton = document.getElementById('checkoutBtn');
      if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
          window.location.href = 'payment.html';
        });
      }
    });

    function renderCart() {
      const cartContainer = document.getElementById('cartItems');
      if (!cartContainer) return;
      const cart = window.KALAM.readStorage(window.KALAM.STORAGE_KEYS.cart, []);
      if (!cart.length) {
        cartContainer.innerHTML = '<p>Your cart is empty. Browse the bookstore to add titles.</p>';
        return;
      }
      cartContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.title || item.name}">
          <div style="flex:1">
            <h4>${item.title || item.name}</h4>
            <small>${item.author}</small>
          </div>
          <div class="qty-controls">
            <button type="button" data-decrease-item="${item.id}">-</button>
            <span>${item.quantity}</span>
            <button type="button" data-increase-item="${item.id}">+</button>
          </div>
          <strong>₹${(Number(item.price || item.salePrice || 0) * Number(item.quantity)).toFixed(0)}</strong>
          <button type="button" class="btn-danger" data-remove-item="${item.id}">Remove</button>
        </div>
      `).join('');
      updateCartSummary();
    }

    function updateCartSummary() {
      const cart = window.KALAM.readStorage(window.KALAM.STORAGE_KEYS.cart, []);
      const subtotal = cart.reduce((sum, item) => sum + Number(item.price || item.salePrice || 0) * Number(item.quantity || 1), 0);
      const discount = Math.round(subtotal * 0.1);
      const tax = Math.round(subtotal * 0.04);
      const total = subtotal - discount + tax;
      const summary = document.getElementById('cartSummary');
      if (!summary) return;
      summary.innerHTML = `
        <div class="summary-row"><span>Subtotal</span><strong>₹${subtotal}</strong></div>
        <div class="summary-row"><span>Discount</span><strong>-₹${discount}</strong></div>
        <div class="summary-row"><span>Tax</span><strong>₹${tax}</strong></div>
        <div class="summary-row total"><span>Total</span><strong>₹${total}</strong></div>
      `;
    }

    document.addEventListener('click', (event) => {
      const remove = event.target.closest('[data-remove-item]');
      const increase = event.target.closest('[data-increase-item]');
      const decrease = event.target.closest('[data-decrease-item]');
      if (remove) {
        const id = remove.getAttribute('data-remove-item');
        const cart = window.KALAM.readStorage(window.KALAM.STORAGE_KEYS.cart, []);
        const updatedCart = cart.filter(item => item.id !== id);
        window.KALAM.writeStorage(window.KALAM.STORAGE_KEYS.cart, updatedCart);
        renderCart();
      }
      if (increase) {
        const id = increase.getAttribute('data-increase-item');
        const cart = window.KALAM.readStorage(window.KALAM.STORAGE_KEYS.cart, []);
        const item = cart.find(entry => entry.id === id);
        if (item) item.quantity += 1;
        window.KALAM.writeStorage(window.KALAM.STORAGE_KEYS.cart, cart);
        renderCart();
      }
      if (decrease) {
        const id = decrease.getAttribute('data-decrease-item');
        const cart = window.KALAM.readStorage(window.KALAM.STORAGE_KEYS.cart, []);
        const item = cart.find(entry => entry.id === id);
        if (!item) return;
        item.quantity -= 1;
        if (item.quantity <= 0) {
          const updatedCart = cart.filter(entry => entry.id !== id);
          window.KALAM.writeStorage(window.KALAM.STORAGE_KEYS.cart, updatedCart);
        } else {
          window.KALAM.writeStorage(window.KALAM.STORAGE_KEYS.cart, cart);
        }
        renderCart();
      }
    });
  `,
  'js/payment.js': `
    document.addEventListener('DOMContentLoaded', () => {
      window.KALAM.ensureDemoData();
      renderPaymentSummary();
      bindPaymentForm();
    });

    function renderPaymentSummary() {
      const cart = window.KALAM.readStorage(window.KALAM.STORAGE_KEYS.cart, []);
      const subtotal = cart.reduce((sum, item) => sum + Number(item.price || item.salePrice || 0) * Number(item.quantity || 1), 0);
      const discount = Math.round(subtotal * 0.1);
      const tax = Math.round(subtotal * 0.04);
      const total = subtotal - discount + tax;
      const summary = document.getElementById('paymentSummary');
      if (!summary) return;
      summary.innerHTML = `
        <div class="summary-row"><span>Books</span><strong>${cart.map(item => item.title || item.name).join(', ') || 'No items'}</strong></div>
        <div class="summary-row"><span>Quantity</span><strong>${cart.reduce((sum, item) => sum + Number(item.quantity || 1), 0)}</strong></div>
        <div class="summary-row"><span>Subtotal</span><strong>₹${subtotal}</strong></div>
        <div class="summary-row"><span>Discount</span><strong>-₹${discount}</strong></div>
        <div class="summary-row"><span>Tax</span><strong>₹${tax}</strong></div>
        <div class="summary-row total"><span>Total</span><strong>₹${total}</strong></div>
      `;
      const amountInput = document.getElementById('paymentAmount');
      if (amountInput) amountInput.value = total;
    }

    function bindPaymentForm() {
      const paymentForm = document.getElementById('paymentForm');
      if (!paymentForm) return;
      paymentForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const paymentMethod = document.getElementById('paymentMethod').value;
        const paymentDetails = {
          method: paymentMethod,
          upi: document.getElementById('upiId').value,
          cardNumber: document.getElementById('cardNumber').value,
          cardHolder: document.getElementById('cardHolder').value,
          expiry: document.getElementById('cardExpiry').value,
          cvv: document.getElementById('cvv').value,
          bank: document.getElementById('bankName').value,
          accountNumber: document.getElementById('accountNumber').value
        };

        const invoice = document.getElementById('paymentStatus');
        if (invoice) {
          invoice.style.display = 'block';
          invoice.textContent = 'Processing Payment...';
        }
        setTimeout(() => {
          const cart = window.KALAM.readStorage(window.KALAM.STORAGE_KEYS.cart, []);
          const total = cart.reduce((sum, item) => sum + Number(item.price || item.salePrice || 0) * Number(item.quantity || 1), 0);
          const orders = window.KALAM.readStorage(window.KALAM.STORAGE_KEYS.orders, []);
          const orderId = `ORD-${Date.now().toString().slice(-6)}`;
          const transactionId = `TXN-${Date.now().toString().slice(-8)}`;
          orders.unshift({
            id: orderId,
            date: new Date().toISOString().slice(0, 10),
            books: cart.map(item => `${item.title || item.name} (${item.quantity})`).join(', '),
            quantity: cart.reduce((sum, item) => sum + Number(item.quantity || 1), 0),
            amount: total,
            paymentStatus: 'Payment Successful',
            orderStatus: 'Order Confirmed',
            method: paymentMethod,
            transactionId
          });
          window.KALAM.writeStorage(window.KALAM.STORAGE_KEYS.orders, orders);
          window.KALAM.writeStorage(window.KALAM.STORAGE_KEYS.cart, []);
          window.KALAM.seedNotif('Payment successful! Order placed successfully.');
          if (invoice) {
            invoice.textContent = `Payment Successful | Transaction ID: ${transactionId} | Order ID: ${orderId}`;
          }
          const receipt = document.getElementById('receiptBox');
          if (receipt) {
            receipt.innerHTML = `
              <h4>Demo Payment – No real money is involved.</h4>
              <p>Order ID: ${orderId}</p>
              <p>Transaction ID: ${transactionId}</p>
              <p>Date: ${new Date().toLocaleDateString()}</p>
              <p>Amount: ₹${total}</p>
              <p>Payment Method: ${paymentMethod}</p>
              <button type="button" class="btn-primary" onclick="window.print()">Print Receipt</button>
            `;
          }
        }, 2200);
      });
    }
  `,
  'js/admin-rental.js': `
    document.addEventListener('DOMContentLoaded', () => {
      window.KALAM.ensureDemoData();
      const admin = window.KALAM.getCurrentAdmin();
      if (!admin || admin.role !== 'rental') {
        window.location.href = 'admin-login.html';
        return;
      }
      renderRentalAdminDashboard();
      bindRentalAdminForm();
    });

    function renderRentalAdminDashboard() {
      const books = window.KALAM.readStorage(window.KALAM.STORAGE_KEYS.rentalBooks, []);
      const rentals = window.KALAM.readStorage(window.KALAM.STORAGE_KEYS.rentals, []);
      const overdue = rentals.filter(r => r.status === 'OVERDUE');
      const stats = document.getElementById('rentalStats');
      if (stats) {
        stats.innerHTML = `
          <div class="dashboard-stat"><span>Total Rental Books</span><strong>${books.length}</strong></div>
          <div class="dashboard-stat"><span>Available Books</span><strong>${books.reduce((sum, book) => sum + Number(book.availableCopies || 0), 0)}</strong></div>
          <div class="dashboard-stat"><span>Currently Rented</span><strong>${rentals.filter(r => r.status !== 'RETURNED').length}</strong></div>
          <div class="dashboard-stat"><span>Overdue Books</span><strong>${overdue.length}</strong></div>
          <div class="dashboard-stat"><span>Returned Books</span><strong>${rentals.filter(r => r.status === 'RETURNED').length}</strong></div>
          <div class="dashboard-stat"><span>Total Rental Revenue</span><strong>₹${rentals.reduce((sum, r) => sum + Number(r.rentalFee || 0), 0)}</strong></div>
        `;
      }

      const table = document.getElementById('rentalBooksTable');
      if (table) {
        table.innerHTML = books.map(book => `
          <tr>
            <td>${book.id}</td>
            <td>${book.name}</td>
            <td>${book.author}</td>
            <td>${book.category}</td>
            <td>₹${book.rentalPrice}</td>
            <td>${book.totalCopies}</td>
            <td>${book.availableCopies}</td>
            <td>${book.availableCopies > 0 ? 'Available' : 'Unavailable'}</td>
            <td><button class="btn-ghost" data-edit-rental-book="${book.id}">Edit</button> <button class="btn-danger" data-delete-rental-book="${book.id}">Delete</button></td>
          </tr>
        `).join('');
      }

      const recordTable = document.getElementById('rentalRecordsTable');
      if (recordTable) {
        recordTable.innerHTML = rentals.map(r => `
          <tr>
            <td>${r.id}</td>
            <td>${r.studentName}</td>
            <td>${r.studentId}</td>
            <td>${r.bookName}</td>
            <td>${r.rentalDate}</td>
            <td>${r.dueDate}</td>
            <td>${r.returnDate || '—'}</td>
            <td>₹${r.fine || 0}</td>
            <td>${r.status}</td>
          </tr>
        `).join('');
      }
    }

    function bindRentalAdminForm() {
      const form = document.getElementById('rentalBookForm');
      if (!form) return;
      form.addEventListener('submit', (event) => {
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
          rating: 4.5,
          edition: 'Latest'
        };
        const books = window.KALAM.readStorage(window.KALAM.STORAGE_KEYS.rentalBooks, []);
        const index = books.findIndex(item => item.id === book.id);
        if (index >= 0) {
          books[index] = { ...books[index], ...book };
        } else {
          books.push(book);
        }
        window.KALAM.writeStorage(window.KALAM.STORAGE_KEYS.rentalBooks, books);
        form.reset();
        renderRentalAdminDashboard();
      });
    }

    document.addEventListener('click', (event) => {
      const deleteButton = event.target.closest('[data-delete-rental-book]');
      const editButton = event.target.closest('[data-edit-rental-book]');
      if (deleteButton) {
        const id = deleteButton.getAttribute('data-delete-rental-book');
        const books = window.KALAM.readStorage(window.KALAM.STORAGE_KEYS.rentalBooks, []).filter(item => item.id !== id);
        window.KALAM.writeStorage(window.KALAM.STORAGE_KEYS.rentalBooks, books);
        renderRentalAdminDashboard();
      }
      if (editButton) {
        const id = editButton.getAttribute('data-edit-rental-book');
        const books = window.KALAM.readStorage(window.KALAM.STORAGE_KEYS.rentalBooks, []);
        const book = books.find(item => item.id === id);
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
  `,
  'js/admin-sale.js': `
    document.addEventListener('DOMContentLoaded', () => {
      window.KALAM.ensureDemoData();
      const admin = window.KALAM.getCurrentAdmin();
      if (!admin || admin.role !== 'sale') {
        window.location.href = 'admin-login.html';
        return;
      }
      renderSaleAdminDashboard();
      bindSaleAdminForm();
    });

    function renderSaleAdminDashboard() {
      const books = window.KALAM.readStorage(window.KALAM.STORAGE_KEYS.saleBooks, []);
      const orders = window.KALAM.readStorage(window.KALAM.STORAGE_KEYS.orders, []);
      const stats = document.getElementById('saleStats');
      if (stats) {
        stats.innerHTML = `
          <div class="dashboard-stat"><span>Total Sale Books</span><strong>${books.length}</strong></div>
          <div class="dashboard-stat"><span>Books in Stock</span><strong>${books.reduce((sum, book) => sum + Number(book.stock || 0), 0)}</strong></div>
          <div class="dashboard-stat"><span>Books Sold</span><strong>${orders.reduce((sum, order) => sum + Number(order.quantity || 0), 0)}</strong></div>
          <div class="dashboard-stat"><span>Total Sales</span><strong>${orders.length}</strong></div>
          <div class="dashboard-stat"><span>Revenue</span><strong>₹${orders.reduce((sum, order) => sum + Number(order.amount || 0), 0)}</strong></div>
          <div class="dashboard-stat"><span>Pending Orders</span><strong>${orders.filter(order => order.orderStatus !== 'Delivered').length}</strong></div>
        `;
      }

      const bookTable = document.getElementById('saleBooksTable');
      if (bookTable) {
        bookTable.innerHTML = books.map(book => {
          const finalPrice = Math.round(Number(book.price) * (1 - Number(book.discount || 0) / 100));
          return `
            <tr>
              <td>${book.id}</td>
              <td>${book.title}</td>
              <td>${book.author}</td>
              <td>${book.category}</td>
              <td>₹${finalPrice}</td>
              <td>${book.discount}%</td>
              <td>${book.stock}</td>
              <td>${Math.max(0, Number(book.stock) - 5)}</td>
              <td>${book.stock > 0 ? 'Available' : 'Out of stock'}</td>
              <td><button class="btn-ghost" data-edit-sale-book="${book.id}">Edit</button> <button class="btn-danger" data-delete-sale-book="${book.id}">Delete</button></td>
            </tr>
          `;
        }).join('');
      }

      const orderTable = document.getElementById('saleOrdersTable');
      if (orderTable) {
        orderTable.innerHTML = orders.map(order => `
          <tr>
            <td>${order.id}</td>
            <td>${order.books}</td>
            <td>₹${order.amount}</td>
            <td>${order.paymentStatus}</td>
            <td>${order.orderStatus}</td>
            <td>${order.date}</td>
            <td><button class="btn-primary" data-update-order="${order.id}">Update Status</button></td>
          </tr>
        `).join('');
      }
    }

    function bindSaleAdminForm() {
      const form = document.getElementById('saleBookForm');
      if (!form) return;
      form.addEventListener('submit', (event) => {
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
        const books = window.KALAM.readStorage(window.KALAM.STORAGE_KEYS.saleBooks, []);
        const index = books.findIndex(item => item.id === book.id);
        if (index >= 0) books[index] = { ...books[index], ...book };
        else books.push(book);
        window.KALAM.writeStorage(window.KALAM.STORAGE_KEYS.saleBooks, books);
        form.reset();
        renderSaleAdminDashboard();
      });
    }

    document.addEventListener('click', (event) => {
      const deleteButton = event.target.closest('[data-delete-sale-book]');
      const editButton = event.target.closest('[data-edit-sale-book]');
      const updateOrder = event.target.closest('[data-update-order]');
      if (deleteButton) {
        const id = deleteButton.getAttribute('data-delete-sale-book');
        const books = window.KALAM.readStorage(window.KALAM.STORAGE_KEYS.saleBooks, []).filter(item => item.id !== id);
        window.KALAM.writeStorage(window.KALAM.STORAGE_KEYS.saleBooks, books);
        renderSaleAdminDashboard();
      }
      if (editButton) {
        const id = editButton.getAttribute('data-edit-sale-book');
        const books = window.KALAM.readStorage(window.KALAM.STORAGE_KEYS.saleBooks, []);
        const book = books.find(item => item.id === id);
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
      if (updateOrder) {
        const id = updateOrder.getAttribute('data-update-order');
        const orders = window.KALAM.readStorage(window.KALAM.STORAGE_KEYS.orders, []);
        const order = orders.find(item => item.id === id);
        if (!order) return;
        const nextStatus = order.orderStatus === 'Order Confirmed' ? 'Processing' : order.orderStatus === 'Processing' ? 'Shipped' : order.orderStatus === 'Shipped' ? 'Delivered' : 'Order Confirmed';
        order.orderStatus = nextStatus;
        window.KALAM.writeStorage(window.KALAM.STORAGE_KEYS.orders, orders);
        renderSaleAdminDashboard();
      }
    });
  `,
  'assets/books/book-1.svg': `<svg xmlns="http://www.w3.org/2000/svg" width="500" height="700"><rect width="500" height="700" fill="#102847"/><rect x="40" y="40" width="420" height="620" rx="20" fill="#1d4f82"/><text x="250" y="240" text-anchor="middle" font-size="34" fill="#fff" font-family="Arial">Java</text><text x="250" y="310" text-anchor="middle" font-size="26" fill="#dfeeff" font-family="Arial">Programming</text><rect x="120" y="350" width="260" height="150" rx="10" fill="#dfeeff"/><text x="250" y="430" text-anchor="middle" font-size="18" fill="#102847" font-family="Arial">KALAM</text></svg>`,
  'assets/books/book-2.svg': `<svg xmlns="http://www.w3.org/2000/svg" width="500" height="700"><rect width="500" height="700" fill="#f1f8ff"/><rect x="40" y="40" width="420" height="620" rx="20" fill="#dfeeff"/><text x="250" y="220" text-anchor="middle" font-size="32" fill="#0f2347" font-family="Arial">Data</text><text x="250" y="290" text-anchor="middle" font-size="28" fill="#0f2347" font-family="Arial">Structures</text><rect x="110" y="360" width="280" height="130" rx="12" fill="#0f2347"/><text x="250" y="430" text-anchor="middle" font-size="18" fill="#fff" font-family="Arial">ALGORITHM</text></svg>`,
  'assets/books/book-3.svg': `<svg xmlns="http://www.w3.org/2000/svg" width="500" height="700"><rect width="500" height="700" fill="#102847"/><rect x="40" y="40" width="420" height="620" rx="20" fill="#0d3d68"/><circle cx="250" cy="240" r="110" fill="#dfeeff" opacity="0.6"/><text x="250" y="260" text-anchor="middle" font-size="30" fill="#fff" font-family="Arial">Web</text><text x="250" y="320" text-anchor="middle" font-size="28" fill="#fff" font-family="Arial">Technology</text></svg>`,
  'assets/books/book-4.svg': `<svg xmlns="http://www.w3.org/2000/svg" width="500" height="700"><rect width="500" height="700" fill="#dfeeff"/><rect x="40" y="40" width="420" height="620" rx="20" fill="#ffffff"/><text x="250" y="240" text-anchor="middle" font-size="30" fill="#102847" font-family="Arial">AI</text><text x="250" y="300" text-anchor="middle" font-size="24" fill="#102847" font-family="Arial">Learning</text><path d="M90 480 L250 370 L410 480" fill="none" stroke="#c59d47" stroke-width="12"/></svg>`,
  'assets/logo.png': 'not a real image file placeholder',
  'assets/kalam.jpg': 'not a real image file placeholder',
  'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Kalam Arivalayam</title><link rel="stylesheet" href="css/style.css"><link rel="stylesheet" href="css/responsive.css"></head><body><div id="toast" class="toast"></div>${navMarkup('home')}<main><section class="hero"><div class="container hero-grid"><div><span class="hero-badge">Digital Library & Bookstore</span><h1>KALAM ARIVALAYAM</h1><h2>Your Digital Gateway to Knowledge</h2><p>Borrow books from our library, purchase your favourite titles, track return deadlines, and manage your reading journey in one place.</p><div class="hero-actions"><a href="books.html" class="btn-primary">Browse Books</a><a href="rent.html" class="btn-secondary">Rent a Book</a><a href="sale.html" class="btn-ghost">Buy Books</a></div></div><div class="hero-visual"><div class="hero-photo"><img src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=900&q=80" alt="Dr. A.P.J. Abdul Kalam"></div></div></div><div class="container"><div class="stats-grid" id="homeStats"></div></div></section><section class="section"><div class="container"><div class="section-header"><h2>Popular Books</h2><p>Most loved by students for learning and research.</p></div><div class="card-grid" id="popularBooks"></div></div></section><section class="section"><div class="container"><div class="section-header"><h2>Recently Added</h2><p>Fresh arrivals in the library collection and bookstore.</p></div><div class="card-grid" id="recentBooks"></div></div></section><section class="section"><div class="container"><div class="section-header"><h2>Books Available for Rent</h2><p>Flexible rentals for semester preparation and quick learning.</p></div><div class="card-grid" id="rentBooks"></div></div></section><section class="section"><div class="container"><div class="section-header"><h2>Books Available for Sale</h2><p>Build your own library with textbooks and reference books.</p></div><div class="card-grid" id="saleBooks"></div></div></section><section class="section"><div class="container"><div class="section-header"><h2>How It Works</h2></div><div class="feature-grid"><div class="feature-card"><div class="icon">1</div><h3>Register</h3><p>Create an account using your student details and department.</p></div><div class="feature-card"><div class="icon">2</div><h3>Explore</h3><p>Search the catalog, filter by category, and choose books by rent or purchase.</p></div><div class="feature-card"><div class="icon">3</div><h3>Read & Return</h3><p>Track deadlines, return on time, and manage your library activity.</p></div></div></div></section><section class="section"><div class="container"><div class="section-header"><h2>Why Choose Kalam Arivalayam</h2></div><div class="feature-grid"><div class="feature-card"><div class="icon">★</div><h3>Academic Focus</h3><p>Resources tailored for students, coding tasks, and project learning.</p></div><div class="feature-card"><div class="icon">⏱</div><h3>Deadline Tracking</h3><p>Get automatic notifications for due dates and late returns.</p></div><div class="feature-card"><div class="icon">📚</div><h3>College Store Experience</h3><p>Rent, buy, and manage reading progress in one easy portal.</p></div></div></div></section></main>${footerMarkup()}<script src="js/storage.js"></script><script src="js/app.js"></script><script src="js/books.js"></script></body></html>`,
  'login.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Student Login | Kalam Arivalayam</title><link rel="stylesheet" href="css/style.css"><link rel="stylesheet" href="css/responsive.css"></head><body>${navMarkup('home')}<section class="page-banner"><div class="container"><h1>Student Login</h1><p>Access your books, rentals, purchases, and dashboard.</p></div></section><main class="section"><div class="container"><div class="form-grid"><div class="panel"><h2>Login</h2><div id="authError" class="success-box" style="display:none;"></div><form id="loginForm"><div class="form-group"><label for="loginId">Student ID / Email</label><input id="loginId" type="text" required></div><div class="form-group"><label for="loginPassword">Password</label><input id="loginPassword" type="password" required></div><div class="form-actions"><button type="submit" class="btn-primary">Login</button><a href="register.html" class="btn-secondary">Create Account</a></div></form></div><div class="panel"><h2>Demo Student</h2><p><strong>ID:</strong> STU-2024-001</p><p><strong>Email:</strong> asha@kalam.edu</p><p><strong>Password:</strong> student123</p><p>Use the demo credentials to explore the student dashboard and rental flow.</p><a href="register.html" class="btn-ghost">Register New Student</a></div></div></div></main>${footerMarkup()}<script src="js/storage.js"></script><script src="js/auth.js"></script></body></html>`,
  'register.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Student Registration | Kalam Arivalayam</title><link rel="stylesheet" href="css/style.css"><link rel="stylesheet" href="css/responsive.css"></head><body>${navMarkup('home')}<section class="page-banner"><div class="container"><h1>Student Registration</h1><p>Join Kalam Arivalayam and build your digital library profile.</p></div></section><main class="section"><div class="container"><div class="panel"><div id="registerSuccess" class="success-box">Student registered successfully. You can now login.</div><div id="authError" class="success-box" style="display:none;"></div><form id="registerForm"><div class="form-grid"><div class="form-group"><label>Name</label><input id="studentName" type="text" required></div><div class="form-group"><label>Student ID</label><input id="studentId" type="text" required></div><div class="form-group"><label>Email</label><input id="studentEmail" type="email" required></div><div class="form-group"><label>Phone</label><input id="studentPhone" type="tel" required></div><div class="form-group"><label>Password</label><input id="studentPassword" type="password" required></div><div class="form-group"><label>Department</label><select id="studentDepartment"><option value="Computer Science">Computer Science</option><option value="Information Technology">Information Technology</option><option value="Electrical">Electrical</option><option value="Mechanical">Mechanical</option><option value="Civil">Civil</option></select></div><div class="form-group"><label>Year</label><select id="studentYear"><option value="I Year">I Year</option><option value="II Year">II Year</option><option value="III Year">III Year</option><option value="IV Year">IV Year</option></select></div></div><div class="form-actions"><button type="submit" class="btn-primary">Register</button><a href="login.html" class="btn-secondary">Already have an account?</a></div></form></div></div></main>${footerMarkup()}<script src="js/storage.js"></script><script src="js/auth.js"></script></body></html>`,
  'books.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Books Catalog | Kalam Arivalayam</title><link rel="stylesheet" href="css/style.css"><link rel="stylesheet" href="css/responsive.css"></head><body>${navMarkup('books')}<section class="page-banner"><div class="container"><h1>Book Catalogue</h1><p>Explore our collection of academic, technical, and reference books.</p></div></section><main class="section"><div class="container"><div class="catalog-toolbar"><div class="filters"><div class="filter-box"><label>Category</label><select id="categoryFilter"><option value="">All</option><option>Computer Science</option><option>Artificial Intelligence</option><option>Data Science</option><option>Web Technology</option><option>Programming</option><option>Database</option><option>Networking</option><option>Mathematics</option><option>Business</option><option>Fiction</option><option>Biography</option><option>Competitive Exams</option></select></div><div class="filter-box"><label>Author</label><select id="authorFilter"><option value="">All</option></select></div><div class="filter-box"><label>Price</label><select id="priceFilter"><option value="">Any</option><option value="low">Low to High</option><option value="high">High to Low</option></select></div><div class="filter-box"><label>Availability</label><select id="availabilityFilter"><option value="">All</option><option value="available">Available</option><option value="unavailable">Unavailable</option></select></div><div class="filter-box"><label>Rent / Sale</label><select id="typeFilter"><option value="">All</option><option value="rent">Rent</option><option value="sale">Sale</option></select></div><div class="filter-box"><label>Rating</label><select id="ratingFilter"><option value="">Any</option><option value="4">4+</option><option value="4.5">4.5+</option></select></div></div></div><div class="catalog-grid" id="bookCatalog"></div></div></main>${footerMarkup()}<script src="js/storage.js"></script><script src="js/books.js"></script></body></html>`,
  'rent.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Rent a Book | Kalam Arivalayam</title><link rel="stylesheet" href="css/style.css"><link rel="stylesheet" href="css/responsive.css"></head><body>${navMarkup('rent')}<section class="page-banner"><div class="container"><h1>Rent a Book</h1><p>Choose a title, set a rental period, and keep learning on schedule.</p></div></section><main class="section"><div class="container"><div class="form-grid"><div class="panel"><h2>Rental Form</h2><form id="rentalForm"><div class="form-group"><label>Student Name</label><input id="studentName" type="text" required></div><div class="form-group"><label>Student ID</label><input id="studentId" type="text" required></div><div class="form-group"><label>Book Name</label><input id="bookName" type="text" required></div><div class="form-group"><label>Book ID</label><input id="bookId" type="text" required></div><div class="form-group"><label>Rental Duration</label><select id="rentalDuration"><option value="7">7 Days</option><option value="14">14 Days</option><option value="21">21 Days</option><option value="30">30 Days</option></select></div><div class="form-group"><label>Rental Fee</label><input id="rentalFee" type="number" readonly></div><div class="form-group"><label>Security Deposit</label><input id="securityDeposit" type="number" readonly></div><div class="form-actions"><button type="submit" class="btn-primary">Confirm Rental</button></div></form></div><div class="panel"><h2>Available Rental Books</h2><div id="rentalBookList" class="card-grid"></div></div></div></div></main>${footerMarkup()}<script src="js/storage.js"></script><script src="js/rental.js"></script></body></html>`,
  'sale.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Buy Books | Kalam Arivalayam</title><link rel="stylesheet" href="css/style.css"><link rel="stylesheet" href="css/responsive.css"></head><body>${navMarkup('sale')}<section class="page-banner"><div class="container"><h1>Buy Books</h1><p>Shop quality books for your academic journey and personal growth.</p></div></section><main class="section"><div class="container"><div class="card-grid" id="saleCatalog"></div></div></main>${footerMarkup()}<script src="js/storage.js"></script><script src="js/sale.js"></script><script src="js/books.js"></script></body></html>`,
  'cart.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Your Cart | Kalam Arivalayam</title><link rel="stylesheet" href="css/style.css"><link rel="stylesheet" href="css/responsive.css"></head><body>${navMarkup('sale')}<section class="page-banner"><div class="container"><h1>Your Cart</h1><p>Review your selected books before checkout.</p></div></section><main class="section"><div class="container cart-wrap"><div class="panel"><h2>Cart Items</h2><div id="cartItems"></div></div><div class="panel"><h2>Order Summary</h2><div id="cartSummary" class="summary-box"></div><div class="form-actions"><button type="button" id="checkoutBtn" class="btn-primary">Proceed to Checkout</button></div></div></div></main>${footerMarkup()}<script src="js/storage.js"></script><script src="js/cart.js"></script></body></html>`,
  'payment.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Payment | Kalam Arivalayam</title><link rel="stylesheet" href="css/style.css"><link rel="stylesheet" href="css/responsive.css"></head><body>${navMarkup('sale')}<section class="page-banner"><div class="container"><h1>Payment Portal</h1><p>Secure demo payment gateway for academic project demonstration.</p></div></section><main class="section"><div class="container cart-wrap"><div class="panel"><h2>Payment Details</h2><form id="paymentForm"><div class="form-grid"><div class="form-group"><label>Payment Method</label><select id="paymentMethod"><option value="UPI">UPI</option><option value="Debit Card">Debit Card</option><option value="Credit Card">Credit Card</option><option value="Net Banking">Net Banking</option><option value="Cash on Delivery">Cash on Delivery</option></select></div><div class="form-group"><label>UPI ID</label><input id="upiId" type="text" placeholder="student@upi"></div><div class="form-group"><label>Card Number</label><input id="cardNumber" type="text" placeholder="1234 5678 9012 3456"></div><div class="form-group"><label>Card Holder Name</label><input id="cardHolder" type="text" placeholder="Student Name"></div><div class="form-group"><label>Expiry Date</label><input id="cardExpiry" type="month"></div><div class="form-group"><label>CVV</label><input id="cvv" type="password"></div><div class="form-group"><label>Bank Name</label><input id="bankName" type="text" placeholder="Bank selection"></div><div class="form-group"><label>Account Number</label><input id="accountNumber" type="text"></div></div><div class="form-actions"><button type="submit" class="btn-primary">Proceed to Payment</button></div></form><div id="paymentStatus" class="success-box" style="display:none;"></div><div id="receiptBox" class="panel" style="margin-top:18px;"></div></div><div class="panel"><h2>Payment Summary</h2><div id="paymentSummary"></div><div class="form-group"><label>Total Amount</label><input id="paymentAmount" readonly></div></div></div></main>${footerMarkup()}<script src="js/storage.js"></script><script src="js/payment.js"></script></body></html>`,
  'my-books.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>My Books | Kalam Arivalayam</title><link rel="stylesheet" href="css/style.css"><link rel="stylesheet" href="css/responsive.css"></head><body>${navMarkup('my-books')}<section class="page-banner"><div class="container"><h1>My Books</h1><p>Track rented books, due dates, and return status.</p></div></section><main class="section"><div class="container"><div class="panel"><div class="table-wrap"><table><thead><tr><th>Book Name</th><th>Rental ID</th><th>Rental Date</th><th>Due Date</th><th>Days Remaining</th><th>Status</th><th>Action</th></tr></thead><tbody id="myBooksTable"></tbody></table></div></div></div></main>${footerMarkup()}<script src="js/storage.js"></script><script src="js/rental.js"></script></body></html>`,
  'my-orders.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>My Orders | Kalam Arivalayam</title><link rel="stylesheet" href="css/style.css"><link rel="stylesheet" href="css/responsive.css"></head><body>${navMarkup('home')}<section class="page-banner"><div class="container"><h1>My Orders</h1><p>View purchases, transaction details, and order timeline.</p></div></section><main class="section"><div class="container"><div class="panel"><table><thead><tr><th>Order ID</th><th>Date</th><th>Books</th><th>Qty</th><th>Amount</th><th>Payment Status</th><th>Order Status</th></tr></thead><tbody id="ordersTable"></tbody></table></div></div></main>${footerMarkup()}<script src="js/storage.js"></script><script>document.addEventListener('DOMContentLoaded', () => { const orders = window.KALAM.readStorage(window.KALAM.STORAGE_KEYS.orders, []); const tbody=document.getElementById('ordersTable'); tbody.innerHTML = orders.map(order => `<tr><td>${order.id}</td><td>${order.date}</td><td>${order.books}</td><td>${order.quantity}</td><td>₹${order.amount}</td><td>${order.paymentStatus}</td><td>${order.orderStatus}</td></tr>`).join(''); });</script></body></html>`,
  'about.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>About | Kalam Arivalayam</title><link rel="stylesheet" href="css/style.css"><link rel="stylesheet" href="css/responsive.css"></head><body>${navMarkup('about')}<section class="page-banner"><div class="container"><h1>About Kalam Arivalayam</h1><p>Making learning resources accessible to students through digital access and knowledge.</p></div></section><main class="section"><div class="container"><div class="panel"><div class="form-grid"><div><p>Kalam Arivalayam is a digital library and online bookstore designed to make learning resources easily accessible to students.</p><p>It reflects the values of education, discipline, and curiosity inspired by Dr. A.P.J. Abdul Kalam. The goal is to encourage every student to read, learn, and grow through a practical and student-focused digital platform.</p></div><div><img src="https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&w=700&q=80" alt="Dr. A.P.J. Abdul Kalam" style="border-radius:20px; height:350px; object-fit:cover;"></div></div></div></div></main>${footerMarkup()}<script src="js/storage.js"></script></body></html>`,
  'contact.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Contact | Kalam Arivalayam</title><link rel="stylesheet" href="css/style.css"><link rel="stylesheet" href="css/responsive.css"></head><body>${navMarkup('contact')}<section class="page-banner"><div class="container"><h1>Contact Us</h1><p>We are happy to help with library membership, rentals, or purchase queries.</p></div></section><main class="section"><div class="container"><div class="form-grid"><div class="panel"><h2>Send a Message</h2><form><div class="form-group"><label>Name</label><input type="text"></div><div class="form-group"><label>Email</label><input type="email"></div><div class="form-group full"><label>Message</label><textarea rows="5"></textarea></div><div class="form-actions"><button class="btn-primary" type="button">Submit</button></div></form></div><div class="panel"><h2>Library Details</h2><p><strong>Email:</strong> library@kalam.edu</p><p><strong>Phone:</strong> +91 98765 43210</p><p><strong>Address:</strong> Coimbatore, Tamil Nadu</p><p><strong>Timing:</strong> 9:00 AM - 6:00 PM</p></div></div></div></main>${footerMarkup()}<script src="js/storage.js"></script></body></html>`,
  'admin-login.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Admin Login | Kalam Arivalayam</title><link rel="stylesheet" href="css/style.css"><link rel="stylesheet" href="css/responsive.css"></head><body>${navMarkup('home')}<section class="page-banner"><div class="container"><h1>Admin Login</h1><p>Select the admin panel you need to manage.</p></div></section><main class="section"><div class="container"><div class="form-grid"><div class="panel"><h2>Login as Admin</h2><div id="authError" class="success-box" style="display:none;"></div><form id="adminLoginForm"><div class="form-group"><label>Admin Role</label><select id="adminRole"><option value="rental">Rental Admin</option><option value="sale">Sales Admin</option></select></div><div class="form-group"><label>Username</label><input id="adminUsername" type="text" required></div><div class="form-group"><label>Password</label><input id="adminPassword" type="password" required></div><div class="form-actions"><button class="btn-primary" type="submit">Login</button></div></form></div><div class="panel"><h2>Demo Admin Credentials</h2><p><strong>Rental Admin:</strong> rentaladmin / rental123</p><p><strong>Sales Admin:</strong> saleadmin / sale123</p></div></div></div></main>${footerMarkup()}<script src="js/storage.js"></script><script src="js/auth.js"></script></body></html>`,
  'rental-admin.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Rental Admin | Kalam Arivalayam</title><link rel="stylesheet" href="css/style.css"><link rel="stylesheet" href="css/admin.css"><link rel="stylesheet" href="css/responsive.css"></head><body><main class="section admin-shell"><div class="container"><div class="admin-topbar"><h2>Rental Administration</h2><div class="admin-actions"><a class="btn-secondary" href="index.html">Home</a><button class="btn-ghost" id="logoutAdminBtn">Logout</button></div></div><div class="dashboard-stats" id="rentalStats"></div><div class="admin-layout"><aside class="admin-sidebar"><h3>Manage</h3><a class="active" href="#">Rental Books</a><a href="#">Rental Records</a><a href="#">Overdue Books</a><a href="#">Returned Books</a></aside><div class="content"><div class="panel"><h3>Add / Edit Rental Book</h3><form id="rentalBookForm"><div class="form-grid"><div class="form-group"><label>Book ID</label><input id="rentalBookId" required></div><div class="form-group"><label>Book Name</label><input id="rentalBookName" required></div><div class="form-group"><label>Author</label><input id="rentalBookAuthor" required></div><div class="form-group"><label>ISBN</label><input id="rentalBookIsbn"></div><div class="form-group"><label>Category</label><select id="rentalBookCategory"><option>Computer Science</option><option>Artificial Intelligence</option><option>Programming</option><option>Web Technology</option><option>Database</option><option>Networking</option><option>Mathematics</option><option>Business</option></select></div><div class="form-group"><label>Description</label><textarea id="rentalBookDescription" rows="3"></textarea></div><div class="form-group"><label>Rental Price</label><input id="rentalBookPrice" type="number" required></div><div class="form-group"><label>Security Deposit</label><input id="rentalSecurityDeposit" type="number" required></div><div class="form-group"><label>Total Copies</label><input id="rentalTotalCopies" type="number" required></div><div class="form-group"><label>Available Copies</label><input id="rentalAvailableCopies" type="number" required></div><div class="form-group full"><label>Book Image</label><input id="rentalBookImage" type="url"></div></div><div class="form-actions"><button class="btn-primary" type="submit">Save Book</button><button class="btn-secondary" type="reset">Clear</button></div></form></div><div class="panel" style="margin-top:24px;"><h3>Manage Rental Books</h3><table><thead><tr><th>Book ID</th><th>Book Name</th><th>Author</th><th>Category</th><th>Rental Price</th><th>Total Copies</th><th>Available</th><th>Status</th><th>Actions</th></tr></thead><tbody id="rentalBooksTable"></tbody></table></div><div class="panel" style="margin-top:24px;"><h3>Rental Records</h3><table><thead><tr><th>Rental ID</th><th>Student Name</th><th>Student ID</th><th>Book</th><th>Rental Date</th><th>Due Date</th><th>Return Date</th><th>Fine</th><th>Status</th></tr></thead><tbody id="rentalRecordsTable"></tbody></table></div></div></div></div></div></main><script src="js/storage.js"></script><script src="js/admin-rental.js"></script><script>document.addEventListener('click', (event) => { if (event.target.id === 'logoutAdminBtn') { localStorage.removeItem('kalam_current_admin'); window.location.href='admin-login.html'; } });</script></body></html>`,
  'sale-admin.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Sales Admin | Kalam Arivalayam</title><link rel="stylesheet" href="css/style.css"><link rel="stylesheet" href="css/admin.css"><link rel="stylesheet" href="css/responsive.css"></head><body><main class="section admin-shell"><div class="container"><div class="admin-topbar"><h2>Sales Administration</h2><div class="admin-actions"><a class="btn-secondary" href="index.html">Home</a><button class="btn-ghost" id="logoutAdminBtn">Logout</button></div></div><div class="dashboard-stats" id="saleStats"></div><div class="admin-layout"><aside class="admin-sidebar"><h3>Manage</h3><a class="active" href="#">Sale Books</a><a href="#">Orders</a><a href="#">Stock</a><a href="#">Customers</a></aside><div class="content"><div class="panel"><h3>Add / Edit Sale Book</h3><form id="saleBookForm"><div class="form-grid"><div class="form-group"><label>Book ID</label><input id="saleBookId" required></div><div class="form-group"><label>Book Name</label><input id="saleBookName" required></div><div class="form-group"><label>Author</label><input id="saleBookAuthor" required></div><div class="form-group"><label>ISBN</label><input id="saleBookIsbn"></div><div class="form-group"><label>Category</label><select id="saleBookCategory"><option>Computer Science</option><option>Artificial Intelligence</option><option>Programming</option><option>Database</option><option>Networking</option><option>Business</option></select></div><div class="form-group full"><label>Description</label><textarea id="saleBookDescription" rows="3"></textarea></div><div class="form-group"><label>Original Price</label><input id="saleBookPrice" type="number" required></div><div class="form-group"><label>Discount %</label><input id="saleBookDiscount" type="number" value="0"></div><div class="form-group"><label>Stock</label><input id="saleBookStock" type="number" required></div><div class="form-group full"><label>Book Image</label><input id="saleBookImage" type="url"></div></div><div class="form-actions"><button class="btn-primary" type="submit">Save Book</button><button class="btn-secondary" type="reset">Clear</button></div></form></div><div class="panel" style="margin-top:24px;"><h3>Manage Sale Books</h3><table><thead><tr><th>Book ID</th><th>Book</th><th>Author</th><th>Category</th><th>Price</th><th>Discount</th><th>Stock</th><th>Sales</th><th>Status</th><th>Actions</th></tr></thead><tbody id="saleBooksTable"></tbody></table></div><div class="panel" style="margin-top:24px;"><h3>Orders</h3><table><thead><tr><th>Order ID</th><th>Books</th><th>Amount</th><th>Payment Status</th><th>Order Status</th><th>Date</th><th>Action</th></tr></thead><tbody id="saleOrdersTable"></tbody></table></div></div></div></div></div></main><script src="js/storage.js"></script><script src="js/admin-sale.js"></script><script>document.addEventListener('click', (event) => { if (event.target.id === 'logoutAdminBtn') { localStorage.removeItem('kalam_current_admin'); window.location.href='admin-login.html'; } });</script></body></html>`
};

files['admin-login.html'] = fs.readFileSync(path.join(root, 'admin-login.html'), 'utf8');
files['login.html'] = fs.readFileSync(path.join(root, 'login.html'), 'utf8');
files['css/admin-login.css'] = fs.readFileSync(path.join(root, 'css', 'admin-login.css'), 'utf8');

Object.entries(files).forEach(([relativePath, content]) => {
  const fullPath = path.join(root, relativePath);
  fs.writeFileSync(fullPath, content, 'utf8');
});

console.log('Generated KALAM-ARIVALAYAM project files.');
