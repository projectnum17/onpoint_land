const branchesHandler = () => {
    if (typeof Swiper === 'undefined') return;

    const sliderEl = document.querySelector('.js-branches-slider');
    if (!sliderEl) return;

    const slider = new Swiper(sliderEl, {
        slidesPerView: 1,
        spaceBetween: 60,
        speed: 900,
        grabCursor: true,
        navigation: {
            prevEl: '.js-branches-prev',
            nextEl: '.js-branches-next',
        },
    });
};

export default branchesHandler;
