const carouselHandler = () => {
    if (typeof Swiper === 'undefined') return;

    const sliderEl = document.querySelector('.js-carousel-slider');
    if (!sliderEl) return;

    const slider = new Swiper(sliderEl, {
        slidesPerView: 2.2,
        spaceBetween: 24,
        speed: 900,
        grabCursor: true,
        navigation: {
            prevEl: '.js-carousel-prev',
            nextEl: '.js-carousel-next',
        },
    });
};

export default carouselHandler;
