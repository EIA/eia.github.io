var renderer = PIXI.autoDetectRenderer(800, 600,{backgroundColor : 0xEEEEEE});

var stage = new PIXI.Container();

var texture = PIXI.Texture.fromImage('assets/basics/bunny.png');

var bunny = new PIXI.Sprite(texture);

bunny.anchor.x = 0.5;
bunny.anchor.y = 0.5;

bunny.position.x = renderer.width * .5;
bunny.position.y = renderer.height * .5;

stage.addChild(bunny);

// bunny.rotation = 90;
bunny.rotation = 90 * (Math.PI / 180);

animate();
function animate() {
    requestAnimationFrame(animate);
	//bunny.rotation += 0.1;
    renderer.render(stage);
}