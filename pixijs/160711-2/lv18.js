var device;

var STAGE_WIDTH = 600, STAGE_HEIGHT = 600;

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

var texture = PIXI.Texture.fromImage('_assets/Digital-Organic-Art-0.jpg');

var rabbits = [];

var rabbitCount = 18;

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
	bunnyContainer.position.x = renderer.width * .5;
	bunnyContainer.position.y = renderer.height * .5;

	rabbits.push(bunny);

	stage.addChild(bunnyContainer);


	//////////////////////
	var thing = new PIXI.Graphics();
	stage.addChild(thing);
	thing.position.x = renderer.width / 2;
	thing.position.y = renderer.height / 2;
	thing.lineStyle(0);

	// thing.beginFill(0x8bc5ff, 0.4);
	thing.beginFill(0xffffff * Math.random(), 1);
	thing.moveTo(0, 0);
	// thing.lineTo(0, renderer.width);
	thing.lineTo(
					Math.cos(( i-1 ) * ( 360 / rabbitCount) * (Math.PI / 180)) * renderer.width * 2,
					Math.sin(( i-1 ) * ( 360 / rabbitCount) * (Math.PI / 180)) * renderer.width * 2
				);
	thing.lineTo(
					Math.cos( i * ( 360 / rabbitCount) * (Math.PI / 180)) * renderer.width * 2,
					Math.sin( i * ( 360 / rabbitCount) * (Math.PI / 180)) * renderer.width * 2
				);

	bunnyContainer.mask = thing;
}

if(device == 'pc'){
	stage.interactive = true;
	stage.on('mousemove', onMouseMove);
}else{
	if (window.DeviceOrientationEvent) {
		window.addEventListener('deviceorientation', onDeviceOrientation);
	} else {
		alert("Not supported on your device or browser.  Sorry.");
	}
}

function onMouseMove(mouseData){
	//console.log("move");
	//console.log(mouseData);
	//console.log(mouseData.data.originalEvent.x + ", "+mouseData.data.originalEvent.y);
	var tmpX = mouseData.data.originalEvent.x;
	var tmpY = mouseData.data.originalEvent.y;
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














animate();
function animate() {
    requestAnimationFrame(animate);

    count += 0.015;
    // console.log("c: "+(Math.cos(count) * 0.5));
    // console.log("x: "+mousePosX);

	targetRot = mousePosX * .8; // -0.5 ~ 0.5
	targetRot += Math.cos(count) * .2; // -0.5 ~ 0.5
	targetRot *= (Math.PI / 180);
	targetRot *= 32;

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