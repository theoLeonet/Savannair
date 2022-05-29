class Main {
    private vh: number;
    private burgerInput: HTMLInputElement;
    private menuElements: NodeListOf<HTMLLIElement>;

    constructor() {
        this.addJsClass();
        this.vhFixForPhones();
        this.stopScroll();
        this.closeMenu();
    }

    private addJsClass() {
        document.documentElement.classList.add('js');
        console.log(location.hash)
    }

    private vhFixForPhones() {
        addEventListener('resize', () => {
            // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
            this.vh = window.innerHeight * 0.01;
            // Then we set the value in the --vh custom property to the root of the document
            document.documentElement.style.setProperty('--vh', `${this.vh}px`);
        })
    }

    private stopScroll() {
        this.burgerInput = document.querySelector('.burger-menu__input') as HTMLInputElement;
        this.burgerInput.addEventListener('change', () => {
            if (!this.burgerInput.checked) {
                document.body.classList.remove('js__no-scroll');
                return;
            }
            if (innerWidth < 700) {
                document.body.classList.add('js__no-scroll');
            }
        })
        window.addEventListener('resize', () => {
            if (this.burgerInput.checked) {
                innerWidth < 700 ? document.body.classList.add('js__no-scroll') : document.body.classList.remove('js__no-scroll');
            }
        })
        window.addEventListener('hashchange', () => {
            if (location.hash === '#contact__form__container') {
                document.body.classList.add('js__no-scroll');
                return;
            }
            document.body.classList.remove('js__no-scroll');
        })
    }

    private closeMenu() {
        this.menuElements = document.querySelectorAll('.header__nav__container li') as NodeListOf<HTMLLIElement>;
        this.menuElements.forEach((item: HTMLLIElement) => {
            item.addEventListener('click', () => {
                this.burgerInput.checked = false;
                document.body.classList.remove('js__no-scroll');
            })
        })
    }
}

window.addEventListener('load', () => new Main());