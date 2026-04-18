import Swiper from 'swiper';
import { A11y, Navigation,Thumbs, Autoplay } from 'swiper/modules';

window.Swiper = Swiper;



export function initSwiper() {

    const historyMainSliderElement = document.querySelector('.swiper-business-history_main') as HTMLElement;
    const historyPreviewSliderElement = document.querySelector('.swiper-business-history_preview') as HTMLElement;

    if (historyMainSliderElement || historyPreviewSliderElement) {

        // Инициализация превью слайдера
        const previewSwiper = new Swiper(historyPreviewSliderElement, {
            modules: [A11y],
            breakpoints: {
                320: { slidesPerView: 'auto', spaceBetween: 4 },
                991: { slidesPerView: 3.2, spaceBetween: 12 },
                1050: { slidesPerView: 3.8, spaceBetween: 16 },
                1400: { slidesPerView: 4, spaceBetween: 24 },
            },
            watchSlidesProgress: true,
        });

        // Инициализация основного слайдера
        const mainSwiper = new Swiper(historyMainSliderElement, {
            modules: [Navigation, Thumbs, A11y],
            slidesPerView: 1,
            spaceBetween: 20,
            noSwiping: true,
            noSwipingClass: 'swiper-slide',
            breakpoints: {
                991: {
                    noSwiping: false,
                }
            },
            navigation: {
                nextEl: '.swiper-btn-type-1.--next',
                prevEl: '.swiper-btn-type-1.--prev',
            },
            thumbs: {
                swiper: previewSwiper,
            },
        });
    }

    // Общие параметры для всех слайдеров
    const commonOptions = {};

    // Инициализация всех слайдеров с базовыми параметрами
    const sliders = document.querySelectorAll('.swiper-container');

    sliders.forEach((slider) => {
        // Проверка типа элемента и приведение к HTMLElement
        if (slider instanceof HTMLElement) {
            // Уникальные параметры для каждого слайдера через класс
            let uniqueOptions = { ...commonOptions };

            if (slider.classList.contains('swiper-gallery')) {
                // Настройки для slider-1
                uniqueOptions = {
                    ...uniqueOptions,
                    modules: [Navigation, A11y],
                    a11y: true,
                    slidesPerView: 1,
                    spaceBetween: 20,
                    navigation: {
                        nextEl: '.swiper-arrow-next',
                        prevEl: '.swiper-arrow-prev',
                    },
                };
            }

            if (slider.classList.contains('swiper-numbers')) {
                // Настройки для slider-1
                uniqueOptions = {
                    ...uniqueOptions,
                    modules: [Navigation, A11y],
                    a11y: true,

                    navigation: {
                        nextEl: '.swiper-arrow-next',
                        prevEl: '.swiper-arrow-prev',
                    },
                    breakpoints: {
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                            autoHeight: true,
                        },
                        991: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                            autoHeight: false,
                        },
                        1400: {
                            slidesPerView: 3,
                            spaceBetween: 24,
                        }
                    }
                };
            }

            if (slider.classList.contains('swiper-history')) {
                const swiper = new Swiper(slider, {
                    loop: false,
                    slidesPerView: 'auto',
                    breakpoints: {
                        320: { slidesPerView: 'auto', spaceBetween: 20 },
                        991: { slidesPerView: 'auto', spaceBetween: 20 },
                        1400: { slidesPerView: 'auto', spaceBetween: 24 },
                    },
                });

                const slides = Array.from(slider.querySelectorAll<HTMLElement>('.swiper-slide'));
                let activeIndex = 0;
                let isAnimating = false;

                // Фикс начальной позиции
                swiper.update();
                swiper.slideTo(activeIndex, 0, false);

                const setActive = (index: number) => {
                    slides.forEach(slide => slide.classList.remove('slide-active'));
                    slides[index].classList.add('slide-active');
                    activeIndex = index;
                };

                // Инициализация активного слайда
                setActive(swiper.activeIndex);

                const animateToSlide = (index: number) => {
                    if (isAnimating || index === activeIndex) return;
                    isAnimating = true;

                    const oldSlide = slides[activeIndex];
                    const newSlide = slides[index];

                    // Добавляем класс активного слайда новому
                    newSlide.classList.add('slide-active');
                    // Убираем у старого
                    oldSlide.classList.remove('slide-active');

                    // Ждём окончания CSS transition
                    setTimeout(() => {
                        swiper.update(); // пересчёт размеров (учитывает ширину нового активного)
                        swiper.slideTo(index, 200, false); // сдвигаем без анимации
                        activeIndex = index;
                        isAnimating = false;
                    }, 600); // время = transition из CSS
                };

                // Клик по слайдам
                slides.forEach((slide, index) => {
                    slide.addEventListener('click', () => {
                        animateToSlide(index);
                    });
                });

                // Навигация стрелками
                const nextBtn = slider.querySelector<HTMLElement>('.swiper-arrow-next');
                const prevBtn = slider.querySelector<HTMLElement>('.swiper-arrow-prev');

                nextBtn?.addEventListener('click', (e) => {
                    e.preventDefault();
                    const nextIndex = Math.min(activeIndex + 1, slides.length - 1);
                    animateToSlide(nextIndex);
                });

                prevBtn?.addEventListener('click', (e) => {
                    e.preventDefault();
                    const prevIndex = Math.max(activeIndex - 1, 0);
                    animateToSlide(prevIndex);
                });
            }

            if (slider.classList.contains('swiper-family')) {
                // Настройки для slider-1
                uniqueOptions = {
                    ...uniqueOptions,
                    modules: [Navigation, A11y],
                    a11y: true,
                    navigation: {
                        nextEl: '.swiper-arrow-next',
                        prevEl: '.swiper-arrow-prev',
                    },
                    breakpoints: {
                        320: { slidesPerView: 1, spaceBetween: 20 },
                        600: { slidesPerView: 2, spaceBetween: 20 },
                        991: { slidesPerView: 2.6, spaceBetween: 20 },
                        1400: { slidesPerView: 4, spaceBetween: 24 },
                    },
                };
            }

            if (slider.classList.contains('swiper-catd-info-tab')) {
                // Находим уникальный контейнер для этого слайдера
                const sliderContainer = slider.closest('.catd-info-tab__box-swiper');
                
                if (sliderContainer) {
                    // Настройки для slider-1 с уникальными селекторами
                    uniqueOptions = {
                        ...uniqueOptions,
                        modules: [Navigation, A11y],
                        a11y: true,
                        navigation: {
                            nextEl: sliderContainer.querySelector('.swiper-arrow-next'),
                            prevEl: sliderContainer.querySelector('.swiper-arrow-prev'),
                        },
                        breakpoints: {
                            320: { slidesPerView: 1.3, spaceBetween: 12 },
                            600: { slidesPerView: 2, spaceBetween: 16 },
                            991: { slidesPerView: 4, spaceBetween: 16 },
                            1400: { slidesPerView: 4.3, spaceBetween: 16 },
                        },
                    };
                }
            }

            if (slider.classList.contains('swiper-events')) {
                // Настройки для slider-1
                uniqueOptions = {
                    ...uniqueOptions,
                    modules: [Navigation, A11y],
                    a11y: true,
                    navigation: {
                        nextEl: '.swiper-arrow-next',
                        prevEl: '.swiper-arrow-prev',
                    },
                    breakpoints: {
                        320: { slidesPerView: 1, spaceBetween: 20 },
                        600: { slidesPerView: 2, spaceBetween: 20 },
                        991: { slidesPerView: 2.1, spaceBetween: 20 },
                        1400: { slidesPerView: 3, spaceBetween: 24 },
                    },
                };
            }

            if (slider.classList.contains('swiper-business-history_gallery')) {
                // Настройки для slider-1
                uniqueOptions = {
                    ...uniqueOptions,
                    modules: [Navigation, A11y],
                    a11y: true,
                    navigation: {
                        nextEl: '.swiper-btn-type-2.--next',
                        prevEl: '.swiper-btn-type-2.--prev',
                    },
                    slidesPerView: 1,
                    spaceBetween: 8,
                };
            }

            if (slider.classList.contains('swiper-photo-gallery')) {
                // Настройки для slider-1
                uniqueOptions = {
                    ...uniqueOptions,
                    modules: [Navigation, A11y],
                    a11y: true,
                    breakpoints: {
                        320: { slidesPerView: 1.4, spaceBetween: 12 },
                        450: { slidesPerView: 2, spaceBetween: 16 },
                        600: { slidesPerView: 2.6, spaceBetween: 24 },
                        1100: { slidesPerView: 3, spaceBetween: 24 },
                    },
                };
            }
            // Инициализируем слайдер с уникальными параметрами
            const swiper = new Swiper(slider, uniqueOptions);
        }
    });
}

