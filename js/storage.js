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

function readStorage(key, fallback) {
  try {
    const data = localStorage.getItem(key);
    if (data === null) return fallback;
    return JSON.parse(data);
  } catch (e) {
    return fallback;
  }
}

function writeStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
  return value;
}

function ensureDemoData() {
  const demoStudent = {
    id: 'STU-2024-001',
    name: 'Bava',
    email: 'bava@kalam.edu',
    phone: '9876543210',
    password: 'bava@20',
    department: 'Computer Science',
    year: 'III Year'
  };
  const users = readStorage(STORAGE_KEYS.users, []);
  const demoStudentIndex = users.findIndex(function (user) {
    return user.id === demoStudent.id || user.email === 'asha@kalam.edu' || user.email === demoStudent.email;
  });
  if (demoStudentIndex === -1) users.push(demoStudent);
  else users[demoStudentIndex] = Object.assign({}, users[demoStudentIndex], demoStudent);
  writeStorage(STORAGE_KEYS.users, users);

  const previousAdminUsernames = ['rentaladmin', 'saleadmin'];
  const admins = readStorage(STORAGE_KEYS.admins, []).filter(function (admin) {
    return previousAdminUsernames.indexOf(admin.username) === -1 && admin.username !== 'bava@kalam.edu';
  });
  admins.push({ username: 'bava@kalam.edu', password: 'Admin@20', role: 'admin' });
  writeStorage(STORAGE_KEYS.admins, admins);

  const currentUser = getCurrentUser();
  if (currentUser && (currentUser.id === demoStudent.id || currentUser.email === 'asha@kalam.edu')) {
    setCurrentUser(demoStudent);
  }
  const currentAdmin = getCurrentAdmin();
  if (currentAdmin && previousAdminUsernames.indexOf(currentAdmin.username) !== -1) {
    setCurrentAdmin(null);
  }

  if (!readStorage(STORAGE_KEYS.rentalBooks, []).length) {
    writeStorage(STORAGE_KEYS.rentalBooks, [
      { id: 'RB-101', name: 'Java Programming', author: 'Herbert Schildt', category: 'Programming', description: 'Core Java concepts for beginners and intermediate students.', rentalPrice: 120, securityDeposit: 200, totalCopies: 5, availableCopies: 3, image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=500&q=80', rating: 4.7 },
      { id: 'RB-102', name: 'Data Structures and Algorithms', author: 'Mark Allen Weiss', category: 'Computer Science', description: 'Study guide for problem solving and data handling.', rentalPrice: 140, securityDeposit: 220, totalCopies: 4, availableCopies: 2, image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=500&q=80', rating: 4.8 },
      { id: 'RB-103', name: 'Web Technology', author: 'Achyut Godbole', category: 'Web Technology', description: 'Practical web fundamentals and frontend design.', rentalPrice: 150, securityDeposit: 240, totalCopies: 6, availableCopies: 4, image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=500&q=80', rating: 4.6 },
      { id: 'RB-104', name: 'Machine Learning Basics', author: 'Ethem Alpaydin', category: 'Artificial Intelligence', description: 'An accessible introduction to machine learning.', rentalPrice: 180, securityDeposit: 260, totalCopies: 5, availableCopies: 5, image: 'https://images.unsplash.com/photo-1532012197267-da84d127bbf1?auto=format&fit=crop&w=500&q=80', rating: 4.9 }
    ]);
  }

  if (!readStorage(STORAGE_KEYS.saleBooks, []).length) {
    writeStorage(STORAGE_KEYS.saleBooks, [
      { id: 'SB-201', title: 'Python for Everybody', author: 'Charles Severance', category: 'Programming', description: 'Easy Python learning with practice.', price: 680, discount: 10, stock: 12, image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=500&q=80', rating: 4.8 },
      { id: 'SB-202', title: 'Artificial Intelligence', author: 'Stuart Russell', category: 'Artificial Intelligence', description: 'A foundational AI text for students.', price: 950, discount: 12, stock: 8, image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=500&q=80', rating: 4.7 },
      { id: 'SB-203', title: 'SQL and Database Design', author: 'M. L. Gillenson', category: 'Database', description: 'Database design and relational theory.', price: 720, discount: 8, stock: 15, image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=500&q=80', rating: 4.5 },
      { id: 'SB-204', title: 'Computer Networks', author: 'Andrew S. Tanenbaum', category: 'Networking', description: 'Network architecture and protocol study.', price: 810, discount: 15, stock: 10, image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=500&q=80', rating: 4.6 }
    ]);
  }

  if (!readStorage(STORAGE_KEYS.books, []).length) {
    const combined = readStorage(STORAGE_KEYS.rentalBooks, []).concat(readStorage(STORAGE_KEYS.saleBooks, []));
    writeStorage(STORAGE_KEYS.books, combined);
  }

  if (!readStorage(STORAGE_KEYS.rentals, []).length) {
    writeStorage(STORAGE_KEYS.rentals, [{
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
    }]);
  }

  if (!readStorage(STORAGE_KEYS.orders, []).length) {
    writeStorage(STORAGE_KEYS.orders, [{
      id: 'ORD-1001',
      date: '2026-10-02',
      books: 'Python for Everybody',
      quantity: 1,
      amount: 612,
      paymentStatus: 'Payment Successful',
      orderStatus: 'Delivered'
    }]);
  }

  if (!readStorage(STORAGE_KEYS.cart, []).length) {
    writeStorage(STORAGE_KEYS.cart, []);
  }

  if (!readStorage(STORAGE_KEYS.notifications, []).length) {
    writeStorage(STORAGE_KEYS.notifications, [{
      id: 1, message: 'Welcome to Kalam Arivalayam!', time: new Date().toISOString()
    }]);
  }
}

function getCurrentUser() {
  return readStorage(STORAGE_KEYS.currentUser, null);
}

function getStudentReturnPage() {
  const returnTo = new URLSearchParams(window.location.search).get('returnTo');
  return returnTo === 'my-orders.html' || returnTo === 'my-books.html'
    ? returnTo
    : 'my-books.html';
}

function requireStudentLogin() {
  if (getCurrentUser()) return true;

  const page = window.location.pathname.split('/').pop();
  const returnTo = page === 'my-orders.html' || page === 'my-books.html'
    ? page
    : 'my-books.html';
  window.location.replace('login.html?returnTo=' + encodeURIComponent(returnTo));
  return false;
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
    id: Date.now(),
    message: message,
    time: new Date().toISOString()
  });
  writeStorage(STORAGE_KEYS.notifications, notifications.slice(0, 10));
}

window.KALAM = {
  STORAGE_KEYS: STORAGE_KEYS,
  readStorage: readStorage,
  writeStorage: writeStorage,
  ensureDemoData: ensureDemoData,
  getCurrentUser: getCurrentUser,
  getStudentReturnPage: getStudentReturnPage,
  requireStudentLogin: requireStudentLogin,
  setCurrentUser: setCurrentUser,
  getCurrentAdmin: getCurrentAdmin,
  setCurrentAdmin: setCurrentAdmin,
  seedNotif: seedNotif
};
