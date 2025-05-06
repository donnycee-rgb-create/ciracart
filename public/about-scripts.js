document.addEventListener('DOMContentLoaded', function () {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabPanes = document.querySelectorAll('.tab-pane');

  function activateTab(tabName) {
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabPanes.forEach(pane => pane.classList.remove('active'));

    const buttonToActivate = Array.from(tabButtons).find(btn => btn.getAttribute('data-tab') === tabName);
    if (buttonToActivate) {
      buttonToActivate.classList.add('active');
    }
    const paneToActivate = document.getElementById(tabName);
    if (paneToActivate) {
      paneToActivate.classList.add('active');
    }
  }

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.getAttribute('data-tab');
      activateTab(targetTab);
      // Update URL hash without page jump
      history.replaceState(null, '', '#' + targetTab);
    });
  });

  // On page load, check URL hash and activate corresponding tab
  const hash = window.location.hash.substring(1);
  if (hash) {
    activateTab(hash);
  }
});
