let snake;
let rows;
let cols;
let food;

const SCL = 20;

function setup() {
	createCanvas(600, 600);
	frameRate(10);		// set the refresh rate (call of draw())= 10x/sec
	cols = floor(width / SCL);
	rows = floor(height / SCL);
	snake = new Snake();
	pickFoodLocation();
}

function draw() {	
	background(51);		// 51 = dark grey color
	snake.update();
	// snake.show();
	stroke(51);			// set border of rectangle = dark grey
    fill('red');		// set color of the food = red
	rect(food.x, food.y, SCL, SCL);		// display food on the canvas @ food.x, food.y

	if(snake.eatsFood(food)) {
		// eatFood();
		pickFoodLocation();		// put a new food red square on the grid.
	}
}

function keyPressed() {
	switch (keyCode) {	// global variable returned by P5.js
		case UP_ARROW :
			snake.setMoveDir(0, -1);
			break;
		case DOWN_ARROW :
			snake.setMoveDir(0, 1);
			break;
		case LEFT_ARROW :
			snake.setMoveDir(-1, 0);
			break;
		case RIGHT_ARROW :
			snake.setMoveDir(1, 0);
			break;
	}
}

function pickFoodLocation() {
	food = createVector(			// which position for the food?
		floor(random(cols)),		// return an integer [0, cols[. See also https://p5js.org
		floor(random(rows))			// return an integer [0, rows[
	);
	food.mult(SCL);					// multiply food.(x, y) by SCL
}