import SpriteCoordinate from '../interfaces/SpriteCoordinate';

export default class RenderService {
    constructor (
        private mountingPoint: HTMLElement,
        private pathToSpriteSheet: string
    ) {}

    public loadSpriteSheetIntoDom (): void {
        this.mountingPoint.style.backgroundImage = `url(${this.pathToSpriteSheet})`;
    }

    public render ({ x, y }: SpriteCoordinate): void {
        this.mountingPoint.style.backgroundPosition = `${x}px ${y}px`;
    }
}
