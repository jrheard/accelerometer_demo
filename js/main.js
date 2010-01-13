var ball = new function() {
	var speeds = {
		x: 0,
		y: 0,
		z: 0
	}

	var position = {
		x: 0,
		y: 0,
		z: 0
	}

	this.setSpeeds = function(orientData) {
		this.speeds = orientData;
	};

	this.move = function() {

	};

	this.draw = function() {

	};
};

function handleOrientation(orientData) {
	ball.setSpeeds(orientData.x, orientData.y, orientData.z);
}

window.addEventListener("MozOrientation", handleOrientation, true);  
