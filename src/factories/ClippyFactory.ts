import Clippy from '../Clippy';
import AnimationService from '../services/AnimationService';
import RenderService from '../services/RenderService';
import SpriteCoordinate from '../interfaces/SpriteCoordinate';
import VanillaDrag from 'vanilla-drag';

export default function clippy ({ window, mountingPoint, spriteSheet, spriteMatrix, fps = 60 }: {
    window: Window,
    mountingPoint: HTMLElement,
    spriteSheet: string,
    spriteMatrix: SpriteCoordinate[],
    fps?: number
}) {
    const renderService = new RenderService(mountingPoint, spriteSheet);
    const animationService = new AnimationService(renderService, window, spriteMatrix, fps);
    const drag = new VanillaDrag(window, mountingPoint);

    return (new Clippy(
        animationService,
        renderService,
        drag
    )).init();
}
