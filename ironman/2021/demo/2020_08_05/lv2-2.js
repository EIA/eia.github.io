const app = new PIXI.Application({ width:310, height: 350, backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

const bunny = PIXI.Sprite.from('assets/basics/bunny.png');

bunny.anchor.set(0.5);

bunny.x = app.screen.width / 2;
bunny.y = app.screen.height / 2;

app.stage.addChild(bunny);

bunny.buttonMode = true;
bunny.interactive = true;

bunny.on("pointerdown", ()=>{
	console.log("pointerdown");
});

// bunny.hitArea = new PIXI.Rectangle(0, 0, 100, 100);


setTimeout(()=>{
	console.log('bunny.width: ', bunny.width);
	console.log('bunny.height: ', bunny.height);
}, 300);