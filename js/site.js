document.addEventListener('keydown', function (event) {
  const target = event.target;
  const isEditing = target instanceof HTMLElement &&
    (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName));
  if (isEditing || !event.altKey || !event.shiftKey || event.ctrlKey || event.metaKey || event.key.toLowerCase() !== 'a') {
    return;
  }

  if (window.location.pathname.endsWith('/admin-login.html')) return;
  event.preventDefault();
  window.location.href = 'admin-login.html';
});

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

  if (!loginLink) {
    loginLink = document.createElement('a');
    loginLink.className = 'nav-link login-link';
    loginLink.href = 'login.html';
    loginLink.dataset.siteLink = 'login';
  }
  if (loginLink.parentElement !== actions) actions.appendChild(loginLink);
  loginLink.classList.add('nav-link', 'login-link');
  loginLink.textContent = 'Login';
  loginLink.href = 'login.html';
  if (window.KALAM && window.KALAM.getCurrentUser()) {
    loginLink.textContent = window.KALAM.getCurrentUser().name.split(' ')[0];
    loginLink.href = 'my-books.html';
  }

  nav.querySelectorAll('a.nav-link').forEach(function (link) {
    link.classList.toggle('active', link.getAttribute('href') === activePage);
  });

  loginLink.classList.toggle('active', loginLink.getAttribute('href') === activePage);

  if (!nav.querySelector('[data-site-link="orders"]')) {
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
