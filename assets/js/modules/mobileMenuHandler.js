const mobileMenuHandler = () => {
    const menu = document.querySelector('.js-menu');
    const menuTrigger = document.querySelector('.js-menu-trigger');
    const menuLinks = menu.querySelectorAll('a');

    if (!menu || !menuTrigger) return;

    const openHandler = () => {
        document.body.style.overflow = 'hidden';
        menu.classList.add('is-active');
        menuTrigger.classList.add('is-active');
    };

    const closeHandler = () => {
        document.body.style.overflow = '';
        menu.classList.remove('is-active');
        menuTrigger.classList.remove('is-active');
    };

    const toggleMenu = () => {
        const isActive = menu.classList.contains('is-active');
        isActive ? closeHandler() : openHandler();
    };

    menuTrigger.addEventListener('click', toggleMenu);
    menuLinks.forEach((link) => link.addEventListener('click', closeHandler));
};

export default mobileMenuHandler;
