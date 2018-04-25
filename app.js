
var config = { 
	maxTabInterval: 60 * 2, //In seconds
	maxTabCount: 10,
	maxArrowInterval: 5, //In seconds
	maxArrowCount: 100,
	maxMouseInterval: 20, //In seconds
	maxMouseCount: 5,
	maxMouseMoveDelta: 5  //In pixel
}

var Worker = require("tiny-worker");
var worker1 = new Worker("startarrow.js");
var worker2 = new Worker("startmouse.js");
var worker3 = new Worker("starttab.js");
 
worker1.onmessage = function (ev) {
    console.log(ev.data);
    worker1.terminate();
};
 
worker1.postMessage(config);
worker2.postMessage(config);
worker3.postMessage(config);
