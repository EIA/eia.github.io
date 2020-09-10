const app = new PIXI.Application({ width:300, height: 250, backgroundColor: 0x1099bb });
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


const popup = new PIXI.Graphics();
popup.name = 'popup';
popup.interactive = true
popup.buttonMode = true;
popup.beginFill(0x0);
popup.alpha = 0.3;
popup.drawRect(0, 0, app.screen.width, app.screen.width);
popup.endFill();
app.stage.addChild(popup);
popup.visible = false;


bunny.on('pointerup', ()=>{
	console.log("hit: bunny, openPopup");
	popup.visible = true;
});

popup.on('pointerup', ()=>{
	console.log("hit: popup, closePopup");
	popup.visible = false;
});