export function header(){
    const hamburger = document.querySelector<HTMLButtonElement>(
        ".hamburger"
    );

    if (hamburger) {
        hamburger.addEventListener("click", () => {
            document.body.classList.toggle("menu-active");
        });
    }

    const dropdownItems = document.querySelectorAll<HTMLLIElement>(
        ".header-menu__item-dropdown"
    );

    dropdownItems.forEach((item) => {
        const link = item.querySelector<HTMLAnchorElement>(".header-menu__link");
        const menu = item.querySelector<HTMLElement>(".drop-menu");

        if (link && menu) {
            link.addEventListener("click", (event) => {
                if (window.innerWidth < 991) {
                    event.preventDefault(); // чтобы не переходить по ссылке

                    const isActive = item.classList.contains("drop-active");

                    // Закрываем все остальные меню
                    dropdownItems.forEach((i) => {
                        i.classList.remove("drop-active");
                        const m = i.querySelector<HTMLElement>(".drop-menu");
                        if (m) {
                            m.style.height = "0";
                            m.classList.remove("open");
                        }
                    });

                    if (!isActive) {
                        item.classList.add("drop-active");
                        menu.classList.add("open");
                        // Ставим реальную высоту для плавного открытия
                        menu.style.height = menu.scrollHeight + "px";
                    } else {
                        // Плавное закрытие
                        menu.style.height = "0";
                        menu.classList.remove("open");
                    }
                }
            });
        }
    });
}