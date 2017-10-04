import AnimationService from './services/AnimationService';
import RenderService from './services/RenderService';
import VanillaDrag from 'vanilla-drag/dist/VanillaDrag';

export default class Clippy {
    constructor (
        private animationService: AnimationService,
        private renderService: RenderService,
        private vanillaDrag: VanillaDrag
    ) {
        this.renderService.loadSpriteSheetIntoDom();
    }

    public start (): void {
        this.animationService.update(() => {
            console.log('done!');
        });
    }
}
