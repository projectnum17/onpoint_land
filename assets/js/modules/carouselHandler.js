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
        breakpoints: {
            0: {
                slidesPerView: 1.2,
                spaceBetween: 12,
            },
            577: {
                slidesPerView: 2,
                spaceBetween: 12,
            },
            768: {
                slidesPerView: 2.2,
                spaceBetween: 24,
            },
        },
    });
};

export default carouselHandler;
