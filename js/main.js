function Ball(x, y, radius) {
	this.radius = radius;
	this.x = x;
	this.y = y;

	this.acceleration = {
		x: 0, // right-to-left tilt: 0 = level, 1 = way left, -1 = way right
		y: 0, // front-to-back tilt: 0 = level, 1 = backward, -1 = forward
		z: 0  // vertical acceleration: moving device upward makes this go down, 1 = standard earth gravity
	};

	this.speeds = {
		x: 0,
		y: 0,
		z: 0
	};

	this.setAcceleration = function(orientData) {
		this.acceleration = orientData;
	};

	this.move = function() {
		this.position.x -= this.acceleration.x;
		this.position.y 

		this.draw();
	};

	this.draw = function() {
		var canvas = $("#canvas").get(0);
		var ctx = canvas.getContext("2d");

		ctx.beginPath();
		ctx.fillStyle = "#000";
		ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2, true);
		ctx.closePath();
		ctx.fill();
	};
};

$(function() {
	var FRAMES_PER_SECOND = 30;
	var BALL_RADIUS = 50;

	var width = $("body").width();

	var canvas = $("#canvas").get(0);
	canvas.setWidth(width);
	canvas.setHeight(height);

	var ball = new Ball(width/2, 0, BALL_RADIUS);


	window.addEventListener("MozOrientation", ball.setAcceleration, true);  
	setInterval(ball.move, 1000 / FRAMES_PER_SECOND);
});
