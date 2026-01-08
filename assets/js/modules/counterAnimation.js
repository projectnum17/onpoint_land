const counterAnimation = () => {
    const odometerElements = document.querySelectorAll('.js-odometer');

    odometerElements.forEach((el) => {
        const targetValue = parseInt(el.getAttribute('data-number'));

        const odometer = new Odometer({
            el: el,
            value: 0,
            format: '(.ddd)',
            duration: 2000,
        });

        let hasRun = false;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasRun) {
                        setTimeout(() => {
                            odometer.update(targetValue);
                        }, 100);
                        hasRun = true;
                        observer.unobserve(el);
                    }
                });
            },
            {
                threshold: 0.5,
            }
        );

        observer.observe(el);
    });
};
export default counterAnimation;
