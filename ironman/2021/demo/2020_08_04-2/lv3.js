const app = new PIXI.Application({ width:100, height: 100, backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

const bunny = PIXI.Sprite.from('assets/basics/bunny.png');

bunny.anchor.set(0.5);
bunny.x = app.screen.width / 2;
bunny.y = app.screen.height / 2;

app.stage.addChild(bunny);

bunny.buttonMode = true;
bunny.interactive = true;

bunny.hitArea = new PIXI.Rectangle(0, 0, 10, 10);

bunny.on("pointerdown", ()=>{
	console.log("pointerdown");
});

const line = new PIXI.Graphics();
line.lineStyle(1, 0xdddddd);
line.moveTo(app.screen.width * .5, 0);
line.lineTo(app.screen.width * .5, app.screen.height);
line.moveTo(0, app.screen.height * .5);
line.lineTo(app.screen.width, app.screen.height * .5);
app.stage.addChild(line);