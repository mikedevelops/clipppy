// @flow

export default class Drag {
    window: any;
    element: HTMLElement;
    dragging: boolean;
    origin: {
        x: number,
        y: number
    }

    /**
     * Drag
     * @param {any} root 
     * @param {HTMLElement} element 
     */
    constructor (
        root: any,
        element: HTMLElement
    ) {
        this.window = root;
        this.element = element;
        this.dragging = false;
        this.origin = { x: 0, y: 0 };
    }

    /**
     * Attach event listeners
     */
    init (): void {
        this.element.addEventListener('mousedown', this.handleMouseDown.bind(this));
        this.element.addEventListener('mouseup', this.handleMouseUp.bind(this));
        this.window.addEventListener('mousemove', this.handleMouseMove.bind(this));
    }

    /**
     * Handle drag start
     * @param {MouseEvent} event 
     */
    handleMouseDown (event: MouseEvent): void {
        const { left, top }: { left: number, top: number } = this.element.getBoundingClientRect();

        this.dragging = true;
        this.origin.x = (event.pageX - left);
        this.origin.y = (event.pageY - top);
    }

    handleMouseMove (event: MouseEvent): void {
        if (this.outOfBounds(event.pageX, event.pageY, 0, this.window.innerWidth, 0, this.window.innerHeight)) {
            this.dragging = false;
        }
        
        if (this.dragging) {					
            this.element.style.transform = `translate(${event.pageX - this.origin.x}px, ${event.pageY - this.origin.y}px)`;
        }
    }

    /**
     * Handle drag end
     */
    handleMouseUp (): void {
        this.dragging = false;
    }

    /**
     * Check if an element is out of bounds
     * @param {number} nodeX 
     * @param {number} nodeY 
     * @param {number} boundsMinX 
     * @param {number} boundsMaxX 
     * @param {number} boundsMinY 
     * @param {number} boundsMaxY 
     */
    outOfBounds (
        x: number, 
        y: number, 
        boundsMinX: number, 
        boundsMaxX: number, 
        boundsMinY: number, 
        boundsMaxY: number
    ): boolean {
        return x <= boundsMinX || x >= boundsMaxX || y <= boundsMinY || y >= boundsMaxY;
    }
}
