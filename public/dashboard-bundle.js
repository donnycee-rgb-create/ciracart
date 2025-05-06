// dashboard-bundle.js
// JavaScript functionalities for the dashboard page

document.addEventListener('DOMContentLoaded', function () {
    // Show notifications
    function showNotification(title, message, type = 'info', duration = 5000) {
        const container = document.getElementById('notifications-container');
        if (!container) return;

        const notification = document.createElement('div');
        notification.className = `notification-toast notification-${type}`;
        notification.setAttribute('role', 'status');

        const icon = document.createElement('div');
        icon.className = 'notification-icon';
        const iconI = document.createElement('i');
        switch (type) {
            case 'success':
                iconI.className = 'fas fa-check-circle';
                break;
            case 'error':
                iconI.className = 'fas fa-exclamation-circle';
                break;
            case 'warning':
                iconI.className = 'fas fa-exclamation-triangle';
                break;
            default:
                iconI.className = 'fas fa-info-circle';
        }
        icon.appendChild(iconI);

        const content = document.createElement('div');
        content.className = 'notification-content';
        const titleEl = document.createElement('h3');
        titleEl.className = 'notification-title';
        titleEl.textContent = title;
        const messageEl = document.createElement('p');
        messageEl.className = 'notification-message';
        messageEl.textContent = message;
        content.appendChild(titleEl);
        content.appendChild(messageEl);

        const closeBtn = document.createElement('button');
        closeBtn.className = 'notification-close';
        closeBtn.setAttribute('aria-label', 'Close notification');
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        closeBtn.addEventListener('click', () => {
            hideNotification(notification);
        });

        notification.appendChild(icon);
        notification.appendChild(content);
        notification.appendChild(closeBtn);

        container.appendChild(notification);

        // Show animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        // Auto dismiss
        setTimeout(() => {
            hideNotification(notification);
        }, duration);
    }

    function hideNotification(notification) {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    // Show welcome notification on page load
    setTimeout(() => {
        showNotification('Welcome Back!', 'You\'ve successfully logged in to your account.', 'success');
    }, 1000);

    // Dashboard sidebar toggle for mobile
    const dashboardToggle = document.getElementById('dashboard-menu-toggle');
    const menuList = document.getElementById('dashboard-menu-list');
    if (dashboardToggle && menuList) {
        dashboardToggle.addEventListener('click', function () {
            const expanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !expanded);
            menuList.classList.toggle('active');
        });
    }

    // Mobile menu toggle
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', function () {
            const expanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !expanded);
            mobileMenu.setAttribute('aria-hidden', expanded);
            mobileMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }

    // Quick view modal handling
    const quickViewModal = document.getElementById('quick-view-modal');
    const quickViewButtons = document.querySelectorAll('.quick-view-btn');
    const modalCloseBtn = quickViewModal ? quickViewModal.querySelector('.modal-close') : null;

    quickViewButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (!quickViewModal) return;
            // Load product details dynamically here if needed
            quickViewModal.setAttribute('aria-hidden', 'false');
            quickViewModal.style.display = 'block';
        });
    });

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', () => {
            if (!quickViewModal) return;
            quickViewModal.setAttribute('aria-hidden', 'true');
            quickViewModal.style.display = 'none';
        });
    }

    // Logout functionality
    const logoutButtons = document.querySelectorAll('#logout-link, #mobile-logout-link, #logout-btn');
    logoutButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            if (confirm('Are you sure you want to log out?')) {
                showNotification('Logged Out', 'You have successfully logged out.', 'info');
                setTimeout(() => {
                    window.location.href = '/login';
                }, 1500);
            }
        });
    });

    // Back to top button
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Cookie consent banner
    const cookieConsent = document.getElementById('cookie-consent');
    const acceptBtn = document.querySelector('.btn-cookie-accept');
    if (cookieConsent && acceptBtn) {
        if (!localStorage.getItem('cookiesAccepted')) {
            setTimeout(() => {
                cookieConsent.classList.add('active');
            }, 2000);
        }

        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieConsent.classList.remove('active');
        });
    }

    // Announcement bar close button
    const closeAnnouncement = document.querySelector('.close-announcement');
    if (closeAnnouncement) {
        closeAnnouncement.addEventListener('click', () => {
            const announcementBar = document.getElementById('announcement-bar');
            if (announcementBar) {
                announcementBar.style.display = 'none';
                sessionStorage.setItem('announcementClosed', 'true');
            }
        });

        if (sessionStorage.getItem('announcementClosed')) {
            const announcementBar = document.getElementById('announcement-bar');
            if (announcementBar) {
                announcementBar.style.display = 'none';
            }
        }
    }
});
