const videoHandler = () => {
    const videoWrapper = document.querySelector('.js-video-wrapper');
    const videoItem = document.querySelector('.js-video');
    const videoPlay = document.querySelector('.js-video-play');

    if (!videoItem || !videoPlay || !videoWrapper) return;

    videoItem.addEventListener('play', () => {
        videoPlay.classList.add('is-hide');
    });

    videoItem.addEventListener('pause', () => {
        videoPlay.classList.remove('is-hide');
    });

    videoItem.addEventListener('ended', () => {
        videoPlay.classList.remove('is-hide');
    });

    videoWrapper.addEventListener('click', () => {
        if (videoItem.paused) {
            videoItem.play();
        } else {
            videoItem.pause();
        }
    });
};

export default videoHandler;
