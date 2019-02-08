import { SVG_NS } from '../settings';

export default class Ball {
	constructor(radius, boardWidth, boardHeight) {
		this.radius = radius;
		this.boardWidth = boardWidth;
		this.boardHeight = boardHeight;
		this.direction = 1;

		// Reset that 'lil fella'
		this.reset();
	}
	reset() {
		
		// setting X co-ordinate
		this.x = this.boardWidth / 2;
		// setting Y co-ordinate
		this.y = this.boardHeight / 2;
	}

	render(svg) {
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
	}
}