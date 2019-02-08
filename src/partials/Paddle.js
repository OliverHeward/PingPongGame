import { SVG_NS } from '../settings';
import { KEYS } from '../settings';

export default class Paddle {
    constructor(boardHeight, width, height, x, y, up, down) {
        this.boardHeight = boardHeight;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.speed = 10;
        this.score = 0;

        document.addEventListener('keydown', event => {
            switch (event.key) {
                case up:
                    console.log('up');
                    break;
                case down:
                    console.log('down');
                    break;
            }
        });
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