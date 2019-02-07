import { SVG_NS } from '../settings';
import Board from './board';

export default class Game {
    constructor(element, width, height) {
        this.element = element;
        this.width = width;
        this.height = height;

        this.gameElement = document.getElementById(this.element);

        // Creates a board object and set width and height to game width and height

        this.board = new Board(this.width, this.height);
    }

    render() {
        // create svg element
        this.gameElement.innerHTML = '';

        let svg = document.createElementNS(SVG_NS, 'svg');

        // set attributes 
        svg.setAttributeNS(null, 'width', this.width);
        svg.setAttributeNS(null, 'height', this.height);
        svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`);
        // append SVG too game element by Id
        this.gameElement.appendChild(svg);

        //render the game components
        this.board.render(svg);
        this.board.render(svg);

    }
}