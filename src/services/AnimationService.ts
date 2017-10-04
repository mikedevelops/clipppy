import SpriteCoordinates from '../interfaces/SpriteCoordinate';
import RenderService from './RenderService';

export default class AnimationService {
    private spriteMatrixIndex: number;
    private cells: number;
    private frame: number;

    constructor (
        private renderService: RenderService,
        private window: Window,
        private spriteMatrix: SpriteCoordinates[],
        private fps: number
    ) {
        this.frame = 0;
        this.cells = spriteMatrix.length;
        this.spriteMatrixIndex = 0;
    }

    public getFrame (): number {
        return this.frame;
    }

    public update (complete: () => any): void {
        if (this.frame < this.cells) {
            this.renderService.render(this.spriteMatrix[this.spriteMatrixIndex]);
            this.frame++;
            this.window.requestAnimationFrame(this.update.bind(this, complete));
        } else {
            complete();
        }
    }

    public reset (): void {
        const { x, y } = this.spriteMatrix[0];

        this.spriteMatrixIndex = 0;
        this.renderService.render(this.spriteMatrix[this.spriteMatrixIndex]);
    }
}
