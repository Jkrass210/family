export function animateNumber() {
    function numbers(
        element: HTMLElement,
        target: number,
        duration: number = 500
    ): void {
        let start = 0;
        const stepTime = Math.max(Math.floor(duration / target), 1);

        const step = () => {
            start++;
            element.textContent = start.toString();

            if (start < target) {
                setTimeout(step, stepTime);
            }
        };

        step();
    }

    // Инициализация для всех чисел
    const numberElements = document.querySelectorAll<HTMLElement>(".number");

    numberElements.forEach((el) => {
        const target = parseInt(el.dataset.target || "0", 10);
        numbers(el, target, 2000); // будет один раз и остановится
    });
}


export function initNumberAnimationTrigger() {
    const block = document.querySelector(".swiper-numbers");
    if (!block) return;

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Центр блока
                    const rect = entry.boundingClientRect;
                    const viewportHeight = window.innerHeight;
                    const blockCenter = rect.top + rect.height / 3;

                    if (blockCenter > 0 && blockCenter < viewportHeight) {
                        block.classList.add("animate-block");
                        animateNumber();

                        // ❗ После первого запуска убираем наблюдателя
                        observer.disconnect();
                    }
                }
            });
        },
        { threshold: 0.5 } // половина блока должна быть видна
    );

    observer.observe(block);
}
