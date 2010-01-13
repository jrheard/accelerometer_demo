function Ball(x, y, radius) {
	var self = this;
	this.radius = radius;
	this.x = x;
	this.y = y;

	this.acceleration = {
		x: 0, // right-to-left tilt: 0 = level, 1 = way left, -1 = way right
		y: 0, // front-to-back tilt: 0 = level, 1 = backward, -1 = forward
		z: 0  // vertical acceleration: moving device upward makes this go down, 1 = standard earth gravity
	};

	this.speed = {
		x: 0,
		y: 0,
		z: 0
	};

	this.setAcceleration = function(orientData) {
		self.acceleration = orientData;
	};

	this.updateSpeeds = function() {
		for(var dimension in self.speed) {
			self.speed[dimension] += self.acceleration[dimension];
		}
	};

	this.move = function() {
		self.updateSpeeds();
		var canvas = $("#canvas").get(0);

		self.x -= self.speed.x;
		// check bounds
		if(self.x - radius < 0) {
			self.x = radius;
			self.speed.x = 0;
		} else if(self.x + radius > canvas.width) {
			self.x = canvas.width - radius;
			self.speed.x = 0;
		}

		self.y -= self.speed.y;
		if(self.y - radius < 0) {
			self.y = radius;
			self.speed.y = 0;
		} else if(self.y + radius > canvas.height) {
			self.y = canvas.height - radius;
			self.speed.y = 0;
		}

		self.draw();
	};

	this.draw = function() {
		var canvas = $("#canvas").get(0);
		var ctx = canvas.getContext("2d");
		canvas.width = canvas.width; // clear canvas

		ctx.beginPath();
		ctx.fillStyle = "#000";
		ctx.arc(self.x, self.y, self.radius, 0, Math.PI*2, true);
		ctx.closePath();
		ctx.fill();
	};
}

$(function() {
	var FRAMES_PER_SECOND = 40;
	var BALL_RADIUS = 50;

	var canvas = $("#canvas").get(0);
	canvas.width = $("body").width() - 5;
	canvas.height = $("body").height() - 5;

	var ball = new Ball(canvas.width/2, 0, BALL_RADIUS);


	window.addEventListener("MozOrientation", ball.setAcceleration, true);  
	setInterval(ball.move, 1000 / FRAMES_PER_SECOND);
});
