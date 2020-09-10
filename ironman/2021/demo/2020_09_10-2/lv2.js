const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);
app.stage.name = 'stage';

const bunny = PIXI.Sprite.from('assets/basics/bunny.png');
bunny.name = 'bunny';
bunny.interactive = true
bunny.buttonMode = true;

bunny.anchor.set(0.5);
bunny.x = app.screen.width / 2;
bunny.y = app.screen.height / 2;

app.stage.addChild(bunny);


const hitArea = new PIXI.Graphics();
hitArea.name = 'hitArea';
hitArea.interactive = true
hitArea.buttonMode = true;
hitArea.beginFill(0x0);
hitArea.alpha = 0.3;
hitArea.drawRect(0, 0, app.screen.width, app.screen.width);
hitArea.endFill();
app.stage.addChild(hitArea);
hitArea.visible = false;


bunny.on('pointerup', ()=>{
	console.log("hit: bunny, openPopup");
	hitArea.visible = true;
});

hitArea.on('pointerup', ()=>{
	console.log("hit: hitArea, closePopup");
	hitArea.visible = false;
});