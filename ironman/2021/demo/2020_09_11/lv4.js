const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);
app.stage.name = "stage";

const box = new PIXI.Graphics();
bunny.name = "box";
box.beginFill(0xff0000, .3);
box.drawRect(0, 0, 100, 100);
box.endFill();
box.x = app.screen.width / 2 - 70;
box.y = app.screen.height / 2;

app.stage.addChild(box);



const bunny = PIXI.Sprite.from('assets/basics/bunny.png');
bunny.name = "bunny";
bunny.anchor.set(0.5);

bunny.interactive = true;
bunny.buttonMode = true;
bunny.on("pointerdown", ()=>{
	console.log("bunny pointerdown");
});



box.addChild(bunny);



box.interactive = true;
box.buttonMode = true;
box.on("pointerdown", ()=>{
	console.log("box pointerdown");
});


// box.interactiveChildren = false;
box.interactive = false;