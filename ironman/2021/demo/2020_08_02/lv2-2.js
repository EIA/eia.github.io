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


const container = new PIXI.Container();
container.buttonMode = true;
container.interactive = true;
container.on("pointerdown", ()=>{
	console.log("container down");
});
app.stage.addChild(container);


const sprite = createInteractiveSprite();

const graphic = createInteractiveGraphic();
graphic.x = 100;

container.addChild(sprite);
container.addChild(graphic);


const gui = new dat.GUI();
gui.add(container, "interactive");
gui.add(container, "interactiveChildren");