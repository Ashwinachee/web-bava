document.addEventListener('keydown', function (event) {
  const isAdminShortcut = (event.key.toLowerCase() === 'a' || event.code === 'KeyA') &&
    ((event.altKey && event.shiftKey && !event.ctrlKey && !event.metaKey) ||
      (event.ctrlKey && event.altKey && !event.shiftKey && !event.metaKey));
  if (!isAdminShortcut) return;

  event.preventDefault();
  event.stopImmediatePropagation();
  window.location.assign(new URL('rental-admin.html', window.location.href).href);
}, true);

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.page-tools, .back-button').forEach(function (element) {
    element.remove();
  });

  const header = document.querySelector('.topbar');
  if (!header) return;

  const nav = header.querySelector('.main-nav');
  const actions = header.querySelector('.nav-actions');
  if (!nav || !actions) return;

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const activePage = currentPage === 'admin-login.html' ? '' : currentPage;
  const currentUser = window.KALAM && window.KALAM.getCurrentUser();
  nav.querySelectorAll('a.nav-link[href="about.html"], a.nav-link[href="contact.html"]').forEach(function (link) {
    link.remove();
  });

  let loginLink = nav.querySelector('a.nav-link[href="login.html"], a.nav-link[data-site-link="login"]') ||
    actions.querySelector('[data-site-link="login"]');
  if (loginLink && loginLink.parentElement === nav) {
    loginLink.remove();
  }

  if (!actions.querySelector('[data-site-link="cart"]')) {
    const cartLink = document.createElement('a');
    cartLink.className = 'nav-link cart-link';
    cartLink.href = 'cart.html';
    cartLink.setAttribute('aria-label', 'Cart');
    cartLink.setAttribute('title', 'Cart');
    cartLink.dataset.siteLink = 'cart';
    cartLink.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M3 3h2l2.2 11.1a2 2 0 0 0 2 1.6h8.9a2 2 0 0 0 1.9-1.4L22 8H6"></path><circle cx="10" cy="20" r="1"></circle><circle cx="18" cy="20" r="1"></circle></svg>';
    cartLink.classList.toggle('active', currentPage === 'cart.html');
    actions.appendChild(cartLink);
  }
  const cartLink = actions.querySelector('[data-site-link="cart"]');
  cartLink.classList.add('nav-link', 'cart-link');
  cartLink.classList.toggle('active', currentPage === 'cart.html');

  nav.querySelectorAll('a.nav-link').forEach(function (link) {
    link.classList.toggle('active', link.getAttribute('href') === activePage);
  });

  const existingProfile = actions.querySelector('[data-site-link="profile"]');
  if (existingProfile) existingProfile.remove();
  const existingLogout = actions.querySelector('[data-site-link="logout"]');
  if (existingLogout) existingLogout.remove();

  if (currentUser) {
    nav.querySelectorAll('a.nav-link[href="my-books.html"], a.nav-link[href="my-orders.html"]').forEach(function (link) {
      link.remove();
    });
    if (loginLink) loginLink.remove();

    const profile = document.createElement('div');
    profile.className = 'profile-menu';
    profile.dataset.siteLink = 'profile';

    const profileButton = document.createElement('button');
    profileButton.className = 'nav-link login-link profile-trigger';
    profileButton.type = 'button';
    profileButton.setAttribute('aria-haspopup', 'true');
    profileButton.setAttribute('aria-expanded', 'false');
    profileButton.textContent = currentUser.name.split(' ')[0];

    const profileDropdown = document.createElement('div');
    profileDropdown.className = 'profile-dropdown';
    profileDropdown.hidden = true;

    const booksLink = document.createElement('a');
    booksLink.href = 'my-books.html';
    booksLink.textContent = 'My Books';
    booksLink.classList.toggle('active', currentPage === 'my-books.html');

    const ordersLink = document.createElement('a');
    ordersLink.href = 'my-orders.html';
    ordersLink.textContent = 'My Orders';
    ordersLink.classList.toggle('active', currentPage === 'my-orders.html');

    const logoutButton = document.createElement('button');
    logoutButton.type = 'button';
    logoutButton.textContent = 'Logout';
    logoutButton.dataset.siteLink = 'logout';

    profileDropdown.append(booksLink, ordersLink, logoutButton);
    profile.append(profileButton, profileDropdown);
    actions.appendChild(profile);

    profileButton.addEventListener('click', function () {
      const isOpen = profileDropdown.hidden;
      profileDropdown.hidden = !isOpen;
      profileButton.setAttribute('aria-expanded', String(isOpen));
    });

    logoutButton.addEventListener('click', function () {
      window.KALAM.setCurrentUser(null);
      window.location.assign('index.html');
    });

    document.addEventListener('click', function (event) {
      if (!profile.contains(event.target)) {
        profileDropdown.hidden = true;
        profileButton.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !profileDropdown.hidden) {
        profileDropdown.hidden = true;
        profileButton.setAttribute('aria-expanded', 'false');
        profileButton.focus();
      }
    });
  } else {
    if (!loginLink) {
      loginLink = document.createElement('a');
      loginLink.dataset.siteLink = 'login';
      actions.appendChild(loginLink);
    } else if (loginLink.parentElement !== actions) {
      actions.appendChild(loginLink);
    }
    loginLink.classList.add('nav-link', 'login-link');
    loginLink.textContent = 'Login';
    loginLink.href = 'login.html';
    loginLink.classList.toggle('active', loginLink.getAttribute('href') === activePage);
  }

  if (!currentUser && !nav.querySelector('[data-site-link="orders"]')) {
    const ordersLink = document.createElement('a');
    ordersLink.className = 'nav-link';
    ordersLink.href = 'my-orders.html';
    ordersLink.textContent = 'My Orders';
    ordersLink.dataset.siteLink = 'orders';
    ordersLink.classList.toggle('active', currentPage === 'my-orders.html');
    nav.appendChild(ordersLink);
  }

  let menuButton = actions.querySelector('.mobile-menu-btn');
  if (!menuButton) {
    menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-btn';
    menuButton.type = 'button';
    menuButton.setAttribute('aria-label', 'Toggle navigation');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.textContent = '☰';
    actions.appendChild(menuButton);
  } else {
    menuButton.textContent = '☰';
    menuButton.setAttribute('aria-label', 'Toggle navigation');
    menuButton.setAttribute('aria-expanded', 'false');
  }

  menuButton.addEventListener('click', function () {
    const isOpen = nav.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    header.classList.remove('is-hidden');
  });

  let lastScrollY = window.scrollY;
  window.addEventListener('scroll', function () {
    const currentScrollY = window.scrollY;
    if (nav.classList.contains('is-open') || currentScrollY <= 24 || currentScrollY < lastScrollY - 4) {
      header.classList.remove('is-hidden');
    } else if (currentScrollY > lastScrollY + 4) {
      header.classList.add('is-hidden');
    }
    lastScrollY = currentScrollY;
  }, { passive: true });

});
