const headerScroll = () => {
    const header = document.querySelector('.js-header');
    if (!header) return;

    let lastScroll = 0;

    const handleScroll = () => {
        const currentScroll = window.scrollY;

        currentScroll > 100
            ? header.classList.add('is-scrolled')
            : header.classList.remove('is-scrolled');

        if (currentScroll > lastScroll && currentScroll > 100) {
            header.classList.add('is-transform');
        } else {
            header.classList.remove('is-transform');
        }

        lastScroll = currentScroll;
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
};

export default headerScroll;
