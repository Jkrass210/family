import { lazyLoadMedia } from './utils/lazyload';
import { initSwiper } from './library/swiper';
import { initFancybox } from './library/fancybox';
import { initValid } from './library/jquery';
import { initNotyf } from './library/notification';
import { initializeTabs } from './library/tabs';
import { initTooltip } from './library/typpy';
import { initMarquee } from './library/marquee';
import { modal } from './library/modal';
import { initAccordion } from './library/accordion';
import {header} from "./main/header";
import {video} from "./main/video";
import 'dragscroll';
import {initNumberAnimationTrigger} from "./main/animateNumber";
import {initDropDownTabs} from "./main/dropDownTab";
import {tableScroll} from "./main/tableScroll";
import {initSmoothScrollToBlocks} from "./main/initSmoothScrollToBlocks";
import {initShowMoreList} from "./main/initShowMoreList";
import {initDropDownForm} from "./main/initDropDownForm";
import {initSmoothNavigation} from "./main/initSmoothNavigation";
import {initScrollShadows} from "./main/initScrollShadows";
import {initFileInput} from "./main/initFileInput";
import {initMissionAchievement} from "./main/missionAchievement";


document.addEventListener('DOMContentLoaded', () => {
    lazyLoadMedia();
    header();
    initNumberAnimationTrigger();
    //initAccordion();
    initSwiper();
    initValid();
    initFancybox();
    tableScroll();
    initSmoothScrollToBlocks();
    
    // initNotyf();
    initializeTabs();
    video();
    // initTooltip();
    // initMarquee();
    // modal;
    initFileInput();
    initDropDownTabs();
    initShowMoreList();
    initDropDownForm();
    initSmoothNavigation();
    initScrollShadows('.static-table');
    initMissionAchievement();
});

