// file-input.ts
export function initFileInput(): void {
    const fileInputs = document.querySelectorAll('.static-form-1__input-file') as NodeListOf<HTMLInputElement>;

    fileInputs.forEach(input => {
        const label = input.closest('.static-form-1__label-file') as HTMLLabelElement;
        const customText = label?.querySelector('.castom-text') as HTMLElement;
        const textSpan = label?.querySelector('.text') as HTMLElement;

        // Проверяем наличие элементов
        if (!label || !customText || !textSpan) {
            return;
        }

        input.addEventListener('change', (e: Event) => {
            const target = e.target as HTMLInputElement;
            const files = target.files;

            if (files && files.length > 0) {
                if (files.length === 1) {
                    // Один файл - показываем его имя
                    customText.textContent = files[0].name;
                } else {
                    // Несколько файлов - показываем количество
                    customText.textContent = `Выбрано файлов: ${files.length}`;
                }
                
                // Меняем текст в основном спанe
                textSpan.textContent = 'Файл выбран';
                
                // Добавляем визуальный индикатор
                label.classList.add('file-selected');
            } else {
                // Сбрасываем к исходному состоянию
                customText.textContent = 'Пусто';
                textSpan.textContent = 'Загрузить файлы';
                label.classList.remove('file-selected');
            }
        });
    });
}