const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

app.stage.name = "stage";

function createInteractiveSprite(){
	const sprite = PIXI.Sprite.from('assets/basics/bunny.png');
	sprite.buttonMode = true;
	sprite.interactive = true;
	sprite.on("pointerdown", ()=>{
		console.log("sprite down");
	});
	return sprite;
};

function createInteractiveGraphic(){
	const graphic = new PIXI.Graphics();
	graphic.beginFill(0xff0000 ,.7);
	graphic.drawRect(0, 0, 100, 100);
	graphic.endFill();

	
	graphic.buttonMode = true;
	graphic.interactive = true;
	graphic.on("pointerdown", ()=>{
		console.log("graphic down");
	});
	return graphic;
};


const bunny = createInteractiveSprite();
app.stage.addChild(bunny);
bunny.x = 100;

const graphic = createInteractiveGraphic();
bunny.addChild(graphic);



const gui = new dat.GUI();
gui.add(bunny, "interactive");
gui.add(bunny, "interactiveChildren");