import AnimationService from './services/AnimationService';
import RenderService from './services/RenderService';
import VanillaDrag from 'vanilla-drag/dist/VanillaDrag';

export default class Clippy {
    constructor (
        private animationService: AnimationService,
        private renderService: RenderService,
        private vanillaDrag: VanillaDrag
    ) {}

    public init (): void {
        this.renderService.loadSpriteSheetIntoDom();
    }
}
