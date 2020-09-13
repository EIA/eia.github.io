const app = new PIXI.Application({ width:310, height: 300, backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

const bunny = PIXI.Sprite.from('assets/basics/bunny.png');
bunny.name = 'bunny';
bunny.buttonMode = true;
bunny.interactive = true;
bunny.hitArea = new PIXI.Rectangle(0, 0, 26, 19);

bunny.on('pointerdown', ()=>{
	console.log('bunny pointerdown');
});

bunny.x = app.screen.width / 2;
bunny.y = app.screen.height / 2;

app.stage.addChild(bunny);



const testGraphic = new PIXI.Graphics();
testGraphic.name = 'testGraphic';
testGraphic.beginFill(0xff0000, .5);
testGraphic.drawRect(0, 0, 26, 19);
testGraphic.endFill();
testGraphic.position = bunny.position;
app.stage.addChild(testGraphic);