const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);
app.stage.name = "stage";

const bunny = PIXI.Sprite.from('assets/basics/bunny.png');
bunny.name = "bunny";
bunny.anchor.set(0.5);


bunny.x = app.screen.width / 2 + 70;
bunny.y = app.screen.height / 2;

app.stage.addChild(bunny);



const box = new PIXI.Graphics();
bunny.name = "box";
box.beginFill(0xff0000);
box.drawRect(0, 0, 100, 100);
box.endFill();
box.x = app.screen.width / 2 - 70;
box.y = app.screen.height / 2;

app.stage.addChild(box);

bunny.interactive = true;
bunny.buttonMode = true;
bunny.on("pointerdown", ()=>{
	console.log("bunny pointerdown");
});

app.stage.interactive = true;
app.stage.buttonMode = true;
app.stage.on("pointerdown", ()=>{
	console.log("stage pointerdown");
});