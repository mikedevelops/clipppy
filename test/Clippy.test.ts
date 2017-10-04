import Clippy from '../src/Clippy';
import AnimationService from '../src/services/AnimationService';
import RenderService from '../src/services/RenderService';
import VanillaDrag from 'vanilla-drag';
import { mock, verify, instance } from 'ts-mockito/lib/ts-mockito';

describe('Clippy', () => {
    let clippy: Clippy;
    let animationService: AnimationService;
    let renderService: RenderService;
    let dragService: VanillaDrag;

    beforeEach(() => {
        animationService = mock(AnimationService);
        renderService = mock(RenderService);
        dragService = mock(VanillaDrag);
        clippy = new Clippy(
            instance(animationService),
            instance(renderService),
            instance(dragService)
        );
    });

    describe('init', () => {
        beforeEach(() => {
            clippy.init();
        });

        test('should load the sprite sheet', () => {
            verify(renderService.loadSpriteSheetIntoDom()).called();
        });
    });
});
