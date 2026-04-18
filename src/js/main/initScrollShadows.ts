
export function initScrollShadows(selector: string): void {
    const elements = document.querySelectorAll(selector);
    
    // Проверяем, есть ли элементы
    if (elements.length === 0) {
        console.warn(`Элементы с селектором "${selector}" не найдены`);
        return;
    }
    
    console.log(`Найдено ${elements.length} элементов для инициализации скролл-теней`);
    
    elements.forEach((element, index) => {
        const updateShadows = (): void => {
            const { scrollLeft, scrollWidth, clientWidth } = element as HTMLElement;
            
            // Проверяем позицию скролла
            const isAtStart = scrollLeft === 0;
            const isAtEnd = Math.abs(scrollLeft + clientWidth - scrollWidth) < 1;
            
            // Добавляем/убираем классы
            element.classList.toggle('scrolled-start', isAtStart);
            element.classList.toggle('scrolled-end', isAtEnd);
        };
        
        element.addEventListener('scroll', updateShadows);
        updateShadows(); // Инициализация
        
        console.log(`Инициализирован скролл для элемента ${index + 1}`);
    });
}
