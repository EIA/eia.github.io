var renderer = PIXI.autoDetectRenderer(800, 600,{backgroundColor : 0xEEEEEE});

var stage = new PIXI.Container();

var texture = PIXI.Texture.fromImage('_assets/basics/bunny.png');

var rabbits = [];

var rabbitCount = 15;

for(var i = 0; i<rabbitCount; i++){
	var bunny = new PIXI.Sprite(texture);
	var bunnyContainer = new PIXI.Container();

	bunnyContainer.addChild(bunny);

	bunny.anchor.x = 0.5;
	bunny.anchor.y = 0.5;

	bunny.position.x = 50;
	bunny.position.y = 0;

	bunnyContainer.rotation = i * ( 360 / rabbitCount) * (Math.PI / 180);
	bunnyContainer.position.x = renderer.width * .5;
	bunnyContainer.position.y = renderer.height * .5;

	rabbits.push(bunny);

	stage.addChild(bunnyContainer);
}




animate();
function animate() {
    requestAnimationFrame(animate);

	var l = rabbits.length;
	for(var i = 0; i<l; i++){
		rabbits[i].rotation += (i%2 == 0) ? -0.1 : 0.1;
	}

    renderer.render(stage);
}