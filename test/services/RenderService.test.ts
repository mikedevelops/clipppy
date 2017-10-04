import RenderService from '../../src/services/RenderService';

describe('RenderService', () => {
    let renderService: RenderService;
    let mountingPoint: HTMLElement;

    beforeEach(() => {
        mountingPoint = document.createElement('div');
        renderService = new RenderService(
            mountingPoint,
            'path/to/spritesheet.png'
        );
    });

    describe('loadSpriteSheetIntoDom', () => {
        test('should set style property on mounting point', () => {
            renderService.loadSpriteSheetIntoDom();

            expect(mountingPoint.style.backgroundImage).toEqual('url(path/to/spritesheet.png)');
        });
    });

    describe('render', () => {
        test('should update the background position of the mounting point', () => {
            renderService.render({ x: 88, y: 88 });

            expect(mountingPoint.style.backgroundPosition).toEqual('88px 88px');
        });
    });
});
