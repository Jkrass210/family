export function initShowMoreList(
    containerSelector: string = '.card-read__box-list',
    listSelector: string = '.card-read__list',
    buttonSelector: string = '.show-all',
    textSelector: string = '.text',
    visibleItemsCount: number = 3
): void {
    const container = document.querySelector(containerSelector) as HTMLElement;
    const list = container?.querySelector(listSelector) as HTMLOListElement;
    const button = container?.querySelector(buttonSelector) as HTMLButtonElement;
    const textElement = button?.querySelector(textSelector) as HTMLElement;

    // Проверяем наличие всех необходимых элементов
    if (!container || !list || !button || !textElement) {
        return;
    }

    const listItems = Array.from(list.querySelectorAll('li'));
    
    // Если элементов меньше или равно visibleItemsCount, скрываем кнопку
    if (listItems.length <= visibleItemsCount) {
        button.style.display = 'none';
        return;
    }

    // Скрываем все элементы кроме первых visibleItemsCount
    listItems.forEach((item, index) => {
        if (index >= visibleItemsCount) {
            (item as HTMLElement).style.display = 'none';
        }
    });

    let isExpanded = false;

    button.addEventListener('click', () => {
        isExpanded = !isExpanded;

        if (isExpanded) {
            // Показываем все элементы
            listItems.forEach(item => {
                (item as HTMLElement).style.display = '';
            });
            textElement.textContent = 'Скрыть';
        } else {
            // Скрываем все кроме первых visibleItemsCount
            listItems.forEach((item, index) => {
                if (index >= visibleItemsCount) {
                    (item as HTMLElement).style.display = 'none';
                }
            });
            textElement.textContent = 'Показать все';
        }
    });
}

// Использование:
// initShowMoreList(); // для элементов с классами по умолчанию
// initShowMoreList('.other-container', '.other-list', '.other-button', '.other-text', 5); // для кастомных классов