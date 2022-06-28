import {mmodal} from './modal';
import {bindModalForm, bindForm} from "./bindForm";
import {PhoneMask} from "./PhoneMask";

window.addEventListener('load', () => {

    const frontTabs = (node) => {
        if (!node) {
            return false;
        }

        const checkbox = node.querySelector('.front-tabs__toggle input');

        const toggleTab = (targetIndex) => {
            node.querySelector(`.front-tabs__head-item_active`).classList.remove('front-tabs__head-item_active');
            node.querySelector(`.front-tabs__head-item[data-target="${targetIndex}"]`).classList.add('front-tabs__head-item_active');

            node.querySelector(`.front-tabs__content-item_active`).classList.remove('front-tabs__content-item_active');
            node.querySelector(`.front-tabs__content-item[data-target="${targetIndex}"]`).classList.add('front-tabs__content-item_active');

            checkbox.checked = targetIndex === '2';
        }

        for (const control of node.querySelectorAll('.front-tabs__head-item')) {
            control.addEventListener('click', (e) => {
                e.preventDefault();
                if (control.classList.contains('front-tabs__head-item_active')) {
                    return false;
                }

                toggleTab(control.getAttribute('data-target'));
            })
        }


        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                toggleTab("2");
                return true;
            }
            toggleTab("1");
        })
    }
    frontTabs(document.querySelector('.front-tabs'));


    const bindMenu = (node) => {
        if (!node) {
            return false;
        }

        const menu = document.querySelector('.header__menu');

        if (!menu) {
            return false;
        }

        node.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector('.header__menu').classList.toggle('header__menu_open');
        });

        const buttons = menu.querySelectorAll('.w-children button');

        for (const button of buttons) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                if (!button.classList.contains('open')) {
                    menu.querySelector('.w-children .open')
                    && menu.querySelector('.w-children .open').classList.remove('open');
                    button.classList.add('open');
                } else {
                    button.classList.remove('open');
                }
            })
        }

    }
    bindMenu(document.querySelector('.header__burger'));


    const frontSlider = (node) => {
        if (!node) {
            return false;
        }

        return new Swiper(node, {
            direction: 'horizontal',
            loop: true,
            preloadImages: false,
            lazy: true,
            watchSlidesProgress: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });
    }
    frontSlider(document.querySelector('.front-slider .swiper'));

    const addShowMoreToCardsList = (node, maxWidth = 1050) => {
        if (!node) {
            return false;
        }

        const check = () => {
            if (window.matchMedia('(max-width:' + maxWidth + 'px)').matches
                && !node.querySelector('.cards-list__btn')) {
                return true;
            }
            return false;
        }

        const addToggle = () => {
            const btn = document.createElement('button');
            btn.setAttribute('type', 'button');
            btn.classList.add('cards-list__btn');
            btn.innerText = 'Смотреть все';

            node.append(btn);

            node.classList.toggle('cards-list_short');

            btn.addEventListener('click', (e) => {
                e.preventDefault();
                node.classList.toggle('cards-list_short')
                btn.innerText = btn.innerText === 'Смотреть все' ? 'Свернуть' : 'Смотреть все';
            })
        }

        if (check()) {
            addToggle();
        }

        window.addEventListener('resize', () => {
            if (check()) {
                addToggle();
            }
        })

    }
    addShowMoreToCardsList(document.querySelector('.cards-list'));

    const calcMinHeight = (nodeList) => {
        let height = 0;

        for (const item of nodeList) {
            height = item.offsetHeight > height ? item.offsetHeight : height;
        }

        return height;
    }


    const bindFaq = (node) => {
        if (!node) {
            return false;
        }

        const items = node.querySelectorAll('.faq__item');
        const minHeight = window.matchMedia('(min-width: 1101px)').matches ? calcMinHeight(items) : 0;

        for (const item of items) {
            item.querySelector('.faq__item-head').style.minHeight = minHeight + 'px';
            item.querySelector('.faq__item-head').addEventListener('click', (e) => {
                e.preventDefault();
                item.classList.toggle('faq__item_show');
            })
        }

    }
    bindFaq(document.querySelector('.faq'));

    const bindGallery4 = (node) => {
        if (!node) {
            return false;
        }
        return new Swiper(node, {
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 32,
            preloadImages: false,
            lazy: true,
            watchSlidesProgress: true,
            pagination: {
                el: ".swiper-pagination",
                type: "fraction",
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            breakpoints: {
                1350: {
                    slidesPerView: 4,
                    slidesPerGroup: 4,
                },
                980: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                },
                680: {
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                },
            }
        })
    }

    for (const gallery of document.querySelectorAll('.js-gallery-4-items')) {
        bindGallery4(gallery);
    }

    const bindGalleryFw = (node) => {
        if (!node) {
            return false;
        }

        return new Swiper(node, {
            initialSlide: 1,
            slidesPerView: 'auto',
            watchSlidesProgress: true,
            //slidesPerGroupAuto: true,
            centeredSlides: true,
            preloadImages: false,
            lazy: true,
            //loop: true,
            spaceBetween: 32,
            pagination: {
                el: ".swiper-pagination",
                type: "fraction",
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        })
    }

    for (const gallery of document.querySelectorAll('.js-gallery-auto-items')) {
        bindGalleryFw(gallery);
    }


    const copyElement = (selector, targetParent, mQuery) => {
        const element = document.querySelector(selector);
        const target = document.querySelector(targetParent);

        if (!element || !target) {
            return false;
        }

        const pasteClone = () => {
            if (window.matchMedia(mQuery).matches && !target.innerHTML.trim(' ')) {
                target.append(element.cloneNode(true))
            }
        };

        pasteClone();

        window.addEventListener('resize', pasteClone);

    }

    copyElement('.about-goods__list', '.about-goods__list-mobile', '(max-width: 1100px)');

    const expandBlock = (triggerSelector, targetSelector) => {
        const element = document.querySelector(triggerSelector);
        const target = document.querySelector(targetSelector);

        if (!element || !target) {
            return false;
        }

        element.addEventListener('click', (e) => {
            e.preventDefault();
            element.classList.toggle('m-open');
            target.classList.toggle('m-open');
        })
    }

    expandBlock('.btn_icon-expand', '.about-goods__list-mobile');


    // инициализация кастомных модалок
    const on = (element, eventName, selector, fn) => {
        if (typeof element !== 'undefined' && element) {

            element.addEventListener(eventName, (event) => {

                const possibleTargets = element.querySelectorAll(selector);
                const target = event.target;

                for (let i = 0; i < possibleTargets.length; i += 1) {
                    let el = target;
                    const p = possibleTargets[i];

                    while (el && el !== element) {
                        if (el === p) {
                            return fn.call(p, event);
                        }
                        el = el.parentNode;
                    }
                }
            });
        }

    }

    on(document.body, 'click', '.js-modal', (e) => {
        e.preventDefault();
        mmodal(e.target, bindModalForm);
        e.stopPropagation();
    });

    // привязка форм
    const forms = document.querySelectorAll('.js-form');
    for (const form of forms) {
        bindForm(form);
    }


    const elemInViewport = (elem, full) => {
        const box = elem.getBoundingClientRect(),
            top = box.top,
            left = box.left,
            bottom = box.bottom,
            right = box.right,
            width = document.documentElement.clientWidth,
            height = document.documentElement.clientHeight,
            maxWidth = full ? right - left : 0,
            maxHeight = full ? bottom - top : 0;

        return Math.min(height, bottom) - Math.max(0, top) >= maxHeight && Math.min(width, right) - Math.max(0, left) >= maxWidth;
    }

    const animateImages = () => {
        const aboutGoodsImg = document.querySelector('.about-goods__img');
        const aboutGoodsItems = document.querySelectorAll('.about-goods__list-item');
        const aboutGoodsSum = document.querySelector('.about-goods__sum');
        const questionBlock = document.querySelector('.questions-block');

        if (!aboutGoodsImg && !questionBlock && !aboutGoodsItems.length && aboutGoodsSum) {
            return false;
        }

        aboutGoodsImg && aboutGoodsImg.classList.add('about-goods__img_hidden');
        aboutGoodsSum && aboutGoodsSum.classList.add('about-goods__sum_hidden');
        for (const item of aboutGoodsItems) {
            item.classList.add('about-goods__list-item_hidden')
        }

        window.addEventListener('scroll', () => {
            if (aboutGoodsImg && elemInViewport(aboutGoodsImg, false)) {
                aboutGoodsImg.classList.remove('about-goods__img_hidden');
            }

            if (questionBlock && elemInViewport(questionBlock, true)) {
                questionBlock.classList.add('questions-block_show-img');
            }

            if (aboutGoodsSum && elemInViewport(aboutGoodsSum, true)) {
                aboutGoodsSum.classList.remove('about-goods__sum_hidden');
            }

            for (const item of aboutGoodsItems) {
                if (elemInViewport(item, true)) {
                    item.classList.remove('about-goods__list-item_hidden');
                }
            }

        })
    }

    animateImages();

})
