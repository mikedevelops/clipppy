import clippy from './factories/ClippyFactory';
import SpriteCoordinate from './interfaces/SpriteCoordinate';
import spriteMatrix from '../resources/map';

const spriteSheet: string = require('../resources/map.png');

clippy({
    window: window,
    mountingPoint: document.getElementById('clippy'),
    spriteSheet: spriteSheet,
    spriteMatrix: spriteMatrix
});
