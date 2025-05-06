document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('dashboard-menu-toggle');
    const menuList = document.getElementById('dashboard-menu-list');
    const loginNotification = document.getElementById('login-notification');

    if (toggleButton && menuList) {
        toggleButton.addEventListener('click', function () {
            const isActive = menuList.classList.toggle('active');
            toggleButton.setAttribute('aria-expanded', isActive);
        });
    }

    // Show login notification at top and hide after 4 seconds
    if (loginNotification) {
        loginNotification.classList.add('show');
        setTimeout(() => {
            loginNotification.classList.add('hide');
            loginNotification.classList.remove('show');
        }, 4000);
        // Remove from DOM after animation
        loginNotification.addEventListener('animationend', () => {
            if (loginNotification.classList.contains('hide')) {
                loginNotification.style.display = 'none';
            }
        });
    }

    // Show logout notification if URL param logged_out=1
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('logged_out') === '1') {
        const logoutNotification = document.getElementById('logout-notification');
        if (logoutNotification) {
            logoutNotification.classList.add('show');
            setTimeout(() => {
                logoutNotification.classList.add('hide');
                logoutNotification.classList.remove('show');
            }, 4000);
            logoutNotification.addEventListener('animationend', () => {
                if (logoutNotification.classList.contains('hide')) {
                    logoutNotification.style.display = 'none';
                }
            });
        }
        // Remove the query param from URL without reloading
        if (history.replaceState) {
            const cleanUrl = window.location.origin + window.location.pathname;
            history.replaceState(null, '', cleanUrl);
        }
    }
});
