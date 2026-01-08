'use strict';

import headerScroll from './modules/headerScroll.js';
import mobileMenuHandler from './modules/mobileMenuHandler.js';
import counterAnimation from './modules/counterAnimation.js';
import faqHandler from './modules/faqHandler.js';
import carouselHandler from './modules/carouselHandler.js';
import branchesHandler from './modules/branchesHandler.js';
import videoHandler from './modules/videoHandler.js';
import ctaHover from './modules/ctaHover.js';

const animationsHandler = () => {
    const animateBounceElements = () => {
        const bounceElements = document.querySelectorAll('.js-bounce-anim');
        if (!bounceElements.length) return;

        let mm = gsap.matchMedia();
        mm.add('(min-width: 992px', () => {
            bounceElements.forEach((be) => {
                gsap.from(be, {
                    autoAlpha: 0,
                    yPercent: 200,
                    delay: 0.3,
                    duration: 1,
                    ease: 'back.out(1)',
                });
            });
        });

        mm.add('(max-width: 991px', () => {
            bounceElements.forEach((be) => {
                gsap.from(be, {
                    autoAlpha: 0,
                    yPercent: 10,
                    delay: 0.3,
                    duration: 1,
                    ease: 'back.out(1)',
                });
            });
        });
    };

    const animateMoveElements = () => {
        const moveElements = document.querySelectorAll('.js-move-animate');
        if (!moveElements.length) return;

        let mm = gsap.matchMedia();
        mm.add('(min-width: 992px', () => {
            moveElements.forEach((me) => {
                gsap.set(me, {
                    yPercent: -2,
                    force3D: true,
                    willChange: 'transform',
                });

                gsap.to(me, {
                    yPercent: 5,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: me,
                        scrub: true,
                        fastScrollEnd: true,
                        preventOverlaps: true,
                    },
                });
            });
        });
    };

    const animateTitlesElements = () => {
        const titlesElements = document.querySelectorAll('.js-title-anim');
        if (!titlesElements.length) return;

        const splits = Array.from(titlesElements).map((title) => {
            const s = new SplitText(title, { type: 'words, chars' });
            gsap.set(s.chars, {
                opacity: 0,
                y: 20,
                willChange: 'transform, opacity',
                force3D: true,
            });
            return { el: title, split: s };
        });

        ScrollTrigger.batch(titlesElements, {
            onEnter: (batch) => {
                batch.forEach((title) => {
                    const target = splits.find((s) => s.el === title);
                    if (target) {
                        gsap.to(target.split.chars, {
                            opacity: 1,
                            y: 0,
                            duration: 0.6,
                            ease: 'power3.out',
                            stagger: 0.02,
                            delay: 0.2,
                            overwrite: true,
                        });
                    }
                });
            },
            start: 'top 95%',
            once: true,
        });
    };

    const animationScrollingElements = (
        selector = '.js-scroll',
        options = {}
    ) => {
        const scrollingEls = document.querySelectorAll(selector);
        if (!scrollingEls.length) return;

        const defaults = {
            opacity: 0,
            y: 50,
            x: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.1,
            start: 'top 95%',
            end: 'bottom 80%',
        };

        const settings = { ...defaults, ...options };

        scrollingEls.forEach((el) => {
            gsap.from(el, {
                opacity: settings.opacity,
                y: settings.y,
                x: settings.x,
                scale: settings.scale,
                duration: settings.duration,
                ease: settings.ease,
                stagger: settings.stagger,
                scrollTrigger: {
                    trigger: el,
                    start: settings.start,
                    end: settings.end,
                    toggleActions: 'play none none reverse',
                },
            });
        });
    };

    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    animateTitlesElements();
    animateMoveElements();
    animateBounceElements();
    animationScrollingElements();

    window.addEventListener('load', () => {
        ScrollTrigger.refresh();
    });
};

document.addEventListener('DOMContentLoaded', () => {
    animationsHandler();
    counterAnimation();
    mobileMenuHandler();
    headerScroll();
    faqHandler();
    carouselHandler();
    branchesHandler();
    videoHandler();
    ctaHover();

    const loader = document.querySelector('.loader');
    window.addEventListener('load', () => {
        if (loader) {
            loader.classList.add('is-hide');
            setTimeout(() => {
                loader.remove();
            }, 500);
        }
    });
});
