// https://github.com/nexe/nexe
var robot = require("robotjs");
//http://robotjs.io/docs/syntax#keytogglekey-down-modifier
var sleep = require('sleep');
// sleep.sleep(n): sleep for n seconds
// sleep.msleep(n): sleep for n miliseconds
// sleep.usleep(n): sleep for n microseconds (1 second is 1000000 microseconds)

//Target: emulate the user activity
var config = { 
	maxTabInterval: 60 * 2, //In seconds
	maxTabCount: 10,
	maxArrowInterval: 5, //In seconds
	maxArrowCount: 100,
	maxMouseInterval: 20, //In seconds
	maxMouseCount: 5,
	maxMouseMoveDelta: 5  //In pixel
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

setTimeout(function startTab(){
	while (1) {
		//
		let tabCount = getRandomInt(config.maxTabCount)
		let counter = tabCount;
		let isShift = true;
		if (getRandomInt(2) == 1)
			isShift = false;
		
		if (isShift) 
			robot.keyToggle("shift", "down");
		robot.keyToggle("control", "down");

		while (counter > 0) {
			robot.keyTap("tab");
			sleep.msleep(1000);
			counter --;
		}
		robot.keyToggle("control", "up");		
		if (isShift) 
			robot.keyToggle("shift", "up");

		sleep.sleep(getRandomInt(config.maxTabInterval));
	}
}, 1000 * 2);

setTimeout(function startArrow(){
	while (1) {
		let arrowCount = getRandomInt(config.maxArrowCount)
		let counter = arrowCount;
		let isUp = 'up';
		if (getRandomInt(2) == 1)
			isUp = 'down';
		
		while (counter > 0) {
			robot.keyTap(isUp);
			sleep.msleep(100);
			counter --;
		}
		sleep.sleep(getRandomInt(config.maxArrowInterval));
	}
}, 1000 * 2);



setTimeout(function startMouse(){
	var mouse = robot.getMousePos();
	while (1) {
		let mouseCount = getRandomInt(config.maxMouseCount)
		let counter = mouseCount;

		while (counter > 0) {
			robot.mouseToggle('down');
			robot.mouseToggle('up');

			let delta = (getRandomInt(config.maxMouseMoveDelta) - (config.maxMouseMoveDelta/2));
			robot.moveMouse(mouse.x + delta, mouse.y + delta);
			sleep.msleep(500);
			counter --;
		}

		sleep.sleep(getRandomInt(config.maxMouseInterval));
	}

}, 1000 * 2);
