var renderer = PIXI.autoDetectRenderer(320, 320,{backgroundColor : 0xEEEEEE});

var stage = new PIXI.Container();

var texture = PIXI.Texture.fromImage('assets/Digital-Organic-Art-0.jpg');

var rabbits = [];

var rabbitCount = 18;

var count = 0;

for(var i = 0; i<rabbitCount; i++){
	var bunny = new PIXI.Sprite(texture);
	var bunnyContainer = new PIXI.Container();

	bunnyContainer.addChild(bunny);

	bunny.anchor.x = 0.5;
	bunny.anchor.y = 0.5;

	bunny.position.x = 0;
	bunny.position.y = 0;

	bunnyContainer.rotation = i * ( 360 / rabbitCount) * (Math.PI / 180);
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
	thing.beginFill(0xffffff * Math.random(), 0.4);
	thing.moveTo(0, 0);
	// thing.lineTo(0, renderer.width);
	thing.lineTo(
					Math.cos( (i -1) * ( 360 / rabbitCount) * (Math.PI / 180)) * renderer.width,
					Math.sin( (i -1) * ( 360 / rabbitCount) * (Math.PI / 180)) * renderer.width
				);
	thing.lineTo(
					Math.cos( i * ( 360 / rabbitCount) * (Math.PI / 180)) * renderer.width,
					Math.sin( i * ( 360 / rabbitCount) * (Math.PI / 180)) * renderer.width
				);

	bunnyContainer.mask = thing;
}






animate();
function animate() {
    requestAnimationFrame(animate);

    count += 0.015;
    //console.log(Math.sin(count)+" "+Math.cos(count));

	var l = rabbits.length;
	for(var i = 0; i<l; i++){
		//rabbits[i].rotation += (i%2 == 0) ? -0.01 : 0.01;
		if((i%2 == 0)){
			rabbits[i].rotation = Math.sin(count) * (Math.PI / 180) * 90;
		}else{
			rabbits[i].rotation = Math.sin(count) * (Math.PI / 180) * 90 * -1;
		}
	}

    renderer.render(stage);
}