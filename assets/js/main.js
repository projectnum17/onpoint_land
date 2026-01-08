'use strict';

import headerScroll from './modules/headerScroll.js';
import counterAnimation from './modules/counterAnimation.js';
import faqHandler from './modules/faqHandler.js';
import carouselHandler from './modules/carouselHandler.js';
import branchesHandler from './modules/branchesHandler.js';
import videoHandler from './modules/videoHandler.js';

document.addEventListener('DOMContentLoaded', () => {
    const animationsHandler = () => {
        const animateBounceElements = () => {
            const bounceElements = document.querySelectorAll('.js-bounce-anim');
            if (!bounceElements.length) return;

            bounceElements.forEach((be) => {
                gsap.from(be, {
                    autoAlpha: 0,
                    yPercent: 200,
                    delay: 0.3,
                    duration: 1,
                    ease: 'back.out(1)',
                });
            });
        };

        const animateMoveElements = () => {
            const moveElements = document.querySelectorAll('.js-move-animate');
            if (!moveElements.length) return;

            moveElements.forEach((me) => {
                gsap.set(me, {
                    yPercent: -2,
                    force3D: true,
                    willChange: 'transform',
                });

                gsap.to(me, {
                    yPercent: 7,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: me,
                        scrub: true,
                        fastScrollEnd: true,
                        preventOverlaps: true,
                    },
                });
            });
        };

        const animateTitlesElements = () => {
            const titlesElements = document.querySelectorAll('.js-title-anim');
            if (!titlesElements.length) return;

            const splits = Array.from(titlesElements).map((title) => {
                const s = new SplitText(title, { type: 'words, chars' });
                gsap.set(s.chars, {
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
                            gsap.from(target.split.chars, {
                                opacity: 0,
                                y: 20,
                                duration: 0.4,
                                ease: 'power3.out',
                                stagger: 0.02,
                                overwrite: 'auto',
                            });
                        }
                    });
                },
                once: true,
            });
        };

        const lenis = new Lenis();
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => lenis.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);

        animateTitlesElements();
        animateMoveElements();
        animateBounceElements();

        window.addEventListener('load', () => {
            ScrollTrigger.refresh();
        });
    };

    animationsHandler();
    counterAnimation();
    headerScroll();
    faqHandler();
    carouselHandler();
    branchesHandler();
    videoHandler();
});
