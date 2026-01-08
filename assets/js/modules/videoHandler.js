const videoHandler = () => {
    const videoWrapper = document.querySelector('.js-video-wrapper');
    const videoItem = document.querySelector('.js-video');
    const videoPlay = document.querySelector('.js-video-play');

    if (!videoItem || !videoPlay || !videoWrapper) return;

    let isLoaded = false;

    const loadVideo = () => {
        const source = videoItem.querySelector('source');
        if (source && source.dataset.src) {
            source.src = source.dataset.src;
            videoItem.load();
            isLoaded = true;
        }
    };

    const exitFullscreen = () => {
        const fullscreenDoc =
            document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.msFullscreenElement;
        if (fullscreenDoc) {
            if (document.exitFullscreen) document.exitFullscreen();
            else if (document.webkitExitFullscreen)
                document.webkitExitFullscreen();
            else if (document.msExitFullscreen) document.msExitFullscreen();
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

    const togglePlay = async () => {
        if (!isLoaded) {
            loadVideo();
        }

        try {
            if (videoItem.paused) {
                await videoItem.play();
            } else {
                videoItem.pause();
            }
        } catch (err) {
            console.error(err);
        }
    };

    videoWrapper.addEventListener('click', (e) => {
        if (e.target === videoItem) return;
        togglePlay();
    });

    videoPlay.addEventListener('click', (e) => {
        e.stopPropagation();
        togglePlay();
    });
};

export default videoHandler;
