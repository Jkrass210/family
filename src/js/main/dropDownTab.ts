/*export class DropDownTab {
    private container: HTMLElement;
    private btn: HTMLButtonElement;
    private box: HTMLElement;
    private boxBtns: HTMLButtonElement[];
    private textElement: HTMLElement;
    private iElement: HTMLElement;
    private isActive: boolean = false;
    private ignoreOutsideClick: boolean = false;

    // Статическое свойство для хранения текущего активного dropdown
    private static activeDropdown: DropDownTab | null = null;

    constructor(container: HTMLElement) {
        this.container = container;
        this.btn = container.querySelector('.drop-down-tab__btn') as HTMLButtonElement;
        this.box = container.querySelector('.drop-down-tab__box') as HTMLElement;
        this.boxBtns = Array.from(container.querySelectorAll('.drop-down-tab__box-btn'));
        this.textElement = container.querySelector('.drop-down-tab__btn .text') as HTMLElement;
        this.iElement = container.querySelector('.drop-down-tab__btn i') as HTMLElement;

        if (this.btn && this.box && this.textElement && this.iElement && this.boxBtns.length > 0) {
            this.init();
        }
    }

    private init(): void {
        this.btn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.ignoreOutsideClick = true;
            this.toggle();
            
            // Сбрасываем флаг после обработки клика
            setTimeout(() => {
                this.ignoreOutsideClick = false;
            }, 0);
        });

        document.addEventListener('click', (e) => {
            this.handleOutsideClick(e);
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.handleEscape();
            }
        });

        this.boxBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.selectButton(btn);
            });
        });
    }

    private toggle(): void {
        if (this.isActive) {
            this.closeDropdown();
        } else {
            this.openDropdown();
        }
    }

    private openDropdown(): void {
        // Закрываем предыдущий активный dropdown
        if (DropDownTab.activeDropdown && DropDownTab.activeDropdown !== this) {
            DropDownTab.activeDropdown.closeDropdown();
        }

        this.btn.classList.add('active');
        this.box.classList.add('active');
        this.isActive = true;
        DropDownTab.activeDropdown = this;
    }

    private closeDropdown(): void {
        this.btn.classList.remove('active');
        this.box.classList.remove('active');
        this.isActive = false;
        
        if (DropDownTab.activeDropdown === this) {
            DropDownTab.activeDropdown = null;
        }
    }

    private handleOutsideClick(event: MouseEvent): void {
        // Игнорируем клик, если он был на кнопке
        if (this.ignoreOutsideClick) return;
        
        const target = event.target as HTMLElement;
        
        // Если клик не внутри этого dropdown и dropdown активен - закрываем
        if (!this.container.contains(target) && this.isActive) {
            this.closeDropdown();
        }
    }

    private handleEscape(): void {
        if (this.isActive) {
            this.closeDropdown();
        }
    }

    private selectButton(button: HTMLButtonElement): void {
        // Убираем класс disabled со всех кнопок
        this.boxBtns.forEach(btn => {
            btn.classList.remove('disabled');
        });
        
        // Добавляем класс disabled к выбранной кнопке
        button.classList.add('disabled');
        
        // Переносим текст в тег <i>
        this.iElement.textContent = button.textContent?.trim() || '';
        
        // Закрываем dropdown
        this.closeDropdown();
    }

    // Публичный метод для принудительного закрытия
    public close(): void {
        this.closeDropdown();
    }

    // Публичный метод для проверки состояния
    public getIsActive(): boolean {
        return this.isActive;
    }

    // Статический метод для закрытия всех dropdowns
    public static closeAll(): void {
        if (DropDownTab.activeDropdown) {
            DropDownTab.activeDropdown.closeDropdown();
        }
    }
}

// Функция для инициализации всех dropdown tabs на странице
export function initDropDownTabs(): void {
    const containers = document.querySelectorAll('.drop-down-tab');
    
    containers.forEach(container => {
        new DropDownTab(container as HTMLElement);
    });
}

// Автоматическая инициализация при загрузке DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initDropDownTabs();
    });
} else {
    initDropDownTabs();
}*/


export class DropDownTab {
    private container: HTMLElement;
    private btn: HTMLElement; // поддерживаем более общую ноду на случай <a> внутри кнопки
    private box: HTMLElement;
    private boxBtns: HTMLButtonElement[];
    private iElement: HTMLElement;
    private isActive: boolean = false;

    private static activeDropdown: DropDownTab | null = null;
    private static documentHandlersInitialized = false;
    // Флаг — если true, следующее "open" на кнопку игнорируется
    private static preventNextOpen = false;

    constructor(container: HTMLElement) {
        this.container = container;
        // btn может быть не обязательно <button>, поэтому HTMLElement
        this.btn = container.querySelector('.drop-down-tab__btn') as HTMLElement;
        this.box = container.querySelector('.drop-down-tab__box') as HTMLElement;
        this.boxBtns = Array.from(container.querySelectorAll('.drop-down-tab__box-btn'));
        this.iElement = container.querySelector('.drop-down-tab__btn i') as HTMLElement;

        if (this.btn && this.box && this.iElement) {
            this.init();
        }

        if (!DropDownTab.documentHandlersInitialized) {
            DropDownTab.initDocumentHandlers();
            DropDownTab.documentHandlersInitialized = true;
        }
    }

    private init(): void {
        // Обработчик на кнопке — не toggle напрямую, а с проверкой флага
        this.btn.addEventListener('click', (e) => {
            // Если флаг стоит — игнорируем этот клик как "повторное мгновенное" открытие
            if (DropDownTab.preventNextOpen) {
                // сбрасываем флаг и не открываем
                DropDownTab.preventNextOpen = false;
                e.preventDefault();
                e.stopPropagation();
                return;
            }

            // Обычное поведение: переключаем
            e.stopPropagation();
            this.toggle();
        });

        // Кнопки внутри box (выбор)
        this.boxBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.selectButton(btn);
            });
        });
    }

    private toggle(): void {
        this.isActive ? this.closeDropdown() : this.openDropdown();
    }

    private openDropdown(): void {
        // Закрываем предыдущий активный dropdown (если есть)
        if (DropDownTab.activeDropdown && DropDownTab.activeDropdown !== this) {
            DropDownTab.activeDropdown.closeDropdown();
        }

        this.btn.classList.add('active');
        this.box.classList.add('active');
        this.isActive = true;
        DropDownTab.activeDropdown = this;
    }

    private closeDropdown(): void {
        this.btn.classList.remove('active');
        this.box.classList.remove('active');
        this.isActive = false;

        if (DropDownTab.activeDropdown === this) {
            DropDownTab.activeDropdown = null;
        }
    }

    private selectButton(button: HTMLButtonElement): void {
        this.boxBtns.forEach(btn => btn.classList.remove('disabled'));
        button.classList.add('disabled');

        this.iElement.textContent = button.textContent?.trim() || '';

        this.closeDropdown();
    }

    public close(): void {
        this.closeDropdown();
    }

    public getIsActive(): boolean {
        return this.isActive;
    }

    public static closeAll(): void {
        if (DropDownTab.activeDropdown) {
            DropDownTab.activeDropdown.closeDropdown();
        }
    }

    // -------------------
    // Глобальные обработчики (capture phase)
    // -------------------
    private static initDocumentHandlers(): void {
        // Используем pointerdown в capture — срабатывает до обработчиков на targets
        document.addEventListener('pointerdown', (e) => {
            const active = DropDownTab.activeDropdown;
            if (!active) return;

            const target = e.composedPath ? e.composedPath()[0] as Node : (e.target as Node);

            // Если клик/нажатие произошло внутри box или внутри кнопки — ничего не делаем
            const isInsideBox = active.box.contains(e.target as Node);
            const isInsideButton = active.btn.contains(e.target as Node);

            if (!isInsideBox && !isInsideButton) {
                // Закрываем активный dropdown
                active.closeDropdown();

                // ВАЖНО: установим флаг, чтобы тот же pointer/click, который
                // затем дойдёт до кнопки, не открыл меню снова.
                // Поскольку мы в capture, этот флаг будет виден обработчику кнопки (основной фазы).
                DropDownTab.preventNextOpen = true;
            }
        }, true); // <-- capture = true

        // Escape по-прежнему в обычной фазе
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && DropDownTab.activeDropdown) {
                DropDownTab.activeDropdown.closeDropdown();
                DropDownTab.preventNextOpen = true;
            }
        });
    }
}

// Инициализация
export function initDropDownTabs(): void {
    const containers = document.querySelectorAll('.drop-down-tab');
    containers.forEach(container => new DropDownTab(container as HTMLElement));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDropDownTabs);
} else {
    initDropDownTabs();
}



