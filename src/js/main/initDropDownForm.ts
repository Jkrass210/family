export function initDropDownForm(): void {
    const dropDownContainers = document.querySelectorAll('.drop-down-form-1') as NodeListOf<HTMLElement>;

    dropDownContainers.forEach(container => {
        const input = container.querySelector('.drop-down-form-1__input') as HTMLInputElement;
        const button = container.querySelector('.drop-down-form-1__btn') as HTMLButtonElement;
        const optionsBox = container.querySelector('.drop-down-form-1__box') as HTMLElement;
        const options = container.querySelectorAll('.drop-down-form-1__pount') as NodeListOf<HTMLElement>;

        // Проверяем наличие всех необходимых элементов
        if (!input || !button || !optionsBox || options.length === 0) {
            console.warn('Не все необходимые элементы найдены в drop-down-form-1');
            return;
        }

        let isOpen = false;

        // Функция открытия/закрытия дропдауна
        const toggleDropDown = (): void => {
            isOpen = !isOpen;
            button.classList.toggle('active', isOpen);
            optionsBox.classList.toggle('active', isOpen);
        };

        // Функция закрытия дропдауна
        const closeDropDown = (): void => {
            isOpen = false;
            button.classList.remove('active');
            optionsBox.classList.remove('active');
        };

        // Функция выбора пункта
        const selectOption = (option: HTMLElement): void => {
            input.value = option.textContent || '';

            // Создаем и отправляем событие input
            const inputEvent = new Event('input', {
                bubbles: true,
                cancelable: true
            });
            input.dispatchEvent(inputEvent);
            
            // Создаем и отправляем событие change
            const changeEvent = new Event('change', {
                bubbles: true,
                cancelable: true
            });
            input.dispatchEvent(changeEvent);
            
            // Убираем класс disabled у всех пунктов и добавляем выбранному
            options.forEach(opt => opt.classList.remove('disabled'));
            option.classList.add('disabled');
            closeDropDown();
        };

        // Обработчик клика по кнопке
        button.addEventListener('click', (e: Event) => {
            e.preventDefault();
            e.stopPropagation();
            toggleDropDown();
        });

        // Обработчики клика по пунктам
        options.forEach(option => {
            option.addEventListener('click', () => {
                selectOption(option);
            });
        });

        // Обработчик клика вне блока
        document.addEventListener('click', (e: Event) => {
            if (!container.contains(e.target as Node)) {
                closeDropDown();
            }
        });

        // Обработчик клавиши Esc
        document.addEventListener('keydown', (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                closeDropDown();
            }
        });
    });
}