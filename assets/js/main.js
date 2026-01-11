'use strict';

const loader = document.querySelector('.loader');
let loaderHidden = false;

const hideLoader = () => {
    if (loader && !loaderHidden) {
        loaderHidden = true;
        loader.classList.add('is-hide');
        setTimeout(() => loader.remove(), 500);
    }
};

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

    const animateCirclesSequence = () => {
        const section = document.querySelector('.circles__box');
        if (!section) return;

        gsap.to('.circles__bg', {
            rotation: 2,
            skewX: 10,
            skewY: 10,
            duration: 8,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
        });

        const items = section.querySelectorAll('.circles__item:not(.main-el)');
        const mainItem = section.querySelector('.main-el');
        const lines = section.querySelectorAll('.circles__line');
        const title = section.querySelector('.circles__title');

        if (!items.length || !mainItem || !title) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top-=100 top',
                end: `+=${items.length * 300}`,
                scrub: true,
                pin: true,
                anticipatePin: 0.5,
                invalidateOnRefresh: true
            },
        });

        items.forEach((item, index) => {
            tl.to(
                item,
                {
                    x: () =>
                        mainItem.getBoundingClientRect().left -
                        item.getBoundingClientRect().left,
                    y: () =>
                        mainItem.getBoundingClientRect().top -
                        item.getBoundingClientRect().top,
                    ease: 'power3.out',
                    duration: 1,
                },
                '+=0.2'
            );

            tl.to(
                item,
                {
                    opacity: 0,
                    duration: 0.2,
                    ease: 'power1.out',
                },
                '+=0.5'
            );

            tl.to(
                mainItem,
                {
                    scale: 1 + (index + 1) * 0.6,
                    ease: 'power2.out',
                    duration: 1,
                },
                '<'
            );

            if (lines[index]) {
                tl.to(
                    lines[index],
                    {
                        scale: 0,
                        opacity: 0,
                        transformOrigin: 'center center',
                        ease: 'power2.out',
                        duration: 1,
                    },
                    '<'
                );
            }
        });

        if (title) {
            const s = new SplitText(title, { type: 'words, chars' });
            gsap.set(s.chars, {
                opacity: 0,
                y: 20,
                willChange: 'transform, opacity',
                force3D: true,
            });

            tl.to(s.chars, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out',
                stagger: 0.03,
            });
        }
    };

    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    animateTitlesElements();
    animateMoveElements();
    animateBounceElements();
    animationScrollingElements();
    animateCirclesSequence();

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

    window.addEventListener('load', hideLoader);
    setTimeout(hideLoader, 7000);
});
