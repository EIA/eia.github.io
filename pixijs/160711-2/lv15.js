var device;

var STAGE_WIDTH = 600, STAGE_HEIGHT = 600;

if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
	device = 'mobile';
} else {
	device = 'pc';
}


var renderer = PIXI.autoDetectRenderer(STAGE_WIDTH, STAGE_HEIGHT,{backgroundColor : 0xEEEEEE});

var stage = new PIXI.Container();

var texture = PIXI.Texture.fromImage('assets/Digital-Organic-Art-0.jpg');

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

stage.interactive = true;
stage.on('mousemove', onMouseMove);

function onMouseMove(mouseData){
	//console.log("move");
	//console.log(mouseData);
	//console.log(mouseData.data.originalEvent.x + ", "+mouseData.data.originalEvent.y);
	var tmpX = mouseData.data.originalEvent.x;
	var tmpY = mouseData.data.originalEvent.y;
	var tmpPosX, tmpPosY;
	if(tmpX <= STAGE_WIDTH){
		//console.log("x%: "+ (tmpX / STAGE_WIDTH - .5));
		tmpPosX = tmpX / STAGE_WIDTH;
	}else if(tmpX > STAGE_WIDTH){
		tmpPosX = 1;
	}else{
		tmpPosX = 0;
	}
	if(tmpY <= STAGE_HEIGHT){
		//console.log("y%: "+ (tmpY / STAGE_HEIGHT - .5));
		tmpPosY = tmpY / STAGE_HEIGHT;
	}else if(tmpY > STAGE_HEIGHT){
		tmpPosY = 1;
	}else{
		tmpPosY = 0;
	}

	tmpPosX -= .5;
	tmpPosY -= .5;

	//console.log(tmpPosX);

	var l = rabbits.length;
	for(var i = 0; i<l; i++){
		if((i%2 == 0)){
			// rabbits[i].rotation = Math.cos(count) * (Math.PI / 180) * 40 ;
			rabbits[i].rotation = tmpPosX * (Math.PI / 180) * 90 ;
		}else{
			// rabbits[i].rotation = Math.cos(count) * (Math.PI / 180) * 40 * -1;
			rabbits[i].rotation = tmpPosX * (Math.PI / 180) * 90 * -1;
		}
	}


}

animate();
function animate() {
    requestAnimationFrame(animate);

    /*
    count += 0.015;
    //console.log(Math.sin(count)+" "+Math.cos(count));

	var l = rabbits.length;
	for(var i = 0; i<l; i++){
		//rabbits[i].rotation += (i%2 == 0) ? -0.01 : 0.01;
		if((i%2 == 0)){
			rabbits[i].rotation = Math.cos(count) * (Math.PI / 180) * 40;
		}else{
			rabbits[i].rotation = Math.cos(count) * (Math.PI / 180) * 40 * -1;
		}
	}
	*/

    renderer.render(stage);
}