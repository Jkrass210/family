export function tableScroll(){
    const section = document.querySelector<HTMLElement>('.finance-section')

    if (!section) {
        console.warn('Section .finance-section not found');
        return;
    }

    const tableWrapper = document.querySelector<HTMLElement>('.finance-table-wrapper');
    const table = tableWrapper?.querySelector<HTMLElement>('.finance-table');
    const fadeLeft = tableWrapper?.querySelector<HTMLElement>('.fade-left');
    const fadeRight = tableWrapper?.querySelector<HTMLElement>('.fade-right');

    const prevBtn = section.querySelector<HTMLElement>('.swiper-arrow-prev');
    const nextBtn = section.querySelector<HTMLElement>('.swiper-arrow-next');

    if (table && fadeLeft && fadeRight && prevBtn && nextBtn) {
        const checkScroll = (): void => {
            const scrollLeft: number = table.scrollLeft;
            const maxScroll: number = table.scrollWidth - table.clientWidth;

            fadeLeft.style.opacity = scrollLeft > 0 ? '1' : '0';
            fadeRight.style.opacity = scrollLeft < maxScroll ? '1' : '0';
        };

        // следим за скроллом
        table.addEventListener('scroll', checkScroll);
        window.addEventListener('resize', checkScroll);

        // стрелки
        const scrollStep: number = 300; // шаг скролла в px

        prevBtn.addEventListener('click', (e: MouseEvent) => {
            e.preventDefault();
            table.scrollBy({ left: -scrollStep, behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', (e: MouseEvent) => {
            e.preventDefault();
            table.scrollBy({ left: scrollStep, behavior: 'smooth' });
        });

        // первый вызов (на случай, если таблица уже проскроллена)
        checkScroll();
    }


}