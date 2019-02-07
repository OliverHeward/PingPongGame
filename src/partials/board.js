import { SVG_NS } from '../settings';

export default class Board {
	constructor(width, height) {
		this.width = width;
		this.height = height;
	}
	render(svg) {
		let rect = document.createElementNS(SVG_NS, 'rect');

		rect.setAttributeNS(null, 'fill', '#353535');
		rect.setAttributeNS(null, 'width', this.width);
		rect.setAttributeNS(null, 'height', this.height);

		// Create line down the middle of the board
		let line = document.createElementNS(SVG_NS, 'line');

		// sett x coordinate which is half of the board
		line.setAttributeNS(null, 'x1', (this.width/2));
		// Set y coordinate to the top of the board
		line.setAttributeNS(null, 'y1', 0)
		// set the x coordinate which is half of the board
		line.setAttributeNS(null, 'x2', (this.width/2));
		// set the y coordinate which is the total height of the board
		line.setAttributeNS(null, 'y2', this.height);

		// sets the color to white
		line.setAttributeNS(null, 'stroke', 'white');
		// sets the stroke  to be dashed
		line.setAttributeNS(null, 'stroke-dasharray', '20, 15');
		// sets the stroke width
		line.setAttributeNS(null, 'stroke-width', 4);

		svg.appendChild(rect);
		svg.appendChild(line);
	}
}