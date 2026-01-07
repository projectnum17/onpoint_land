'use strict';

import headerScroll from './modules/headerScroll.js';
import faqHandler from './modules/faqHandler.js';
import carouselHandler from './modules/carouselHandler.js';
import branchesHandler from './modules/branchesHandler.js';
import videoHandler from './modules/videoHandler.js';

document.addEventListener('DOMContentLoaded', () => {
    headerScroll();
    faqHandler();
    carouselHandler();
    branchesHandler();
    videoHandler();
});
