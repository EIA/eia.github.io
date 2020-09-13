const app = new PIXI.Application({ width:310, height: 350, backgroundColor: 0x1099bb });
document.body.appendChild(app.view);


function createBunny(name){
	const bunny = PIXI.Sprite.from('assets/basics/bunny.png');
	bunny.name = name;
	bunny.anchor.set(0.5);
	bunny.buttonMode = true;
	bunny.interactive = true;
	bunny.hitArea = new PIXI.Rectangle(-63, -69, 126, 138);

	bunny.on('pointerdown', ()=>{
		console.log(`${name} pointerdown`);
	});
	return bunny;
};

function createTestGraphic(name){
	const graphic = new PIXI.Graphics();
	graphic.name = name;
	graphic.beginFill(0xff0000, .3);
	graphic.drawRect(-63, -69, 126, 138);
	graphic.endFill();
	return graphic;
};


const leftBunny = createBunny('leftBunny');
leftBunny.x = app.screen.width / 2 - 50;
leftBunny.y = app.screen.height / 2;

app.stage.addChild(leftBunny);


const rightBunny = createBunny('rightBunny');
rightBunny.x = app.screen.width / 2 + 50;
rightBunny.y = app.screen.height / 2;

app.stage.addChild(rightBunny);


const testGraphicLeft = createTestGraphic('testGraphicLeft');
testGraphicLeft.position = leftBunny.position;
app.stage.addChildAt(testGraphicLeft, 0);

const testGraphicRight = createTestGraphic('testGraphicRight');
testGraphicRight.position = rightBunny.position;
app.stage.addChildAt(testGraphicRight, 1);