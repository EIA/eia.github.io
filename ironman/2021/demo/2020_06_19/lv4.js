const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);
app.stage.name = "stage";

function createContainer(name){
	const container = new PIXI.Graphics();
	container.name = name;
	return container;
};

function createBox(name){
	const box = new PIXI.Graphics();
	box.name = name;
	box.beginFill(0xff0000);
	box.drawRect(0, 0, 100, 150);
	box.endFill();
	return box;
};

function createMask(name){
	const mask = new PIXI.Graphics();
	mask.name = name;
	mask.beginFill(0x0);
	mask.drawRect(0, 0, 100, 100);
	mask.endFill();
	return mask;
};


const container1 = createContainer("container1");
const box1 = createBox("box1");
const mask1 = createMask("mask1");

app.stage.addChild(container1);
container1.addChild(box1);
container1.addChild(mask1);

box1.mask = mask1;

container1.x = 50;
container1.y = 100;

console.log("container1.height: ", container1.height);

// ---

const container2 = createContainer("container2");
const box2 = createBox("box2");
const mask2 = createMask("mask2");

app.stage.addChild(container2);
container2.addChild(box2);
app.stage.addChild(mask2);

container2.mask = mask2;
// box2.mask = mask2;

container2.x = 200;
container2.y = 100;
mask2.x = 200;
mask2.y = 100;



console.log("container2.height: ", container2.height);