const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);


function createBunny(){
	const bunny = PIXI.Sprite.from('assets/basics/bunny.png');
	bunny.anchor.set(0.5);

	bunny.x = Math.random() * app.screen.width;
	bunny.y = Math.random() * app.screen.height;

	app.stage.addChild(bunny);
};

createBunny();


setTimeout(createBunny, 3000);