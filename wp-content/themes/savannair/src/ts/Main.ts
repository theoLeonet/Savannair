import {TurningImage} from "./TurningImage";
import {Banner} from "./Banner";

class Main {
    private vh: number;
    private burgerInput: HTMLInputElement;
    private menuElements: NodeListOf<HTMLLIElement>;
    private oldScroll: number;
    private turningImage: TurningImage;
    private banners: Banner;

    constructor() {

        if (document.URL === 'https://savannair.be/' || document.URL.includes('https://savannair.be/#')) {
            this.turningImage = new TurningImage();
        }
        this.banners = new Banner(2);

        this.addJsClass();
        this.vhFixForPhones();
        this.stopScroll();
        this.closeMenu();
        this.removeContentWrapper();
    }

    private addJsClass() {
        document.documentElement.classList.add('js');
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
                if (item != document.querySelector('.link__contact')) {
                    document.body.classList.remove('js__no-scroll');
                }
                this.burgerInput.checked = false;
            })
        })
    }

    private removeContentWrapper() {
        // @ts-ignore
        document.querySelector('.overflow__wrapper').replaceWith(...document.querySelector('.overflow__wrapper').childNodes);
    }
}

window.addEventListener('load', () => {
    if (location.hash === '#contact__form__container') {
        document.body.classList.add('.js__no-scroll');
    } else {
        document.body.classList.remove('.js__no-scroll');
    }
    new Main();
});