const ctaHover = () => {
    const buttons = document.querySelectorAll('.cta');

    buttons.forEach((button) => {
        const span = button.querySelector('span');

        const handleMouseAction = (e) => {
            const rect = button.getBoundingClientRect();

            const relX = e.clientX - rect.left;
            const relY = e.clientY - rect.top;

            if (span) {
                span.style.top = `${relY}px`;
                span.style.left = `${relX}px`;
            }
        };

        button.addEventListener('mouseenter', handleMouseAction);
        button.addEventListener('mouseleave', handleMouseAction);
    });
};

export default ctaHover;
