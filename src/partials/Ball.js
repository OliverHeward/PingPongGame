import { SVG_NS } from '../settings';

export default class Ball {
    constructor(radius, boardWidth, boardHeight, ping) {
        this.radius = radius;
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.direction = 1;
        this.ping = new Audio('public/sounds/pong-01.wav');

        // Reset that 'lil fella'
        this.reset();

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

    paddleCollision(player1, player2) {
        // if moving toward the right end...
        if (this.vx > 0) {
            // detect player2 paddle collision
            let paddle = player2.coordinates(player2.x, player2.y, player2.width, player2.height);
            let [leftX, rightX, topY, bottomY] = paddle;
            if (
                (this.x + this.radius >= leftX) // right edge of the ball is >= left edge of the paddle
                &&
                (this.x + this.radius <= rightX) // right edge of the ball is <= right edge of the paddle
                &&
                (this.y >= topY && this.y <= bottomY) // ball Y is >= paddle top Y and <= paddle bottom Y
            ) {
                this.vx = -this.vx;
                this.ping.play();
            }
        } else {
            let paddle = player1.coordinates(player1.x, player1.y, player1.width, player1.height);
            let [leftX, rightX, topY, bottomY] = paddle;
            if (
                (this.x - this.radius <= rightX) // left edge of the ball is <= right edge of the paddle
                &&
                (this.x - this.radius >= leftX) // left edge of the ball is >= left edge of the paddle
                &&
                (this.y >= topY && this.y <= bottomY) // ball Y is >= paddle top Y or <= paddle bottom
            ) {
                this.vx = -this.vx;
                this.ping.play();
            }
        }
    }

    reset() {

        // setting X co-ordinate
        this.x = this.boardWidth / 2;
        // setting Y co-ordinate
        this.y = this.boardHeight / 2;

        // Generates a random number between -5 and 5 that isn't 0
        this.vy = 0;
        while (this.vy === 0) {
            this.vy = Math.floor(Math.random() * 10 - 5);
        }
        // A number between -5 and 6, based on this.vy
        // this guarentees that if vy is large, vx is small (and vice versa)
        this.vx = this.direction * (6 - Math.abs(this.vy));

    }


    goal(player) {
        player.score++;
        this.reset();
        console.log(player.score);
        // resets ball on goal
        this.reset();
    }

    render(svg, player1, player2) {

        this.wallCollision();
        this.paddleCollision(player1, player2);

        this.x += this.vx;
        this.y += this.vy;

        // Drawing the ball
        let ball = document.createElementNS(SVG_NS, 'circle');
        // setting the radius
        ball.setAttributeNS(null, 'r', this.radius);
        // setting X co-ordinate
        ball.setAttributeNS(null, 'cx', this.x);
        // setting Y co-ordinate
        ball.setAttributeNS(null, 'cy', this.y);
        // setting fill to White
        ball.setAttributeNS(null, 'fill', '#fff');

        // append to SVG in
        svg.appendChild(ball);



        // Detect goal
        const rightGoal = this.x + this.radius >= this.boardWidth;
        const leftGoal = this.x - this.radius <= 0;
        if (rightGoal) {
            this.goal(player1);
            this.direction = 1;
        } else if (leftGoal) {
            this.goal(player2);
            this.direction = -1;
        }
        // left goal variable
        // right goal variable
        // a conditional to check if left or right goal 

    }
}