const faqHandler = () => {
    const faqBoxes = document.querySelectorAll('.js-faq-box');

    if (!faqBoxes.length) return;

    faqBoxes[0].classList.add('is-active');

    faqBoxes.forEach((box) => {
        box.addEventListener('click', () => {
            const isActive = box.classList.contains('is-active');

            faqBoxes.forEach((b) => b.classList.remove('is-active'));

            if (!isActive) box.classList.add('is-active');
        });
    });
};

export default faqHandler;
