const nav = document.getElementById('navbar');
const menuButton = document.getElementById('mobile-menu-btn');
const menu = document.getElementById('mobile-menu');
function closeMenu() {
    menu.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation menu');
}
menuButton.addEventListener('click', () => {
    const open = menu.hidden;
    menu.hidden = !open;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
});
menu.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !menu.hidden) { closeMenu(); menuButton.focus(); }
});
document.addEventListener('click', event => { if (!nav.contains(event.target)) closeMenu(); });
const desktop = window.matchMedia('(min-width: 768px)');
desktop.addEventListener('change', event => { if (event.matches) closeMenu(); });
function updateNav() { nav.classList.toggle('nav-scrolled', window.scrollY > 50); }
window.addEventListener('scroll', updateNav, { passive: true });
updateNav();
const tabs = [...document.querySelectorAll('[role="tab"]')];
function selectTab(selected) {
    tabs.forEach(tab => {
        const active = tab === selected;
        tab.setAttribute('aria-selected', String(active));
        tab.tabIndex = active ? 0 : -1;
        tab.classList.toggle('tab-active', active);
        tab.classList.toggle('text-stone-400', !active);
        const panel = document.getElementById(tab.getAttribute('aria-controls'));
        panel.hidden = !active;
        panel.classList.toggle('hidden', !active);
    });
}
tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectTab(tab));
    tab.addEventListener('keydown', event => {
        let next;
        if (event.key === 'ArrowRight') next = tabs[(index + 1) % tabs.length];
        if (event.key === 'ArrowLeft') next = tabs[(index - 1 + tabs.length) % tabs.length];
        if (event.key === 'Home') next = tabs[0];
        if (event.key === 'End') next = tabs[tabs.length - 1];
        if (next) { event.preventDefault(); selectTab(next); next.focus(); }
    });
});
document.getElementById('copyright-year').textContent = new Date().getFullYear();
