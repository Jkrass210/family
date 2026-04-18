export class SmoothScrollToBlock {
    private container: HTMLElement;
    private links: HTMLAnchorElement[];
    private blocks: NodeListOf<HTMLElement>;

    constructor(container: HTMLElement) {
        this.container = container;
        this.links = Array.from(container.querySelectorAll('.drop-down-tab__box-btn[href^="#"]'));
        this.blocks = document.querySelectorAll('[data-id]');
        
        if (this.hasValidLinks() && this.hasValidBlocks()) {
            this.init();
        }
    }

    private hasValidLinks(): boolean {
        return this.links.length > 0;
    }

    private hasValidBlocks(): boolean {
        return this.blocks.length > 0;
    }

    private init(): void {
        this.links.forEach(link => {
            link.addEventListener('click', this.handleLinkClick.bind(this));
        });
    }

    private handleLinkClick(event: Event): void {
        event.preventDefault();
        
        const target = event.target as HTMLAnchorElement;
        const targetId = target.getAttribute('href')?.substring(1); // Убираем #
        
        if (!targetId) return;

        this.scrollToBlock(targetId);
        this.updateActiveLink(target);
    }

    private scrollToBlock(blockId: string): void {
        // Ищем все блоки с нужным data-id
        const targetBlocks = Array.from(this.blocks).filter(block => 
            block.getAttribute('data-id') === blockId
        );

        // Берем первый найденный блок
        const firstBlock = targetBlocks[0];

        if (firstBlock) {
            const offsetTop = firstBlock.getBoundingClientRect().top + window.pageYOffset;
            
            window.scrollTo({
                top: offsetTop - 170, // Отступ сверху 100px
                behavior: 'smooth'
            });

            // Добавляем класс активности для визуального выделения
            this.highlightBlock(firstBlock);
        } else {
            console.warn(`Block with data-id="${blockId}" not found`);
        }
    }

    private updateActiveLink(activeLink: HTMLAnchorElement): void {
        // Убираем класс disabled со всех ссылок
        this.links.forEach(link => {
            link.classList.remove('disabled');
        });
        
        // Добавляем класс disabled к активной ссылке
        activeLink.classList.add('disabled');
    }

    private highlightBlock(block: HTMLElement): void {
        // Убираем подсветку со всех блоков
        this.blocks.forEach(b => b.classList.remove('active'));
        
        // Добавляем подсветку к целевому блоку
        block.classList.add('active');
        
        // Убираем подсветку через 2 секунды
        setTimeout(() => {
            block.classList.remove('active');
        }, 2000);
    }
}

// Функция для инициализации всех экземпляров на странице
export function initSmoothScrollToBlocks(): void {
    const containers = document.querySelectorAll('.drop-down-tab__box');
    
    containers.forEach(container => {
        new SmoothScrollToBlock(container as HTMLElement);
    });
}

// Автоматическая инициализация при загрузке DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initSmoothScrollToBlocks();
    });
} else {
    initSmoothScrollToBlocks();
}