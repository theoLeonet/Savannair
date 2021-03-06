export class TurningImage {
    context: CanvasRenderingContext2D;
    private image: HTMLImageElement;
    private frameRate: number;
    private canvas: HTMLCanvasElement;

    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.classList.add('module__image');
        document.querySelector('.modules__main .module__image').replaceWith(this.canvas);

        this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;

        this.image = new Image();

        this.resizeCanvas();

        this.addEventListeners();
    }

    private resizeCanvas() {
        this.canvas.width = this.canvas.height = 333;
    }

    private addEventListeners() {
        addEventListener('resize', () => {
            this.resizeCanvas();
            this.loadImage(this.frameRate);
        })

        addEventListener('scroll', () => {
            this.frameRate = Math.floor((scrollY / 75));

            this.loadImage(this.frameRate % 8);
        })
    }

    private loadImage(num: number) {
        if (num >= 0) {
            this.image.src = 'https://savannair.be/wp-content/themes/savannair/assets/pictures/modules/module_' + num + '.png';
            this.image.addEventListener('load', () => {
                this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.context.drawImage(this.image, 0, 0, 333, 333);
            })
        }
    }
}