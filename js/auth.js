document.addEventListener('DOMContentLoaded', function () {
  window.KALAM.ensureDemoData();

  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const id = document.getElementById('loginId').value.trim();
      const password = document.getElementById('loginPassword').value.trim();
      const users = window.KALAM.readStorage(STORAGE_KEYS.users, []);
      const user = users.find(function (item) {
        return (item.email === id || item.id === id) && item.password === password;
      });
      if (!user) {
        showMessage('Invalid student credentials');
        return;
      }
      window.KALAM.setCurrentUser(user);
      const errorBox = document.getElementById('authError');
      if (errorBox) errorBox.hidden = true;
      window.location.href = window.KALAM.getStudentReturnPage();
    });
  }

  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const student = {
        name: document.getElementById('studentName').value.trim(),
        id: document.getElementById('studentId').value.trim(),
        email: document.getElementById('studentEmail').value.trim(),
        phone: document.getElementById('studentPhone').value.trim(),
        password: document.getElementById('studentPassword').value.trim(),
        department: document.getElementById('studentDepartment').value,
        year: document.getElementById('studentYear').value
      };
      if (!student.name || !student.id || !student.email || !student.phone || !student.password) {
        showMessage('All fields are required.');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(student.email)) {
        showMessage('Please enter a valid email.');
        return;
      }
      if (!/^\d{10}$/.test(student.phone)) {
        showMessage('Phone number must be 10 digits.');
        return;
      }
      const users = window.KALAM.readStorage(STORAGE_KEYS.users, []);
      if (users.some(function (item) { return item.email === student.email || item.id === student.id; })) {
        showMessage('Student ID or email already exists.');
        return;
      }
      users.push(student);
      window.KALAM.writeStorage(STORAGE_KEYS.users, users);
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
      const admins = window.KALAM.readStorage(STORAGE_KEYS.admins, []);
      const admin = admins.find(function (item) {
        return item.username === username && item.password === password;
      });
      if (!admin) {
        showMessage('Invalid admin credentials.');
        return;
      }
      window.KALAM.setCurrentAdmin(admin);
      const errorBox = document.getElementById('authError');
      if (errorBox) errorBox.hidden = true;
      if (admin.role === 'admin' || admin.role === 'rental') {
        window.location.href = 'rental-admin.html';
      } else {
        window.location.href = 'sale-admin.html';
      }
    });
  }

  [
    { buttonId: 'toggleAdminPassword', inputId: 'adminPassword' },
    { buttonId: 'toggleStudentPassword', inputId: 'loginPassword' }
  ].forEach(function (toggle) {
    const toggleButton = document.getElementById(toggle.buttonId);
    if (toggleButton) {
      toggleButton.addEventListener('click', function () {
        const passwordInput = document.getElementById(toggle.inputId);
      const isPasswordHidden = passwordInput.type === 'password';
      passwordInput.type = isPasswordHidden ? 'text' : 'password';
        toggleButton.textContent = isPasswordHidden ? 'Hide' : 'Show';
        toggleButton.setAttribute('aria-pressed', String(isPasswordHidden));
      });
    }
  });

  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function () {
      window.KALAM.setCurrentUser(null);
      window.location.href = 'login.html';
    });
  }

  if (window.location.pathname.endsWith('login.html') && window.KALAM.getCurrentUser()) {
    window.location.href = window.KALAM.getStudentReturnPage();
  }
});

function showMessage(msg) {
  const box = document.getElementById('authError');
  if (box) {
    box.textContent = msg;
    box.hidden = false;
    box.style.display = 'block';
  } else {
    window.alert(msg);
  }
}
