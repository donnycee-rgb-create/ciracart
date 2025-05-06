document.addEventListener('DOMContentLoaded', () => {
  // Utility functions
  function getUsers() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  }

  function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
  }

  function setLoggedInUser(user) {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  }

  function getLoggedInUser() {
    const user = localStorage.getItem('loggedInUser');
    return user ? JSON.parse(user) : null;
  }

  function clearLoggedInUser() {
    localStorage.removeItem('loggedInUser');
  }

  // Show account notification toast
  function showAccountNotification(title, message) {
    const notification = document.getElementById('account-notification');
    const titleEl = document.getElementById('account-notification-title');
    const messageEl = document.getElementById('account-notification-message');
    if (notification && titleEl && messageEl) {
      titleEl.textContent = title;
      messageEl.textContent = message;
      notification.classList.add('show');
      notification.classList.remove('hide');
      // Auto hide after 4 seconds
      setTimeout(() => {
        notification.classList.add('hide');
        notification.classList.remove('show');
      }, 4000);
    }
  }

  // Close notification on close button click
  const closeBtn = document.getElementById('account-notification-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      const notification = document.getElementById('account-notification');
      if (notification) {
        notification.classList.add('hide');
        notification.classList.remove('show');
      }
    });
  }

  // Simulated login handler
  const loginForm = document.querySelector('.login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = loginForm.email.value.trim().toLowerCase();
      const password = loginForm.password.value;

      const users = getUsers();
      const user = users.find(u => u.email.toLowerCase() === email && u.password === password);

      if (user) {
        setLoggedInUser(user);
        // Optionally handle "remember me"
        if (loginForm.remember.checked) {
          localStorage.setItem('rememberMe', 'true');
        } else {
          localStorage.removeItem('rememberMe');
        }
        // alert('Login successful!');
        window.location.href = 'dashboard.html';
      } else {
        // alert('Invalid email or password.');
        showAccountNotification('Login Failed', 'Invalid email or password.');
      }
    });
  }

  // Simulated registration handler
  const registerForm = document.querySelector('.register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = registerForm.name.value.trim();
      const email = registerForm.email.value.trim().toLowerCase();
      const password = registerForm.password.value;
      const confirmPassword = registerForm.confirm_password.value;

      if (password !== confirmPassword) {
        // alert('Passwords do not match.');
        showAccountNotification('Registration Failed', 'Passwords do not match.');
        return;
      }

      let users = getUsers();
      if (users.find(u => u.email.toLowerCase() === email)) {
        // alert('Email already registered.');
        showAccountNotification('Registration Failed', 'Email already registered.');
        return;
      }

      const newUser = { name, email, password };
      users.push(newUser);
      saveUsers(users);
      // alert('Registration successful! You can now log in.');
      showAccountNotification('Registration Successful', 'You can now log in.');
      window.location.href = 'account.html';
    });
  }

  // Dashboard page logic
  if (window.location.pathname.endsWith('dashboard.html')) {
    const user = getLoggedInUser();
    if (!user) {
      // Not logged in, redirect to login page
      window.location.href = 'account.html';
      return;
    }

    // Display user info dynamically
    const usernameElements = document.querySelectorAll('.username, .user-profile-summary h3');
    usernameElements.forEach(el => {
      el.textContent = user.name || user.email;
    });

    // Logout button handler
    const logoutLink = document.querySelector('a[href="/logout"]');
    if (logoutLink) {
      logoutLink.addEventListener('click', (e) => {
        e.preventDefault();
        clearLoggedInUser();
        localStorage.removeItem('rememberMe');
        // alert('You have been logged out.');
        window.location.href = 'dashboard.html?logged_out=1';
      });
    }
  }

  // Auto-login if rememberMe is set and loggedInUser exists
  if (window.location.pathname.endsWith('account.html')) {
    const rememberMe = localStorage.getItem('rememberMe');
    const user = getLoggedInUser();
    if (rememberMe && user) {
      window.location.href = 'dashboard.html';
    }
  }
});
