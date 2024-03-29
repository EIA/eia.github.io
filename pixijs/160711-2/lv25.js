var device;

// var STAGE_WIDTH = 600, STAGE_HEIGHT = 600;
var STAGE_WIDTH = 460, STAGE_HEIGHT = 460;

var tiltLR = 0,
    tiltFB = 0,
    dir = 0;

if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
	device = 'mobile';
} else {
	device = 'pc';
}
// alert(device);

var targetRot = tmpRot = 0;
var mousePosX = mousePosY = 0;

var renderer = PIXI.autoDetectRenderer(STAGE_WIDTH, STAGE_HEIGHT,{backgroundColor : 0xEEEEEE});

var stage = new PIXI.Container();
	stage.position.x = renderer.width * .5;
	stage.position.y = renderer.height * .5;

var texture;
var mobTouch = false;
if(device == 'pc'){
	texture = PIXI.Texture.fromImage('assets/Digital-Organic-Art-0_h2.jpg');
}else{
	texture = PIXI.Texture.fromImage('assets/Digital-Organic-Art-0_h2_mob2.jpg');
}

var rabbits = [];
var masks = [];

var rabbitCount = 18; //18

var count = 0;

for(var i = 0; i<rabbitCount; i++){
	var bunny = new PIXI.Sprite(texture);
	var bunnyContainer = new PIXI.Container();

	bunnyContainer.addChild(bunny);

	bunny.anchor.x = 0;
	bunny.anchor.y = 0.5;

	bunny.position.x = 0;
	bunny.position.y = 0;

	if(i %2 == 0){
		bunny.scale.y = -1;
	}

	bunnyContainer.rotation = (i-0.5) * ( 360 / rabbitCount) * (Math.PI / 180);
	// bunnyContainer.position.x = renderer.width * .5;
	// bunnyContainer.position.y = renderer.height * .5;

	rabbits.push(bunny);

	stage.addChild(bunnyContainer);


	//////////////////////
	var thing = new PIXI.Graphics();
	stage.addChild(thing);
	// thing.position.x = renderer.width / 2;
	// thing.position.y = renderer.height / 2;
	bunnyContainer.mask = thing;
	masks.push(thing);
	buildMask();
}

if(device == 'pc'){
	stage.interactive = true;
	stage.on('mousemove', onMouseMove);
	stage.on('click', onClickStage);
}else{
	stage.interactive = true;
	stage.on('touchstart', onTouchStart);
	stage.on('touchmove', onMouseMove);
	stage.on('touchend', onTouchEnd);

	/*
	if (window.DeviceOrientationEvent) {
		window.addEventListener('deviceorientation', onDeviceOrientation);
	} else {
		alert("Not supported on your device or browser.  Sorry.");
	}
	*/
}
function onTouchStart(mouseData){
	mobTouch = true;
	onClickStage(mouseData);
}
function onTouchEnd(mouseData){
	mobTouch = false;
}


window.onresize = function (event){
	var w = window.innerWidth;
	var h = window.innerHeight;
	//this part resizes the canvas but keeps ratio the same
	renderer.view.style.width = w + "px";
	renderer.view.style.height = h + "px";
	//this part adjusts the ratio:
	renderer.resize(w,h);

	STAGE_WIDTH = w;
	STAGE_HEIGHT = h;

	stage.position.x = renderer.width * .5;
	stage.position.y = renderer.height * .5;

	buildMask();
};

function buildMask(){
	for(var i = 0; i<rabbitCount; i++){
		if(masks[i]){
			masks[i].clear();
			// masks[i].lineStyle(1);
			masks[i].lineStyle(0);

			// masks[i].beginFill(0x8bc5ff, 0.4);
			masks[i].beginFill(0xffffff * Math.random(), .4);
			masks[i].moveTo(0, 0);
			// masks[i].lineTo(0, renderer.width);
			masks[i].lineTo(
							Math.cos(( i-1 ) * ( 360 / rabbitCount) * (Math.PI / 180)) * renderer.width * 2,
							Math.sin(( i-1 ) * ( 360 / rabbitCount) * (Math.PI / 180)) * renderer.width * 2
							// Math.cos(( i ) * ( 360 / rabbitCount) * (Math.PI / 180)) * renderer.width * 2,
							// Math.sin(( i ) * ( 360 / rabbitCount) * (Math.PI / 180)) * renderer.width * 2
							// Math.cos(( i-0.5 ) * ( 360 / rabbitCount) * (Math.PI / 180)) * renderer.width * 2,
							// Math.sin(( i-0.5 ) * ( 360 / rabbitCount) * (Math.PI / 180)) * renderer.width * 2
						);
			masks[i].lineTo(
							Math.cos(( i ) * ( 360 / rabbitCount) * (Math.PI / 180)) * renderer.width * 2,
							Math.sin(( i ) * ( 360 / rabbitCount) * (Math.PI / 180)) * renderer.width * 2
							// Math.cos(( i+1 ) * ( 360 / rabbitCount) * (Math.PI / 180)) * renderer.width * 2,
							// Math.sin(( i+1 ) * ( 360 / rabbitCount) * (Math.PI / 180)) * renderer.width * 2
							// Math.cos(( i+0.5 ) * ( 360 / rabbitCount) * (Math.PI / 180)) * renderer.width * 2,
							// Math.sin(( i+0.5 ) * ( 360 / rabbitCount) * (Math.PI / 180)) * renderer.width * 2
						);
		};
	}
}

function onMouseMove(mouseData){
	// console.log("move");
	// console.log(mouseData);
	// console.log(mouseData.data.originalEvent.x + ", "+mouseData.data.originalEvent.y);

	var tmpX;
	var tmpY;
	if(device =="pc"){
		tmpX = mouseData.data.originalEvent.x;
		tmpY = mouseData.data.originalEvent.y;
	}else{
		tmpX = mouseData.data.global.x;
		tmpY = mouseData.data.global.y;
	}
	


	if(tmpX <= STAGE_WIDTH){
		//console.log("x%: "+ (tmpX / STAGE_WIDTH - .5));
		mousePosX = tmpX / STAGE_WIDTH;
	}else if(tmpX > STAGE_WIDTH){
		mousePosX = 1;
	}else{
		mousePosX = 0;
	}
	if(tmpY <= STAGE_HEIGHT){
		//console.log("y%: "+ (tmpY / STAGE_HEIGHT - .5));
		mousePosY = tmpY / STAGE_HEIGHT;
	}else if(tmpY > STAGE_HEIGHT){
		mousePosY = 1;
	}else{
		mousePosY = 0;
	}

	mousePosX -= .5; // -0.5 ~ 0.5
	mousePosY -= .5;

	//console.log(mousePosX);

}

function onDeviceOrientation(eventData){

	// alert("onDeviceOrientation");

	// gamma is the left-to-right tilt in degrees, where right is positive
	// 90~-90
	tiltLR = eventData.gamma;

	// beta is the front-to-back tilt in degrees, where front is positive
	tiltFB = eventData.beta;

	// alpha is the compass direction the device is facing in degrees
	dir = eventData.alpha;

	// call our orientation event handler
	// deviceOrientationHandler(tiltLR, tiltFB, dir);


	var otString = "";
		otString += "tiltLR: " + Math.round(tiltLR);
		otString += " tiltFB: " + Math.round(tiltFB);
		otString += " dir: " + Math.round(dir);

	// $("#ot .msg1").html(otString);


	mousePosX = tiltLR / 90; //-1~1
	mousePosX *= 3;
	if(mousePosX >= 1){mousePosX = 1};
	if(mousePosX <= -1){mousePosX = -1};
	mousePosX *= .5;

	// $("#ot .msg2").html(mousePosX);

}













onresize();
animate();
function animate() {
    requestAnimationFrame(animate);

    if(mobTouch == false){ count += 0.015; };
    // console.log("c: "+(Math.cos(count) * .5));
    // console.log("x: "+mousePosX);

	targetRot = mousePosX * .8; // -0.5 ~ 0.5
	targetRot += Math.cos(count) * .5 * .2; // -0.5 ~ 0.5
	// console.log("targetRot:"+targetRot);
	targetRot *= (Math.PI / 180);
	targetRot *= 90;

    tmpRot = rabbits[0].rotation;
    tmpRot += (targetRot - tmpRot) * 1 / 16;
    // console.log("targetRot:"+targetRot);

	var l = rabbits.length;
	for(var i = 0; i<l; i++){
		if((i%2 == 0)){
			// rabbits[i].rotation = Math.cos(count) * (Math.PI / 180) * 40;
			// rabbits[i].rotation = mousePosX * (Math.PI / 180) * 85;
			rabbits[i].rotation = tmpRot;
		}else{
			// rabbits[i].rotation = Math.cos(count) * (Math.PI / 180) * 40 * -1;
			// rabbits[i].rotation = mousePosX * (Math.PI / 180) * 85 * -1;
			rabbits[i].rotation = tmpRot * -1;
		}
	}

    renderer.render(stage);
}

function onClickStage(mouseData){
	if(screenfull){
		screenfull.request();
	}
}