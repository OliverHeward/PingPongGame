import { SVG_NS } from '../settings';
import { KEYS } from '../settings';
import Paddle from './Paddle';
import Ball from './Ball';
import Score from './Score';
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
        this.score1 = new Score(190, 40, 30);
        this.score2 = new Score(300, 40, 30);

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

        // Event listener for keydown detection on 'Spacebar';
        document.addEventListener('keydown', event => {
            switch (event.key) {
                case KEYS.spaceBar:
                    this.pause = !this.pause;
                    break;
            }
        });
    }

    wallCollision() {

        let hitLeft = this.x - this.radius <= 0;
        let hitRight = this.x + this.radius >= this.boardWidth;
        let hitTop = this.y - this.radius <= 0;
        let hitBottom = this.y + this.radius >= this.boardHeight;


        if (hitLeft || hitRight) {
            this.vx = -this.vx;
        } else if (hitTop || hitBottom) {
            this.vy = -this.vy;
        }
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
        this.ball.render(svg, this.player1, this.player2);
        this.score1.render(svg, this.player1.score);
        this.score2.render(svg, this.player2.score);

        // pause the game
        // ...slightly broken because it still listens for the paddles' keydown
        if (this.pause) {
            return;
        }

    }
}