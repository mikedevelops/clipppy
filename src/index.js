// @flow

import spriteMatrix from '../resources/map.json';
import spritesheet from '../resources/map.png';

type SpriteMatrix = [
    { x: number, y: number }
];

function loadSpritesheet (element: HTMLElement, pathToSheet: string) {
    console.log(`loading spritesheet "${pathToSheet}"`);
    // element.style.backgroundImage = `url(${pathToSheet})`;
    // element.style.borderColor = 'green';
    element.setAttribute('src', pathToSheet);
}

function render (
    x: number,
    y: number,
    element: HTMLElement
): void {   
    // element.style.backgroundPosition = `${x}px ${y}px`;
    element.style.transform = `translate(-${x}px, -${y}px)`;
}

function update (
    wait: number,
    cells: number, 
    spriteMatrix: SpriteMatrix, 
    frame: number,
    index: number, 
    element: HTMLElement,
    done: () => any
)  {
    if (index < cells) {
        // FPS
        if (frame === 0 || frame % wait === 0) {
            const { x, y } = spriteMatrix[index];
            
            // console.log(`frame: ${index + 1}/${cells}, backgrond-position: ${x}px ${y}px`);
            render(x, y, element);
            index++;
        }

        frame++;
                
        requestAnimationFrame(update.bind(this, wait, cells, spriteMatrix, frame, index, element, done));
    } else {
        done();
    }
}

function restart (
    spriteMatrix: SpriteMatrix, 
    element: HTMLElement
): void {
    const { x, y } = spriteMatrix[0];
    
    element.style.backgroundPosition = `${x}px ${y}px`;
}

function play (
    spriteMatrix: SpriteMatrix, 
    element: HTMLElement, 
    options: { loop: boolean, fps: number }
) {
    const cells: number = spriteMatrix.length;
    const wait: number = 60 / options.fps;
    let index: number = 0;
    let frame: number = 0;

    console.log(`starting animation @ ${options.fps}fps`);

    update(wait, cells, spriteMatrix, frame, index, element, () => {
        console.log('Finished animation');
    });
}

/**
 * Drag & Drop
 */

let dragging: boolean = false;
const dragTarget = 'clippy';

function drag (event: MouseEvent): void {
    const target: HTMLElement|null = document.getElementById(dragTarget);

    if (target !== null) {
        console.log('start drag');

        event.preventDefault();
        dragging = true;
        // target.addEventListener('mousemove', move);
    }
}

function move (event: MouseEvent): void {
    const target: HTMLElement|null = document.getElementById(dragTarget);

    if (target !== null) {
        console.log('moving');
    }
}

function drop (event: MouseEvent): void {
    const target: HTMLElement|null = document.getElementById(dragTarget);
    
    if (target !== null) {
        event.preventDefault();
        console.log('drop');
        // target.removeEventListener('mousemove', move);
    }
}


// Go!!
const clippy: HTMLElement|null = document.getElementById('clippy');
const sheet: HTMLElement|null = document.getElementById('sheet');
const start: HTMLElement|null = document.getElementById('play');
const reset: HTMLElement|null = document.getElementById('reset');

if (start instanceof HTMLElement && sheet instanceof HTMLElement && clippy instanceof HTMLElement) {
    loadSpritesheet(sheet, spritesheet);

    start.addEventListener('click', (event: MouseEvent) => {
        play(spriteMatrix, sheet, { loop: false, fps: 10 });
    });

    clippy.addEventListener('dragstart', drag, false);
    window.addEventListener('drop', console.log);
    // window.addEventListener('mouseup', drop);
}