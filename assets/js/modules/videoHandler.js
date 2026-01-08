const videoHandler = () => {
    const videoWrapper = document.querySelector('.js-video-wrapper');
    const videoItem = document.querySelector('.js-video');
    const videoPlay = document.querySelector('.js-video-play');

    if (!videoItem || !videoPlay || !videoWrapper) return;

    const exitFullscreen = () => {
        if (
            document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.msFullscreenElement
        ) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    };

    const showPlayButton = () => {
        videoPlay.classList.remove('is-hide');
        videoItem.removeAttribute('controls');
        exitFullscreen();
    };

    const hidePlayButton = () => {
        videoPlay.classList.add('is-hide');
        videoItem.setAttribute('controls', 'controls');
    };

    videoItem.addEventListener('play', hidePlayButton);
    videoItem.addEventListener('pause', showPlayButton);
    videoItem.addEventListener('ended', showPlayButton);

    videoWrapper.addEventListener('click', (e) => {
        if (e.target === videoItem) return;

        videoItem.paused ? videoItem.play() : videoItem.pause();
    });

    videoPlay.addEventListener('click', (e) => {
        e.stopPropagation();
        videoItem.play();
    });
};

export default videoHandler;
