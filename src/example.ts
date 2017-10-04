import clippy from './factories/ClippyFactory';
import SpriteCoordinate from './interfaces/SpriteCoordinate';
import spriteMatrix from '../resources/map';

const spriteSheet = require('../resources/map.png');

declare global {
    interface Window { clippy: any; }
}

window.clippy = window.clippy || {};

const clippyService = clippy({
    window: window,
    mountingPoint: document.getElementById('clippy'),
    spriteSheet: spriteSheet,
    spriteMatrix: spriteMatrix,
    fps: 2
});

window.clippy = clippyService;
