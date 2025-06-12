document.addEventListener('DOMContentLoaded', function() {
    function setupNavToggle() {
        const navToggle = document.querySelector('.mobile-nav-toggle');
        const mainNav = document.getElementById('main-nav');
        if (!navToggle || !mainNav) return;
        navToggle.addEventListener('click', function() {
            const expanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !expanded);
            mainNav.classList.toggle('open');
            // Animate hamburger icon to X
            if (mainNav.classList.contains('open')) {
                document.body.classList.add('nav-open');
                navToggle.classList.add('open');
            } else {
                document.body.classList.remove('nav-open');
                navToggle.classList.remove('open');
            }
        });
    }
    const observer = new MutationObserver(() => {
        if (document.querySelector('.mobile-nav-toggle')) {
            setupNavToggle();
            observer.disconnect();
        }
    });
    observer.observe(document.getElementById('site-header'), { childList: true, subtree: true });
});
