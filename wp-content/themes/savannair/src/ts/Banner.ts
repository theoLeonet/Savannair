export class Banner {
    private number: number;
    private ogBanner: HTMLDivElement;
    private newBanner: Node;
    private container: HTMLDivElement;

    constructor(number: number) {
        this.number = number

        this.ogBanner = document.querySelector('.contact__banner') as HTMLDivElement;
        this.container = document.querySelector('.contact__banners__container') as HTMLDivElement;

        this.generateBanner(this.number);
    }

    private generateBanner(times: number) {
        for (let i = 0; i < times; i++) {
            this.newBanner = this.ogBanner.cloneNode(true);
            this.container.appendChild(this.newBanner);
        }
    }
}