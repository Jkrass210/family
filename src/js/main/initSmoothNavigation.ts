// smooth-navigation.ts
export function initSmoothNavigation(
    navSelector: string = '.card-nav__link',
    sectionSelector: string = '.finance-hero',
    offset: number = 160
): void {
    const navLinks = document.querySelectorAll(navSelector) as NodeListOf<HTMLAnchorElement>;

    // Проверяем наличие элементов
    if (navLinks.length === 0) {
        return;
    }

    // Функция плавного скролла с отступом
    const scrollToSection = (targetId: string): void => {
        const targetSection = document.querySelector(targetId) as HTMLElement;
        if (targetSection) {
            const targetPosition = targetSection.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    };

    // Обработчики клика по ссылкам
    navLinks.forEach(link => {
        link.addEventListener('click', (e: Event) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            if (targetId) {
                // Убираем активный класс у всех ссылок
                navLinks.forEach(l => l.classList.remove('active'));
                
                // Добавляем активный класс к текущей ссылке
                link.classList.add('active');
                
                scrollToSection(targetId);
            }
        });
    });
}