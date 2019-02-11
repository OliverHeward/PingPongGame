import { SVG_NS } from '../settings';
import { KEYS } from '../settings';

export default class Paddle {
    constructor(boardHeight, width, height, x, y, up, down) {
        this.boardHeight = boardHeight;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.speed = 30;
        this.score = 0;

        document.addEventListener('keydown', event => {
            switch (event.key) {
                case up:
                    this.up();
                    break;
                case down:
                    this.down();
                    break;
            }
        });
    }

    coordinates(x, y, width, height) {
        let leftX = x;
        let rightX = x + width;
        let topY = y;
        let bottomY = y + height;
        return [leftX, rightX, topY, bottomY];
    }

    up() {
        // Find the max
        // Paddle either needs to be at 0 or the 'y' position minus the speed
        this.y = Math.max(0, this.y - this.speed);

    }

    down() {
        // Get the min number
        // either the height of the board minus the height of the paddle 
        // or the y position plus the speed
        this.y = Math.min(this.boardHeight - this.height, this.y + this.speed);

    }

    render(svg) {
        let paddle = document.createElementNS(SVG_NS, 'rect');

        paddle.setAttributeNS(null, 'fill', '#fff');
        paddle.setAttributeNS(null, 'width', this.width); //this.width
        paddle.setAttributeNS(null, 'height', this.height); //this.height
        paddle.setAttributeNS(null, 'x', this.x); //this.x
        paddle.setAttributeNS(null, 'y', this.y); //this.y
        paddle.setAttributeNS(null, 'speed', (this.speed / 2));
        paddle.setAttributeNS(null, 'score', (this.score / 2));
        paddle.setAttributeNS(null, 'stroke', '#fff');
        paddle.setAttributeNS(null, 'stroke-width', '20, 15');



        svg.appendChild(paddle);

    }
}