import { SVG_NS } from '../settings';
import { KEYS } from '../settings';
import Paddle from './Paddle';
import Ball from './Ball';
import Board from './Board';


export default class Game {
    constructor(element, width, height) {
        this.element = element;
        this.width = width;
        this.height = height;

        this.gameElement = document.getElementById(this.element);

        // Creates a board object and set width and height to game width and height

        this.board = new Board(this.width, this.height);
        this.ball = new Ball(8, this.width, this.height);

        this.paddleWidth = 8;
        this.paddleHeight = 56;
        this.boardGap = 10;


        this.player1 = new Paddle(
            // Game/Board height
            this.height,
            // paddle height/width
            this.paddleWidth,
            this.paddleHeight,
            // gap beween paddle and board side
            this.boardGap,
            ((this.height - this.paddleHeight) / 2),
            KEYS.a,
            KEYS.z
        )

        this.player2 = new Paddle(
            // Game/Board height
            this.height,
            // paddle height/width
            this.paddleWidth,
            this.paddleHeight,
            // gap beween paddle and board side
            (this.width - this.boardGap - this.paddleWidth),
            ((this.height - this.paddleHeight) / 2),
            KEYS.up,
            KEYS.down
        )
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
        this.player1.render(svg);
        this.player2.render(svg);
        this.ball.render(svg);

    }
}